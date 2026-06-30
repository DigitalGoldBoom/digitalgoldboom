# TODO — digitalgoldboom.com (web)

Tracked open work for the live Next.js site. Highest-priority / money-impacting at top.

## ✅ RESOLVED

### 1. NewsletterForm + email-tool decision — DONE 2026-06-30
- **Email tool LOCKED = Kit** (start on free plan, upgrade to Creator ~$33/mo at launch). dgb-cmo
  resolved the Kit-vs-Beehiiv contradiction; INTEGRATIONS.md + GROWTH-STRATEGY now agree. Beehiiv OUT.
- **Affiliate tool LOCKED = LemonSqueezy native** affiliate program (already own it; 2% fee only).
- [`NewsletterForm.tsx`](src/components/NewsletterForm.tsx) rewired to real `/api/subscribe` POST +
  `track('newsletter_email_submit')` + honest error handling. (It was orphan code — not mounted —
  so no live signups were actually lost; every live form already captured correctly.)
- **Real remaining gap:** no Kit keys set yet → signups are accepted but only logged, not saved.
  Setting the free Kit keys (below) is the switch that turns capture on.

---

## 🚀 LAUNCH CHECKLIST — email & growth (do at/just-before book launch)

Parked here by Andrew 2026-06-30 ("we can do that later — for launch").

**Andrew-only setup (account/config — can't be done in code):**
- [ ] Create Kit account (FREE plan). Make a Form ("DGB Newsletter") + Tag `book-buyer`.
- [ ] Paste `KIT_API_KEY`, `KIT_FORM_ID`, `KIT_BUYER_TAG=book-buyer` into Vercel env → redeploy.
- [ ] Turn ON **double opt-in** in Kit form settings.
- [ ] In Kit, create custom fields **`social_handle`** and **`wallet_address`** (the /affiliates
      early-interest form sends these; Kit drops fields that don't exist).
- [ ] At launch (book live): upgrade Kit to **Creator** (~$33/mo yearly) to unlock the 2nd automated flow.
- [ ] LemonSqueezy: activate store + go live; add the webhook (`/api/lemonsqueezy/webhook`, event
      `order_created`, signing secret → `LEMONSQUEEZY_WEBHOOK_SECRET`). See LEMONSQUEEZY-SETUP.md.
- [ ] LemonSqueezy: turn on the **affiliate program**, set commission **50%**, grab the affiliate
      signup/portal URL → into the `/affiliates` page.
- [ ] 🚩 **COMPLIANCE GATE (Andrew):** confirm with LemonSqueezy that paying buyers in **NATG token**
      for sharing (the view-based refund tiers) does NOT break the "book = information/analysis, not
      a way to get tokens" approval condition. Do this BEFORE the token-reward tiers go public.

### Affiliate program design — DECIDED 2026-06-30 (3 earn-routes)
1. **Share → 2,000 views = 50% of purchase back, paid in NATG.**
2. **Share → 10,000 views = 100% back (full refund), paid in NATG.**
3. **Affiliate link = 50% commission** on each referred sale (LemonSqueezy native).
- Routes 1 & 2 = custom Web3 machine → **route to `dgb-web3-engineer`**: design wallet collection,
  view-verification (anti-fake), and NATG payout. Can't run until NATG is live (~Jul 8) + compliance gate clears.
- `/affiliates` page (building now): shows all 3, NATG tiers marked "launching with the token,"
  captures interested sharers (email + social handle + wallet-for-later, tag `affiliate-interest`).

**Build work (write/ship — via the skills):**
- [ ] Pick the lead-magnet hook for the welcome series (the "free thing" — $124T shift / BIV / mining-goes-digital / launch-updates).
- [ ] `copywriting` → newsletter welcome series (3–4 emails) — built inside Kit.
- [ ] `copywriting` → buyer thank-you series (2–3 emails), triggered by the `book-buyer` tag.
- [ ] `copywriting` → mining-industry feedback-invite emails.
- [ ] `dgb-conversion-analytics` → add per-IP **rate-limiting** (Vercel KV / Upstash) on `/api/subscribe`
      BEFORE the affiliate program drives strangers to the forms.
