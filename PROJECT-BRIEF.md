# PROJECT-BRIEF: digitalgoldboom.com

**Created:** 2026-02-14  
**Strategist:** Drucker 📋  
**Status:** In Progress  
**Division:** 3 — Digital Gold Boom

---

## 1. Objective

**What We're Building:**  
A news publication and live price hub for digital gold content that drives traffic to book downloads and newsletter signups. Think oilprice.com meets Web3 aesthetics.

**Primary Goal:**  
Convert website visitors into newsletter subscribers and book downloaders, establishing Digital Gold Boom as the authority on tokenized gold.

**Success Looks Like:**
- 500k monthly visitors by May 31, 2026 (launch)
- 50k newsletter subscribers
- 200k book downloads from site
- Domain Authority 40+
- 500+ indexed pages

---

## 2. Current State Assessment

### ✅ Complete
| Item | Status | Notes |
|------|--------|-------|
| Domain | ✅ Confirmed | digitalgoldboom.com |
| Next.js scaffold | ✅ Built | Standard Next.js + Tailwind setup |
| SEO Requirements | ✅ Complete | `SEO-REQUIREMENTS.md` — Gatsby's work |
| Basic pages | ✅ Scaffolded | Home, Book, Prices, News, Newsletter |
| Components | ✅ Started | Header, Footer, Hero, PriceWidget, etc. |

### ⚠️ Missing / Incomplete
| Item | Status | Blocking |
|------|--------|----------|
| Design System | ❌ None | All component work |
| Color palette / typography | ❌ None | Visual consistency |
| Content strategy | ❌ None | Page content |
| API integrations | ❌ None | Price widgets |
| CMS setup | ❌ None | News publishing |
| Newsletter integration | ❌ None | Signups |
| Book download funnel | ❌ None | Conversions |

---

## 3. Constraints

| Constraint | Detail |
|------------|--------|
| **Deadline** | May 31, 2026 (launch) |
| **Token Budget** | ~2.5M tokens total (see Section 7) |
| **Dependencies** | Book content (from Division 1), NatGold API (TBD) |
| **Technical** | Must hit Core Web Vitals (LCP <2.5s, INP <200ms, CLS <0.1) |
| **Brand** | Web3 aesthetic, dark mode primary, clean typography |
| **Conversion Focus** | Every page drives to book download or newsletter |

---

## 4. Phases & Sequencing

**CRITICAL:** Phases are strictly sequential where noted. Do not skip ahead.

---

### Phase 0: Foundation (COMPLETE)
- **Objective:** Establish technical baseline
- **Owner:** Ada 💻
- **Status:** ✅ Done
- **Deliverables:**
  - [x] Next.js project scaffolded
  - [x] Tailwind configured
  - [x] Basic page routes created
  - [x] Git repository initialized

---

### Phase 1: SEO Blueprint (COMPLETE)
- **Objective:** Define all SEO requirements before build
- **Owner:** Gatsby 🔍
- **Status:** ✅ Done
- **Depends on:** Phase 0
- **Deliverables:**
  - [x] `SEO-REQUIREMENTS.md` complete
  - [x] Keyword strategy per page
  - [x] Schema markup specs
  - [x] Technical SEO checklist
  - [x] URL structure defined

---

### Phase 2: Design System
- **Objective:** Create unified visual language before component build
- **Owner:** Dieter 🎨
- **Status:** 🔲 Not Started
- **Depends on:** Phase 1 (SEO informs content hierarchy)
- **Token Budget:** 150K
- **Deliverables:**
  - [ ] `DESIGN-SYSTEM.md` with:
    - Color palette (dark mode primary, light mode optional)
    - Typography scale (font families, sizes, weights)
    - Spacing system (8px grid recommended)
    - Component specs (buttons, cards, forms, nav)
    - Icon set selection
  - [ ] Figma-equivalent specs (text descriptions for Ada)
  - [ ] Mobile-first breakpoint definitions
  - [ ] Accessibility requirements (WCAG AA)

**Done When:**
- Ada can build any component without design questions
- Visual consistency rules are unambiguous
- Dark mode palette fully specified

---

### Phase 3: Content Strategy
- **Objective:** Define content structure before pages are built
- **Owner:** Hemingway ✍️
- **Status:** 🔲 Not Started
- **Depends on:** Phase 1 (keywords inform content)
- **Token Budget:** 200K
- **Deliverables:**
  - [ ] `CONTENT-STRATEGY.md` with:
    - Content pillars (5 defined in Division spec)
    - Article template/structure
    - Tone of voice guidelines
    - CTA placement rules
  - [ ] Cornerstone article outlines (10 articles)
  - [ ] Homepage copy (hero, value props, CTAs)
  - [ ] Book landing page copy
  - [ ] Newsletter signup copy
  - [ ] About page copy

**Done When:**
- Ada has actual text to put in pages
- CTA copy is finalized
- Hemingway has article templates to follow

---

### Phase 4: Component Build
- **Objective:** Build reusable components following design system
- **Owner:** Ada 💻
- **Status:** 🔲 Partially Started (basic components exist)
- **Depends on:** Phase 2 (design system) + Phase 3 (content)
- **Token Budget:** 400K
- **Deliverables:**
  - [ ] Finalize components to design system:
    - Header (sticky, with book CTA)
    - Footer (newsletter signup)
    - Hero (homepage)
    - PriceWidget (gold, PAXG, XAUT, BIV)
    - BIV Calculator
    - ArticleCard
    - NewsletterForm
    - BookCTA (sidebar + inline)
    - Price table/dashboard
  - [ ] Responsive implementations (mobile-first)
  - [ ] Dark mode theming
  - [ ] Loading states for widgets

**Done When:**
- All components pass design review (Dieter)
- All components include proper SEO elements (Gatsby approval)
- Mobile/desktop responsive complete

---

### Phase 5: API Integrations
- **Objective:** Connect live data sources
- **Owner:** Ada 💻
- **Status:** 🔲 Not Started
- **Depends on:** Phase 4 (widgets exist to consume data)
- **Token Budget:** 200K
- **Deliverables:**
  - [ ] Gold price API (TradingView/GoldAPI)
  - [ ] PAXG/XAUT prices (CoinGecko)
  - [ ] BIV calculation logic (Gold - AISC)
  - [ ] TradingView chart embeds
  - [ ] RSS feed parser (news aggregation)
  - [ ] Error handling/fallbacks

**Done When:**
- Price widgets show live data
- Fallback UI for API failures
- <500ms API response time

---

### Phase 6: CMS & Newsletter Setup
- **Objective:** Enable content publishing and email capture
- **Owner:** Ada 💻
- **Status:** 🔲 Not Started
- **Depends on:** Phase 4
- **Token Budget:** 150K
- **Deliverables:**
  - [ ] Headless CMS setup (Sanity/Strapi/Ghost — TBD)
  - [ ] Newsletter integration (ConvertKit/Beehiiv — TBD)
  - [ ] Article publishing workflow
  - [ ] Newsletter signup forms connected
  - [ ] Book download funnel (email gate optional)

**Done When:**
- Can publish article without code deploy
- Newsletter signups captured and verified
- Book download tracking in place

---

### Phase 7: Page Assembly
- **Objective:** Build final pages with components and content
- **Owner:** Ada 💻
- **Status:** 🔲 Not Started
- **Depends on:** Phases 3, 4, 5, 6 (all must be complete)
- **Token Budget:** 300K
- **Deliverables:**
  - [ ] Homepage (hero + prices + featured articles + book CTA)
  - [ ] /prices (full dashboard)
  - [ ] /book (landing page with download)
  - [ ] /news (article index)
  - [ ] /news/[slug] (article template)
  - [ ] /newsletter (signup page)
  - [ ] /about
  - [ ] 404 page

**Done When:**
- All pages match design system
- All SEO requirements implemented
- All CTAs functional
- Internal linking complete

---

### Phase 8: Content Production
- **Objective:** Write and publish cornerstone content
- **Owner:** Hemingway ✍️ → Orwell 🔍 (humanizer pass)
- **Status:** 🔲 Not Started
- **Depends on:** Phase 7 (pages ready to receive content)
- **Token Budget:** 600K
- **Deliverables:**
  - [ ] 10 cornerstone articles (per content pillars)
  - [ ] 40 supporting articles (initial content base)
  - [ ] All articles SEO-optimized (Gatsby review)
  - [ ] All articles humanized (Orwell pass)

**Done When:**
- 50 articles published
- Each article has proper schema markup
- Internal linking network established

---

### Phase 9: QA & Launch Prep
- **Objective:** Final checks before go-live
- **Owner:** Gatsby 🔍 (SEO QA) + Ada 💻 (technical QA)
- **Status:** 🔲 Not Started
- **Depends on:** Phase 8
- **Token Budget:** 100K
- **Deliverables:**
  - [ ] SEO audit (all items from SEO-REQUIREMENTS.md checklist)
  - [ ] Core Web Vitals pass
  - [ ] Mobile-friendly test pass
  - [ ] Schema validation
  - [ ] Broken link check
  - [ ] Cross-browser testing
  - [ ] Load testing
  - [ ] Analytics installed (GA4 + Plausible)
  - [ ] Google Search Console verified
  - [ ] sitemap.xml submitted

**Done When:**
- All pre-launch checklist items pass
- PageSpeed score 90+
- Zero critical issues

---

### Phase 10: Launch & Monitor
- **Objective:** Go live and establish baseline metrics
- **Owner:** Ada 💻 (deployment) + Gatsby 🔍 (monitoring)
- **Status:** 🔲 Not Started
- **Depends on:** Phase 9
- **Token Budget:** 50K
- **Deliverables:**
  - [ ] Production deployment (Vercel/Cloudflare)
  - [ ] DNS configured
  - [ ] SSL verified
  - [ ] Initial indexing monitored
  - [ ] First 48h stability check

**Done When:**
- Site live at digitalgoldboom.com
- First search impressions appearing
- No critical errors in monitoring

---

## 5. Agent Assignments

| Agent | Role | Phases | Model | Notes |
|-------|------|--------|-------|-------|
| Gatsby 🔍 | SEO Lead | 1✅, 8 (review), 9, 10 | Sonnet | Keywords, technical SEO, content review |
| Dieter 🎨 | UX/Design | 2 | Sonnet | Design system, component specs |
| Ada 💻 | Web Dev | 0✅, 4, 5, 6, 7, 9, 10 | Sonnet | All implementation |
| Hemingway ✍️ | Content | 3, 8 | Opus | Strategy + writing |
| Orwell 🔍 | Humanizer | 8 | Sonnet | Final pass on all content |

### Handoff Protocol
Each phase owner creates a completion summary:
```
## Phase X Complete

**Delivered:**
- [List of deliverables]

**For Next Phase:**
- [Specific inputs for next agent]

**Open Questions:**
- [Any decisions needed]
```

---

## 6. Success Metrics

| Metric | 30-Day | 90-Day | Launch (May 31) | How Measured |
|--------|--------|--------|-----------------|--------------|
| Monthly Visitors | 10K | 100K | 500K | GA4 / Plausible |
| Newsletter Subs | 1K | 10K | 50K | Email platform |
| Book Downloads | 5K | 50K | 200K | Download tracking |
| Domain Authority | 10 | 25 | 40+ | Ahrefs / Moz |
| Indexed Pages | 50 | 200 | 500+ | Search Console |
| Avg. Session Duration | 2min+ | 3min+ | 4min+ | GA4 |
| Pages/Session | 2+ | 3+ | 4+ | GA4 |
| Newsletter Conversion Rate | 2% | 3% | 5% | Signups/Visitors |

---

## 7. Token Budget

| Phase | Est. Tokens | Model | Est. Cost |
|-------|-------------|-------|-----------|
| 0. Foundation | ✅ Complete | — | — |
| 1. SEO Blueprint | ✅ Complete | — | — |
| 2. Design System | 150K | Sonnet | ~$0.45 |
| 3. Content Strategy | 200K | Opus | ~$3.00 |
| 4. Component Build | 400K | Sonnet | ~$1.20 |
| 5. API Integrations | 200K | Sonnet | ~$0.60 |
| 6. CMS & Newsletter | 150K | Sonnet | ~$0.45 |
| 7. Page Assembly | 300K | Sonnet | ~$0.90 |
| 8. Content Production | 600K | Opus (Hemingway) + Sonnet (Orwell) | ~$7.00 |
| 9. QA & Launch Prep | 100K | Sonnet | ~$0.30 |
| 10. Launch & Monitor | 50K | Sonnet | ~$0.15 |
| **Total Remaining** | **2.15M** | — | **~$14.05** |

*Costs estimated at Sonnet $0.003/1K, Opus $0.015/1K (blended input/output)*

---

## 8. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| API rate limits hit | Prices don't update | Medium | Implement caching, fallback UI |
| NatGold API not ready | BIV widget incomplete | High | Build with mock data, add later |
| Content bottleneck | Launch delay | Medium | Batch article production, template-driven |
| Core Web Vitals fail | SEO penalty | Low | Performance budget from start, lazy load |
| CMS complexity | Integration delays | Medium | Start simple (MDX files if needed) |
| Scope creep | Timeline slip | High | Strict phase gates, MVP focus |
| Design/Dev misalignment | Rework cycles | Medium | Design system approval before build |

---

## 9. Dependencies Map

```
                    ┌─────────────────┐
                    │  Phase 0: Base  │ ✅
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Phase 1: SEO    │ ✅
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
  ┌────────▼────────┐ ┌──────▼───────┐        │
  │ Phase 2: Design │ │ Phase 3:     │        │
  │ (Dieter)        │ │ Content      │        │
  └────────┬────────┘ │ (Hemingway)  │        │
           │          └──────┬───────┘        │
           │                 │                 │
           └────────┬────────┘                 │
                    │                          │
           ┌────────▼────────┐                 │
           │ Phase 4:        │                 │
           │ Components      │                 │
           │ (Ada)           │                 │
           └────────┬────────┘                 │
                    │                          │
     ┌──────────────┼──────────────┐           │
     │              │              │           │
┌────▼─────┐  ┌─────▼─────┐       │           │
│ Phase 5: │  │ Phase 6:  │       │           │
│ APIs     │  │ CMS/News  │       │           │
│ (Ada)    │  │ (Ada)     │       │           │
└────┬─────┘  └─────┬─────┘       │           │
     │              │              │           │
     └──────────────┼──────────────┘           │
                    │                          │
           ┌────────▼────────┐                 │
           │ Phase 7: Pages  │◄────────────────┘
           │ (Ada)           │  (needs content from P3)
           └────────┬────────┘
                    │
           ┌────────▼────────┐
           │ Phase 8:        │
           │ Content Prod    │
           │ (Hemingway →    │
           │  Orwell)        │
           └────────┬────────┘
                    │
           ┌────────▼────────┐
           │ Phase 9: QA     │
           │ (Gatsby + Ada)  │
           └────────┬────────┘
                    │
           ┌────────▼────────┐
           │ Phase 10: Launch│
           └─────────────────┘
```

**Key Insight:** Phases 2 and 3 can run in PARALLEL. Everything else is sequential.

---

## 10. Open Decisions

| Decision | Options | Owner | Deadline |
|----------|---------|-------|----------|
| CMS choice | Sanity / Strapi / Ghost / MDX | Ada + Main | Before Phase 6 |
| Newsletter platform | ConvertKit / Beehiiv / Mailchimp | Main | Before Phase 6 |
| Book download flow | Direct / Email gate / Both | Main | Before Phase 6 |
| NatGold API availability | Ready / Mock data | External | Ongoing |
| Light mode support | Now / Later / Never | Dieter | Phase 2 |

---

## 11. Sign-off Checklist

- [x] Objectives clear
- [x] Current state assessed
- [x] Dependencies mapped
- [x] Sequencing correct (SEO → Design → Build)
- [x] Agents assigned
- [x] Success metrics defined
- [x] Token budget estimated
- [x] Risks identified
- [ ] **Open decisions resolved** (pending)
- [ ] **Ready for Phase 2 execution**

---

## Next Actions

1. **IMMEDIATE:** Spawn Dieter 🎨 for Phase 2 (Design System)
2. **PARALLEL:** Spawn Hemingway ✍️ for Phase 3 (Content Strategy)
3. **DECISION NEEDED:** CMS and newsletter platform choices before Phase 6

---

*This brief is the single source of truth. Update it as phases complete.*

**Last Updated:** 2026-02-14 00:32 UTC  
**Author:** Drucker 📋
