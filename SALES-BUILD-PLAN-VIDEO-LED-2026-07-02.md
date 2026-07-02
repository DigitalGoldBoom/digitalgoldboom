# /s BUILD PLAN — VIDEO-LED, FINAL & EXECUTABLE (2026-07-02)

> **What this is:** the finalized, sequenced BUILD PLAN for the video-led /s page, by `dgb-funnel-designer`. It closes every remaining design decision in `SALES-DESIGN-SPEC-VIDEO-LED-2026-07-02.md` (the approved spec — NOT redesigned here) so the engineer (`framer-web-engineer` / `dgb-framer-converter`) can build stage by stage with zero design decisions of their own.
> **Governing docs:** blueprint `SALES-PAGE-VIDEO-LED-BLUEPRINT-2026-07-02.md` (copy/scripts) · brief `SCROLL-DESIGN-BRIEF-2026-07-02.md` (direction) · `SALES-COPY-WORKING.md` (compliance) · `DESIGN-SYSTEM.md` + `src/app/v2/page.tsx` (tokens/components).
> **Skill law:** I spec, I don't build. I don't self-certify — build gates are `dgb-qa` + the auditors, design review pass follows build.
> **Hard constraints carried whole (never relax):** /s only, root + all live pages untouched · three breakpoints + reduced-motion as first-class code paths · CWV budget with the S1 POSTER image as LCP (never the video — do not "optimize" this away) · $22T = the page's ONLY gold number · glow on UI only, never on imagery of gold/rock · no trading-UI/chart-up imagery · evergreen (no countdowns) · "reserved" never "raised", "patent applications" never "patents", BIV = "a reference — the market sets the price" · every conversion event instrumented (named hooks below; taxonomy final call = `dgb-conversion-analytics`) · real DOM copy twins for every video (SEO) · VideoObject schema DEFERRED until real files ship.

---

## 1 · THE ONE VISUAL IDEA (restated)

One continuous journey: down into the earth at night, back out into dawn.
Scroll = depth + time — the page opens on the mountain in darkness, descends to the verified seam, walks the machine and the people, and re-emerges at sunrise at the CTA.
One gold thread (THE SEAM) runs the whole way; everything else earns its gold.

---

## 2 · THE TWO SIGNATURE MOMENTS (and the demotion list)

Per the interaction library's binding rule (one world · ≤2 signature moments), the page gets exactly two. Everything else is supporting cast.

**SIGNATURE A — THE DESCENT (S1→S2).** The one hero pattern (#2-class scroll-scrubbed transformation): a pinned push-in from the night mountain into the underground cross-section, ending on the $22T counter. **Conversion job:** it makes the page's core claim physical — *the value is down there and real* — one scroll before the biggest number lands. The reader's own thumb does the reveal; agency = attention = the credibility spike the $22T needs.

**SIGNATURE B — THE DAY ARC + THE SEAM (page-wide).** The one structural pattern (#16 world variable + #15 line-draw fused into one system): scroll drives `--daylight` 0→1 (night → dawn) while the seam thread grows the whole page length and completes at the CTA. **Conversion job:** coherence reads as art direction, art direction reads as trust — and the dawn at S7 is the emotional resolution that makes the calm close land. Highest wow-per-byte on the page.

**DEMOTED to supporting-cast intensity (explicit):**
- **S4 3-plate sequence** — plain opacity crossfades on scrub, NOT a second scrubbed set-piece. Desktop pin capped at +=140%. Phone: no pin at all (static triptych).
- **S5 Book3D** — reuse the EXISTING `src/components/Book3D.tsx` as-is (pointer tilt, static pose on touch/reduced-motion). **No R3F, no 36-frame turntable, no scroll-tied rotation in v1** — the spec's R3F book was a third heavyweight and is cut by the effect-density budget. (Optional ±8° scroll rotateY = Stage 5 polish, desktop only, non-blocking.)
- **Kinetic text** — exactly TWO masked landings on the whole page: "FOUND. VERIFIED. STUCK." (S2) and "A $10 BILLION MINE. GONE IN 39 DAYS." (S4, the one hard cut). No other headline gets SplitText treatment.
- **Counters** — $22T (S2) and patents-to-10 (S3) only. No other stat animates.
- **Cut entirely:** magnetic buttons, custom cursor (cold traffic is majority phone — zero value), marquees/tickers (compliance-adjacent), hover-reveal media, horizontal galleries.
- **Grain/atmosphere** = the gold-dust canvas ONLY. No second atmosphere layer, ever (dust + day-arc overlays is the ceiling).

---

## 3 · GLOBAL SYSTEMS — FINAL SPECS

### 3.1 THE SEAM (scroll progress = the gold thread)

**Implementation: a transform-only DIV fill on a fixed rail — no SVG stroke needed (cheaper, compositor-only).**

**Desktop (≥1024px):**
- Fixed rail: `left: 28px`, `top: 96px`, `bottom: 32px`, `width: 2px`, `pointer-events: none`, `z-index: 40` (above content, below the GLOBAL Navbar at z-50 — the nav zone is ~72px tall on desktop; 96px clears it with air).
- Track layer: 1px wide, `rgba(232,178,58,0.12)` (v2-gold at 12%).
- Fill layer: 2px, `var(--v2-gold)` at 0.8 opacity, `transform: scaleY(var(--seam-progress))`, `transform-origin: top`; tip = 8px tall gradient fade so the end reads as a growing thread, not a bar.
- `--seam-progress` (0→1) written by ONE page-spanning ScrollTrigger — the same trigger that drives `--daylight` (§3.2). One trigger, two vars. **Trigger span amended (QA bug-8, 2026-07-02): `start: "top top"`, `end` = the BOTTOM of `#s-close` (S7), NOT `"bottom bottom"`** — the global Footer is not part of the film; the arc and seam must hit 1.0 at the S7 CTA area, never stretch into the footer.
- **Footer handoff (bug-8):** once scroll passes the bottom of `#s-close` into the global Footer, the seam rail (track + fill + nodes; phone bar likewise) fades out — 300ms opacity, REVERSIBLE (fades back in when the user scrolls back up into the page). The day-arc overlays simply hold at `--daylight: 1` over the footer (fixed layers; no extra handling).
- **Waypoint nodes (7):** 6px circles centered on the rail at each section's scroll-start fraction. Fractions computed at mount from `sectionEl.offsetTop / (scrollHeight - innerHeight)`, recomputed on resize (debounced 200ms). States: *upcoming* = 1px border `rgba(232,178,58,0.35)`, transparent fill; *passed* (fill tip crosses it) = gold fill + ONE scale pulse 1→1.4→1, 300ms `expo.out`, once. No labels, no hover UI (dead simple).
- **The one narrative flourish:** at 55% of the descent pin (§4, S1→S2), the seam tip brightens to opacity 1 and pulses once (400ms) — "the thread connects to the vein." No glow shadow (seam is UI chrome; keep it matte-flat, a 2px line needs no bloom).

**Tablet (768–1023px):** same as desktop, rail at `left: 20px`.

**Phone (<768px):** top-bar variant — fixed 2px horizontal bar at the VERY TOP of the viewport (`top: 0`, full width, `z-index: 60`, `pointer-events: none` — above the global nav's blur strip; the phone nav is a floating pill, so "under the header" doesn't exist and a mid-air bar at ~78px would read orphaned; top-of-page reading-progress position is the correct home). `transform: scaleX(var(--seam-progress))`, origin left, same gold/track colors. Waypoint nodes = 2px×6px vertical ticks at the section fractions, same passed-state color flip (no pulse on phone — subtlety over spectacle at 2px). At 2px it never obscures the nav; it must never intercept input.

**Reduced-motion (all breakpoints):** static full-length hairline at 20% opacity, all nodes visible at 0.35 opacity, no fill animation, no pulses. (Phone reduced-motion: static full-width hairline.)

### 3.2 THE DAY ARC (`--daylight`, dark → dawn)

**Mechanism (final):** ONE ScrollTrigger spanning the page (shared with the seam) scrubs a GSAP timeline that tweens a proxy `{d}` through the waypoint keyframes below (linear ease between waypoints). `onUpdate` writes `document.documentElement.style.setProperty("--daylight", d.toFixed(3))` — max one var write per frame.

**Waypoint table (the page's grade script):**

| Scroll waypoint | `--daylight` | Feel |
|---|---|---|
| S1 top | 0.00 | full night |
| Descent end / S2 | 0.05 | underground — darkest world, near-flat |
| S3 top | 0.18 | first grey light |
| S4 top → end | 0.30 → 0.40 | heat, still dark |
| S5 top | 0.55 | pre-dawn |
| S6 top | 0.72 | first warmth |
| S7 top → CTA | 0.85 → 1.00 | dawn breaks, warmest at the button |

**What consumes it (exactly two fixed overlay layers + the dust field — nothing else):**
- `NightLayer`: fixed inset-0, `background: linear-gradient(180deg, rgba(10,12,24,0.50), rgba(8,8,13,0.72))`, `opacity: calc(1 - var(--daylight))`.
- `DawnLayer`: fixed inset-0, `background: radial-gradient(90% 60% at 50% 0%, rgba(232,140,58,0.16), transparent 60%), linear-gradient(180deg, rgba(232,178,58,0.06), transparent 70%)`, `opacity: var(--daylight)`.
- **NO `mix-blend-mode`, NO animated CSS filters** — plain alpha overlays, compositor-only. Section imagery is PRE-GRADED (night hero baked dark, dawn image baked warm); the arc is atmosphere on top, never a runtime color-grade of images.
- Dust field reads daylight from a mirrored JS variable (never `getComputedStyle` per frame).

**GPU cost ceiling (binding):** ≤4 simultaneously-animated composited layers page-wide (2 overlays + dust canvas + the active section's one transform). Zero paint/layout in steady-state scroll — transform/opacity only, everywhere.

**Reduced-motion:** `--daylight` fixed at **0.35** (readable dusk mid-state, set once, no trigger); S7 still reads warm via its baked image.

### 3.3 GOLD DUST (ShimmerDots elevated)

Canvas 2D, fixed layer between the background imagery and content. **120 particles desktop / 70 tablet / 40 phone**, DPR capped at 2, **30fps** rAF throttle, pause on `document.hidden` and when fully offscreen. Drift + mild scroll-velocity response (lerped, ±20% speed). Density × brightness scale linearly with daylight (sparse/dim at 0, catching light at 1 — brightness cap 0.5 alpha; dust never reads as "gold in the ground": AIR layer only, never composited over the cross-section's vein area — during the descent pin the dust layer fades to 0 by 20% of the pin and returns after). Reduced-motion: render ONE frame, stop the loop (static texture). Low-end gate: `deviceMemory < 4` → 24 particles.

### 3.4 VIDEO PANEL (`ModulePanel` — one component, four uses)

Frame: 16:9 reserved aspect box (zero CLS forever), 1px `--v2-line` border warming to `rgba(232,178,58,0.4)` when active, 4 corner ticks (8px, gold 0.5), chip top-left in `v2-eyebrow` style: `01 · THE MODEL` / `02 · WHO BUILT IT` / `03 · WHY NOW` / `04 · THE BOOK`, duration tag top-right (`v2-num` style: "2:20" etc.).

**State machine (final):**

| State | When | What renders |
|---|---|---|
| **PLACEHOLDER** (ships now) | no master exists | Code-only title board: `--v2` tile ground (`rgba(255,255,255,0.025)`) + chip + module title in `v2-display` (clamp 1.5–2.5rem) + one-line promise (the module's hook line as static text) + duration tag. **NO play affordance** — a play button that plays nothing is a dead pixel that kills trust. No image dependency. |
| **POSTER** | poster file exists, video not yet in view | Poster image (AVIF/WebP, `next/image`, S1's = `priority`) + center play ring (56px, 1px gold ring, ▸ glyph) + chip/ticks. |
| **PLAYING-MUTED** | ≥50% in view for 300ms (debounced) | `<video muted playsinline autoplay preload="metadata">` mounts and plays; captions are burned into the file (always). Play ring swaps to a sound-on affordance: pill "Tap for sound" bottom-right of panel, 44px min target. |
| **SOUND-ON** | user tap/click anywhere on panel | Unmute in place (no restart), native controls appear, a small ↺ restart button in panel chrome. Sticky pill (§3.5) stays clear of the caption band. |
| **PAUSED-OFFSCREEN** | <25% visible | pause. After 30s fully offscreen: unload `src` (free memory), revert to POSTER. |

**IntersectionObserver thresholds:** pre-mount video element at `rootMargin: 200px` (metadata only) · autoplay at ratio ≥0.5 · pause at <0.25. LCP law: the video element NEVER mounts before the page's LCP has fired.

**Analytics hooks (named, wired from day one — events fire in placeholder state too where sensible):** `s_module{n}_impression` (panel ≥50% once) · `_play_muted` · `_sound_on` · `_q25/_q50/_q75/_complete` · panel state exposed for `dgb-conversion-analytics` re-mapping.

**Copy twins (SEO, real DOM):** each module gets (a) its argument already present as the section's visible copy, and (b) a `<details>` "Read the transcript" disclosure containing the full VO text (crawlable, styled `text-sm --v2-dim`). VideoObject schema: NOT now — only when real files ship (route to `dgb-seo-llm` at Stage 6).

**Responsive:** desktop S1 = lower-right third; tablet/phone = full-width block in flow. Reduced-motion: NO autoplay — POSTER state with play ring; tap = play with sound + controls.

### 3.5 STICKY BUY — REVISED 2026-07-02 against the REAL chrome (global Navbar + Footer)

> **Chrome reality (verified):** `src/app/layout.tsx` renders the GLOBAL `Navbar` (fixed, z-50, PixelShovel wordmark + center pill + "Contact Us" CTA, no buy CTA) and global `Footer` on every route including /s. Both are UNTOUCHABLE (root/live-pages hard line). The custom /s sticky header previously spec'd here is **CUT** — no second header ever renders under the global nav (double chrome). The framer-web-engineer "every page keeps nav + footer" standard is satisfied by the global pair.

- **ALL breakpoints get the docked buy pill.** When the S1 hero CTA scrolls out (IO on the button, once it's <10% visible), the pill docks bottom-right, `position: fixed`, `z-index: 45`:
  - **Desktop/tablet:** `bottom: 24px; right: 24px`, `v2-btn` at its native 54px min-height, full label "Get the book — $37". (Right side — never collides with the seam rail at `left: 28px`.)
  - **Phone:** `bottom: 16px; right: 16px`, height 48px, `v2-btn` compact, same label.
- Entrance y 12→0 + fade 250ms `expo.out`. Dismissible (✕, 24px glyph / 44px hit area); once dismissed it stays gone for the session (S7's primary CTA serves the close).
- **MICRO-DISCLOSURE (QA fix 2026-07-02 — compliance requires disclosure proximity at EVERY purchase CTA, and the pill is one):** a one-line caption chip stacked directly ABOVE the pill (never inside the button — the button copy stays the CTA), right-aligned to the pill's right edge, 6px gap. Text exactly: **"Educational — not financial advice."** · 11px · color `--v2-dim` (NOT `--v2-faint`; must measure ≥4.5:1) · inside a backing chip `rgba(8,8,13,0.72)`, `border-radius: 999px`, `padding: 4px 10px` so contrast holds over any full-bleed imagery · single line, `white-space: nowrap` (~230px at 11px — fits a 390px phone). The chip is ONE UNIT with the pill: same entrance/exit animation, same hide rules, same z-45; dismissing the pill removes both. All breakpoints identical. The chip is not a tap target (pointer-events none).
- **Hide rules (all breakpoints):** hidden while a `ModulePanel` is in SOUND-ON state and ≥50% in view (clear of captions/controls) · hidden while the S7 primary CTA is ≥50% in view (no redundant chrome beside the page's biggest button; returns if the user scrolls back up).
- **Events:** `s_sticky_shown` · `s_sticky_click` (+ `over_section: s1…s7` property from the waypoint tracker) · `s_sticky_dismissed` — now fire on all breakpoints.
- Reduced-motion: pill appears/disappears with opacity only.
- The global nav's temp V1/V2/V3/S compare tabs are the author's — not this build's to remove.

**Z-INDEX LADDER (final, against the real chrome):**

| Layer | z |
|---|---|
| Section background imagery | 0 |
| Gold dust canvas | 1 |
| NightLayer / DawnLayer overlays | 2 / 3 |
| Section content | 10 |
| Seam rail (desktop/tablet) | 40 |
| Sticky buy pill | 45 |
| GLOBAL Navbar (untouched) | 50 |
| Phone seam progress bar (2px, pointer-events none) | 60 |

(Pill sits BELOW the nav so the open mobile menu covers it; the 2px phone bar sits above the nav blur strip but can never block input.)

### 3.6 SECTION RHYTHM + SCROLL SUBSTRATE

- Rhythm as spec'd: full-bleed cinema (S1, descent, S4, S7) alternating with contained content (S2, S3, S5, S6). Section padding `clamp(40px, 8vw, 64px)` vertical; container `max-w-[1320px] px-6 md:px-10` (match v2).
- **Smooth scroll:** Lenis on desktop pointer-fine ONLY (`lerp: 0.1`), NATIVE scroll on all touch devices and under reduced-motion. Never alter scroll speed.
- **Easing family (one, page-wide):** entrances `expo.out`; scrubbed timelines `none` (linear vs scroll); micro-interactions the v2 CSS transitions as-is. No other eases.
- **Section waypoint tracker:** one IO (threshold 0.4) over the 7 sections → fires `s_section_reach_{s1..s7}` once each + feeds `over_section` to the sticky pill.

---

## 4 · SECTION CHOREOGRAPHY — IMPLEMENTATION-FINAL

> Every block: desktop → tablet → phone → reduced-motion. All animation transform/opacity only. All "once" triggers use `once: true`. CTA labels everywhere: **"Get the book — $37"**; disclosure lines exactly as blueprint.

### S1 — HERO (Module 1)
- **Load choreography (total ≤900ms, gated on hero image `decode()` OR a 600ms timeout, whichever first; CTA pointer-events live from first paint):**
  - eyebrow: opacity 0→1, 300ms, t=0
  - headline (SplitText by word, the page's line 1 of 2 allowed kinetic uses is NOT here — plain line-rise): 2 lines y 24→0, opacity, 600ms `expo.out`, stagger 80ms, t=100ms
  - sub → CTA → caption → fine print: y 16→0, opacity, 450ms, stagger 90ms, t=350ms
  - Module 1 panel: y 40→0, opacity, 500ms `expo.out`, t=450ms
- **Scroll:** parallax, scrub true: sky 0.2×, mountain 0.5×, foreground ridge/dust 0.85× (`translate3d` Y only).
- **Tablet:** 2 layers (drop foreground), same values. Panel full-width below CTA.
- **Phone (the majority composition):** 100svh; eyebrow → headline `clamp(2.2rem, 9vw, 3.2rem)` → sub (≤2 lines) → full-width CTA (54px) → caption/fine print → Module 1 panel near the fold-bottom. **Peek amended (QA 2026-07-02): accepted AS-BUILT** — whether the panel sits fully inside or partially below the first viewport varies by device height and is fine; do NOT force an exact peek (100svh offset math is brittle across devices). The scroll cue is therefore the chevron on ALL breakpoints, not the peek. Parallax 2 layers at half distance (0.1/0.25); `deviceMemory<4` → static composite.
- **Scroll cue (ALL breakpoints):** 12px chevron + "scroll" `v2-num` micro-label, bottom-center of the first viewport (`bottom: 12px`), static (no bounce animation), fades out permanently on first scroll. Reduced-motion: same (it's static; instant hide on scroll is fine).
- **Reduced-motion:** everything visible instantly, static composite, panel in POSTER/PLACEHOLDER state.
- **LCP law:** LCP = the S1 poster image once it exists (priority); until then the hero mountain composite (priority). Video mounts only post-LCP + in-view. Dust canvas defers 1s after load.

### S1→S2 — THE DESCENT (SIGNATURE A)
- **Desktop:** ScrollTrigger `pin: true`, `start: "top top"`, `end: "+=150%"`, `scrub: 1`, `anticipatePin: 1`. Linear timeline on the cross-section plate (`will-change: transform`):
  - 0→40%: scale 1.0→1.25, y 0→−6%; top radial vignette opacity 0→0.7 (the ground closing over)
  - 40→70%: vignette 0.7→0.2 (eyes adjust); scale →1.45; **at 55%: seam-tip pulse callback fires once (§3.1)**
  - 70→100%: scale settles →1.6; S2 eyebrow fades in (y 12→0, opacity, last 15% of scrub)
  - Dust layer fades to 0 by 20% of the pin, returns after unpin (house rule: no dust underground).
- **Tablet:** `end: "+=120%"`, scale cap 1.45.
- **Phone:** `end: "+=75%"`, scale 1.0→1.3, single-layer vignette. `deviceMemory<4` or Save-Data: NO pin — static full-bleed cross-section with 0.2× parallax and a 300ms fade-through.
- **Reduced-motion:** no pin; static cross-section shipped pre-cropped at the 1.3 frame; plain scroll, 300ms section fades.
- **Imagery:** ONE cross-section plate — matte gold vein in real rock, cool scene light, NO glow/luminescence (hard rule). 2000px AVIF ~200KB + 1200/800 variants. Until the render lands: code-built dark strata gradient + the vignette (choreography built and tested against it; final quality gates on the render — see §7).

### S2 — THE $22 TRILLION
- Trigger: once at 50% in view.
- Counter: GSAP proxy 0→22e12 over 1.2s `power2.out`, rendered as formatted `$22,000,000,000,000` (tabular-nums — zero shift), `aria-label="22 trillion dollars"`, the page's ONLY gold number (`--v2-gold`).
- "FOUND. VERIFIED. STUCK." — kinetic use 1 of 2: three words, masked rise y 8→0, 400ms `expo.out`, stagger 200ms, starting at counter complete.
- As-of caption (`--v2-faint`): fades in 400ms, +0.4s after the words. **The caption is in the same DOM block and same trigger as the number — it can never render without it (compliance).**
- Backdrop: lingering cross-section at 20% opacity. No other imagery — type IS the visual.
- **Tablet/phone:** number `clamp(2.5rem, 11vw, 6rem)`, may wrap once, alignment held by tabular-nums; counter 1.0s.
- **Reduced-motion:** all static at final values, caption visible.

### S3 — WHO BUILT IT (Module 2 + receipts bento)
- Header + panel enter: y 24→0 opacity, 500ms `expo.out`, once at "top 80%".
- Tiles (ScrollTrigger.batch, `start: "top 80%"`, once): y 28→0, opacity, 600ms `expo.out`, stagger 90ms.
- Patents tile: counter 0→10, 0.8s `power2.out`, once, in-view; **the drawn caption "patent applications — in examination, USPTO" is STATIC in the tile markup, never animated, never separable from the number.**
- Deposits tile: two markers scale 0→1 (300ms, stagger 150ms) + ONE 300ms pulse each, once. (Interim tile = typographic: "CAHUILLA, CALIFORNIA · FRIDAY, IDAHO" over a code-drawn dark grid — no fabricated geography; map render upgrades it later.)
- Demand tile (wide): static text — "$469M reserved · 17,466 people · 162 countries" + "no money changed hands" caption + framing line + press-release link chip (`s_press_release_click`). NO counter here (demoted: counters are S2 + patents only; also keeps the reservations number cool, not hyped — compliance posture).
- Radke/Ash: typographic cards (institutional 1px border, name + exact former title) — DEFAULT; licensed photos only if author supplies (never AI likenesses).
- Ghost CTA (`v2-btn-ghost`) under grid → `s_cta_click_s3`.
- **Tablet:** 2-col bento. **Phone:** single column, order: video → Demand → Radke → Ash → Patents → Deposits → ghost CTA.
- **Reduced-motion:** static grid, counters at final values.

### S4 — WHY NOW (Module 3 + the heat)
- **Desktop:** headline + panel enter as S3. Then the pinned stat block: `pin: true`, `start: "top top"`, `end: "+=140%"`, `scrub: 1` over the 3-plate backdrop:
  - Plates: opacity-only crossfades — pit 100%→0 across 0–33%, crowd 0→100→0 across 25–66%, gates 0→100 across 60–100%. (`will-change: opacity`, all three ≤100KB, lazy.)
  - **"A $10 BILLION MINE. GONE IN 39 DAYS."** — kinetic use 2 of 2 and the page's ONE violent moment: `set()` (hard cut, no tween) at 15% of the pin + scale 1.04→1 over 150ms. Nothing else on the page hard-cuts.
  - 29-year timeline: its own trigger (`start: "top 70%"`, `end: "+=60vh"`, scrub true), SVG `stroke-dashoffset` 1→0, era tick labels fade as the line passes them. Meaning lives in the static state; the draw dramatizes it.
- **Tablet:** pin `end: "+=100%"`, same plates.
- **Phone:** NO pin. Static vertical triptych (3 stacked images), "39 DAYS" snaps in once at in-view (same hard cut), timeline rendered VERTICAL, scrubbed over 50vh.
- **Reduced-motion:** static triptych, timeline pre-drawn, all text static.
- Body copy under; no CTA in this section (heat resolves into S5's substance, not a panic buy — flat-authority voice).

### S5 — INSIDE THE BOOK
- 2×2 bullet tiles: same batch/stagger values as S3. Lucide icons per spec.
- **Book3D: the existing component, unmodified** (pointer tilt desktop, static ¾ pose touch/reduced-motion). Desktop right of grid; tablet/phone below, centered, `--bw` scaled to viewport.
- "17 chapters in two sections. Written in plain English." caption.
- Section lazy-mounted (below-fold). Reduced-motion: static everything.

### S6 — WHO WROTE IT (the stillness)
- ONE animation: whole-section opacity 0→1, 300ms, once. Nothing else moves — the stillness after S4's heat IS the design.
- Two-col desktop (portrait left / story right), Chocó paragraph as `<blockquote>` pull-quote, disclosure line in a bordered quiet box (`--v2-line` border, NEVER gold — honesty doesn't shout) and **the disclosure has zero animation** (visibly un-designed = real).
- Portrait: author-owned photo only; until supplied, single-column typographic layout (no placeholder face, no stock, no AI likeness — hard rule).
- Phone: portrait (when it exists) top, text below. Reduced-motion: static.

### S7 — THE CLOSE (Module 4 + dawn)
- `--daylight` 0.85→1.00 across the section (§3.2); the seam fill completes and its endpoint node ticks gold + one pulse timed to the CTA entering view.
- Full-bleed dawn mountain (baked warm). Interim until the render: the S1 mountain composite + a static warm gradient overlay (flagged, §7).
- Contained column enters once at "top 75%": eyebrow → headline → panel → offer body → guarantee (check icon) → **primary CTA (lg, the page's biggest button)** → fine print; y 20→0 opacity, 500ms `expo.out`, stagger 80ms. CTA interactive from first paint of the section.
- Price anchor micro-strip: "$37 today · ~~$97~~ regular" — static, quiet (`--v2-faint`), REAL price step only, no countdown, nothing animated.
- Fine print exactly: "Secure checkout via LemonSqueezy. Educational content — not financial advice."
- **Phone:** mountain as background at 40% + darkening overlay; text contrast ≥4.5:1 verified over the image; CTA full-width.
- **Reduced-motion:** static warm composite, all content visible.

---

## 5 · MOBILE-FIRST COMPOSITION (the majority version — designed, not degraded)

Most cold social traffic arrives on a phone. The phone page is a **fast vertical film strip**: full-bleed image moments alternating with tight copy cards, thumb-driven, nothing trapped in pins.

| Section | What the phone version IS |
|---|---|
| S1 | Full-screen night title card; headline/CTA stacked; Module 1 panel peeking above the fold-bottom = the scroll cue. |
| Descent | The one short pin (+=75%) — a 2-second thumb-pull into the earth. Low-end/save-data phones: no pin, straight cut with parallax. |
| S2 | The number, huge, wraps once, counter + three words + caption. Pure type. |
| S3 | Video, then a single-column receipt stack ordered by proof weight: Demand → Radke → Ash → Patents → Deposits. |
| S4 | No pin. Video, hard-landing stat line, vertical 29-year timeline drawing down the screen, triptych stack. |
| S5 | Four bullets, then the book (static-tilt pose), centered. |
| S6 | Still card. Portrait (when supplied), story, quiet disclosure box. |
| S7 | Dawn full-bleed at 40%, offer column, full-width CTA. |
| Global | 2px seam progress bar at the very top of the viewport (z-60, above the global nav strip) · full day arc (it's cheap) · 40 dust particles · sticky pill after the hero CTA leaves · 44px targets everywhere · burned captions always · native scroll (no Lenis). |

Both signature moments SURVIVE on phone (descent shortened, day arc full) — the phone reader gets the same one world, just tighter.

---

## 6 · BUILD SEQUENCE (ordered, each stage with its acceptance criterion)

> Engineer builds in this order; each stage is verifiable before the next starts. The engineer does NOT self-certify — `dgb-qa` + the optimization/fidelity auditors gate each stage. Root and all live routes stay byte-identical throughout.

**STAGE 0 — FOUNDATION.** Replace the current `/s` (`ShortFunnel`) with the new page scaffold: 7 semantic sections with ALL real copy from the blueprint (real DOM, correct headings h1→h2), compliance strings exact, `robots: noindex` retained (author decides indexing at launch). GSAP/ScrollTrigger/Lenis wired but idle. Archive `ShortFunnel.tsx` (unrouted, not deleted).
✅ *Accept:* `/s` renders all 7 sections' copy with zero animation; production build green; every other route unchanged (diff-verified); Lighthouse a11y ≥95 on the static page.

**STAGE 1 — GLOBAL SYSTEMS.** DayArc (one page trigger → `--daylight` + `--seam-progress`), Seam (rail + phone bar + nodes), Dust field, `ModulePanel` (full state machine, shipping in PLACEHOLDER state), StickyBuy, section waypoint tracker + ALL named analytics hooks.
✅ *Accept:* scrolling top→bottom moves `--daylight` exactly per the §3.2 waypoint table; seam fills + nodes tick; panels render title boards (no dead play buttons); sticky pill shows/dismisses per rules; every named event observed firing once in debug; reduced-motion: fixed 0.35 dusk + static seam verified.

**STAGE 2 — THE SPINE (S1 + DESCENT + S2).** Hero with load choreography + parallax; the descent pin (against the interim strata composite); the $22T block.
✅ *Accept:* LCP = the hero/poster image ≤2.5s on throttled 4G mid-tier Android; descent scrubs without dropped frames desktop (DevTools perf: no long tasks >50ms during scrub) and janks nowhere on phone; CLS <0.05; the as-of caption provably cannot render apart from the number; reduced-motion path = static + readable end-to-end.

**STAGE 3 — THE MIDDLE (S3, S4, S5, S6).** Bento receipts + counters, the S4 pin/triptych + timeline + hard cut, book section, stillness section.
✅ *Accept:* patents caption exact ("applications", "USPTO"); demand tile wording exact ("reserved", "no money changed hands") + press-release link fires its event; phone orders match §5; S4 phone has no pin; S6 has exactly one 300ms fade and an unanimated disclosure; all counters correct under reduced-motion (static finals).

**STAGE 4 — THE CLOSE (S7 + arc completion).** Dawn section, seam completion pulse, primary CTA, price anchor.
✅ *Accept:* `--daylight` hits 1.00 at the CTA; seam endpoint ticks; phone contrast over image ≥4.5:1 measured; all CTA events (`hero/s3/s7/sticky`) fire with positions; zero countdowns/urgency artifacts anywhere.

**STAGE 5 — POLISH + HARDENING.** Easing/stagger tuning pass (upgrade the easing, not the effect count), full CWV audit (LCP ≤2.5s, CLS <0.05, INP <200ms on mid-tier Android), a11y pass (focus order, `:focus-visible`, alt text, blockquote semantics), three-breakpoint screenshot review, full reduced-motion page walk, analytics event QA (each fires once, correct payloads). Optional desktop-only book scroll-tilt lands here or not at all.
✅ *Accept:* auditors' numbers pass; `dgb-qa` pre-ship gate passes; author eyes-on review.

**STAGE 6 — MASTER DROP-IN (zero rework by design).** As production delivers: posters → swap `posterSrc` prop (PLACEHOLDER→POSTER, aspect boxes already reserved = zero CLS, S1 poster becomes LCP with `priority`); masters → set `videoSrc` prop (state machine already built); final renders (cross-section, dawn, night regrade, map) → swap image sources; transcripts verified against final cuts; **only now** `dgb-seo-llm` adds VideoObject schema.
✅ *Accept:* each drop-in is a props/asset swap with no component changes; CWV re-audited after media lands; module video events observed against real playback.

---

## 7 · ASSET / PLACEHOLDER MATRIX

| Asset | Status NOW | Ships at build as | Drops in later |
|---|---|---|---|
| Book3D | **EXISTS** — `src/components/Book3D.tsx` | as-is | — |
| Token mark | **EXISTS** — `public/nav-framer/token-launch-mark.png` (footer/chrome use only; token appears as the mark only) | as-is | higher-res export if large use ever needed |
| v2 tokens / ShimmerDots seed / BuyButton / NumberCounter | **EXIST** in repo | reused/extended | — |
| Hero mountain (night) | source in hero-film bank (`fe049052`) — **NOT in repo; export + night regrade owed by Director** | interim code composite: layered night gradient + star field + dust (build not blocked) | Director's regraded plate |
| Underground cross-section (matte vein) | **NEW render — not produced** | interim code strata gradient (choreography built against it) | Director render (Signature A reaches FINAL quality only then) |
| Dawn mountain (same geology) | **NEW render — not produced** | interim: night composite + static warm overlay | Director render |
| Terrain map base (CA+ID) | **NEW render — not produced** | typographic deposits tile over code-drawn grid | Director render (markers stay code-drawn) |
| S4 plates (pit / crowd / gates) | bank re-score + 1 NEW — **not in repo** | S4 built with dark placeholder plates; triptych/crossfade wired | Director plates |
| Radke / Ash portraits | **UNRESOLVED rights** | typographic cards (the default spec) | licensed photos IF author supplies |
| Author portrait | owed by author | typographic S6 layout | author photo |
| Module 1–4 posters | video production — **not produced** | `ModulePanel` PLACEHOLDER state | poster props (S1's becomes LCP) |
| Module 1–4 masters (16:9; burned captions) | video production — **not produced** | — | `videoSrc` props |
| Seam / day arc / dust / counters / timeline / bento / panels / sticky | CODE-ONLY | built in Stages 1–4 | — |

*(9:16 masters are social-distribution assets, not page assets.)*

---

## 8 · OPEN QUESTIONS / PUSHBACK (only what blocks or protects)

1. **Imagery exports block FINAL quality, not the build.** Nothing from the hero-film bank is in the repo yet. The plan ships interim code composites so all six build stages proceed today — but Signature A (the descent) and S7's dawn only reach approved quality when the Director's renders land. Do not ship /s to paid traffic on the interim composites without the author explicitly accepting that state.
2. **Pushback held from the spec — repeat for the build:** the S4 hard cut is the page's ONE violent transition; the $22T is the ONLY gold number; glow stays on UI only. Any "add more wow" request during build should be refused and routed back here — the wow is one coherent world, not effect count.
3. **Book demotion (decision made here, flag to author):** the R3F/turntable book from the spec is CUT for v1 in favor of the existing Book3D (effect-density budget — two signatures already spend it). If the author wants the rotating-inspection book back, it costs either the descent's headroom on low-end phones or Stage 5 scope — his call, not the engineer's.
4. **/s stays `noindex` through the rebuild** (it's currently noindexed as an A/B variant). Indexing on/off at launch = author + `dgb-seo-llm` decision.
5. **Portraits:** default is the typographic cards. Only escalate if the author wants real photos (rights required; AI likenesses never).

---

*dgb-funnel-designer, 2026-07-02. This plan specs; it does not build and does not self-certify. Build gates: pixelshovel-optimization-auditor-class perf audit + dgb-qa pre-ship. Copy is the blueprint's verbatim; fact-verifier gate on numbers remains upstream per the blueprint's own master flag list.*
