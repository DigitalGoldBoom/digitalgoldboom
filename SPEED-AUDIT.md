# Speed Audit & Plan — digitalgoldboom.com (web/)

Date: 2026-06-26 · Method: production `next build` output + source/asset inspection.
Stack: Next 16, React 19, Tailwind 4, GSAP, Vercel.

> **Honesty note:** the "Diagnosis" section below was the first pass from build output + file
> inspection. It was **partly wrong** — see "MEASURED RESULTS" which supersedes it. This is
> exactly why we measure: the giant earth-cube PNGs don't even load on the homepage
> (`next/image` handles them), and the real homepage villain is JavaScript, not images.

---

## ✅ MEASURED RESULTS (2026-06-26, Lighthouse mobile/throttled) — source of truth

**Homepage `/` baseline → after P0 image optimization** (two clean runs each; one noisy run
showing 85,000 ms TBT was machine-contention garbage and discarded):

| Metric | Baseline | After images | Note |
|---|---|---|---|
| Perf score | 55 | 56 | |
| Total bytes | 978 KB | **581 KB** | ✅ −40% — real, proven win |
| LCP | 4.3 s | 4.1 s | still over 2.0 s budget |
| **TBT** | 5,170 ms | 5,230 ms | ➖ images don't touch this |
| CLS | 0 | 0 | ✅ already perfect |

**What was done (P0 images):** re-encoded the 6 Book3D face images PNG→WebP (590 KB → 195 KB,
−67%); pointed `Book3D.tsx` at the WebP; enabled `images.formats: [avif, webp]` site-wide +
immutable cache headers for static asset dirs in `next.config.ts`.

**THE REAL BOTTLENECK (measured):** the homepage spends **~9,000 ms in Script Evaluation**,
and **~8,100 ms of it is in a single JS chunk**. The LCP element is just the `<h1>` headline
**text** — so LCP is gated entirely by when that script frees the main thread. 70 KB of JS
taking 8 s to *execute* = heavy continuous work, almost certainly the **hero particle/canvas
animations** (`HeroShimmer`, `ShimmerDots`, `FallingGold`) running an expensive rAF loop that
never idles. **This — not images — is what makes the site slow.**

### Next P0 (the JavaScript) — proposed
1. Profile the hero canvas effects; cut per-frame cost (fewer particles, throttle FPS, pause
   when off-screen / on reduced-motion — same pattern Book3D already uses), or replace with a
   cheaper CSS/static treatment. Target: TBT < 200 ms, LCP < 2.0 s.
2. Audit the 34 `"use client"` components; return static ones to Server Components; lazy-load
   below-the-fold islands so the homepage ships less JS.
3. Re-measure after each change; confirm against this baseline.

---

---

## Diagnosis — what's actually slowing it down (ranked by impact)

### P0 — Image weights are the dominant problem (biggest, cheapest win)
- **8 "earth-cube" PNGs at ~3.2 MB each (~25 MB total)**, each only **1500×1200**. At that
  size a well-encoded AVIF/WebP is **~100–180 KB** — these are **~20× too heavy**.
- `earth-cube-hero-pristine.png` (3.2 MB) is loaded with **`priority`** as the hero/LCP image
  on `concept-d`, `concept-old`, `concept-ps`. A 3.2 MB LCP image = a slow first paint on any
  phone — directly the metric that loses the visitor before the pitch.
- Other heavy sources: `book3d-framer/cover-texture.png` **404 KB** (used at 0.19 opacity on
  the 3D book — far too heavy for a faint overlay); `public/images/Digital…` 789 KB.
- `next/image` IS used with `priority` (good), **but** the *source* files are multi-MB and
  `next.config.ts` is **empty** — so AVIF isn't enabled and the optimizer is grinding huge
  inputs.

### P1 — Config and caching are unset
- **`next.config.ts` is empty.** No `images.formats` (AVIF), no device-size tuning, no
  long-lived immutable cache headers for `/images` and `/book3d-framer`, no compression
  tuning, **no security headers** (CSP/HSTS/nosniff/referrer/frame). All of this is free
  performance + safety left on the table.

### P1 — An 11 MB server fetch on the live-data path
- The RWA market-cap source pulls **`https://api.llama.fi/protocols` (~11 MB JSON)** to keep
  only the `category === 'RWA'` rows (build log: *"items over 2MB can not be cached"*). It's
  server-side with a fallback (good), but it's slow, uncacheable as-is, and re-fetched on
  revalidate. Wasteful for the handful of rows actually needed.

### P2 — Client-bundle surface
- **34 of 75 components are `"use client"`.** Largest JS chunk is **222 KB**. Some are surely
  necessary (GSAP, forms), but a 45% client ratio suggests static UI is shipping as client JS
  it doesn't need — parse cost on cheap phones (hurts INP/TBT).

### P2 — Dead-weight routes in the build
- `concept-d`, `concept-old`, `concept-ps`, `long`, `news` look like A/B/experimental variants
  that carry the heaviest images. If they aren't meant to be public, they shouldn't ship,
  be crawled, or be optimized.

---

## The plan — ordered by impact ÷ effort

### Step 0 — Baseline (do first, so every fix is proven)
Run Lighthouse (mobile, throttled) on `/` and one concept page; record LCP/CLS/INP + total
transfer. This is the before-number. Re-run after each P0/P1 step.

### P0 — Crush the images  *(expect the largest LCP drop)*
1. **Re-encode every earth-cube** to AVIF (WebP fallback) at the real display size; target
   < 200 KB each. ~25 MB → ~1–1.5 MB total.
2. **Enable the pipeline** in `next.config`: `images.formats: ['image/avif','image/webp']`,
   sane `deviceSizes`/`imageSizes`. Confirm every `<Image>` has correct `sizes` and only the
   true LCP image keeps `priority`.
3. **Shrink/drop `cover-texture.png`** (404 KB → ~30 KB, or remove — it's at 0.19 opacity).

### P1 — Config, caching, headers
4. **`next.config`:** immutable long-cache headers for `/images/*` and `/book3d-framer/*`;
   compression on; **security headers** (CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
   frame-ancestors). Speed + safety in one file.
5. **Fix the 11 MB fetch:** cache the DefiLlama result hard (e.g. revalidate hourly, store
   only the filtered RWA rows), or move to a slimmer endpoint; keep the existing fallback.
   Cap the payload — never hold 11 MB to use a few rows.

### P2 — Trim the client + the build
6. **Audit `"use client"`:** convert static components back to Server Components; lazy-load
   below-the-fold client islands. Target a smaller largest-chunk.
7. **Decide the concept/experimental routes:** if not public, exclude from the build/deploy
   and `noindex` them so they stop carrying the heavy images.

### Verify (every step)
Re-run Lighthouse; confirm **LCP < 2.0s, CLS < 0.05, INP < 200ms** on a throttled mid-phone,
total transfer down, build + lint green, no security-header regressions. Report real numbers.

---

## Expected shape of the win
The image work (P0) alone should move LCP the most — turning multi-MB hero loads into ~150 KB.
P1 compounds it (AVIF + caching + a non-blocking live fetch). P2 tightens INP/TBT. Numbers to
be confirmed against the Step-0 baseline — no guesses recorded as fact.
