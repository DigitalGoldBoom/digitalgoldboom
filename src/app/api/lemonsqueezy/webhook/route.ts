import { NextResponse } from "next/server";
import crypto from "node:crypto";

// LemonSqueezy webhook receiver. Verifies the X-Signature HMAC (per LS docs) so we only act on
// real events, then tags the buyer into the ConvertKit list. LemonSqueezy itself delivers the
// book file + receipt to the customer — this route is ONLY for our own list segmentation, so it
// must never 500 LS on a downstream (Kit) hiccup; it logs and still returns 200.
//
// Node runtime required (uses node:crypto + the RAW request body for signature verification).
export const runtime = "nodejs";

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(signatureHeader, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

async function tagBuyer(email: string, name?: string) {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  const tag = process.env.KIT_BUYER_TAG || "book-buyer";
  if (!apiKey || !formId) {
    console.log(`[ls-webhook] buyer ${email} (no Kit keys set — skipped tagging)`);
    return;
  }
  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: name?.split(" ")[0],
        tags: [tag],
      }),
    });
    if (!res.ok) console.error("[ls-webhook] Kit tag failed", res.status, await res.text());
  } catch (err) {
    console.error("[ls-webhook] Kit tag error", err);
  }
}

export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const raw = await req.text();

  if (!secret) {
    // Misconfiguration — accept so LS doesn't retry-storm, but make it loud in logs.
    console.error("[ls-webhook] LEMONSQUEEZY_WEBHOOK_SECRET not set — cannot verify; ignoring event.");
    return NextResponse.json({ ok: true });
  }

  if (!verifySignature(raw, req.headers.get("x-signature"), secret)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  let event: {
    meta?: { event_name?: string };
    data?: { attributes?: { user_email?: string; user_name?: string } };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ message: "Bad payload." }, { status: 400 });
  }

  const name = event.meta?.event_name;
  // Fire on the first money-confirming event for a one-off purchase.
  if (name === "order_created") {
    const attrs = event.data?.attributes;
    if (attrs?.user_email) await tagBuyer(attrs.user_email, attrs.user_name);
  }

  return NextResponse.json({ ok: true });
}
