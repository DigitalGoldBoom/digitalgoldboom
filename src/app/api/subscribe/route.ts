import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeRateLimited } from "@/lib/rate-limit";
import { hasSubscriberStore, saveSubscriber, pushToKit } from "@/lib/subscribers";

// The 5-chapter lead magnet is NOT served from here, and is deliberately not hosted in /public.
// It is delivered solely by Kit's double opt-in confirmation email, so the only way to get the
// book is to prove the address is real. A copy sitting at a guessable public URL would hand the
// book to anyone and leave the list unbuilt — which is the entire point of the exchange.

const Body = z.object({
  email: z.string().email(),
  firstName: z.string().max(80).optional(),
  // Explicit permission-to-email flag (stored with a timestamp for ESP import later).
  consent: z.boolean().optional(),
  source: z.string().max(40).optional(),
  // Which offer they took: "free-chapters" (download) or "waitlist".
  tag: z.string().max(40).optional(),
  // Other forms' fields — preserved into the record's metadata so nothing is lost.
  name: z.string().max(80).optional(), // alias for firstName from older forms
  handle: z.string().max(80).optional(),
  wallet: z.string().max(120).optional(),
  company: z.string().max(120).optional(),
  // First-touch attribution (optional).
  utm: z.record(z.string(), z.string()).optional(),
});

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "anon").split(",")[0].trim();

  let parsed: z.infer<typeof Body>;
  try {
    const raw = await req.json();
    parsed = Body.parse(raw);
  } catch {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }

  // Durable sliding window (Upstash/KV), keyed on IP + email — see src/lib/rate-limit.ts.
  if (await subscribeRateLimited(ip, parsed.email)) {
    return NextResponse.json({ message: "Too many tries. Please wait a moment." }, { status: 429 });
  }

  // Owned list first: store into Andrew's OWN storage (Upstash), the source of truth no ESP can
  // shut off. If storage isn't configured we must NOT fake success — tell the visitor honestly.
  if (!hasSubscriberStore) {
    console.error(
      `[subscribe] no owned-list store configured (UPSTASH/KV env missing) — not stored (source: ${parsed.source ?? "unknown"})`,
    );
    return NextResponse.json(
      { message: "Sign-ups are briefly unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  try {
    // Fold any non-core fields from other forms into the record's metadata so they're never lost.
    const meta: Record<string, string> = { ...(parsed.utm ?? {}) };
    if (parsed.handle) meta.handle = parsed.handle;
    if (parsed.wallet) meta.wallet = parsed.wallet;
    if (parsed.company) meta.company = parsed.company;

    const stored = await saveSubscriber({
      email: parsed.email,
      firstName: parsed.firstName ?? parsed.name,
      consent: parsed.consent,
      source: parsed.source,
      tag: parsed.tag,
      utm: Object.keys(meta).length ? meta : undefined,
    });
    if (!stored) {
      return NextResponse.json(
        { message: "We had trouble adding you. Try again shortly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[subscribe] owned-list store error", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { message: "We had trouble adding you. Try again shortly." },
      { status: 502 },
    );
  }

  // Best-effort mirror to the sender (Kit) — it runs the welcome sequence and broadcasts. Never
  // fails the signup: the owned list in Supabase already has them and can re-sync Kit any time.
  await pushToKit(parsed.email, {
    firstName: parsed.firstName ?? parsed.name,
    source: parsed.source,
  });

  // Success. No download link comes back: the chapters arrive only via Kit's confirmation email.
  return NextResponse.json({ ok: true });
}
