import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeRateLimited } from "@/lib/rate-limit";
import { hasSubscriberStore, saveSubscriber, pushToBeehiiv } from "@/lib/subscribers";

// The lead magnet delivered instantly on a successful signup — the first 5 chapters, free.
const LEAD_MAGNET_PATH = "/downloads/digital-gold-boom-first-5-chapters.pdf";

const Body = z.object({
  email: z.string().email(),
  source: z.string().max(40).optional(),
  // Affiliate early-interest form fields.
  handle: z.string().max(80).optional(),
  wallet: z.string().max(120).optional(),
  // Mining-industry early-reviewer form fields.
  name: z.string().max(80).optional(),
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
    const stored = await saveSubscriber({
      email: parsed.email,
      source: parsed.source,
      name: parsed.name,
      handle: parsed.handle,
      wallet: parsed.wallet,
      company: parsed.company,
      utm: parsed.utm,
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

  // Best-effort mirror to the sender (Beehiiv) if it's been connected. Never blocks or fails the
  // signup — the owned list already has them.
  await pushToBeehiiv(parsed.email, parsed.source);

  // Success: hand back the instant lead-magnet download so the client can reveal it.
  return NextResponse.json({ ok: true, download: LEAD_MAGNET_PATH });
}
