import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Owned email list — captured into ANDREW'S OWN database (Supabase Postgres), not a third-party ESP.
 *
 * Why Supabase, not an ESP: Kit/ConvertKit CLOSED his account over digital-asset content. A list
 * that lives inside a sending SaaS can be shut off with it. So the list of record lives in a plain
 * database Andrew owns — browsable as a table + one-click CSV export in the Supabase dashboard, and
 * importable into ANY sending tool later (Beehiiv / Amazon SES / etc.). The store is the source of
 * truth; the sender is swappable and plugs in on top.
 *
 * Server-only: uses the SERVICE_ROLE key, which bypasses Row-Level Security. Never import this into
 * client code and never expose the service key to the browser.
 *   SUPABASE_URL                 — the project URL (https://xxxx.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY    — the secret service_role key (writes bypass RLS)
 */

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _client: SupabaseClient | null = null;
function client(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!_client) {
    _client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

/** Whether durable owned-list storage is configured. If false, the caller must fail honestly. */
export const hasSubscriberStore = Boolean(url && serviceKey);

export type SubscriberInput = {
  email: string;
  firstName?: string;
  consent?: boolean;
  source?: string;
  utm?: Record<string, string>;
  tag?: string;
};

/**
 * Store a subscriber in the owned list. Idempotent on email: a duplicate is treated as success
 * (they're already on the list), so re-signups never surface an error. Returns true when the record
 * is safely persisted; throws on a genuine store error so the caller returns a retry (never a silent
 * loss). Returns false only when no store is configured.
 */
export async function saveSubscriber(sub: SubscriberInput): Promise<boolean> {
  const db = client();
  if (!db) return false;
  const email = sub.email.trim().toLowerCase();
  const consent = sub.consent === true;
  const { error } = await db.from("subscribers").insert({
    email,
    first_name: sub.firstName?.trim() || null,
    consent,
    consent_at: consent ? new Date().toISOString() : null,
    source: sub.source ?? null,
    utm: sub.utm && Object.keys(sub.utm).length ? sub.utm : null,
    tag: sub.tag ?? "free-chapters",
  });
  if (error) {
    // 23505 = unique_violation: this email is already on the list. That's a success, not an error.
    if (error.code === "23505") return true;
    throw new Error(`supabase insert failed (${error.code ?? "?"})`);
  }
  return true;
}

/**
 * Best-effort mirror to Beehiiv (a possible future sender) IF configured. Never throws to the caller
 * and never blocks the owned-list save — the database already has them. Absent env → no-op.
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
    // swallow — the owned list already has them; the sender can be reconciled later
  }
}
