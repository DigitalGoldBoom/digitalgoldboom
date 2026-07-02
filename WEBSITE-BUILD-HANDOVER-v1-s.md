# Website Build Handover — Digital Gold Boom (MASTER BRIEF)

> **To:** the website-building session / engineers.
> **From:** the copy + design pipeline. **Updated:** 2026-07-01.
> **Read this whole file PLUS the spec files in §2 IN FULL before building — not summaries.** Anyone touching these pages reads the relevant copy + design spec end to end.
> **Working dir:** `C:\DGB-Website\web` (Next.js). Nothing here is deployed — deploy is the author's call.

---

## 0. Scope at a glance (what this build covers)

| Work | Status coming in | Your job |
|---|---|---|
| **`/v1`** long funnel + **`/s`** short funnel | Copy + design spec'd, not built | **Build them** (new pages) |
| **Root `/v2` homepage + `/book`** compliance fixes | **Already fixed in code** (this session) | Review + keep; deploy when author says |
| **`/affiliates`** → cash-only rework | Copy + design spec'd | **Build the rework** (live code still has old NATG — replace) |
| **`/mining-industry`** conversion pass | Spec'd | **Build the improvements** |
| **5 site-wide visual ADDs** | 2 (`/book`) done in code; 3 pending | Build the remaining 3 |

> ⚠️ **Do NOT repoint the root** until the author approves a winner. Root currently renders `/v2` (`src/app/page.tsx` → `<V2Home/>`). Build on the named routes; the author repoints root later.

---

## 1. The deliverable files (your source of truth — read the ones for what you're building)

- `SALES-COPY-FINAL-v1-s.md` — copy for `/v1` (long) + `/s` (short). Structure corrected (2 sections / 17 ch); names Cahuilla + Friday (Ch 15) as compliant proof.
- `SALES-COPY-v3.md` — alternative LONG copy for **`/v3`** (VSL-based variant, to split-test vs `/v1`).
- `SALES-DESIGN-SPEC-v1-s.md` — design/motion/3D build spec for `/v1` + `/s`. ⚠️ Predates the structure fix — re-sync to the corrected copy before building (no Cahuilla "section"; 2 sections). No V3 design spec yet.
- `SALES-DESIGN-affiliates-mining.md` — design + copy for `/affiliates` (CASH-ONLY) and `/mining-industry`.
- `SALES-VISUAL-AUDIT.md` — the 5 site-wide visual ADDs (priority-ranked).
- `SALES-COPY-WORKING.md` — strategy / compliance source-of-truth + changelog.

If copy and design ever disagree: the copy's MESSAGE wins, the design's STRUCTURE wins — flag the conflict, don't guess.

---

## 2. Design + build standard (non-negotiable, every page)

- **Brand:** build on the **v2 design system** (palette, gold accent, dark ground, `ShimmerDots`, `v2-*` tokens) — then ELEVATE it. Killer web3, ambitious, makes the page POP for a web3-savvy audience. Not basic. Full toolbox (3D/WebGL, scroll-driven + interactive motion, particle/shimmer, tables/visualizations) wherever it lifts the goal. NOTE: `/affiliates` + `/mining-industry` are already wrapped in `VaultShell` (it paints the shimmer) — their gap is the basic card/type tokens; port them UP to the v2 register.
- **Always optimized for the goal.** Every section enhances the experience and drives the page's ONE action. Ambition never costs clarity, conversion, or speed.
- **Desktop, tablet AND mobile — hardwired.** Every section ships all three breakpoints from the start. Define what reflows / simplifies / becomes touch / degrades on phone (esp. 3D + heavy motion). A section without all three is not done.
- **Performance:** Core Web Vitals budget (LCP/CLS/INP). Heavy effects lazy-load + degrade; `prefers-reduced-motion` fallback on every animation.

---

## 3. Compliance (a rejected store converts zero — hold this on EVERY page)

The book is a LemonSqueezy-approved **information product** about the industry — NOT an investment, token, or financial advice.
- No investment/returns/FOMO claims or visuals: no price-up/gain charts, no "join thousands of investors", no moon/rocket/lambo, no countdown timers (July 8 2026 is stated as fact, never a ticking clock).
- Do NOT reintroduce the old `/v2` triggers ("$469M / 17,466 reserved", "$871M tokenized value", "you're early", "before Wall Street", email waitlist, 3-product grid) — they were removed this session.
- Visual STYLE can be as bold/web3 as it wants; the CLAIMS stay compliant.
- Keep near every CTA: **"Educational — not financial advice"** (author-stake line REMOVED per author directive 2026-07-02 — disclosure lives in the book only).

---

## 4. Per-page detail

### `/v1` (long) + `/s` (short) — NEW BUILD
- Sell ONE product: the book at the **$37 early-reader launch price** (rising to the regular **$97**). Single CTA → **LemonSqueezy checkout**. **12-month money-back guarantee.** No email/waitlist, no Primer/Updates.
- Build from `SALES-COPY-FINAL-v1-s.md` + `SALES-DESIGN-SPEC-v1-s.md`.
- **Assets (10 new — page NOT blocked on them):** 5 author-manual photoreal (incl. hero gold-mass — author produces; do NOT generate), 5 visual-strategist figures (no price/return charts), author portrait = real photo only. **Ship-now path:** use existing `Book3D` as the interim hero; leave clean swap points.
- **`[VERIFY]` before publish (in the copy file):** Cahuilla framing (figure-free), final chapter count/edition scope, $22T always with its "as of Feb 26 2026, $5,194/oz" line, NatGold definition + author bio + July 8 2026 date.

### `/affiliates` — CASH-ONLY REWORK (replaces the live NATG version)
- Build from the `/affiliates` section of `SALES-DESIGN-affiliates-mining.md` (design + ready-to-paste copy).
- **Cash commission only.** Remove the old NATG token ladder AND the dead **wallet field**. The earn structure is one flat strip: **Your rate · Tracked for you · Paid by wire.**
- Tracking/payouts = **LemonSqueezy native affiliate program** (free). Every primary CTA points to the LS affiliate **signup link** → `[WIRE: LS affiliate signup link]` (LS generates it once the author enables the program). Commission % → `[WIRE: rate, up to 30%]` (author sets in LS). Payout cadence: match LS's current published terms (≈30-day hold, then bi-monthly ~14th & 28th) — NOT "monthly."
- The live `affiliates/page.tsx` + `AffiliateInterestForm.tsx` + its `metadata` still carry old NATG copy/wallet field — replace them in this rework.

### `/mining-industry` — CONVERSION PASS
- Build from the `/mining-industry` section of `SALES-DESIGN-affiliates-mining.md`.
- Goal: B2B reviewers (skeptical mining pros) → contact. **Restraint = the strategy** (no hype/price/token/count-ups, no gold-bar cliché image).
- Moves: port to v2 register; one quiet drill-core hero (reuse the `/v1` asset, author-manual); a **real author photo** beside credentials (don't AI-generate a person); a calm "what you'll be reading" reassurance near the form.
- **Confirm scope with author:** this page is reviewer-recruitment, NOT deposit-intake (that's a separate B2B flow). Don't add a "submit a deposit" pitch without sign-off. Verify author credentials before amplifying them into a visual strip.

### Root `/v2` + `/book` — ALREADY FIXED (this session, in code, not deployed)
- Compliance triggers stripped, guarantee set to 12-month sitewide, `/book` got 2 visual upgrades. Build is green (27 routes). **Don't undo these.** Author to review + deploy.
- The 2 remaining audit ADDs to still build: `/mining-industry` hero (covered above), `/newsletter` hero (shimmer field behind headline — code-only). `/affiliates` earn visual is covered by the cash-only rework.

---

## 5. Build order + acceptance

1. Scaffold `/v1` + `/s` on the v2 system; build section-by-section from their copy + design files.
2. Build the `/affiliates` cash-only rework + `/mining-industry` pass.
3. Build the remaining visual ADDs (`/newsletter` hero).
4. Wire every CTA correctly: book pages → LemonSqueezy checkout; `/affiliates` → LS affiliate signup link.
5. **Acceptance (every page):** all three breakpoints clean · reduced-motion fallback on every animation · CWV budget met · no compliance trips (§3) · no `[VERIFY]`/`[WIRE]` item live unresolved · book pages = single CTA, no email/waitlist.
6. Split-test `/v1` vs `/s` on checkout conversion (confirm the tool with the author).

---

## 6. Needs the AUTHOR (not the build session)

- **Enable the LemonSqueezy affiliate program** + set the commission % → unblocks the `/affiliates` signup link.
- Confirm **Cahuilla framing** + **final chapter count/edition** (so "what's inside" + the sample/PDF match).
- Supply the **author photo** + the **5 photoreal hero images** (author-manual route).
- **Deploy** decision (nothing is live until pushed).

---

## 7. The pipeline behind this (so you know it's solid)
Copy: `dgb-funnel-copywriter` (full forensic book read) → graded by `dgb-copy-chief` → fact-checked by `dgb-fact-verifier`. Design: `dgb-funnel-designer`. Production build is yours (`dgb-framer-converter` / `framer-web-engineer`). Questions/conflicts → flag the author; keep `SALES-COPY-WORKING.md` current.
