import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Contact messages — SAVED first, EMAILED second.
 *
 * The database (Supabase, the same one holding the owned email list) is the record. Email is a
 * notification on top of it. That order matters: an email that fails to send is a message that
 * never existed, and a stranger who took the trouble to write in is exactly the person you cannot
 * afford to lose silently. So a failed save is a hard error the visitor is told about and can
 * retry; a failed send is logged and swallowed, because the message is already safe on disk.
 *
 * Required table (run once in the Supabase SQL editor):
 *
 *   create table public.contact_messages (
 *     id          bigint generated always as identity primary key,
 *     created_at  timestamptz not null default now(),
 *     name        text not null,
 *     email       text not null,
 *     message     text not null,
 *     source      text,
 *     handled     boolean not null default false
 *   );
 *   alter table public.contact_messages enable row level security;
 *
 * RLS on with no policies = nobody reads it but the service_role key this file uses (and you, in
 * the dashboard). Env:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  — same pair the subscriber store uses
 *   RESEND_API_KEY                           — optional; without it, messages save but don't email
 *   CONTACT_TO_EMAIL                         — where the notification lands (default below)
 *   CONTACT_FROM_EMAIL                       — a verified Resend sender on your domain
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

/** Whether durable storage is configured. If false the route must fail honestly, not fake success. */
export const hasContactStore = Boolean(url && serviceKey);

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

/** Persist the message. Throws on a genuine store error so the caller can tell the visitor to retry. */
export async function saveContactMessage(msg: ContactInput): Promise<boolean> {
  const db = client();
  if (!db) return false;
  const { error } = await db.from("contact_messages").insert({
    name: msg.name.trim(),
    email: msg.email.trim().toLowerCase(),
    message: msg.message.trim(),
    source: msg.source ?? null,
  });
  if (error) throw new Error(`supabase insert failed (${error.code ?? "?"})`);
  return true;
}

// Keep HTML the visitor typed from becoming HTML in the notification email.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Notify by email (Resend). Best-effort: the message is already stored, so a send failure is logged
 * and swallowed rather than shown to the visitor as a failure that wasn't one. Absent key → no-op.
 *
 * Reply-To is the visitor's address, so hitting reply in the inbox answers them directly.
 */
export async function notifyContactEmail(msg: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.CONTACT_TO_EMAIL ?? "fletcher@digitalgoldboom.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "PixelShovel <noreply@digitalgoldboom.com>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: msg.email,
        subject: `Contact form: ${msg.name.trim()}`,
        html:
          `<p><strong>From:</strong> ${esc(msg.name)} &lt;${esc(msg.email)}&gt;</p>` +
          `<p><strong>Page:</strong> ${esc(msg.source ?? "unknown")}</p>` +
          `<hr><p style="white-space:pre-wrap">${esc(msg.message)}</p>`,
      }),
    });
    if (!res.ok) {
      // Never log the body verbatim — Resend echoes the address back and Vercel logs are not private.
      console.error("[contact] Resend send failed", res.status);
    }
  } catch (err) {
    console.error("[contact] Resend error", err instanceof Error ? err.message : err);
  }
}
