# SALES VISUAL AUDIT — live site, section by section

> **Mode:** dgb-funnel-designer in AUDIT MODE (reviewer pass). I sweep every live page and, section by section, give ONE verdict: **ADD** a visual that genuinely lifts impact, or **LEAVE AS-IS** because the section is stronger clean (the cover test). Being selective is the whole point — I do NOT invent a visual for every section.
> **Auditor:** `dgb-funnel-designer` (conversion design director). **Date:** 2026-06-30.
> **Builder ≠ breaker:** I audit and spec only. I do not write code, do not write copy, and do not grade my own design. Pushback is mandatory and below.
>
> **Scope:** live/real pages per the sitemap — `/` (renders `/v2`), `/live`, `/book`, `/newsletter`, `/affiliates`, `/mining-industry`. The funnel pages `/v1` and `/s` are NOT built yet but already have a full spec (`SALES-DESIGN-SPEC-v1-s.md`); for those I note only opportunities BEYOND what's already spec'd. Dead concept/draft routes (`/long`, `/ps`, `/concept-*`, `/buy`, `/projects`) excluded.
>
> **Two laws applied to every ADD:** (1) the visual serves the sale and the reader's understanding, ending at the action; (2) Desktop / Tablet / Phone are specified for every ADD, with a reduced-motion fallback and a performance note.
>
> **Compliance lens (CLAIMS, not style):** bold web3 aesthetic is fine; an investment/return/FOMO *claim* is not. Subject matter stays the **industry** (gold, geology, drill core, verification, the machinery of finance). I flag every existing compliance trip as **REMOVE/FIX** even where the brief already notes "redo when root is repointed" — it is live today, so it is flagged today.

---

## ★ PRIORITY SHORTLIST — highest-impact additions across the whole site

Ranked by conversion/comprehension lift per unit of build + asset cost. The first three are the biggest wins; build these first.

1. **`/book` HERO — replace the flat 3D-book-on-color with the "verified gold lit from within" field + Book3D in a shimmer ground.** `/book` is the ONE live page that takes the $37 sale today, and its hero is visually the weakest of all the buy surfaces (plain `--bg-contrast-deep` block, no shimmer, no gold light). Bringing the v2/SALES-SPEC "one big idea" treatment to this page is the single highest-ROI visual on the live site. *(ADD — /book Hero)*

2. **`/book` "What you'll understand" — add a thin gold thread / lit-edge rhythm so the 6 learn-cards read as one map, not a flat grid.** This is the value-stack that justifies $37; a small motion/structure move (reveal-up + one accent move) lifts perceived completeness with near-zero asset cost. *(ADD — /book learn grid)*

3. **`/mining-industry` HERO — one quiet, dignified documentary anchor (drill core / core-logging table, no people).** This page asks a credentialed professional to spend their time; a single piece of "we know this ground" texture earns the credibility the all-type hero currently asks for on faith. Reuses the `/v1` Beat-7 drill-core asset (no new production). *(ADD — /mining-industry Hero)*

4. **`/affiliates` "Three ways to earn" — a single earn-ladder figure (cash → 50% NATG → 100% NATG) so the three tiers read as one rising path, not three separate cards.** The page's whole job is making the reward structure instantly graspable; a connected ladder out-converts three parallel cards. Code-only/visual-strategist, no photoreal. *(ADD — /affiliates ways-to-earn)* **[compliance note: keep it reward-structure, never "returns".]**

5. **`/newsletter` HERO — bring the v2 shimmer field + one gold light behind the headline (it already uses `v2-*` tokens but sits on a plain `VaultShell` ground).** Cheap, on-brand, lifts the "this is the same premium brand" trust that drives the free opt-in. Code-only. *(ADD — /newsletter Hero)*

**Compliance fixes found (must REMOVE/FIX — see per-page detail):**
- **`/` (root → /v2):** live page carries the exact claims the brief says trigger rejection — "Missed Bitcoin? Don't miss digital gold mining" (H1), "You're early" (section label), "Understand it before Wall Street does" + "the thing to be early to" (final CTA), the **$469M / 17,466 / 162 / 5.3× reserved** investor-stat bento, "**$871M of tokenized value**" (Cahuilla section card), email waitlist as the primary action. These are COPY/claim trips, not style — out of this audit's lane to rewrite, but flagged here as live REMOVE/FIX because the visual treatment (giant investor-stat tiles, count-ups on reservation numbers) actively *amplifies* the non-compliant claim.
- **`/v2` "30-day money-back guarantee"** vs the locked offer's **12-month** guarantee — inconsistent with `/book` (30-day) and the locked copy (12-month). FIX to one number sitewide. (Copy/fact, flagged for the owner.)
- **`/affiliates`:** NATG token-reward tiers ("50% back in NATG", "100% back in NATG") live on a public page — a *different* compliance lane from the LemonSqueezy book-info-product line. The page is carefully hedged ("launching with the token", no fabricated counts) but the visual emphasis (gold reward figures as the hero of each card) should stay reward-mechanic, never imply token upside. Visual recommendation below keeps it structural.

**New-asset count by route (from this audit's ADDs only):**
- **Author-manual (Tier-4 photoreal):** 1 net-new — a calm "verification setting" still for `/book` hero IF the `/v1` gold-mass and drill-core assets aren't reused. If those are reused (recommended), **0 net-new photoreal**.
- **Visual-strategist (figure/diagram):** 1 — the `/affiliates` earn-ladder. (Reuses no book figures.)
- **Code-only (v2 tokens / existing components):** 4 — `/book` shimmer-hero wrap + learn-grid thread; `/newsletter` shimmer-hero; `/affiliates` ladder structure; `/mining-industry` hero ground.
- **Existing assets reused:** `ShimmerDots`, `Book3D`, `/v1` gold-mass hero, `/v1` drill-core still.

**Net:** **5 ADD recommendations** across the live site. Everything else: **LEAVE AS-IS**. The site is already restrained and on-brand; most sections carry their point on type and whitespace alone, which is correct.

---

# PAGE `/` (root → renders `/v2/page.tsx`) — the live homepage

> The brand reference AND the live root. Visually it is the strongest page on the site (shimmer field, Book3D, count-ups, bento). Its problem is **claims, not visuals** — but several visuals *amplify* non-compliant claims, so they're flagged. Per the brief, root is "redo copy when repointed"; I am only flagging, not respeccing the copy.

### Section: Fixed shimmer field + gold glows (global background)
**LEAVE AS-IS.** This is the one-big-idea ground done right (`ShimmerDots` + radial gold top-glow + vertical darkening). It is exactly what the SALES-SPEC tells the new pages to reuse. Cover test: removing it would flatten the whole brand. Keep.

### Section: HERO — "Missed Bitcoin? Don't miss digital gold mining" + Book3D + email form
**LEAVE AS-IS (visual) / REMOVE-FIX (claim).** The *visual* composition (Book3D in the field, the grid, the eye-path) is strong and needs no addition. But the headline is the brief's #1 named rejection trigger and the primary action is an email waitlist (not the $37 sale). Out of my lane to rewrite the words; flagged as a live compliance trip. Do not add visuals here — the fix is copy + swapping the email form for the book CTA.

### Section: `$22T` count-up — "Verified gold, sitting in the ground"
**LEAVE AS-IS.** This is the model section for compliant big-number drama: it's a *sourced industry fact* (gold in the ground), not a reader return, and the count-up earns it. The SALES-SPEC explicitly reuses this treatment. Don't touch. (The $22T number itself is price-perishable — owner's job, not a visual issue.)

### Section: REFRAME — "Gold mining already runs on verification, not extraction"
**LEAVE AS-IS.** Type-led, the gold italic "already" is the single accent, the "It isn't. Not anymore." turn lands clean. Cover test passes hard — the words carry it; any added image would dilute the strongest argument moment on the page. Keep clean.

### Section: HOW IT WORKS (3-step bento — Verify / Tokenize / Trade)
**ADD (optional, low priority) — a thin gold connector thread tile→tile→tile.** The three tiles currently read as three separate boxes; a single scroll-drawn gold line linking them makes the process feel like one flow (proof → digital → market). This is already spec'd for `/v1` Beat 5; mirroring it here is cheap and on-brand.
- IMAGERY: none. ROUTE: **code-only** (SVG path + `stroke-dashoffset`).
- MOTION: thread draws tile 1→2→3 on scroll; reduced-motion = fully drawn, static.
- RESPONSIVE: desktop/tablet horizontal thread; phone = vertical gold line down the left edge linking the stacked steps.
- PERFORMANCE: inline SVG, negligible.
- *Note:* this is a "nice to have", not a priority — the bento already works. Listed for completeness; I would NOT prioritize it over the `/book` and `/mining-industry` wins.

### Section: TOKEN LAUNCH — "You're early" + the 4 investor-stat tiles ($469M / 17,466 / 162 / Jul 8) + "5.3× the token supply" caption
**REMOVE/FIX (compliance — the most serious visual trip on the live site).** This is the textbook "join thousands of investors" social-proof-as-solicitation the LemonSqueezy rules forbid, and the *visual design actively amplifies it*: animated count-ups racing toward reservation totals, a "You're early" section label, "5.3× the token supply — conviction before it ever traded." The numbers may only survive as *reported industry facts the book examines* — never as "you're early, join them." As a visual: the count-up-on-investor-stats pattern should be cut here. (Copy owns the rewrite; flagging because the bento+counter design is the thing making the claim loud.)

### Section: THE BOOK — Book3D + 4 section cards (incl. "Cahuilla … $871M of tokenized value")
**LEAVE AS-IS (visual) / REMOVE-FIX (one claim).** The Book3D + 2×2 section-card layout is good and needs no addition. But Section-03 card states "verified gold turned into **$871M of tokenized value** in six months" — a dollar-outcome figure the locked funnel copy deliberately strips from the public Cahuilla framing (SALES-SPEC pushback #1/#2). FIX the claim; the layout stays.

### Section: PRICING — 3 options (Book $37 / Primer $99 / Updates $199)
**REMOVE/FIX (offer, not visual).** The locked offer is **the $37 book ONLY** (early-reader launch price, rising to the regular $97) for now (Primer + Updates come off). The 3-card pricing grid is fine *as a component*; it just shouldn't show three products. No visual ADD — if anything, simplify to one. (Owner's call; flagged.)

### Section: FINAL CTA — "Understand it before Wall Street does" / "the thing to be early to" + email form
**LEAVE AS-IS (visual) / REMOVE-FIX (claim).** Centered composition is correct. But "before Wall Street" + "the thing to be early to" are named investment-timing triggers, and the action is again an email form, not the sale. Flagged; copy owns it. No visual addition.

---

# PAGE `/live` — Live Dashboard

> A data tool, not a sales page. Its job is trust-through-transparency: every book number paired with today's live value (COMEX spot, AISC, BIV, tokenized RWA, forecast). Restraint here IS the design — it must read like an instrument, not a pitch.

### Section: Header — "Every number from the book — updated against today's market" + Last-updated badge
**LEAVE AS-IS.** Correct instrument tone. A visual here would undercut the "this is sober, sourced data" credibility that is the page's entire value. Keep clean.

### Section: KeyInputsRow (spot / AISC / BIV strip)
**LEAVE AS-IS.** This IS the visualization — live KPI tiles. Already the right pattern (the brief sanctions framed KPI/stat cards). No addition; do not gild a working instrument.

### Section: Section panels / continuous list (the stat cards with formulas)
**LEAVE AS-IS.** Comprehension-first data cards with the formula visible on each. Adding decorative motion or imagery would slow the scan and read as hype on a page whose credibility depends on looking neutral. The cover test inverts here: the *absence* of decoration is the feature. Keep.

### Section: Methodology footer
**LEAVE AS-IS.** Plain-text sourcing is exactly right for a "court-worthy" data page. No visual.

> **Compliance note (positive):** `/live` is the model for compliant numbers — live gold-in-ground / spot / forecast are framed as sourced market data with methodology, never as "your return." Nothing to fix. (One watch-item for the owner, not a visual: the page shows a three-year forecast — ensure it stays labeled as the book's modeled figure with formula shown, which it currently does.)

---

# PAGE `/book` — the $37 sale page (LIVE, takes money today)

> The most important live page for revenue, and visually the weakest of the buy surfaces: it uses the OLDER token system (`--bg-contrast-deep`, `card`, `eyebrow`, no shimmer, no gold light field) rather than the elevated v2 look the brief mandates for sales surfaces. This is where the highest-impact ADDs live.

### Section: HERO — Book3D + "$37 · one-time" + BuyButton + trust ticks
**ADD — wrap the hero in the v2 shimmer field + one gold light behind the headline; keep Book3D as the lit hero object.** *(PRIORITY #1)*
- VISUAL CONCEPT: the same "verified gold, lit from within" ground as root, so the page a buyer lands on to pay feels unmistakably the premium brand — Book3D glowing in a dark shimmer field, one gold light source pointing the eye headline → price → button.
- LAYOUT: keep the existing `[0.95fr_1.05fr]` grid and Book3D slot; swap the flat `--bg-contrast-deep` background for the v2 fixed `ShimmerDots` + radial gold top-glow stack; the gold price + BuyButton become the one bright focal point.
- IMAGERY: none new — **Book3D (existing)** is the hero object. ROUTE: **code-only** (reuse `ShimmerDots`). Optional later upgrade: the `/v1` gold-mass photoreal still behind the book — reuse, no new production.
- MOTION: headline/price/CTA reveal-up on load (600ms, staggered, CTA last); Book3D pointer-tilt (already built, off-screen-paused, reduced-motion-safe). Reduced-motion: static.
- CONVERSION RATIONALE: the buy page should be the *most* premium surface, not the least — a flat hero on the page where the card comes out leaks trust at the worst moment. Matching the homebrand here is a direct conversion lever.
- RESPONSIVE: desktop side-by-side; tablet stack book-above-text; phone text-first (headline LCP), book ~60% static still, CTA full-width thumb zone, trust ticks wrap.
- ACCESSIBILITY: `<h1>` carries headline; Book3D `aria-hidden`; BuyButton discernible name; AA/AAA contrast on dark.
- PERFORMANCE: `ShimmerDots` DPR-capped + off-screen-paused (existing); Book3D already ~195KB faces, transform-only. LCP stays the HTML headline. No new image weight if the gold-mass still is deferred.

### Section: "What you'll understand by the end" — 6 learn-cards (3-col grid)
**ADD — give the grid one accent rhythm: reveal-up stagger + a single gold lit-edge per card on scroll, so the six read as one complete map.** *(PRIORITY #2)*
- VISUAL CONCEPT: the value-stack that justifies $37 should feel *cumulative*, not like a flat spec sheet. A subtle staggered reveal + one gold hairline accent per card (the repeated "one accent move") makes the completeness felt.
- LAYOUT: keep the 3-col grid; add a thin gold top-rule or left-edge to each `card` (matches v2 `.v2-tile` language) so the section has the one-accent discipline the rest of the brand uses.
- IMAGERY: none. ROUTE: **code-only**. No icons needed — text carries each point; an icon per card would be decoration that fails the cover test.
- MOTION: cards fade-up staggered 60ms on scroll-in (the house motion). Reduced-motion: final state, no transform.
- CONVERSION RATIONALE: perceived value of the contents is what converts the considered buyer; a connected, premium-feeling stack lifts it without changing a word.
- RESPONSIVE: 3-col desktop / 2-col tablet / 1-col phone (already the grid); stagger respects column order.
- ACCESSIBILITY: cards as a list; accent is decorative (`aria-hidden`), meaning lives in text.
- PERFORMANCE: CSS/IntersectionObserver only; negligible.

### Section: "Who it's for"
**LEAVE AS-IS.** Two calm paragraphs in a narrow column — exactly right for a reassurance beat. An image would intrude. Cover test passes; keep clean.

### Section: AUTHOR — Andrew Fletcher (text only)
**ADD (medium priority) — a single author portrait OR a credibility-by-environment still, framed in a thin gold rule.** Same rationale as the SALES-SPEC author beat: authority + a face (or a real industry setting) lifts trust on a sale page far more than an all-type bio.
- IMAGERY: **author-supplied real photo** preferred (do NOT AI-generate a person). Fallback: a field/geology setting still, no identifiable face. ROUTE: **author-supplied** / **author-manual** placeholder.
- MOTION: panel reveal-up; no gimmicks (trust beats want stillness). Reduced-motion: static.
- RESPONSIVE: portrait + text side-by-side desktop; stack on tablet/phone, portrait ~64% width centered.
- CONVERSION RATIONALE: a named, pictured author who "writes from inside the industry" is the credibility anchor for a $37 info product about a sensitive topic.
- PERFORMANCE: one ≤250KB WebP, explicit dimensions, lazy.
- ACCESSIBILITY: `alt="Andrew Fletcher, author"`; if placeholder, describe the scene, no people.
- *Pushback:* only worth it IF a real photo (or an honest environment still) is available. Do not fabricate a person to fill the slot — an empty, well-set type block beats a fake face.

### Section: FAQ
**LEAVE AS-IS.** A `<dl>` is the correct, scannable, SEO-friendly pattern. No visual; decoration would slow the scan a buyer uses to clear last objections.

### Section: FINAL CTA — "Understand it before everyone else does" + BuyButton + fine print
**LEAVE AS-IS (visual) — but inherit the page-wide gold core-glow from the hero ADD so the button is the brightest pixel.** The composition is already correct (centered, one button, fine print present). No separate visual needed; the glow that comes with the hero treatment will carry it.
- **REMOVE/FIX (consistency):** fine print says "30-day money-back guarantee" while the locked offer is **12 months**. One number sitewide. (Copy/fact, flagged for owner.)

---

# PAGE `/newsletter` — free weekly opt-in

> Already uses the `v2-*` tokens (good) but renders on a plain `VaultShell` ground without the shimmer field, so it reads as a slightly off-brand cousin of root.

### Section: HERO — "Stay ahead of the gold shift" + email form
**ADD — bring the v2 fixed shimmer field + one gold light behind the headline.** *(PRIORITY #5)*
- VISUAL CONCEPT: the same premium ground as root, so the free opt-in feels like the same trusted brand (trust is the entire conversion lever on a free email capture).
- IMAGERY: none. ROUTE: **code-only** (reuse `ShimmerDots` + radial glow stack). The page already speaks v2 in type; this finishes the job.
- MOTION: headline/form reveal-up on load; reduced-motion static.
- CONVERSION RATIONALE: a free opt-in converts on perceived legitimacy; matching the homepage's premium field lifts that at near-zero cost.
- RESPONSIVE: shimmer opacity 0.35 on phone (protect stacked-text contrast); form stacks to full-width input + button.
- ACCESSIBILITY: field `aria-hidden`; form labels already present; AA contrast.
- PERFORMANCE: DPR-capped, off-screen-paused canvas (existing); no new asset.

### Section: 3 benefit tiles (Market analysis / Industry signal / Early on the launch)
**LEAVE AS-IS.** Clean `v2-tile` trio; text carries each benefit. No addition.
> **Compliance watch (not visual):** "Early on the launch … road to the NATG token launch" leans toward investment-timing framing. The newsletter compliance note says it must stay industry news/analysis, never "get in early on the opportunity." Visual is fine; flagging the copy lean for the owner.

### Section: Questions (`<dl>`)
**LEAVE AS-IS.** Correct pattern; no visual.

---

# PAGE `/affiliates` — share-to-earn program (early list)

> A different compliance lane: an affiliate/share-to-earn program with cash + NATG-token rewards. Carefully hedged (status chips, "launching with the token", no fabricated counts). Visually it uses the older token system, like `/book`.

### Section: HERO — "Share the book. Get rewarded for it." + affiliate disclosure
**LEAVE AS-IS.** Centered type hero with the disclosure line forward is the right, honest treatment for a paid-affiliate page. An image would distract from the reward proposition. The disclosure-forward design is itself the trust move. Keep clean.

### Section: "Three ways to earn" — 3 reward cards (cash 50% / 50% NATG / 100% NATG) with status chips
**ADD — a single connected earn-ladder figure: one rising gold path through the three rewards, current-availability marked on each rung.** *(PRIORITY #4)*
- VISUAL CONCEPT: the page's whole job is making the reward structure instantly graspable. Three parallel cards make the reader compare; one rising ladder (cash → 50% back in NATG → 100% back in NATG) makes the *progression* obvious at a glance — "the more it travels, the more comes back."
- LAYOUT: replace/overlay the 3-card row with a 3-rung ladder on a gold rail; each rung keeps its status chip (live vs "launching with the token") so availability stays honest and visible.
- IMAGERY: none photoreal. ROUTE: **visual-strategist / code-only** (rail + rungs, labels drawn in HTML). NOT a chart, NOT a "returns" curve.
- MOTION: rungs light up bottom→top on scroll; reduced-motion = all lit, static.
- CONVERSION RATIONALE: a clear, single-glance reward path lifts sign-ups to the early list; comprehension is the conversion here.
- RESPONSIVE: vertical ladder on phone (rail down the left); horizontal/stepped on desktop.
- ACCESSIBILITY: ordered list; status conveyed in text (not color alone); AA contrast.
- PERFORMANCE: SVG/CSS, negligible.
- **COMPLIANCE (hard line):** keep it a *reward mechanic* (what you get back for sharing), never a yield/return curve or "earn X%" investment framing. The NATG rungs must stay visibly "launching with the token." A rising gold line must read as "reward grows with reach", not "token goes up."

### Section: "How it works" — 4 numbered steps
**LEAVE AS-IS.** Numbered-step pattern is clear and standard; the gold number chips are already the one accent. No addition.

### Section: Affiliate toolkit (gated, lock-glyph cards)
**LEAVE AS-IS.** The locked-card treatment with the lock glyph already does the "join to unlock" job visually and honestly (it shows the perk exists without faking its contents). Adding real preview imagery would either over-promise or require assets that don't exist yet (the B-roll comes later from dgb-cinematographer). Keep the honest locked state.

### Section: FAQ / Capture / Final CTA
**LEAVE AS-IS.** Standard, clean, disclosure-forward. No visuals — these are decision/mechanics beats where clarity beats decoration.

---

# PAGE `/mining-industry` — recruit industry reviewers

> Asks credentialed gold/mining professionals to spend real time reading + critiquing. The audience is the most skeptical on the whole site; credibility texture matters most here. Older token system, all-type.

### Section: HERO — "You know this ground better than anyone." + "Become an early reviewer"
**ADD — one quiet, dignified documentary anchor: drill core in sample trays / a core-logging table (no people).** *(PRIORITY #3)*
- VISUAL CONCEPT: "we know this ground" said visually — the literal evidence of the work this audience does every day (drill core, the logging bench), warm-lit, sober, documentary. It earns the credibility the headline currently asserts on faith.
- LAYOUT: keep the centered hero; add the still as a restrained band beside or behind the type (low opacity scrim so the type stays AA), one gold light pointing to the CTA.
- IMAGERY: **reuse the `/v1` Beat-7 drill-core still** (rock cores in trays, no people, no figures) — **no new production.** AI PROMPT (text-free, if a fresh variant is ever wanted): *"A row of cylindrical rock drill cores laid in wooden core-sample trays on a field table, warm directional light, fine mineral detail, shallow depth of field, documentary, photoreal, no people, no text, no numbers, no logos"* · ROUTE: **author-manual (Tier-4 photoreal)** — but default is **reuse the existing asset**.
- MOTION: gentle Ken-Burns (≤1.04 scale) on scroll OR static. Reduced-motion: static.
- CONVERSION RATIONALE: this audience converts on "these people actually know the industry." A real, accurate piece of fieldwork imagery (not a stock gold-bar cliché) signals respect and competence, lifting reviewer sign-ups.
- RESPONSIVE: desktop band beside type; tablet/phone a letterboxed band above the CTA, never full-bleed (protect text contrast).
- ACCESSIBILITY: `alt="Rock drill cores in sample trays on a field table"`; no people; dark scrim keeps AA over the image.
- PERFORMANCE: one lazy AVIF ≤450KB (or reuse the already-optimized `/v1` asset), explicit dimensions, zero CLS.

### Section: "Why your read matters" — 3 cards
**LEAVE AS-IS.** Text carries the argument to a professional audience that wants substance, not decoration. No visual.

### Section: "How it works" — 4 steps
**LEAVE AS-IS.** Clear numbered steps; gold chips are the accent. No addition.

### Section: AUTHOR — Andrew Fletcher (text only)
**LEAVE AS-IS (or share the `/book` author-portrait ADD if a real photo lands).** For an industry audience the credential text ("former president … first NatGold supply agreement … 200+ projects") is the load-bearing proof; a photo helps but is not essential here. If the real author portrait is produced for `/book`, reuse it here — otherwise this beat stands on the credentials.

### Section: CAPTURE — "Become an early reviewer" + form
**LEAVE AS-IS.** Clean capture, privacy line present. No visual.

---

# PAGES `/v1` and `/s` (NOT built — already fully spec'd in `SALES-DESIGN-SPEC-v1-s.md`)

> Per instructions, I do NOT re-spec these. The existing spec is thorough and compliant (one big idea, 11 beats on /v1, single-screen /s, 10 new visuals, Book3D interim hero, all breakpoints + reduced-motion). Only opportunities BEYOND what's already spec'd:

1. **Shared-asset reuse with the live pages.** The `/v1` gold-mass hero and drill-core still are the SAME assets I recommend reusing on `/book` (hero upgrade) and `/mining-industry` (credibility anchor). Producing them once for `/v1` now pays for those live-page upgrades too — sequence `/v1` asset generation first so the live wins come free. *(Coordination note, not a new visual.)*

2. **`/s` (short) — one micro-trust glyph row is the ONLY thing I'd consider adding beyond the spec**, and even that I'd hold: the spec's discipline (one screen, one button, speed first) is correct for cold traffic. No addition recommended — flagging only that I considered and rejected it (the cover test says the one-breath copy + lit gold object already carry it; anything more risks the sub-2s LCP budget). **LEAVE AS SPEC'D.**

3. No other gaps. The spec already covers the hero, reframe, $22T, mechanism thread, convergence diagram, Cahuilla process timeline (figure-free), risk ledger, author beat, and close. I would not add to it.

---

## OPEN QUESTIONS / PUSHBACK

1. **The live root (`/v2`) is the brand reference AND a compliance liability.** It carries the exact claims the brief says trigger LemonSqueezy rejection (Missed Bitcoin / You're early / before Wall Street / $469M investor stats / $871M Cahuilla value / email waitlist as primary action). The visuals are excellent; the *claims* are the problem, and several visuals amplify them. This is copy's lane to rewrite — but it is LIVE today, so I am flagging it loudly. Recommend the owner treat the root claim-cleanup as urgent, independent of the `/v1`–`/s` work.

2. **Guarantee window is inconsistent across live pages** — `/v2` says "30-day", `/book` says "30-day", the locked funnel copy + SALES-SPEC say "12-month". Pick one and make it true everywhere (operationally honored + set in LemonSqueezy). Not a visual issue; flagged because it's live and contradictory.

3. **`/book` is on the OLD design system, not v2.** It's the page that takes money, yet it's the least premium buy surface. The priority-#1 ADD (shimmer-hero wrap) is the cheapest high-impact fix; a fuller port of `/book` to the v2 token system would be even better but is an engineering job beyond this audit. Flagging the system mismatch.

4. **`/affiliates` NATG-token rewards are a separate compliance lane from the book info-product.** The page is well-hedged today. My earn-ladder ADD must stay a reward *mechanic*, never a returns/yield visual. If the owner is at all unsure whether share-to-earn-in-token belongs on the same domain as the LemonSqueezy-approved book, that's a compliance question above visuals — STOP and check before amplifying it with a hero figure.

5. **Author portrait is the one genuinely-blocked ADD.** Both `/book` and `/mining-industry` would lift from a real author photo. Do NOT AI-generate a person. If no photo exists, the type-only beats stand; the honest environment-still fallback is second-best. Author to supply.

6. **Selectivity check (the whole point of this pass):** of ~30 sections audited, I recommend **5 ADDs** and LEAVE-AS-IS on the rest. The site is already restrained and on-brand; the wins are concentrated on the buy surface (`/book`), the most-skeptical audience (`/mining-industry`), the comprehension beat (`/affiliates` ladder), and brand-coherence (`/newsletter`). I deliberately did NOT invent visuals for `/live` (an instrument that must look neutral), the reframe/type beats (words carry them), or the `/s` short page (speed beats decoration).
