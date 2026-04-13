import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  email: z.string().email(),
  source: z.string().max(40).optional(),
});

export async function POST(req: Request) {
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
            tags: parsed.source ? [parsed.source] : undefined,
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
