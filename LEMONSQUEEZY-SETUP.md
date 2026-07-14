# Selling the book with LemonSqueezy — setup steps

This is the plain-English checklist to turn the Buy buttons on. The website code is already built
and **ready to connect** — it just needs the LemonSqueezy account set up and two values pasted into
Vercel. Nothing on the site charges anyone until you do this.

> **The one rule that keeps you approved:** the book is allowed because it is *information and
> analysis about the tokenization industry* — **not** the selling of tokens or digital assets.
> LemonSqueezy told us this in writing. Keep every payment page framed that way (the `/buy` and
> `/book` pages already are). Don't add "buy the token / invest" language to them.

---

## What's already built (you don't need to touch the code)

| Piece | Where | What it does |
|---|---|---|
| Buy button | `src/components/BuyButton.tsx` | Opens LemonSqueezy's secure checkout overlay. Disabled until the checkout URL is set. |
| Conversion page | `/book` | The full sales page ($37 early-reader launch price, 3D book, what you'll learn, FAQ). |
| Plain page | `/buy` | The clean, minimal product page — **this is the one to show LemonSqueezy for review.** |
| Thank-you page | `/thank-you` | Where buyers land after paying. |
| Purchase webhook | `src/app/api/lemonsqueezy/webhook/route.ts` | Tags each buyer into your email list automatically. |
| Settings reference | `.env.example` | Lists every value you need. |

---

## Step 1 — Create the store

1. Sign up at **lemonsqueezy.com** and create a **store**.
2. You'll start in **test mode** — that's fine, build everything here first.

## Step 2 — Create the product

1. Products → **New product**.
2. Name: **Digital Gold Boom**. Type: **Digital / single payment**.
3. Pricing model: **list price $97**, sold now at the **$37 early-reader launch price** (one-time). Set the product's regular price to **$97** and the current charge to **$37** — the real discount lives in LemonSqueezy (list $97 → launch $37), so the struck-through $97 shown on the sales pages is genuine. The $37 is offered in exchange for an honest review.
4. Upload the book files so LemonSqueezy delivers them: **PDF, EPUB, and Kindle (MOBI)**.
   - Use the finished export **with Chapter 17 removed** (the version you're sending as final).
5. Description: keep it as *information and analysis about the tokenization industry* (not "buy a token").

## Step 3 — Point buyers to the thank-you page

1. In the product's settings, find the **after-purchase / confirmation redirect** option.
2. Set the redirect URL to: `https://digitalgoldboom.com/thank-you`
3. (LemonSqueezy also emails the download link + receipt automatically — the thank-you page just
   reassures them while that email arrives.)

## Step 4 — Get the checkout link and switch the buttons on

1. On the product, copy its **checkout / share URL** (looks like
   `https://your-store.lemonsqueezy.com/buy/xxxxxxxx`).
2. In **Vercel → the website project → Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_LS_CHECKOUT_URL` = that checkout URL
3. Redeploy. The Buy buttons on `/book` and `/buy` now open the real checkout.

## Step 5 — Turn on automatic buyer-tagging (optional but recommended)

So every buyer is added to your email list, tagged as a buyer:

1. LemonSqueezy → **Settings → Webhooks → New webhook**.
2. Callback URL: `https://digitalgoldboom.com/api/lemonsqueezy/webhook`
3. Signing secret: make up a random string (6–40 chars) and copy it.
4. Events: tick **order_created**.
5. In **Vercel** add these environment variables:
   - `LEMONSQUEEZY_WEBHOOK_SECRET` = the signing secret from step 3
   - `KIT_API_KEY` and `KIT_FORM_ID` = your existing ConvertKit values (already used by the newsletter)
   - `KIT_BUYER_TAG` = `book-buyer` (or any tag name you like)
6. Redeploy.

## Step 6 — Activate the store (go live)

1. In LemonSqueezy click **Activate your store**.
2. Fill in the short business questionnaire **honestly** and verify your identity (KYC/KYB).
   Approval usually takes **2–3 business days**.
3. **What they review:** your store + the linked website. Point them at the clean **`/buy`** page.
   When Monalisa (LS support) asked, she requested **a sample/preview of the ebook + your pricing
   model** — have those ready (see the project's "approval pack").
4. Once approved, flip the store to **live mode** and copy your test product to live
   ("Copy to Live Mode"). Re-copy the live checkout URL into `NEXT_PUBLIC_LS_CHECKOUT_URL` if it
   changed.

---

## Test before you trust it

- In **test mode**, LemonSqueezy gives you test card numbers — do a full test purchase and confirm:
  1. the overlay opens from the Buy button,
  2. you land on `/thank-you`,
  3. the download email arrives,
  4. (if webhook on) the buyer shows up tagged in ConvertKit.
- Only then switch to live.

## Reminder for the site

The homepage still shows other prices (e.g. "$39 after", a "$39 / $99 / $199-yr" value stack).
Decide what those refer to (newsletter vs book) so the site isn't contradictory with the book's
**$37 early-reader launch price** (rising to the regular **$97**). That's a content decision,
flagged separately.
