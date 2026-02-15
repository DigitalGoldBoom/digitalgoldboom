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

**Decision:** ✅ Beehiiv (confirmed)

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
| Stripe / Lemon Squeezy | Paid products | Later |
| Affiliate tracking | Book referrals | Later |
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
