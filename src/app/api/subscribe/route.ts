import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  email: z.string().email(),
  source: z.string().max(40).optional(),
  // Affiliate early-interest form fields.
  handle: z.string().max(80).optional(),
  wallet: z.string().max(120).optional(),
  // Mining-industry early-reviewer form fields.
  name: z.string().max(80).optional(),
  company: z.string().max(120).optional(),
});

// Stopgap per-IP rate limit. In-memory ONLY — resets on cold starts, not shared across instances;
// blunts casual spam but is NOT a real limit. TODO[pre-launch]: replace with Vercel KV / Upstash.
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

// Kit (ex-ConvertKit) v4 API. Auth via X-Kit-Api-Key header (NOT Bearer). Upserting a subscriber is
// enough to capture them; adding to a form is optional. v4 custom fields (source/social_handle/
// wallet_address/company) must exist in the Kit account or they are ignored.
const KIT_BASE = "https://api.kit.com/v4";

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

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID; // optional in v4

  if (apiKey) {
    try {
      const fields: Record<string, string> = {};
      if (parsed.source) fields.source = parsed.source;
      if (parsed.handle) fields.social_handle = parsed.handle;
      if (parsed.wallet) fields.wallet_address = parsed.wallet;
      if (parsed.company) fields.company = parsed.company;

      // 1) Upsert the subscriber — this alone captures them onto the account.
      const subRes = await fetch(`${KIT_BASE}/subscribers`, {
        method: "POST",
        headers: { "content-type": "application/json", "X-Kit-Api-Key": apiKey },
        body: JSON.stringify({
          email_address: parsed.email,
          first_name: parsed.name,
          ...(Object.keys(fields).length ? { fields } : {}),
        }),
      });
      if (!subRes.ok) {
        console.error("Kit v4 subscribe failed", subRes.status, await subRes.text());
        return NextResponse.json(
          { message: "We had trouble adding you. Try again shortly." },
          { status: 502 },
        );
      }

      // 2) Optionally add to a form (only if KIT_FORM_ID set). Best-effort — don't fail the user.
      if (formId) {
        const formRes = await fetch(`${KIT_BASE}/forms/${formId}/subscribers`, {
          method: "POST",
          headers: { "content-type": "application/json", "X-Kit-Api-Key": apiKey },
          body: JSON.stringify({ email_address: parsed.email }),
        });
        if (!formRes.ok) {
          console.error("Kit v4 add-to-form failed", formRes.status, await formRes.text());
        }
      }
    } catch (err) {
      console.error("Kit v4 subscribe error", err);
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
