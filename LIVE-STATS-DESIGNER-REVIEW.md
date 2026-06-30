# Live-Stats Dashboard — Designer Review

**For:** the designer optimizing `/live` (esp. mobile + tablet).
**From:** the 17-chapter stats audit (every figure verified verbatim against the current book).
**Status of the data:** the live data layer is done and correct (see `STATS-MAP.md`). What's left is **presentation** — this doc is the review of (A) the stats by chapter, (B) prose/label changes to execute, (C) the mobile/tablet design decisions.

**The rule that governs what shows:** a figure earns a place ONLY if it has live data behind it — a feed drives it, or it's a fixed input to a number a feed drives. Everything else is "what it is" and stays off. Below, each chapter's stats are tagged:
- 🟢 **ON** — live now (a card or a live table cell).
- 🟡 **CANDIDATE** — it moves, but no live feed is wired yet; could be added if we wire a feed.
- ⚪ **OFF** — fixed / "what it is" / no live data → not shown.

---

## A. Stats by chapter

### Section 1 — The Inevitability Case

| Ch | Stat | Value | Status | Where |
|----|------|-------|--------|-------|
| 1 | In-ground gold value | $22T | 🟢 ON | card (live × spot) |
| 1 | Above-ground gold value | $36T | 🟢 ON | card (live × spot) |
| 1 | Gold reserve share vs Treasuries | 27% vs 22% (2025) | ⚪ OFF | no feed |
| 2 | Gold ETF AUM | $701B | ⚪ OFF | stripped (no feed) |
| 2 | ESG-mandated AUM | $30T → $35T by 2030 | ⚪ OFF | stripped (no feed) |
| 2 | VanEck GDX 2025 return | 155% | ⚪ OFF | no feed |
| 3 | Annual gold demand | 4,974 t (2024) | ⚪ OFF | stripped (no feed) |
| 3 | AISC | $1,676/oz | 🟢 ON | Key Inputs row + Ch 5/11 tables |
| 3 | Netflix market cap (analogy) | $430B | ⚪ OFF | no feed |
| 4 | Tokenized RWA market | $35B | 🟢 ON | card (live DefiLlama) |
| 4 | Tokenized gold market | $6B | 🟢 ON | card (live PAXG+XAUT) |
| 4 | Total gold ecosystem | $58T | 🟢 ON | card (live × spot) |
| 4 | Stablecoin market / USDT | $318B / $190B | 🟡 CANDIDATE | needs a feed |
| 4 | Tokenized treasuries / private credit | $8.7B / $17B | 🟡 CANDIDATE | needs a feed |
| 5 | Financial scorecard (508k oz vs 462k tokens) | spot/AISC/BIV-driven | 🟢 ON | **live table** |
| 6 | GLD AUM | $180B | ⚪ OFF | stripped (no feed) |
| 6 | Gold market cap growth | $12T → $36T | 🟢 ON | = the $36T card |
| 7 | ESG AUM | $30T | ⚪ OFF | stripped (no feed) |
| 7 | Wealth transfer (to 2048) | $124T | ⚪ OFF | fixed projection |
| 7 | Central-bank gold buys | 1,045 t (2024) | ⚪ OFF | stripped (no feed) |
| 8 | (synthesis / callbacks — benchmark $1.71B vs $1.09B) | — | 🟢 ON | via Ch 5 table |

### Section 2 — The NatGold Ecosystem

| Ch | Stat | Value | Status | Where |
|----|------|-------|--------|-------|
| 9 | Team / patents / Fireblocks corporate | — | ⚪ OFF | fixed / irrelevant |
| 10 | Global mining industry size | $2T | ⚪ OFF | no feed (slow) |
| 11 | BIV formula (spot − AISC = BIV) | $5,194 − $1,676 = $3,518 | 🟢 ON | **live table** |
| 11 | Resource tier exchange ratios | ×0.80 / ×0.40 / ×0.20 | 🟢 ON | **live table** (biv × ratio) |
| 12 | Qualification / governance | — | ⚪ OFF | procedural, no numbers |
| 13 | Token allocation split | 73/20/5/2 | 🟢 ON | shown live in Ch 15 table |
| 13 | Hypothetical 370k-oz walkthrough | $450.3M (128k × BIV) | 🟡 CANDIDATE | could add (BIV-driven) |
| 14 | Fireblocks $10T / 2,400 clients, audits | — | ⚪ OFF | irrelevant / fixed |
| 15 | 3-Year forecast | 17.5M tokens → $61.6B | 🟢 ON | **live table** |
| 15 | Social Giveback (Y1–Y3 / cumulative) | $176M … $1.23B | 🟢 ON | in forecast table (live) |
| 15 | Operating margin | ~98% | ⚪ OFF | **per author: do not display** |
| 15 | Newmont comparison | $125B mcap / $18.7B rev | 🟡 CANDIDATE | needs a feed |
| 16 | Pre-market reserved value | 133,518 tokens × live BIV | 🟢 ON | card (fixed count × live BIV) |
| 16 | BIV trajectory (Jun'25 → close → live) | $1,854 → $3,518 → live | 🟢 ON | **live table** |
| 17 | Risk callbacks (pre-market, BIV scenario) | — | ⚪ OFF | callbacks / scenario |

**Net:** 6 live cards + 5 live tables. Candidates (🟡) would each need a live feed wired before they qualify — list them with the author before building feeds.

---

## B. Prose / label changes to execute (for review)

**1. Short mobile chapter headlines.** The full book titles are too long for a phone (they wrap to 2–3 lines and crowd the panel). Proposed short forms for the chapters that appear on the dashboard — designer to approve/adjust:

| Chapter | Full title (desktop) | Proposed short (mobile) |
|---------|----------------------|--------------------------|
| 1 | Gold's Legacy and Its Digital Future | **Gold's Legacy** |
| 4 | Digital Alchemy: How Tokenization Unlocks Gold Without Extraction | **Digital Alchemy** |
| 5 | Scorecard: Digital Gold Mining vs Traditional Gold Mining | **The Scorecard** |
| 11 | Decoding Digital Gold Mining: The Key Innovations | **Decoding Digital Gold Mining** |
| 15 | The 3-Year $61B Forecast and How NatGold Digital Is Built to Deliver It | **The 3-Year $61B Forecast** |
| 16 | Pre-Market Demand: US$469M from 17,466 Participants, 162 Countries | **Pre-Market Demand** |

Implementation hint: add an optional `shortTitle` to the chapter-title source and show it under a mobile breakpoint; fall back to the full title on desktop.

**2. Card labels** are already concise (`stats-registry.ts` `label`). No prose change needed unless the designer wants them tighter for narrow cards.

**3. Section intros** (`section-blurbs.ts`) are current and short — keep.

> Note: "prose" here = the dashboard's own copy (headlines, labels, blurbs). No book-prose changes are implied.

---

## C. Mobile / tablet optimization — design decisions (case-by-case)

Currently the dashboard is **not** optimized for small screens. The designer owns these calls; the issues to solve:

1. **Drop the nested frames.** Today it's Section panel (border) → Chapter panel (border) → stat cards (border) = **three boxes inside boxes**. On mobile that triple border eats width and adds visual noise. Recommend flattening on mobile/tablet — e.g. the chapter level becomes a lightweight divider/heading rather than its own framed box, cards sit closer to full-width. Designer decides per breakpoint.
2. **Chapter headlines** — use the short forms above on mobile; let the full title show on desktop or on tap.
3. **Tables on phone.** The Ch 5 scorecard and Ch 15 forecast are 2-column comparison tables; the Ch 11 formula and Ch 16 trajectory are wider. On a phone these need a responsive plan per table (stack rows, horizontal scroll, or a compact card view) — case-by-case, not one rule for all.
4. **Card grid.** Cards are `sm:grid-cols-2 lg:grid-cols-3`; confirm single-column on phone reads well with the big numbers + the book-snapshot-vs-live delta.
5. **Key Inputs row** (spot / AISC / BIV at the top) — verify it stays legible and doesn't overflow on the narrowest width.
6. **Accordion default state** — consider which sections/chapters open by default on mobile so the page doesn't open as a wall.

**Files the designer will touch:** `app/live/LiveDashboard.tsx`, `components/live/SectionPanel.tsx`, `components/live/ChapterPanel.tsx`, `components/live/LiveStatCard.tsx`, `components/live/tables/*`, `components/live/KeyInputsRow.tsx`. Data files (`stats-registry.ts`, `tables-registry.ts`) should **not** need changes for the mobile work — this is presentation only.
