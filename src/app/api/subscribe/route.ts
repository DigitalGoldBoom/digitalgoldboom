import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  email: z.string().email(),
  source: z.string().max(40).optional(),
  // Extra fields used by the affiliate early-interest form. Optional + length-capped so they
  // can't be abused. Mapped to Kit custom fields below (must exist as custom fields in Kit).
  handle: z.string().max(80).optional(),
  wallet: z.string().max(120).optional(),
  // Used by the mining-industry early-reviewer form.
  name: z.string().max(80).optional(),
  company: z.string().max(120).optional(),
});

// Stopgap per-IP rate limit. In-memory ONLY — it resets on serverless cold starts and is not shared
// across instances, so it blunts casual spam but is NOT a real limit. TODO[pre-launch]: replace with
// a Vercel KV / Upstash sliding window before real traffic.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;
const rlHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rlHits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  hits.push(now);
  rlHits.set(ip, hits);
  return hits.length > RL_MAX;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "anon").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many tries. Please wait a moment." },
      { status: 429 },
    );
  }

  let parsed: z.infer<typeof Body>;
  try {
    const raw = await req.json();
    parsed = Body.parse(raw);
  } catch {
    return NextResponse.json(
      { message: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const kitApiKey = process.env.KIT_API_KEY;
  const kitFormId = process.env.KIT_FORM_ID;

  if (kitApiKey && kitFormId) {
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            api_key: kitApiKey,
            email: parsed.email,
            first_name: parsed.name,
            tags: parsed.source ? [parsed.source] : undefined,
            fields:
              parsed.handle || parsed.wallet || parsed.company
                ? { social_handle: parsed.handle, wallet_address: parsed.wallet, company: parsed.company }
                : undefined,
          }),
        },
      );
      if (!res.ok) {
        console.error("Kit subscribe failed", res.status, await res.text());
        return NextResponse.json(
          { message: "We had trouble adding you. Try again shortly." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Kit subscribe error", err);
      return NextResponse.json(
        { message: "We had trouble adding you. Try again shortly." },
        { status: 502 },
      );
    }
  } else {
    console.log(
      `[subscribe] waitlist submission (no Kit key yet): ${parsed.email} (${parsed.source ?? "unknown"})`,
    );
  }

  return NextResponse.json({ ok: true });
}
