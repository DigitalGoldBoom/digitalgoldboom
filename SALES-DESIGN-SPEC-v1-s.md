# Sales Funnel — VISUAL / MOTION / 3D BUILD SPEC (/v1 long · /s short)

> **Status:** EXECUTABLE BUILD SPEC — ready for the website engineers (`dgb-framer-converter` / `framer-web-engineer`) to build from. No further design decisions required.
> **Author of spec:** `dgb-funnel-designer` (conversion design director). **Date:** 2026-06-30.
> **Designs for:** the LOCKED copy in `SALES-COPY-FINAL-v1-s.md` (beat by beat). Built in the **v2 design system, elevated** (`src/app/v2/page.tsx`, `globals.css` `.v2` block, `DESIGN-SYSTEM.md`).
> **Builder ≠ breaker:** this spec directs and describes; it does NOT write copy and does NOT write production code or self-grade. A review pass can follow.
>
> **Two laws (never bend):** (1) every visual serves the sale and the reader's understanding, ending at the CTA; (2) Desktop / Tablet / Phone are hardwired into every section.
>
> **Compliance (CLAIMS, not style):** be as bold/web3 as you like on the aesthetic. NEVER a visual that makes an investment claim — no "number-go-up" price/gain charts implying the *reader's* return, no moon/rocket/lambo, no "join thousands of investors" social-proof-as-solicitation. Subject matter stays the **industry**: gold, geology, drill core, verification, the machinery of finance — rendered strikingly. The `$22T` counter is allowed because it is a sourced industry fact ("verified gold in the ground"), NOT a projected price or a reader return.
>
> **Image doctrine:** every AI image prompt below is **TEXT-FREE** (no text, numbers, labels, logos baked in — drawn frames/labels added later in HTML/CSS). All Tier-4 photoreal images are **AUTHOR-MANUAL** — the brief + prompt are surfaced here for the author to run in Higgsfield; this spec does NOT auto-fire Higgsfield. Charts/diagrams route to `visual-strategist`.

---

## THE ONE BIG VISUAL IDEA

**"Verified gold, lit from within — while the old way of reaching it falls away around it."**

The whole funnel is one cinematic descent through a dark, gold-dust field. A single luminous motif — **a mass of gold that glows because it has been *proven*, not dug** — anchors the page. As the reader scrolls, the argument *assembles itself*: the problem (the old extraction world, dim and straining) gives way to the reframe (verification was always the real value) and then to the clean digital representation (the same gold, now on rails). The page never shows price going up; it shows **value that is already there being *revealed*.** Light = proof. The CTA is always the one warm gold button in a cool dark frame — the eye is trained, section after section, to end on it.

The through-line in three repeating moves, used everywhere:
1. **Dark ground + gold shimmer** (`ShimmerDots`, pushed further) = the field everything sits in.
2. **One gold light source per section** (a glowing edge, a lit object, a single gold rule) that points the eye toward the headline, then the button.
3. **Reveal-on-descent** — content arrives as you scroll (proof being uncovered), never decoration that just spins.

---

## GLOBAL DESIGN NOTES (apply to BOTH pages first)

**Background field (page-wide).** Reuse the v2 fixed shimmer stack exactly as on `/v2`:
- Fixed layer: `<ShimmerDots opacity={0.45} />` + radial gold glow top (`radial-gradient(80% 50% at 50% -5%, rgba(232,178,58,0.12), transparent 55%)`) + vertical darkening (`linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.75))`).
- **Elevation:** add ONE slow-drifting deep-gold radial "core glow" that travels down the page as the reader scrolls (CSS `background-position` tied to scroll progress, GPU-only). It is the "light from within" of the one big idea — it sits behind the active section so the live beat is always the brightest thing on screen. Reduced-motion: glow is static, centered.
- Phone: shimmer DPR already capped to 1 in `ShimmerDots`; keep `opacity` 0.35 on phone to protect contrast of stacked text.

**Type scale.** v2 tokens: `.v2-display` (weight 300, tight tracking) for all headlines; `clamp()` sizes per section below; body in `--v2-dim` `#E7E7EE9E`; eyebrows via `.v2-eyebrow` (gold, uppercase, 0.24em, with the 28px gold tick). Numbers/stats in mono with `tabular-nums` (matches v2 stat tiles).

**Section rhythm.** Same as v2: `max-w-[1320px]`, `px-6 md:px-10`, `py-24 md:py-32`, `.v2-divider` between major movements. The page should breathe — generous dark space is part of the premium feel; do not crowd.

**The one accent move, repeated.** Every section has exactly ONE gold element that is the brightest pixel and points to the next action: a lit edge, a single gold rule (`h-px` gold), a glowing number, or the gold CTA. Trains the eye; never two gold focal points competing.

**CTA system (compliance-anchored).** Primary CTA = `.v2-btn` (solid gold, `#08080d` text), label exactly **"Get the book — $17"**, → LemonSqueezy checkout (`BuyButton` component, `checkoutUrl` env, `unavailableLabel="Coming soon"`, with a `track()` event per placement). Directly under EVERY CTA, persistent and visible: **"Digital book · delivered instantly · 12-month money-back guarantee"** and the fine print **"Educational — not financial advice."** These lines are non-negotiable furniture, styled `--v2-faint`, never hidden behind a hover or accordion.

**Scroll behavior.** Reveal-on-scroll is the house motion: each block fades up `translateY(16px)→0`, `opacity 0→1`, 500ms, `cubic-bezier(0.22,0.61,0.36,1)`, staggered 60ms per child, triggered at ~15% in view via IntersectionObserver (one shared hook). Runs ONCE per element. `prefers-reduced-motion`: everything renders in final state, no transform, no fade.

**Performance budget (hard).** LCP < 2.5s, CLS < 0.1, INP < 200ms. Hero text is the LCP (not an image) — never gate the headline behind a 3D load. All photoreal images: WebP/AVIF, ≤ 500KB each, `next/image` with explicit width/height (zero CLS), `loading="lazy"` below the fold, `priority` only on the hero visual. One WebGL/3D canvas max in view at a time; pause off-screen (the existing `Book3D`/`ShimmerDots` IntersectionObserver pattern is the template). Heavy effects degrade to static gold-lit images on phone.

**Accessibility (page-wide).** WCAG AA minimum (v2 palette already passes). Every interactive target ≥ 44px on coarse pointers. Visible gold focus ring (`:focus-visible` 2px gold, 2px offset). All decorative canvases/visuals `aria-hidden`. Logical heading order (one `<h1>` on /v1 hero; `<h2>` per beat). Motion all reduced-motion-safe.

---

# PAGE /v1 — LONG

Eleven beats, one continuous descent. The reader should feel the argument being *built and then stress-tested* before the price is ever mentioned.

---

```
SECTION: Hook  (copy beat: BEAT 1 · component: HeroBoardD.tsx / new HeroV1)
```

**VISUAL CONCEPT** — Full-viewport dark hero in the shimmer field. Left: the line "It's not gold. It's not bitcoin." in big light display type, the eye-stopping curiosity hook. Right: a single luminous gold object — a rough gold mass that glows softly from within, slowly turning — saying *this is gold, but something about it is different.* The feeling: calm, premium, a quiet "wait, what?" — never hype.

**LAYOUT** — v2 hero grid `lg:grid-cols-[1.1fr_0.9fr]`, `min-h-[100svh]`, items-center. Left column: eyebrow → `<h1>` → subhead (max 48ch) → primary CTA → under-CTA delivery/guarantee line → fine print. Right column: the glowing gold-mass visual (replaces the `Book3D` slot on this page — the book appears later at Beat 9). Eye path: headline → subhead → gold object pulls back to → CTA.

**IMAGERY** —
- A single rough nugget/mass of natural gold on black, lit from within so the gold reads as *proven/active*, not a jewelry shot. Macro, museum-lit, shallow depth, gold dust motes in the air around it.
- AI PROMPT (text-free): *"A single rough natural gold nugget resting on pure black, lit from within with a warm internal glow, extreme macro, museum studio lighting, shallow depth of field, fine gold dust particles suspended in dark air around it, cinematic, photoreal, no text, no numbers, no logos, no people"* · ROUTE: **author-manual (Tier-4 photoreal)** — surfaced for the author to run in Higgsfield; do NOT auto-fire.
- SOURCE/ASSET: to be generated (author-manual). **Interim/fallback for first build:** reuse `Book3D` in the right slot (already on-brand, zero new asset) until the photoreal hero ships.

**MOTION** — Gold object: very slow continuous Y-rotation (~40s/turn) OR pointer-follow tilt reusing the existing `Book3D` interaction model (cursor-anywhere, lerp 0.16, paused off-screen). Internal glow gently breathes (opacity 0.85↔1, 6s ease-in-out). Headline + subhead: reveal-up on load, 600ms, staggered. CTA: settles last (cue to act). Reduced-motion: object static in a 3/4 lit pose, glow fixed, text in final state.

**CONVERSION RATIONALE** — The hook's whole job is the curiosity gap ("not gold, not bitcoin — then what?"). The visual must *deepen* the mystery, not answer it (the book is the answer). A lit, turning gold mass = instant "premium + something new" without a single compliance-risky claim. CTA above the fold for the already-convinced; the rest of the page is for everyone else.

**RESPONSIVE** — Desktop: side-by-side, object large. Tablet: stacked, object centered above text at ~60% size, still interactive. Phone: text-first (headline is LCP), object below at ~50% size as a static lit still (no per-frame JS) to protect performance; CTA full-width, thumb-reachable; under-CTA lines wrap to two rows.

**ACCESSIBILITY** — `<h1>` carries the headline. Gold object `aria-hidden` (decorative) OR `alt="A rough natural gold nugget glowing from within"` if `next/image`. CTA is a real `<a>`/`<button>` with discernible name "Get the book for seventeen dollars". Contrast of light text on dark field passes AAA.

**PERFORMANCE** — Headline/CTA are HTML (LCP safe). Photoreal hero image `priority`, AVIF/WebP ≤ 400KB, explicit dimensions. If using `Book3D`/canvas, it is already off-screen-paused and reduced-motion-safe.

---

```
SECTION: The shift / why it matters  (copy beat: BEAT 2 · component: new ShiftV1)
```

**VISUAL CONCEPT** — A quiet, large statement section that lands the 6,000-year reframe: "owning gold meant digging it out — for the first time, it doesn't have to." Behind the text, a faint, slow time-strip: pickaxe-era → modern open pit → a clean glowing point — the method changing while the gold stays the same. Calm, almost editorial.

**LAYOUT** — Single wide column or `[1.1fr_0.9fr]`: eyebrow → big `<h2>` (clamp 2.2–4.25rem) "For six thousand years…" with the subhead "For the first time, it doesn't have to." as the gold-accented turn (like v2's "It isn't. Not anymore."). Body paragraph (max 54ch) explaining verify-in-place + "digital gold mining." One gold rule under the turn line.

**IMAGERY** —
- A subtle, low-opacity background band: three faint sepia-to-gold vignettes — an ancient hand panning, a modern terraced open-pit mine, and a single clean point of gold light — left to right, the method evolving.
- AI PROMPT (text-free): *"Three faint cinematic vignettes blending left to right on black — an ancient hand panning gold in a river, a vast modern terraced open-pit gold mine seen from above, dissolving into a single clean point of warm gold light — desaturated sepia to gold, atmospheric, photoreal, no text, no numbers, no logos"* · ROUTE: **author-manual (Tier-4 photoreal)**.
- SOURCE/ASSET: to be generated. Fallback: type-only on the shimmer field (cover test passes — the words carry the beat alone).

**MOTION** — Background band parallaxes very slowly on scroll (the "point of light" brightens as the section centers). Gold turn-line ("…it doesn't have to.") draws in / fades up after the headline. Reduced-motion: band static at low opacity, no parallax.

**CONVERSION RATIONALE** — This is the "stakes reframe" — it must feel *historic and calm*, not salesy. A faint time-progression visual makes the "6,000 years → now" instantly felt, raising the perceived importance of the book without any upside claim.

**RESPONSIVE** — Desktop: full band behind text. Tablet: band crops to center third. Phone: drop the band to a single faint gold-point glow behind the turn line; text stacks, headline scales down via clamp.

**ACCESSIBILITY** — Background `aria-hidden`. Contrast: keep band ≤ 0.18 opacity so body text stays AA. Heading order maintained.

**PERFORMANCE** — Background band is one lazy AVIF ≤ 350KB or a CSS gradient stand-in; parallax is transform-only.

---

```
SECTION: The problem (with the human face)  (copy beat: BEAT 3 · component: ProblemV1)
```

**VISUAL CONCEPT** — The emotional low point and the page's biggest single number. A giant **$22 trillion** counter (visual primacy, per copy) glowing in the dark — "verified gold sitting in the ground" — set against the *human cost* of the old way (the Chocó mercury-pit story). The section feels heavier, dimmer at the edges — the strain of extraction — with the huge gold number as the one bright thing: the value that's just *sitting there*, unreached by the broken method.

**LAYOUT** — Two movements:
1. **Stat lead:** oversized `$22T` mono counter (v2's `$22T` treatment, `clamp(5rem,16vw,12rem)`, line-height 0.85) + small source caption directly beneath ("Gold that is geologically verified, sitting in the ground. As of February 26, 2026, gold at $5,194/oz.").
2. **The strain:** eyebrow "The problem" → `<h2>` "The old way of producing gold is under real strain." → body (Chocó story + Extraction S.P.I.R.A.L. + "29 years" path). Optionally a slim **6-force strip** for the S.P.I.R.A.L. (six small labeled ticks) — route to visual-strategist (see ASSET LIST).

**IMAGERY** —
- A muted, serious documentary still evoking the human/environmental cost — a scarred open-pit or a mercury-sheened tailings edge — desaturated, NO identifiable individuals (compliance + dignity), the gold number floating bright above it.
- AI PROMPT (text-free): *"A desaturated documentary aerial of a scarred artisanal gold-mining pit, muddy water with a faint metallic sheen, terraced earth, overcast heavy atmosphere, no people, cinematic, photoreal, somber, no text, no numbers, no logos"* · ROUTE: **author-manual (Tier-4 photoreal)** — sensitive subject; author runs and approves.
- The 6-force "Extraction S.P.I.R.A.L." mini-figure (if used): a tightening-spiral or 6-tick strip, labels drawn in HTML/CSS. ROUTE: **visual-strategist** (chart/diagram, NOT a price chart).
- SOURCE/ASSET: still to be generated; spiral figure to be built.

**MOTION** — `$22T` counts up from 0→22 on scroll-into-view (the existing `NumberCounter`), one time, ~1.2s ease-out. Background still fades from dark to slightly-lit as the number lands. The spiral strip assembles tick-by-tick on scroll. Reduced-motion: number shows final `$22T` immediately, no count; spiral fully drawn.

**CONVERSION RATIONALE** — Problem-agitation done compliantly: the pain is the *industry's* (cost, harm, 29-year timelines), never the reader's missed gains. The huge $22T is the open loop — "all that proven value, stuck" — that the rest of the page resolves. The human story creates the moral stakes that make the reframe land.

**RESPONSIVE** — Desktop: number + text side-by-side (v2 `$22T` layout). Tablet: number on top, text below. Phone: number scales via clamp but stays dominant; caption wraps; documentary still becomes a short letterboxed band, not full-bleed; spiral strip stacks vertical.

**ACCESSIBILITY** — `$22T` has an accessible label "$22 trillion of geologically verified gold still in the ground." `aria-live` not needed (not live data). Documentary image `alt` describes scene, no people. Maintain AA contrast over imagery (dark scrim).

**PERFORMANCE** — `NumberCounter` is cheap JS. Documentary image lazy AVIF ≤ 450KB. Spiral is inline SVG/CSS (no image weight).

---

```
SECTION: The reframe  (copy beat: BEAT 4 · component: ReframeV1 / reuse v2 reframe)
```

**VISUAL CONCEPT** — The turn of the whole argument, reusing the v2 page's strongest moment: "Gold mining **already** runs on verification, not just digging." A clean, confident, type-led section — the gold word "already" italic-light — with one piece of hard proof made visual: the Barrick / Donlin "$1B for ~39M oz, nothing in production" fact rendered as a single quiet **fact-card**, not a chart.

**LAYOUT** — v2 reframe grid `[1.1fr_0.9fr]`: left = big `<h2>` with gold italic "already"; right = body (max 54ch) + a single bordered **fact-card** ("Barrick sold its half of Donlin — ~39 million ounces of verified gold — for $1 billion in cash, nothing in production."). The card is the one accent: thin gold top-border (`.v2-tile` + gold rule), mono figure.

**IMAGERY** — None photoreal. The fact-card IS the visual.
- Fact-card: `.v2-tile`, gold hairline top border, the dollar/oz figures in mono (`tabular-nums`), source line beneath in `--v2-faint`. ROUTE: **code-only** (built from v2 tokens). Compliance: this is a *reported industry transaction*, framed as "verification has real market value" — NOT a return the reader gets. Keep the framing factual; no "you could…".

**MOTION** — Headline reveal-up; the gold word "already" gets a 200ms delayed gold-glow sweep (single pass). Fact-card slides up + hairline border draws left-to-right. Reduced-motion: static, border present.

**CONVERSION RATIONALE** — This is the logical fulcrum: if verification already moves billions, then extraction was only ever the *cost*, not the value — which makes digital gold mining obvious rather than exotic. One concrete, checkable transaction out-converts ten adjectives and builds trust (every-stat-sourced promise made visible).

**RESPONSIVE** — Desktop: side-by-side. Tablet: headline top, body+card below. Phone: stack; fact-card full-width, figures wrap gracefully (tabular-nums keeps alignment).

**ACCESSIBILITY** — Fact-card is a `<figure>` with the source as `<figcaption>`. Contrast AA. Heading order kept.

**PERFORMANCE** — Code-only; zero image weight; negligible.

---

```
SECTION: The mechanism — how it works  (copy beat: BEAT 5 · component: SolutionV1 / reuse v2 STEPS bento)
```

**VISUAL CONCEPT** — The "how" laid out as three clean steps that *assemble on scroll* — Verify → Represent → Hold & transfer — each a bento tile, plus a definition card for "digital gold mining." Reuses the v2 3-step bento language but elevated: a thin animated gold line threads through the three tiles in order (the gold "moving" from proof to digital rail), making the process feel like one flow, not three boxes.

**LAYOUT** — `SectionLabel n="..."` "The model" → `<h2>` "How digital gold mining actually works." → 3-col bento (`md:grid-cols-3`, `.v2-tile p-8`), each with `01/02/03`, title, body. Below: a full-width **definition card** (distinct, gold-tinted `.v2-tile` like the `.cta-card` gradient) holding the NatGold definition + "ten patent-pending applications … USPTO." The connecting gold thread runs tile→tile→definition.

**IMAGERY** —
- Optional tiny per-step icon-glyphs (drill core / linked node / arrows on a rail), line-style gold, drawn — NOT photoreal. ROUTE: **visual-strategist** (or Lucide line icons recolored gold, code-only).
- The 3-step flow connector (gold thread): **code-only** (SVG path + stroke-dashoffset animation).
- SOURCE/ASSET: icons to be built or Lucide (`shield-check`, `link`, `arrow-left-right`); thread is code.

**MOTION** — Tiles reveal-up staggered (60ms). The gold thread draws from tile 1 → 2 → 3 → definition via `stroke-dashoffset` as the section scrolls through (scroll-linked). On tile hover (desktop): the tile's number glows + lifts (v2 `.v2-tile:hover translateY(-5px)`). Reduced-motion: thread fully drawn, no hover lift on coarse pointers.

**CONVERSION RATIONALE** — This is the "aha" — the reader must finish it thinking "oh, that's actually simple and legitimate." Steps that build in order (with the gold literally flowing proof→digital) make a novel model feel inevitable and safe. The definition card + USPTO patent line is the credibility anchor that defuses "is this real?".

**RESPONSIVE** — Desktop: 3 across, horizontal thread. Tablet: 3 across or 2+1, thread re-routes. Phone: stack vertically, thread becomes a vertical gold line down the left edge linking the steps; definition card full-width below.

**ACCESSIBILITY** — Steps as an ordered list `<ol>`. Thread `aria-hidden`. Definition card readable, patent line not visually buried. Icons `aria-hidden` (decorative; text carries meaning).

**PERFORMANCE** — Bento + SVG thread are light. Icons inline SVG. No raster images required.

---

```
SECTION: Why now  (copy beat: BEAT 6 · component: ConvergenceV1)
```

**VISUAL CONCEPT** — Three long-running forces *converging* into one moment, then a hard forward-pull to the July 8, 2026 public test. Visual: three faint streams (central-bank gold, real-world-asset tokenization, the next generation) flowing into a single bright gold convergence point, which then resolves into the dated line "the first tokens are set to trade on July 8, 2026."

**LAYOUT** — Eyebrow "Why now" → `<h2>` "Why this is worth understanding now." → body. Then a **convergence figure** (three inbound lines → one node) OR a clean 3-tile row of the three forces, each a `.v2-tile`, converging visually toward a centered closer line: "This is a real development … about to be tested in public." The date is the gold accent.

**IMAGERY** —
- Convergence diagram: three labeled inbound strands merging into one gold node. Labels drawn in HTML/CSS. ROUTE: **visual-strategist** (diagram). Compliance: depict *forces/trends in the industry*, never a price trajectory or "growth = your gain."
- SOURCE/ASSET: to be built (visual-strategist).

**MOTION** — The three strands draw inward and meet at the node (scroll-linked stroke animation), the node pulses gold once on convergence. The date line fades up last. Reduced-motion: diagram static in converged state.

**CONVERSION RATIONALE** — "Why now" is the urgency beat — but the urgency must be *understanding before a public event*, not "buy before it moons." Converging trends + a real, dated, public milestone (July 8) gives honest time-pressure that LemonSqueezy compliance allows.

**RESPONSIVE** — Desktop: full convergence diagram. Tablet: simplified to 3 stacked force-tiles + a single down-arrow to the date. Phone: 3 stacked tiles, date line as a bold gold band; drop the animated strands for a static gold node.

**ACCESSIBILITY** — Diagram `<figure>` with a text alt summarizing the three forces. Date line in body text (screen-reader reachable). Contrast AA.

**PERFORMANCE** — SVG diagram, code-driven; no heavy raster.

---

```
SECTION: Proof in the real world — Cahuilla case study  (copy beat: BEAT 7 · component: CaseStudyV1)  [VERIFY framing]
```

**VISUAL CONCEPT** — "Not theory — a real deposit taken through the model, start to finish." A horizontal **process timeline** of the Cahuilla project moving through the digital-gold-mining stages (verification → institutional standards → approval gate), shown as a clean documentary-meets-diagram strip. Feels like evidence, an exhibit — calm and concrete.

**LAYOUT** — Eyebrow "The case study" → `<h2>` "Not theory — the first real gold deposit, taken through the model and documented start to finish." → body. Below: a **stepped timeline** (4–5 stages) as connected `.v2-tile`s or nodes on a gold rail, each stage = a short label (what it requires). A single muted photoreal anchor image of real drill-core or a verification setting sits beside it for texture.

**IMAGERY** —
- Anchor still: a tray of drill core / a geologist's core-logging table (the literal *evidence* of verification), warm-lit, documentary, NO dollar figures, NO "value created," NO investment outcome (per [VERIFY] flag).
- AI PROMPT (text-free): *"A row of cylindrical rock drill cores laid in wooden core-sample trays on a field table, warm directional light, fine mineral detail, shallow depth of field, documentary, photoreal, no people, no text, no numbers, no logos"* · ROUTE: **author-manual (Tier-4 photoreal)**.
- Timeline rail + nodes: **code-only / visual-strategist** (labels drawn in HTML). Stages framed as *process steps*, positively per the book, with **no dollar "value created" and no investment-outcome claim** (compliance hard line).
- SOURCE/ASSET: core image to be generated; timeline to be built.

**MOTION** — Timeline nodes light up one-by-one along the gold rail as the section scrolls (the deposit "moving through" the model). Anchor image gentle Ken-Burns on scroll (≤1.04 scale). Reduced-motion: all nodes lit, image static.

**CONVERSION RATIONALE** — The single strongest objection to a novel model is "does it actually work?" A real, named deposit walked through the pipeline = the proof beat. Process-over-payoff framing keeps it compliant while still being the most persuasive section (concrete > abstract).

**RESPONSIVE** — Desktop: horizontal timeline + image beside. Tablet: timeline full-width above, image below. Phone: vertical timeline (rail down the left), nodes stack; image a letterboxed band.

**ACCESSIBILITY** — Timeline as an ordered list with stage labels. Image `alt="Rock drill cores in sample trays on a field table"`. No people. AA contrast.

**PERFORMANCE** — One lazy AVIF ≤ 450KB; timeline is SVG/CSS.

> **PUSHBACK / OPEN [VERIFY]:** the copy flags Cahuilla framing for a public sales page. This spec deliberately uses **process imagery only** (drill core, stages) with **no dollar value, no resource size, no outcome** — the safest visual reading. If the author confirms a fuller positive framing, a single sourced figure could be added to the timeline; until then, keep it figure-free.

---

```
SECTION: Credibility — who wrote it  (copy beat: BEAT 8 · component: AuthorV1 / People.tsx)
```

**VISUAL CONCEPT** — Trust beat. "Written by someone who ran a gold company inside this shift." A restrained author panel: portrait (if author supplies one) + the credential line (former President of Great Eagle Gold / NatBridge, 200+ projects assessed) + the honest stake disclosure, kept visible (not hidden). Sober, editorial, high-trust — the opposite of guru.

**LAYOUT** — `[0.9fr_1.1fr]`: left = author portrait in a `.v2-tile` with a thin gold frame; right = `<h2>` + body credentials + a distinct **disclosure line** ("The author holds a stake in the model he describes… educational, not financial advice.") in a quietly bordered note so it reads as integrity, not fine print.

**IMAGERY** —
- Author portrait: real photo, **author-supplied** (do not generate a person). If none available: a credibility-by-environment still (a field/geology setting, no identifiable face) as a placeholder.
- ROUTE: **author-supplied photo** (preferred) / **author-manual** placeholder still if needed.
- SOURCE/ASSET: awaiting author portrait.

**MOTION** — Panel reveal-up; the disclosure note's border draws in (signals "we're showing you this on purpose"). No gimmicks here — trust beats want stillness. Reduced-motion: static.

**CONVERSION RATIONALE** — Authority + radical honesty is the conversion engine for a $17 info product about a sensitive topic. Putting the stake disclosure *forward* (not buried) flips a liability into a trust signal and satisfies compliance simultaneously.

**RESPONSIVE** — Desktop: portrait + text side-by-side. Tablet: portrait top, text below. Phone: stack; portrait ~64% width centered; disclosure note full-width, never collapsed.

**ACCESSIBILITY** — Portrait `alt="Andrew Fletcher, author"`. Disclosure is real readable text. AA contrast. Heading order kept.

**PERFORMANCE** — One optimized portrait (≤ 250KB WebP), explicit dimensions.

---

```
SECTION: What you get  (copy beat: BEAT 9 · component: BookV1 / Book.tsx + Book3D)
```

**VISUAL CONCEPT** — The product, finally shown. The **3D book** (`Book3D`, the real cover, already built) appears here — pointer-tilt, gold-lit — beside the four-part contents. This is where "the glowing proof" becomes a tangible thing you can own. The book is the hero object of the lower page.

**LAYOUT** — v2 "The book" grid `[0.8fr_1.2fr]`: `Book3D` on one side; on the other, `<h2>` "The complete picture, built one piece at a time." + four contents tiles (01–04: the forces / how it works / the Cahuilla case / risks named) as a `sm:grid-cols-2` bento, plus the "every statistic sourced, plain English" sub-line.

**IMAGERY** —
- `Book3D` component (existing, on-brand, real cover art). ROUTE: **code-only (existing asset)**.
- Four contents tiles: `.v2-tile`, code-only.
- SOURCE/ASSET: `Book3D` (built); no new assets.

**MOTION** — `Book3D` pointer-follow tilt (existing: cursor-anywhere, lerp 0.16, paused off-screen; CSS float on touch; static on reduced-motion). Contents tiles reveal-up staggered. Reduced-motion: book static 3/4 pose.

**CONVERSION RATIONALE** — Seeing the actual product (a real, premium-looking book) at the decision-approach point makes the $17 feel concrete and fair. The four-part breakdown answers "what exactly am I buying?" with specifics (incl. the honest risk chapter), reinforcing value before the price.

**RESPONSIVE** — Desktop: book + 2×2 tiles. Tablet: book top, tiles 2-col below. Phone: book ~62vw centered (existing `--bw` clamp handles it), tiles single-column.

**ACCESSIBILITY** — `Book3D` `aria-hidden` (decorative) with the contents conveyed in text. Tiles as a list. AA contrast.

**PERFORMANCE** — `Book3D` already optimized (WebP faces 195KB total, transform-only, off-screen-paused). No new weight.

---

```
SECTION: Honesty as proof — read the downside  (copy beat: BEAT 10 · component: HonestyV1)
```

**VISUAL CONCEPT** — "The book argues a case — then argues against it." The unique trust move. Visual: a balanced, two-sided treatment — the thesis on one side, the named risks (sell when you want? is the gold there? company fails? government seizure? gold price falls?) on the other — with one risk visibly marked **"still open."** Feels like a fair trial, not a pitch.

**LAYOUT** — Eyebrow "Read the downside too" → `<h2>` "The book argues a case — and then argues against it." → a **risk ledger**: a clean list/grid of the named risks, each a small `.v2-tile`, with the one "still open" risk distinctly marked (gold-outlined, label "still open"). Body explains each is answered with the same mechanics; the open one is flagged honestly.

**IMAGERY** —
- Risk ledger: **code-only / visual-strategist** (a stress-test grid; each risk a tile with a check or an "open" marker). NO photoreal needed. Markers drawn in HTML.
- SOURCE/ASSET: code-only.

**MOTION** — Risk tiles reveal-up one by one (each "named and answered"); the "still open" tile gets a single slow gold pulse to draw the honest eye. Reduced-motion: all static, "open" marker present.

**CONVERSION RATIONALE** — Steel-manning your own thesis and *admitting one risk is still open* is the highest-trust move available — it pre-empts skepticism and makes the buyer feel respected, not sold. This is often the section that converts the fence-sitter. Compliance-perfect (it's literally disclosing risk, not promising upside).

**RESPONSIVE** — Desktop: risk grid 2–3 cols. Tablet: 2 cols. Phone: single column; "still open" tile stays visually distinct.

**ACCESSIBILITY** — Ledger as a list; "still open" conveyed in text, not color alone. AA contrast.

**PERFORMANCE** — Code-only; negligible.

---

```
SECTION: Close  (copy beat: BEAT 11 · component: FinalCTAV1)
```

**VISUAL CONCEPT** — The resolution. Centered, the core glow at its brightest — "Understand it for the price of a paperback." The gold CTA is the single brightest, largest interactive thing on the page; everything funnels here. The guarantee removes the last risk; the July 8 date gives the honest reason to act now.

**LAYOUT** — Centered narrow column (`max-w-[1100px]`, big `py-28 md:py-36`): `<h2>` "Understand it for the price of a paperback." → body ($17 one-time, instant digital delivery, before July 8) → guarantee line → **primary CTA "Get the book — $17"** → under-CTA delivery/guarantee line → fine print (LemonSqueezy secure checkout, educational not advice, author stake). The CTA is centered and large.

**IMAGERY** — None photoreal. The page's core glow concentrates behind the CTA; optionally a faint `Book3D` echo or gold ring behind the button. ROUTE: **code-only**.

**MOTION** — On entering this section, the page core-glow brightens to its peak (scroll-linked) and the CTA does ONE gentle gold-glow settle. No flashing, no countdown timer (compliance — the July 8 date is stated, not a ticking clock). Reduced-motion: glow static, CTA static.

**CONVERSION RATIONALE** — Single clear decision, single button, last objection killed (12-month guarantee), honest urgency (dated public event). Centered + brightest = the trained eye lands exactly where it must. One product, one price, one button = the direct-response rule the brief mandates.

**RESPONSIVE** — Desktop: centered, large CTA. Tablet: same, slightly tighter. Phone: CTA full-width, thumb zone; guarantee + fine print stack; ample tap target.

**ACCESSIBILITY** — CTA discernible name; fine print real text (not an image); focus ring visible. AA/AAA contrast (gold button on dark passes).

**PERFORMANCE** — Code-only; the LCP for this section is text/button. No new weight.

---

# PAGE /s — SHORT (cold social traffic)

One screen, one breath, one button. Same brand DNA, stripped to the fastest possible hook → explain → buy. The page must load instantly and convert a cold scroller in seconds. **Heaviest discipline on performance and clarity** — every effect here must justify itself against load time on a phone over mobile data.

---

```
SECTION: Hook + one-breath explanation + buy  (copy beats: /s BEAT 1–5 · component: ShortS)
```

**VISUAL CONCEPT** — A single, near-full-screen composition: the same lit gold mass (the one big idea) anchoring "It's not gold. It's not bitcoin." with a one-breath explanation, a one-line credibility, a one-line "what you get," and the gold CTA — all visible with minimal scroll. The feeling: premium, mysterious, fast — earns the click before the scroller loses interest.

**LAYOUT** — Single centered column (or `[1fr_1fr]` on desktop with the gold object beside the text). Vertical order: eyebrow → `<h1>` "It's not gold. It's not bitcoin." → subhead (the real shift) → one-breath "what it is" line → one-line credibility (Andrew Fletcher, 200+ projects) → one-line "what you get" (sourced stats, real deposit, the argue-against-itself chapter) → **CTA "Get the book — $17"** → sub-line "Read it before the first tokens trade on July 8, 2026." → under-CTA "Delivered instantly · 12-month money-back guarantee · Educational, not financial advice." Everything above or near the fold; at most one short scroll on phone.

**IMAGERY** —
- The same lit gold-mass hero (reuse the /v1 hero asset — ONE shared asset, no extra production). On phone, a static lit still.
- AI PROMPT (text-free): same as /v1 Beat 1 gold-nugget prompt · ROUTE: **author-manual (Tier-4 photoreal)** — shared with /v1.
- SOURCE/ASSET: shared with /v1 hero (generate once, use on both). Fallback: `Book3D`.

**MOTION** — Minimal by design: gold object slow rotate or static; text fades up once on load (fast, ~400ms); CTA settles last. NO scroll-heavy effects (cold traffic = speed first). Reduced-motion: all static.

**CONVERSION RATIONALE** — Cold social traffic has ~3 seconds of patience. One screen that delivers the curiosity hook + instant credibility + the offer, with a premium look that signals "legitimate, not a scam," is the entire game. No long scroll to lose them in; the short page is a focused funnel to the single button.

**RESPONSIVE** — Desktop: object + text side-by-side, all in one view. Tablet: stacked, object above text, fits one-and-a-bit screens. Phone: text-first (headline LCP), compact static gold still, CTA full-width in the thumb zone, supporting lines tight; total height kept to ~1.3 screens max.

**ACCESSIBILITY** — `<h1>` hook; CTA discernible name; all disclosure lines real text. Gold object `aria-hidden` or alt. AA/AAA contrast.

**PERFORMANCE** — Strictest budget on the funnel: LCP is the HTML headline. Hero image `priority`, AVIF ≤ 350KB, explicit dims (zero CLS). ShimmerDots at reduced opacity; consider a static gold-grain CSS texture instead of the canvas on phone to shave INP. No below-fold lazy work needed (page is tiny). Target sub-2s LCP on 4G.

---

## ASSET LIST (by route)

**Author-manual (Tier-4 photoreal — surfaced for the author to run in Higgsfield; NOT auto-fired):**
1. **Hero gold-mass** — lit-from-within rough gold nugget on black with gold dust. *(Used on /v1 Beat 1 AND /s — generate once, shared.)*
2. **Method time-strip** — pan → open-pit → point-of-light (3 blended vignettes). *(/v1 Beat 2; optional, type-only fallback.)*
3. **Documentary cost still** — desaturated scarred artisanal pit, no people. *(/v1 Beat 3; sensitive — author approves.)*
4. **Drill-core anchor still** — rock cores in sample trays, no people, no figures. *(/v1 Beat 7 Cahuilla.)*
5. **Author portrait** — REAL photo, **author-supplied** (do not generate a person). *(/v1 Beat 8; placeholder environment still only if needed.)*

**Visual-strategist (chart/diagram/figure — NEVER a price/return chart; labels drawn in HTML/CSS):**
6. **Extraction S.P.I.R.A.L. 6-force strip/spiral** — *(/v1 Beat 3; optional.)*
7. **3-step flow icons** (verify / represent / hold-transfer) — line glyphs *(/v1 Beat 5; or Lucide code-only).*
8. **Why-now convergence diagram** — three forces → one node *(/v1 Beat 6).*
9. **Cahuilla process timeline** — staged rail, no dollar/outcome figures *(/v1 Beat 7).*
10. **Risk ledger grid** — named risks + one "still open" marker *(/v1 Beat 10).*

**Code-only (built from v2 tokens / existing components — no asset production):**
11. **$22T count-up** (`NumberCounter`) *(/v1 Beat 3).*
12. **Barrick/Donlin fact-card** *(/v1 Beat 4).*
13. **3-step bento + animated gold thread** (SVG) *(/v1 Beat 5).*
14. **NatGold definition card** (gold-tinted tile) *(/v1 Beat 5).*
15. **`Book3D`** (existing) *(/v1 Beat 9).*
16. **Four contents tiles** *(/v1 Beat 9).*
17. **Final-CTA core-glow + button** *(/v1 Beat 11, /s).*
18. **Page-wide scroll-linked core glow + reveal-on-scroll hook** *(global).*

**Existing assets reused (no production):** `ShimmerDots`, `Book3D`, `NumberCounter`, `BuyButton`, `Footer`, all `.v2-*` classes.

**Asset count by route:** author-manual **5** (1 shared across both pages) · visual-strategist **5** · code-only **8** · existing-reused **5**. **Total new visuals to produce: 10** (5 photoreal author-manual + 5 visual-strategist figures); everything else is code or already built.

---

## OPEN QUESTIONS / PUSHBACK

1. **Cahuilla framing (Beat 7 / Beat 9 card) — [VERIFY, hardest one].** I designed the case-study section with **process imagery only** — drill core, staged timeline, **no dollar "value created," no resource size, no investment outcome** — because the copy flags real-world resource sensitivity and the LemonSqueezy line is "no investment claim." **Recommendation:** ship it figure-free as spec'd; only add a single sourced figure if the author explicitly confirms it's safe for a public page. Do not let an engineer add a "value created" number.

2. **Note: the live `/v2` page still carries non-compliant copy/visuals** ("Missed Bitcoin?", "You're early," "$469M / 17,466 / 162 reserved," "$871M of tokenized value," "before Wall Street," the email waitlist). This spec is for **/v1 and /s only** and deliberately drops ALL of those — no "join investors" social-proof tiles, no "you're early," no $871M Cahuilla value, no email capture. The engineers must **not** copy those v2 sections over. Flagging because v2 is the visual reference and the temptation to reuse its stat-tile section is real — that section is a compliance trip on these pages.

3. **Hero photoreal vs. ship-now.** The killer hero is the author-manual gold-mass image, which the author must run. **Recommendation:** build the structure now with `Book3D` in the hero slot as a fully on-brand interim (zero new asset, already compliant), and swap in the photoreal gold-mass when the author delivers it. The page is not blocked on image generation.

4. **Author portrait (Beat 8).** Needs a real author-supplied photo. Do not AI-generate a person. If no portrait is available at build time, use an environment/geology still placeholder and the text-only credential treatment — the beat still works.

5. **$22T perishability.** Keep the "as of February 26, 2026, gold at $5,194/oz" caption locked to the number wherever it appears (it's price-linked and perishable). If the figure is ever refreshed, the caption date must move with it.

6. **No countdown timers anywhere.** The July 8, 2026 date is stated as a fact, never rendered as a ticking clock — a live countdown reads as manufactured FOMO and risks the compliance line. Spec'd as static dated copy on both pages.

7. **Split-test parity.** /v1 and /s share the hero asset and the brand system so the A/B test measures *page length/structure*, not *art direction* — keep the shared visual DNA identical so the test is clean.
