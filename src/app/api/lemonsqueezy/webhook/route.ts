import { NextResponse } from "next/server";
import crypto from "node:crypto";

// LemonSqueezy webhook receiver. Verifies the X-Signature HMAC (per LS docs), then upserts the buyer
// into Kit (v4) and tags them as a buyer. LemonSqueezy itself delivers the book + receipt — this
// route is ONLY for our list segmentation, so it must never 500 LS on a downstream (Kit) hiccup: it
// logs and still returns 200. Node runtime required (node:crypto + raw body for the signature).
export const runtime = "nodejs";

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(signatureHeader, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

const KIT_BASE = "https://api.kit.com/v4";

// Buyer emails must never reach logs (PII rule — Vercel logs are public-adjacent).
// Kit error bodies can echo the address back; scrub before logging.
function redactEmails(text: string): string {
  return text.replace(/[^\s@"']+@[^\s@"']+\.[^\s@"']+/g, "[email]");
}

async function tagBuyer(email: string, name?: string) {
  const apiKey = process.env.KIT_API_KEY;
  const tagId = process.env.KIT_BUYER_TAG_ID; // v4 numeric tag id (optional)
  if (!apiKey) {
    console.log("[ls-webhook] buyer received (no Kit key set — skipped tagging)");
    return;
  }
  try {
    // v4 requires the subscriber to exist before tagging — upsert first.
    const subRes = await fetch(`${KIT_BASE}/subscribers`, {
      method: "POST",
      headers: { "content-type": "application/json", "X-Kit-Api-Key": apiKey },
      body: JSON.stringify({
        email_address: email,
        first_name: name?.split(" ")[0],
        fields: { source: "book-buyer" },
      }),
    });
    if (!subRes.ok) {
      console.error("[ls-webhook] Kit upsert failed", subRes.status, redactEmails(await subRes.text()));
      return;
    }
    if (tagId) {
      const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
        method: "POST",
        headers: { "content-type": "application/json", "X-Kit-Api-Key": apiKey },
        body: JSON.stringify({ email_address: email }),
      });
      if (!tagRes.ok) console.error("[ls-webhook] Kit tag failed", tagRes.status, redactEmails(await tagRes.text()));
    }
  } catch (err) {
    console.error("[ls-webhook] Kit error", err);
  }
}

export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const raw = await req.text();

  if (!secret) {
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
  if (name === "order_created") {
    const attrs = event.data?.attributes;
    if (attrs?.user_email) await tagBuyer(attrs.user_email, attrs.user_name);
  }

  return NextResponse.json({ ok: true });
}
