import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Durable rate limiting for public POST routes (pre-launch security spec,
 * dgb-web3-engineer §2): sliding window in Upstash Redis so the limit survives
 * cold starts and spans every serverless instance — the in-memory Map it
 * replaces reset per instance and a distributed bot walked through it.
 *
 * Keys are limited on TWO dimensions (spec: "keyed on IP + email"):
 *   - per-IP:    5 requests / 10 min  (one machine hammering the form)
 *   - per-email: 3 requests / 10 min  (many machines stuffing one address)
 *
 * Store config (either pair works; set in Vercel env):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash direct)
 *   KV_REST_API_URL        + KV_REST_API_TOKEN          (Vercel KV / marketplace)
 *
 * Without a store the limiter FALLS BACK to the old in-memory window so dev
 * keeps working — but in production that fallback logs an error on every
 * request: the durable store is a launch requirement, not an optimization.
 */

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

const ipLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "rl:subscribe:ip",
    })
  : null;

const emailLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "rl:subscribe:email",
    })
  : null;

// The contact form gets its OWN window. Sharing the signup's would let a burst of contact
// messages lock a genuine reader out of the opt-in (and vice versa) — two different forms,
// two different budgets. Tighter, because a human writes one message, not five.
const contactIpLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "10 m"), prefix: "rl:contact:ip" })
  : null;

const contactEmailLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(2, "10 m"), prefix: "rl:contact:email" })
  : null;

// In-memory fallback (dev / store not yet provisioned). Same shape as the old
// stopgap; trimmed so the map can't grow unbounded.
const WINDOW_MS = 10 * 60 * 1000;
const memHits = new Map<string, number[]>();
function memLimited(key: string, max: number): boolean {
  const now = Date.now();
  const hits = (memHits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  memHits.set(key, hits);
  if (memHits.size > 10_000) memHits.clear(); // hard cap: abuse floods memory otherwise
  return hits.length > max;
}

/**
 * True if this request should be rejected (429). Fails OPEN on store errors:
 * a Redis outage must not take the signup form down with it.
 */
export async function subscribeRateLimited(
  ip: string,
  email: string,
): Promise<boolean> {
  // Hash the email before it becomes a store key — a raw address in Redis keys is
  // PII landing in a third-party store (and its console) just to count requests.
  const emailKey = createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");
  if (!ipLimiter || !emailLimiter) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[rate-limit] No durable store configured (UPSTASH_REDIS_REST_URL/KV_REST_API_URL) — using in-memory fallback. NOT launch-safe.",
      );
    }
    return memLimited(`ip:${ip}`, 5) || memLimited(`email:${emailKey}`, 3);
  }
  try {
    const [byIp, byEmail] = await Promise.all([
      ipLimiter.limit(ip),
      emailLimiter.limit(emailKey),
    ]);
    return !byIp.success || !byEmail.success;
  } catch (err) {
    console.error("[rate-limit] store error — failing open", err);
    return false;
  }
}

/** Same contract as subscribeRateLimited, for the contact form's own window. */
export async function contactRateLimited(ip: string, email: string): Promise<boolean> {
  const emailKey = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  if (!contactIpLimiter || !contactEmailLimiter) {
    return memLimited(`c-ip:${ip}`, 3) || memLimited(`c-email:${emailKey}`, 2);
  }
  try {
    const [byIp, byEmail] = await Promise.all([
      contactIpLimiter.limit(ip),
      contactEmailLimiter.limit(emailKey),
    ]);
    return !byIp.success || !byEmail.success;
  } catch (err) {
    console.error("[rate-limit] store error — failing open", err);
    return false;
  }
}
