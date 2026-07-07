import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

/**
 * Owned email list — captured into ANDREW'S OWN storage (Upstash Redis), not a third-party ESP.
 *
 * Why: Kit/ConvertKit CLOSED his account over digital-asset content. A list that lives inside a
 * SaaS can be shut off with it. So the list of record lives here, in storage Andrew controls and
 * can export any time — no company can take it away. A sending tool (Beehiiv, decided by dgb-cmo:
 * free ≤2,500, its AUP explicitly allows educational crypto/blockchain content) is OPTIONAL and
 * plugs in later; it is never the source of truth.
 *
 * Same env the rate-limiter already uses (so if rate-limiting works in prod, this does too):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash direct)
 *   KV_REST_API_URL        + KV_REST_API_TOKEN          (Vercel KV / marketplace)
 */

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

/** Whether durable owned-list storage is configured. If false, we must NOT fake success. */
export const hasSubscriberStore = redis !== null;

const SET_KEY = "dgb:subscribers"; // set of email addresses (dedupe)
const LOG_KEY = "dgb:subscribers:log"; // ordered log for export (most-recent first)

export type SubscriberInput = {
  email: string;
  source?: string;
  name?: string;
  handle?: string;
  wallet?: string;
  company?: string;
  utm?: Record<string, string>;
};

/**
 * Store a subscriber in the owned list. Idempotent on email (SADD dedupes). Returns true when the
 * record was persisted, false when no store is configured (caller must then fail honestly — never
 * pretend a signup was saved).
 */
export async function saveSubscriber(sub: SubscriberInput): Promise<boolean> {
  if (!redis) return false;
  const email = sub.email.trim().toLowerCase();
  const id = createHash("sha256").update(email).digest("hex").slice(0, 32);
  const record = {
    email,
    source: sub.source ?? "",
    name: sub.name ?? "",
    handle: sub.handle ?? "",
    wallet: sub.wallet ?? "",
    company: sub.company ?? "",
    utm: sub.utm ? JSON.stringify(sub.utm) : "",
    ts: new Date().toISOString(),
  };
  // One pipeline: add to the dedupe set, write the full record, and push a compact log line.
  const p = redis.pipeline();
  p.sadd(SET_KEY, email);
  p.hset(`dgb:subscriber:${id}`, record);
  p.lpush(LOG_KEY, JSON.stringify({ email, source: record.source, ts: record.ts }));
  await p.exec();
  return true;
}

/**
 * Best-effort push to Beehiiv (the sender) IF configured. Never throws to the caller and never
 * blocks the owned-list save — Beehiiv is a mirror, not the source of truth. Uses the standard
 * publications create-subscription endpoint. Absent env → no-op.
 */
export async function pushToBeehiiv(email: string, source?: string): Promise<void> {
  const key = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !pubId) return;
  try {
    await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: source ?? "digitalgoldboom",
      }),
    });
  } catch {
    // swallow — the owned list already has them; Beehiiv sync can be reconciled later
  }
}
