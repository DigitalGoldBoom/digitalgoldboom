# INTEGRATIONS - digitalgoldboom.com

**Status:** Planning
**Owner:** Grove 📊 (tracking) / Ada 💻 (implementation)

---

## 1. Email / Newsletter

| Option | Pros | Cons | Cost | Decision |
|--------|------|------|------|----------|
| **ConvertKit** | Creator-focused, good automation, landing pages | Pricier at scale | Free to 1k, $29/mo after | |
| **Beehiiv** | Built for newsletters, referral program, analytics | Newer platform | Free to 2.5k, $49/mo after | |
| **Mailchimp** | Established, integrations everywhere | Clunky UX, expensive at scale | Free to 500, $13/mo after | |
| **Buttondown** | Simple, cheap, developer-friendly | Less features | $9/mo | |

**Needs:**
- [ ] Double opt-in
- [ ] Welcome sequence (automated)
- [ ] Segment by source (book vs newsletter)
- [ ] RSS-to-email for new articles
- [ ] API for custom signup forms

**Decision:** ✅ **Kit (ex-ConvertKit) as the STARTING tool** — LOCKED 2026-06-30 by dgb-cmo. Beehiiv OUT.

> **Strategy note (2026-06-30):** The email list is a long-term **PixelShovel audience asset**, not
> just book buyers — it will later be used to promote other projects and **raise money for a gold
> mine (Northshore / drilling program)**. That fundraising/crypto use is a WHILE OFF. Plan:
> **start on Kit free now** (least work — the site code already targets Kit; costs $0 to 10k subs),
> then **MIGRATE to the best fundraising-grade email tool when the gold-mine raise actually begins.**
> Migration is deliberately low-cost: contacts + tags **export freely** (no lock-in), so a later move
> = export/import (minutes) + rebuild flows (few exist yet) + ~1h code swap. KEEP DATA CLEAN +
> TAGGED BY SOURCE/INTEREST from day one so the eventual export is organized, not a blob.
> 🚩 At migration time, vet the new tool's Acceptable-Use rules for **crypto/investment/fundraising
> content** (Kit reviews such accounts case-by-case; Mailchimp has banned crypto senders). Not a
> today problem — flagged for the migration decision.
- Why Kit: the live code already talks to Kit (`/api/subscribe`, the LemonSqueezy webhook tags
  buyers into Kit); it's author-grade and sells direct. Free up to 10,000 subscribers.
- **Cost path (money-smart, DECIDED 2026-06-30):** START on Kit **FREE** ($0, up to 10,000 subs) —
  it captures emails and runs ONE simple welcome automation, which covers the newsletter welcome.
  **Upgrade to Creator (~US$33/mo yearly, ~US$39/mo monthly) ONLY at book launch**, when we add the
  SECOND automated flow (the buyer thank-you series). Book isn't on sale yet, so no spend yet — pay
  only when it earns. Source: kit.com/pricing (fetched 2026-06-30). NOTE: free-plan exact sequence
  allowance reported inconsistently across sources (0 vs 1 sequence) — confirm inside the account.
- Why NOT Beehiiv: its only real edge was a built-in referral/virality engine — now moot, because
  the affiliate program runs on **LemonSqueezy's native affiliate system** (see §8), so we don't
  need referral baked into the email tool.

---

## 2. Price Data APIs

| Data | Source | Cost | Rate Limit |
|------|--------|------|------------|
| Gold Spot (XAU/USD) | GoldAPI.io | Free tier: 100/mo, $10/mo for 10k | |
| Gold Spot (alt) | Metals.dev | Free tier available | |
| PAXG | CoinGecko | Free | 50/min |
| XAUT | CoinGecko | Free | 50/min |
| AISC Index (for BIV) | Manual / scraped | Free | N/A |

**Setup tasks:**
- [ ] Sign up for GoldAPI.io (or Metals.dev)
- [ ] Get CoinGecko API key (optional, increases limits)
- [ ] Create AISC data source (World Gold Council reports)
- [ ] Build price caching layer (don't hit APIs on every page load)

---

## 3. Analytics

| Tool | Purpose | Cost |
|------|---------|------|
| **Google Analytics 4** | Traffic, conversions | Free |
| **Plausible** | Privacy-friendly alternative | $9/mo |
| **Google Search Console** | SEO performance, indexing | Free |
| **Hotjar / Microsoft Clarity** | Heatmaps, recordings | Free tier |

**Setup tasks:**
- [ ] Create GA4 property
- [ ] Set up Search Console, verify domain
- [ ] Define conversion events (book download, newsletter signup)
- [ ] Add to site (via next/script or GTM)

---

## 4. CMS (Content Management)

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Sanity** | Flexible, real-time, great DX | Learning curve | Free to 100k docs |
| **Contentful** | Established, good UI | Expensive at scale | Free tier limited |
| **Strapi** | Self-hosted, full control | Need to host it | Free (hosting cost) |
| **MDX files** | Simple, no external dependency | Manual deploys for content | Free |

**Needs:**
- [ ] Article management (news)
- [ ] Author profiles
- [ ] Category/tag system
- [ ] Draft/publish workflow
- [ ] API for Next.js integration

**Decision:** ✅ Sanity (confirmed)

---

## 5. Book Download / Lead Capture

**Flow:**
1. User clicks "Download Free Book"
2. Modal or page collects email
3. Email sent to newsletter platform (tagged as "book")
4. Redirect to download or email delivery

**Options:**
- Direct PDF download (no gate) — simpler, less friction
- Email-gated download — builds list, trackable
- Gumroad / Lemon Squeezy — handles delivery, payments if needed later

**Setup tasks:**
- [ ] Create book download landing page
- [ ] Integrate with newsletter platform
- [ ] Set up welcome/delivery email
- [ ] Track downloads as conversion event

**Fletch decision needed:** Gated or ungated download?

---

## 6. Domain / DNS / Hosting

| Item | Status | Provider |
|------|--------|----------|
| Domain (digitalgoldboom.com) | ✅ Confirmed | ? |
| DNS | | |
| Hosting | | Vercel (recommended) |
| SSL | | Auto via Vercel |

**Setup tasks:**
- [ ] Point domain to Vercel
- [ ] Configure www redirect
- [ ] Set up preview deployments

---

## 7. Social / Share

- [ ] Open Graph images for each page type
- [ ] Twitter Card setup
- [ ] Share buttons on articles (optional)
- [ ] Social links in footer

---

## 8. Future Integrations (Post-MVP)

| Integration | Purpose | Priority |
|-------------|---------|----------|
| Stripe / Lemon Squeezy | Paid products | ✅ DONE — LemonSqueezy is the live checkout ($17 book) |
| Affiliate tracking | Book referrals | ✅ DECIDED — **LemonSqueezy native affiliate program** (LOCKED 2026-06-30 by dgb-cmo). Built into our existing checkout: set commission %, cookie window, auto/hand-approve affiliates, automatic tracking + payouts (PayPal/bank), only a 2% fee on referred sales — no new tool, no new subscription, no new code. Source: lemonsqueezy.com/marketing/affiliates (2026-06-30). The on-site `/affiliates` page is the human-facing recruit/explainer; the tracking engine is LS. |
| NatGold API | Live token data | When available |
| RSS feed output | Syndication | Phase 2 |
| Podcast player | If audio content | Later |

---

## Decisions Needed from Fletch

1. **Newsletter platform:** ConvertKit, Beehiiv, or other?
2. **CMS:** Sanity, Strapi, or MDX files?
3. **Book download:** Email-gated or direct download?
4. **Analytics:** GA4 only, or add Plausible?
5. **Domain registrar:** Where is it registered? (for DNS setup)

---

## Integration Timeline

| Phase | Integrations |
|-------|--------------|
| Phase 4 (Core Build) | Price APIs, basic analytics |
| Phase 5 (Book Page) | Email platform, download flow |
| Phase 6 (CMS) | Sanity/Strapi setup |
| Phase 9 (Pre-launch) | Full analytics, Search Console, final DNS |
