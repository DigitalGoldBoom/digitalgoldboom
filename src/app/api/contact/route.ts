import { NextResponse } from "next/server";
import { z } from "zod";
import { contactRateLimited } from "@/lib/rate-limit";
import { hasContactStore, saveContactMessage, notifyContactEmail } from "@/lib/contact";

const Body = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().email(),
  message: z.string().trim().min(5).max(4000),
  source: z.string().max(40).optional(),
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  company: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "anon").split(",")[0].trim();

  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json(
      { message: "Please add your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  // Bots fill every field they find. Answer 200 so the bot logs a success and moves on — a 400
  // teaches it which field gave it away, and it comes back with that one blank.
  if (parsed.company) return NextResponse.json({ ok: true });

  if (await contactRateLimited(ip, parsed.email)) {
    return NextResponse.json(
      { message: "Too many messages. Please wait a moment." },
      { status: 429 },
    );
  }

  // No store = the message would vanish. Say so rather than show a thank-you over a black hole.
  if (!hasContactStore) {
    console.error("[contact] no store configured (SUPABASE env missing) — message NOT saved");
    return NextResponse.json(
      { message: "The form is briefly unavailable. Please email fletcher@digitalgoldboom.com." },
      { status: 503 },
    );
  }

  try {
    const saved = await saveContactMessage(parsed);
    if (!saved) throw new Error("no store");
  } catch (err) {
    console.error("[contact] store error", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { message: "We couldn't send that. Please email fletcher@digitalgoldboom.com." },
      { status: 502 },
    );
  }

  // Stored — the message is safe. The email is a convenience on top and must never fail the send.
  await notifyContactEmail(parsed);

  return NextResponse.json({ ok: true });
}
