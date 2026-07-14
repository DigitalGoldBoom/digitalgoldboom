import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Owned email list — captured into ANDREW'S OWN database (Supabase Postgres), not a third-party ESP.
 *
 * Why Supabase, not just an ESP: a list that lives only inside a sending SaaS is only as portable as
 * that SaaS allows. So the list of record lives in a plain database Andrew owns — browsable as a
 * table + one-click CSV export in the Supabase dashboard, and importable into ANY sending tool. The
 * store is the source of truth; the SENDER (Kit — see pushToKit below) plugs in on top and stays
 * swappable.
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

const KIT_BASE = "https://api.kit.com/v4";

// Subscriber emails must never reach logs (Vercel logs are public-adjacent). Kit echoes the address
// back in its error bodies — scrub before logging. Same rule as the LemonSqueezy webhook.
function redactEmails(text: string): string {
  return text.replace(/[^\s@"']+@[^\s@"']+\.[^\s@"']+/g, "[email]");
}

/**
 * Mirror a new signup into Kit, the SENDER (sequences, automations, broadcasts).
 *
 * Best-effort by design: the owned list (Supabase, above) already has them, so a Kit outage must
 * never fail a signup — Kit can be reconciled from the database later. Absent env → no-op.
 *
 *   KIT_API_KEY      — Kit v4 API key (Kit → Settings → Developer)
 *   KIT_FORM_ID      — numeric id of the Kit form to subscribe them to. This is what FIRES the
 *                      welcome sequence; without it they land in Kit but no automation runs.
 *   KIT_PS_FORM_ID   — the PixelShovel form (see `formId` below).
 *   KIT_FREE_TAG_ID  — optional numeric tag id for free-chapter leads (segments them from buyers,
 *                      who are tagged by KIT_BUYER_TAG_ID in the LemonSqueezy webhook).
 *
 * `opts.formId` lets the caller pick WHICH Kit form fires — one form per domain (digitalgoldboom.com
 * vs pixelshovel.com) so Kit reports where each lead came from, while both forms send from the same
 * address (that is a Kit-side setting, not a code one). Falls back to KIT_FORM_ID.
 */
export async function pushToKit(
  email: string,
  opts: { firstName?: string; source?: string; formId?: string } = {},
): Promise<void> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return;
  const headers = { "content-type": "application/json", "X-Kit-Api-Key": apiKey };

  try {
    // v4: upsert the subscriber first — form/tag calls require them to exist.
    //
    // state MUST be "inactive". Kit only sends a form's incentive email (the one carrying the
    // free-chapters download) when an UNCONFIRMED subscriber is added to a double opt-in form —
    // "Adding subscribers to double opt-in forms will trigger sending an Incentive Email."
    // Creating them with Kit's default state marks them already-confirmed, so Kit sees nothing to
    // confirm and the download email never goes out. That silently broke the whole lead magnet.
    // The form add below is what flips them to active, once they click the button in that email.
    const res = await fetch(`${KIT_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        first_name: opts.firstName?.trim() || undefined,
        state: "inactive",
        fields: { source: opts.source ?? "digitalgoldboom" },
      }),
    });
    if (!res.ok) {
      console.error("[subscribe] Kit upsert failed", res.status, redactEmails(await res.text()));
      return;
    }

    const formId = opts.formId ?? process.env.KIT_FORM_ID;
    if (formId) {
      const formRes = await fetch(`${KIT_BASE}/forms/${formId}/subscribers`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email_address: email }),
      });
      if (!formRes.ok) {
        console.error("[subscribe] Kit form add failed", formRes.status, redactEmails(await formRes.text()));
      }
    }

    const tagId = process.env.KIT_FREE_TAG_ID;
    if (tagId) {
      const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email_address: email }),
      });
      if (!tagRes.ok) {
        console.error("[subscribe] Kit tag failed", tagRes.status, redactEmails(await tagRes.text()));
      }
    }
  } catch (err) {
    // swallow — the owned list already has them; Kit can be reconciled from Supabase at any time
    console.error("[subscribe] Kit error", err instanceof Error ? err.message : err);
  }
}
