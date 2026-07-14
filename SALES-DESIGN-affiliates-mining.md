# SALES-DESIGN — `/affiliates` + `/mining-industry`

> **Author:** `dgb-funnel-designer` (conversion design director). **Date:** 2026-07-01.
> **Mode:** full conversion + visual design pass on TWO live navbar pages. Goes DEEPER than the prior high-level `SALES-VISUAL-AUDIT.md` (which gave one ADD/LEAVE verdict per section) — this is a section-by-section *build spec* an engineer can build straight from, plus conversion (non-visual) and compliance fixes.
> **Builder ≠ breaker:** I direct and spec only. I do NOT write the production code (`framer-web-engineer` / `dgb-framer-converter`), I do NOT write the final copy (flagged for `dgb-funnel-copywriter` / `copywriting`), and I do NOT grade my own design (a review pass can follow). **Pushback is in §PUSHBACK on each page — it is mandatory, not optional.**
>
> **System note (corrects the prior audit):** both pages are wrapped in `<VaultShell>`, which ALREADY paints the fixed `ShimmerDots` gold field + radial gold top-glow + dark vignette. So the shimmer ground is present. What's missing is the *premium register* — both pages use the basic `.card` / `.eyebrow` / `--bg-*` token set instead of the elevated `v2-display` / `v2-tile` / `v2-num` / `v2-eyebrow` set that makes `/v2` (root) pop. The single biggest visual lever on BOTH pages is **porting the type + tile register up to v2**, not adding the shimmer (it's already there).
>
> **Two laws applied to every ADD:** (1) the visual serves THAT page's goal and the reader's understanding, ending at the action; (2) Desktop / Tablet / Phone are specified for every ADD, each with a reduced-motion fallback + a performance note.
>
> **Compliance lens = CLAIMS, not style.** Bold web3 aesthetic is welcome. What is forbidden is a *claim* the page is not allowed to make — and the two pages sit in two DIFFERENT compliance lanes (below). Every claim-trip is flagged **COMPLIANCE FIX**.

---
---

# PAGE 1 — `/affiliates`

> **⚠️ CASH-ONLY REWORK — 2026-07-01 (supersedes the prior cash→NATG ladder spec).** Author decision: affiliates are paid **cash commission only — NO NATG tokens.** Tracking + payouts run on **LemonSqueezy's native, built-in affiliate program** (free; affiliates sign up through LS, get a unique link + their own dashboard, and are paid by wire on LS's schedule). The whole cash → 50%-NATG → 100%-NATG view-target ladder is **REMOVED**. The page's single job is now: get a good promoter to **sign up as a LemonSqueezy affiliate** to promote the book (the $37 early-reader launch price, rising to the regular $97) and earn a cash commission on every sale they refer. The `/mining-industry` section of this file is unchanged.

## Conversion goal + audience (design to THIS, not the book funnel)

- **Audience:** potential affiliates / promoters — creators, finance/crypto social accounts, newsletter writers, anyone with a following who could share the book. Fast-scrolling, skeptical of "earn money" pitches (they've seen a hundred affiliate programs); they convert on *legit, specific, low-friction*.
- **Conversion goal:** ONE action — **become a LemonSqueezy affiliate** (click through to the LS affiliate signup, `[WIRE: LS affiliate signup link]`). LS is where the account, the unique link, and the dashboard live — so the real conversion is the click to LS, not an on-site form. **Optional lighter-touch variant:** a ONE-field (email) interest capture *before* LS onboarding for promoters who want to be walked through it — lowest friction, secondary to the LS click (see §A6).
- **The emotional job:** "this is a real, clean commission program from a serious operator — I get my own link, it tracks itself, and I get paid. Worth my audience." Legit and straightforward, never get-rich hype.

## ⚠️ COMPLIANCE LANE (cash referral reward — read before designing)

This page now sits in the SAME clean lane as the book: it is a **referral REWARD program** — earn a cash commission for sales you drive — run on LemonSqueezy's own affiliate feature. The hard line:

- It is a **commission for sales referred**, stated as a **percentage of the sale**. NEVER framed as an investment, returns, yield, income projection, "passive income," "earn $X/month," or any token/price upside. No NATG anywhere on this page.
- State the reward as **"earn [WIRE: commission %, up to 30%] of every sale you refer"** — a percentage of sales, NOT a dollar income you "could make." No "you could earn $___" projections.
- Keep the affiliate-disclosure line forward and visible (paid affiliate program; you earn a commission when your referral leads to a sale).
- Payout facts are LS's, not ours to invent — see the [VERIFY] flag in §A5/§A6 on LS's exact payout cadence and holding period.

## The one visual idea for `/affiliates`

**"One clean path: your link → a sale → your commission."** A single continuous gold thread is the page's spine — it introduces the simple cash-commission structure (a calm 3-step earn diagram, NOT a rising ladder), echoes as the connector through "How it works," and resolves at the lit signup panel. The reward is **flat and clear (one commission rate on every sale)**, so the visual is a *clean structure*, never a climbing line. Everything else is calm dark ground + the v2 register so the gold thread is the one bright, repeated accent.

---

## 🟡 READY-TO-PASTE CASH-ONLY COPY BLOCK (the whole page)

> Plain, calm brand voice — no exclamation points, named/specific, report-don't-sell. `[WIRE]` = LemonSqueezy generates/owns the value once the program is enabled. Drop straight into the page; the section specs below say where each block sits.

**HERO**
- **Eyebrow:** Share the book, earn a commission
- **Headline:** Promote the book. <gold>Earn cash</gold> on every sale you refer.
- **Subhead:** Sign up as a LemonSqueezy affiliate, get your own link, and earn a commission on every copy of Digital Gold Boom it sells. Tracked automatically. Paid by wire, straight from LemonSqueezy.
- **CTA:** Become an affiliate → `[WIRE: LS affiliate signup link]`
- **Disclosure (small, under CTA):** This is a paid affiliate program: when someone buys the book through your link, you earn a commission on that sale. Tracking and payouts are handled by LemonSqueezy. See our [Disclaimer](/disclaimer) and [Terms](/terms).

**THE COMMISSION (replaces "Three ways to earn")**
- **Eyebrow:** How the commission works
- **Headline:** One link. One rate. <gold>Paid on every sale.</gold>
- **Body:** You earn [WIRE: commission %, up to 30%] of the price on every copy of the book your link sells — the same rate on the first sale and the thousandth. There are no tiers to chase and no targets to hit. LemonSqueezy tracks each sale to your link and adds your commission to your balance.
- **3 clean facts (earn-structure diagram, NOT a ladder):**
  - **Your rate** — [WIRE: commission %] of every sale, flat.
  - **Tracked for you** — every sale through your link is counted automatically by LemonSqueezy.
  - **Paid by wire** — your balance is paid out on LemonSqueezy's regular schedule [VERIFY cadence], direct to your account.
- **Caption:** The exact commission rate and payout details are set in LemonSqueezy and shown to you when you sign up.

**HOW IT WORKS (4 steps)**
1. **Sign up as an affiliate** — Create your free affiliate account with LemonSqueezy. Takes a couple of minutes.
2. **Get your link** — LemonSqueezy gives you a unique link and your own dashboard to track clicks and sales.
3. **Share it where your people are** — Post your link anywhere you reach an audience — social, newsletter, video, bio.
4. **Get paid** — Every sale through your link earns you a commission, paid out by wire from LemonSqueezy.

**AFFILIATE TOOLKIT (gated — unchanged perk, cash framing)**
- **Eyebrow:** Affiliate toolkit
- **Headline:** We give you everything to post with.
- **Body:** The hardest part of sharing is making something good. Sign up and get a kit of ready-made mining footage, images, captions, and post templates — so your posts do the work for you.
- **CTA:** Become an affiliate → `[WIRE: LS affiliate signup link]`

**FAQ**
- **Q: How much do I earn?** — You earn [WIRE: commission %, up to 30%] of the price on every copy sold through your link. The exact rate is shown when you sign up.
- **Q: How are sales tracked?** — LemonSqueezy tracks every click and sale tied to your unique link, in your own dashboard. You don't have to manage anything.
- **Q: How and when do I get paid?** — LemonSqueezy pays your commission balance by wire on its regular payout schedule, after its standard holding period. [VERIFY exact cadence + holding period + any minimum payout against current LS docs.]
- **Q: Do I need to own crypto?** — No. This is a straightforward cash commission for selling a $37 book. No crypto, no wallet, nothing token-related.
- **Q: What does it cost me?** — Nothing. Signing up as a LemonSqueezy affiliate is free.
- **Q: What counts as a valid sale?** — A real purchase made through your link. LemonSqueezy handles the attribution and the standard rules; you'll see them when you sign up.

**SIGNUP (the conversion event)**
- **Heading:** Get your link and start earning.
- **Body:** Sign up as a LemonSqueezy affiliate, grab your unique link, and earn a commission on every copy you sell. Free to join, tracked automatically, paid by wire.
- **Primary CTA:** Become an affiliate → `[WIRE: LS affiliate signup link]`
- **Optional lighter-touch (one field):** *Prefer we walk you through it? Leave your email and we'll send the steps.* [single email field → existing `/api/subscribe`, `source:"affiliate-interest"`]

**FINAL CTA**
- **Headline:** Help people find the book. Earn for every copy you sell.
- **Body:** If your audience would want Digital Gold Boom, your link turns that into a commission on every sale.
- **CTA:** Become an affiliate → `[WIRE: LS affiliate signup link]`

---

## SECTION A1 — HERO  (maps to: current Hero · `affiliates/page.tsx` lines 132–165)

**CURRENT:** centered `eyebrow` + `<h1>` ("Share the book. Get rewarded for it.") + a sub that references NATG ("your whole purchase back in NATG") + one `btn-primary` ("Join the early list →") + affiliate-disclosure paragraph. Basic register.

**VERDICT: ADD (register port + one focal lift) + COPY SWAP to cash-only — high priority.**

**VISUAL CONCEPT** — Same calm composition, lifted to the premium brand register and re-pointed at the cash program. The `<h1>` becomes `v2-display` scale with the gold accent on "Earn cash"; the eyebrow becomes `v2-eyebrow` (the gold tick-line lead-in); one soft gold light sits behind the headline (the VaultShell radial is already there — nudge a second, tighter glow behind the CTA so the button is the brightest pixel). The CTA now goes OUT to LemonSqueezy, not to an on-page `#join`.

**LAYOUT** — Keep centered, `max-w-[860px]`. Eye-path: eyebrow → big headline (gold "Earn cash" is the hook) → one-line sub (own link, tracked, paid by wire) → **CTA button (brightest element) → LS signup** → disclosure (small, calm). Replace the bespoke `<h1>` inline styles with `v2-display`; replace `eyebrow` with `v2-eyebrow`; CTA ports to `v2-btn` for the sharper gold fill — keep that one button style across the page.

**IMAGERY** —
- No photoreal in the hero. The hero's job is the *proposition*; a literal "money/gold" image risks the get-rich tone we avoid. ROUTE: **code-only**.
- One optional flourish: a faint single gold "link-line" — a thin gold SVG line sweeping left→right behind/under the headline (suggests "your link reaching out"), opacity ~0.12, decorative. Optional; cover-test it.

**MOTION** — Headline + sub + CTA reveal-up on load, staggered 60ms, CTA last. The optional link-line draws (stroke-dashoffset) once on load, 700ms ease-out. **Reduced-motion:** everything in final state, line fully drawn static.

**CONVERSION RATIONALE** — Creators decide in ~2 seconds whether a program is worth their audience. The register port buys instant legitimacy; "Earn cash on every sale you refer" is concrete and self-explanatory (vs. the old multi-mechanic NATG pitch that needed a paragraph to parse). Sending the CTA straight to LS removes a step — the account/link/dashboard all live there.

**RESPONSIVE** — Desktop: full `v2-display` clamp (~3.6rem cap). Tablet: same centered, headline clamps down. Phone: headline ~2.1rem, sub ~16px, CTA full-width in the thumb zone, disclosure wraps; link-line opacity drops to ~0.08 to protect text contrast.

**ACCESSIBILITY** — `<h1>` carries the headline; link-line `aria-hidden`; CTA is a real link with a discernible name and (since it leaves the site) `rel="noopener"`; AA+ contrast on dark (gold-on-dark passes per DESIGN-SYSTEM §7.1).

**PERFORMANCE** — Pure CSS/SVG; zero new image weight. LCP = the HTML headline. No CLS (reveal is transform/opacity only).

> **COMPLIANCE / COPY (hard line):** keep it "earn a commission on every sale you refer," a **percentage of sales**. Never "earn big," "passive income," "$X/month," or any token/price language.

---

## SECTION A2 — THE COMMISSION  (replaces the old "Three ways to earn" · lines 167–201)

**CURRENT:** 3 parallel `.card`s — a cash tier plus two NATG tiers (50%/100% back, view-target triggers) with `StatusChip`s and a "not live yet" caption. This is the offer section.

**VERDICT: REPLACE — kill the three-way NATG structure entirely; show ONE clean cash-commission structure. (PRIORITY #1 for this page.)**

**VISUAL CONCEPT** — The reward is now *flat and simple*: one commission rate on every sale. So the visual is the opposite of a climbing ladder — it's a **calm 3-fact earn-structure strip** that makes "one link → one rate → paid on every sale" graspable at a glance. A single short gold thread links the three facts left→right (your rate → tracked for you → paid by wire), introducing the page spine — but it stays a *flat connector*, never an ascending/returns line.

**LAYOUT** — Three equal `v2-tile`s in a row (stacked on phone), connected by one thin gold hairline through their centers. Each tile carries a short label + one plain line:
1. **Your rate** — [WIRE: commission %] of every sale, flat.
2. **Tracked for you** — every sale through your link counted automatically by LemonSqueezy.
3. **Paid by wire** — your balance paid out on LemonSqueezy's schedule [VERIFY], direct to your account.
Heading above: "One link. One rate. Paid on every sale." Caption below: the exact rate + payout details are set in LemonSqueezy and shown at signup. **No `StatusChip`s** (nothing is "not live" anymore — the program opens when the book is on sale).

**IMAGERY** —
- ROUTE: **visual-strategist / code-only** — three tiles + a flat gold connector, all text drawn in HTML (no baked text). **NOT a chart. NOT a ladder. NOT a returns/price line.** It is a labelled, flat reward *structure*.
- If routed to `visual-strategist`, brief it explicitly: "flat 3-fact cash-commission structure, one rate on every sale, NO ascending shape, NO axes, NO returns/income connotation."

**MOTION** — Connector draws left→right, then each tile lights (gold border) in sequence on scroll-in, 120ms apart. **Reduced-motion:** connector drawn, all tiles lit, static.

**CONVERSION RATIONALE** — Comprehension *is* the conversion. "One rate on every sale, tracked for you, paid by wire" is the entire offer in one read — far stronger for a skeptical promoter than parsing tiers and view targets. Flatness is the honesty signal here: no targets to chase reads as "no catch."

**RESPONSIVE** — Desktop/tablet: 3-across with the flat connector. Phone: stacked tiles, a short vertical gold tick between them (not a long climbing rail); each tile full-width readable.

**ACCESSIBILITY** — Mark up as a list; the connector `aria-hidden`; meaning fully in text; AA contrast on the gold rate figure.

**PERFORMANCE** — Inline SVG + CSS, negligible; IntersectionObserver for the reveal. No CLS (reserve heights).

> **COMPLIANCE FIX / HARD LINE:** state the reward as a **percentage of each sale** ("[WIRE: %] of every sale"), never a projected dollar income, never "up to $X," never a tiered "earn more by hitting targets" mechanic. The connector must read as a flat structure, never a rising/returns line. No NATG, no token, anywhere in this section.

---

## SECTION A3 — HOW IT WORKS  (maps to: "How it works" 4 steps · lines 203–228)

**CURRENT:** 4 numbered steps with gold number chips, clean grid. The step copy references picking a "path" and "NATG when your post takes off" — that wording is now wrong.

**VERDICT: ADD (optional gold connector) + COPY SWAP to the LS flow.**

**VISUAL CONCEPT** — Echo §A2's gold thread as a single thin connector linking step 1→2→3→4, so the program reads as one continuous path (sign up → get link → share → get paid) rather than four boxes.

**LAYOUT** — Keep the 4-step grid. New step copy (cash/LS): **1 Sign up as an affiliate · 2 Get your link · 3 Share it where your people are · 4 Get paid** (full lines in the copy block above). Add a gold connector: horizontal hairline through the number chips on desktop/tablet; vertical gold line down the left on phone. Port headings to the v2 register.

**IMAGERY** — None. ROUTE: **code-only** (SVG path + `stroke-dashoffset`).

**MOTION** — Thread draws 1→2→3→4 on scroll. **Reduced-motion:** fully drawn, static.

**CONVERSION RATIONALE** — Lowers perceived effort right before the ask ("four simple steps, and step 1 is free and takes two minutes"). The fact that LS owns steps 1–2 and 4 is itself reassuring — a known, trusted processor handles the account, the link, and the money.

**RESPONSIVE** — Horizontal thread desktop/tablet; vertical left-edge line on phone.

**ACCESSIBILITY** — Thread `aria-hidden`; steps remain an ordered list; meaning in text.

**PERFORMANCE** — Inline SVG, negligible.

---

## SECTION A4 — AFFILIATE TOOLKIT (gated)  (maps to: lines 230–277)

**CURRENT:** 4 locked cards (lock glyph) for B-roll / images / captions / templates + a "Join to unlock the toolkit →" CTA. Real assets come later from `dgb-cinematographer`.

**VERDICT: LEAVE AS-IS (visual) + register port + retarget the CTA to LS.**

**RATIONALE** — The locked-card pattern still does the "sign up to unlock" job honestly without faking contents — the correct conversion move (curiosity gap → CTA). The only changes are mechanical: port card type to the v2 register, and point the CTA at the LS signup (`[WIRE: LS affiliate signup link]`) instead of an on-page `#join`. Copy stays as in the block above (drop any "view targets" phrasing — the kit now just helps you post well, full stop).

**PUSHBACK (minor):** the toolkit is a genuine sign-up driver. When `dgb-cinematographer` delivers real B-roll, REVISIT: a single muted ≤6s B-roll loop behind a "preview" frame (kit still gated) would lift sign-up — spec as a follow-up once the asset exists. Do not build on a placeholder.

---

## SECTION A5 — FAQ  (maps to: lines 279–298)

**VERDICT: LEAVE AS-IS (pattern) + register port + REWRITE the answers to cash-only.**

A `<dl>` is the right scannable, SEO-friendly pattern and does the objection-clearing work. The current Q&As are about NATG, view-target verification, and wallets — all now obsolete. Swap to the FAQ block above (earnings = % of sale; tracking = LS dashboard; payout = LS wire on its schedule; no crypto needed; free to join; valid-sale = real purchase through your link). Recommend the engineer make it an accessible accordion (collapsed by default on mobile) to shorten the scroll to the signup CTA.

> **[VERIFY] — LS payout facts:** the "how/when do I get paid" answer must match current LemonSqueezy docs. Per LS docs as read 2026-07-01, affiliate commissions are held ~30 days then paid **bi-monthly (around the 14th and 28th)** by wire, in many countries, minus minor processing/FX fees — i.e. **the brief's "paid monthly by wire" is close but not exact (it's bi-monthly).** State LS's actual cadence and holding period; do not invent a number. Merchant also sets commission %, cookie/attribution type, and any minimum payout in the LS dashboard — confirm the configured values before they appear as copy.

---

## SECTION A6 — SIGNUP (the conversion event)  (maps to: `#join` · lines 300–325)

**CURRENT:** centered heading + sub + `AffiliateInterestForm` (email required; social handle + wallet optional) + terms/privacy line. The wallet field exists only for NATG payouts — now obsolete.

**VERDICT: REWORK — make the primary action the LS-signup click; demote the form to an optional ONE-field fallback. This is THE conversion moment; make it the visual climax.**

**VISUAL CONCEPT** — The page's gold thread *resolves here* in a lit "destination panel" (the `.cta-card` / `v2-tile` lit-edge language) on the deepest dark ground, brightest gold glow behind it. Inside the panel: the heading, one line, and the **primary `v2-btn` → LemonSqueezy signup** as the single brightest element. Below it, small and clearly secondary, the optional one-field email capture for promoters who want to be walked through onboarding.

**LAYOUT** — Centered `max-w-[520px]`, wrapped in a gold-top-ruled panel (the one repeated accent). Order: heading (v2 register) → one-line body → **primary CTA button → LS signup** → a thin divider → "Prefer we walk you through it?" + a **single email input + small submit** (the optional fallback). The big LS button dominates; the email line is visibly the lighter option.

**IMAGERY** — None. ROUTE: **code-only** (gold-edged panel + glow).

**MOTION** — Panel + contents reveal-up on scroll-in; one-shot subtle glow pulse on the panel edge when the thread arrives (≤1 cycle, then settle). **Reduced-motion:** static, panel pre-lit.

**CONVERSION RATIONALE** — The real account/link/dashboard live on LemonSqueezy, so the highest-intent path is a direct click to LS — make that the brightest, most obvious action. Keeping a single-field email fallback (no handle, no wallet) catches promoters who want hand-holding without adding friction to the main path. Terminating the page spine at this panel tells the eye "this is the action."

**RESPONSIVE** — Panel full-width on phone with comfortable padding; the LS button full-width and first in the thumb zone; the optional email input ≥44px tall, clearly below and lighter. Inputs and buttons meet touch-target size.

**ACCESSIBILITY** — Primary CTA is a real external link (`rel="noopener"`, discernible name). The optional form keeps labels, `aria-live` status, real validation. Focus order: primary CTA, then the optional email. AA contrast on the gold-edged panel.

**PERFORMANCE** — CSS only; the optional form is a lean client component. No new weight.

> **CONVERSION (non-visual) — FORM CHANGES (for the engineer + `dgb-conversion-analytics`):**
> 1. **Remove the wallet field entirely** — it existed only for NATG payouts, which are gone. Leaving it would confuse and add friction.
> 2. **Reduce the fallback to ONE field (email).** Drop the social-handle field too, or hide it behind an "(optional)" disclosure — the lowest-friction capture is email alone (brief requirement).
> 3. **Re-point the primary CTA to `[WIRE: LS affiliate signup link]`** (external), and update the form's success copy away from "the program opens at launch / full rules" toward "we'll send you the steps to sign up."
> 4. Keep the `track()` event but rename to reflect the new action (e.g. `affiliate_ls_signup_click` for the button, `affiliate_walkthrough_request` for the email). Final wiring is `dgb-conversion-analytics`.

---

## SECTION A7 — FINAL CTA  (maps to: lines 327–342)

**VERDICT: COPY SWAP + LEAVE AS-IS (visual)** + register port + inherit the page-wide gold glow. Composition is already correct (centered, one repeated CTA, warm closing line). Replace the old "next gold rush / you found it early" copy with the cash-only close in the block above (find the book an audience → earn on every sale). CTA points to `[WIRE: LS affiliate signup link]`.

> **COMPLIANCE / COPY (hard line):** the new close drops "next gold rush" and "early" — those leaned investment-timing. Keep it about *promoting and earning a commission*, never *getting in early on an opportunity*.

---

## `/affiliates` — GLOBAL DESIGN NOTES

- **Register port is the through-line:** move every section from the basic `.card`/`.eyebrow` set to the v2 set (`v2-display`, `v2-eyebrow`, `v2-num`, `v2-tile`, `v2-btn`) so the page matches root's premium feel. The shimmer field is already present via VaultShell — do not re-add it.
- **One accent move, repeated:** the flat gold thread (commission strip → step connector → resolves at the signup panel). It is the page's spine and its only "big" visual. **It must stay flat** — no rising/ladder/returns shape anywhere (that was the old NATG idea). Everything else stays calm dark + type.
- **Section rhythm:** keep the existing alternating `--bg-canvas` / `--bg-surface` / `--bg-contrast` / `--bg-contrast-deep` bands; the v2 scope darkens them correctly.
- **Scroll behavior:** house motion = reveal-up 60ms stagger on scroll-in; the thread draws on scroll; everything reduced-motion-safe.
- **CTA discipline:** one CTA style (`v2-btn`), repeated (hero → toolkit → signup → final). **All point OUT to `[WIRE: LS affiliate signup link]`** — except the single optional email fallback in §A6, which posts on-site.

## `/affiliates` — ASSET LIST

| Asset | Route | New? |
|---|---|---|
| Cash-commission structure (3 flat tiles + flat connector, drawn text) | visual-strategist / code-only | NEW (code) — REPLACES the old NATG ladder |
| Gold connector thread (How-it-works) | code-only | NEW (code) |
| Hero link-line (optional decorative SVG) | code-only | NEW (code, optional) |
| Signup gold-edged destination panel + glow | code-only | NEW (code) |
| Register port (v2 type/tiles/btn) across all sections | code-only | edit |
| B-roll preview loop in toolkit | dgb-cinematographer (later) | DEFERRED — build only when real B-roll exists |

**Net new visual assets: 0 photoreal · 0 charts · 4 code-only (1 optional) · 1 deferred. (Old rising NATG ladder REMOVED.)**

## `/affiliates` — OPEN QUESTIONS / PUSHBACK (A)

1. **`[WIRE: LS affiliate signup link]` is the load-bearing dependency.** Every primary CTA on the page points to it, and LemonSqueezy only generates that URL once the affiliate program is **enabled** in the LS store dashboard. Enable the program and drop the real link in before this page can go live. (No on-site account/link building needed — LS owns all of it.)
2. **Commission % is a [WIRE] value.** The page says "[WIRE: commission %, up to 30%] of every sale." LS lets the merchant set this (flat or %, plus cookie/attribution type and any minimum payout). Set it in LS, then paste the real number — never publish a guessed rate.
3. **Payout cadence is [VERIFY], not "monthly."** Per LS docs (read 2026-07-01) it's a ~30-day hold then **bi-monthly** wire payouts (≈14th/28th), minus minor fees. The brief said "monthly" — close but not exact. Match LS's current published terms in the FAQ.
4. **Optional one-field email capture — keep or cut?** The brief allows a lightweight email-interest capture *before* LS onboarding, one field only. Spec keeps it as a clearly-secondary fallback under the LS button. If the owner wants the absolute lowest-friction page, the LS click alone is enough — the email fallback is optional. Owner's call.
5. **Toolkit B-roll** is a real future conversion lift but blocked on assets — deferred, not dropped.
6. **NATG cleanup is global, not just visual.** Removing the ladder also means: delete the wallet field, the NATG `StatusChip`s, the "launching with the token" captions, and the page `metadata` description/keywords (currently sell "earn NATG" / "50% commission … purchase back in NATG"). Re-point all of it to the cash program. Flag (don't run): a `dgb-copy-chief` grade can follow if the author wants a conversion-power pass on the new copy.

---
---

# PAGE 2 — `/mining-industry`

## Conversion goal + audience (design to THIS, not the book funnel or the affiliate page)

- **Audience:** gold/mining-industry professionals — geologists, mining engineers, executives, QPs, fund/finance people who cover the sector. **The most skeptical audience on the entire site.** They will reflexively distrust hype, gloss, and consumer marketing. They respect evidence, precision, credentials, and being treated as peers.
- **Conversion goal:** get them to **engage / make contact** — specifically, sign up as an early reviewer via `IndustryReviewForm` (name + email + company/role). (The brief also mentions "submit a deposit" — that is a *different* B2B intake belonging to NatGold/`/projects`, not this reviewer page; if the owner wants this page to also route deposit-submitters, that's a scope decision — see §PUSHBACK B.)
- **The emotional job:** "these people know the industry, they respect MY expertise, and giving an honest read is a low-risk, even flattering, ask." Authority and credibility — NOT excitement.

## ⚠️ COMPLIANCE / TONE LANE

This page is **not** a sale and **not** a token offer, so it's the lowest direct-compliance-risk of the three. The real risk is **tone**: any consumer-hype, "gold rush," moon, or upside language would *destroy* credibility with this audience and read as exactly the thing they're being asked to critique. The design must be **sober, documentary, peer-to-peer**. Restraint is the conversion strategy. No price talk, no token-upside, no excitement typography — calm authority.

## The one visual idea for `/mining-industry`

**"We know this ground."** The page is built to *show*, quietly, that the people behind the book do real fieldwork in this industry — through one piece of dignified, accurate documentary texture (drill core / core-logging bench, no people) and a credentials-forward author beat. Everything reads like a technical invitation from a peer, not a marketing page.

---

## SECTION M1 — HERO  (maps to: current Hero · `mining-industry/page.tsx` lines 45–67)

**CURRENT:** centered `eyebrow` + `<h1>` ("You know this ground better than anyone.") + a strong, respectful sub + one `btn-primary` ("Become an early reviewer →"). All-type, on the VaultShell shimmer.

**VERDICT: ADD — one quiet documentary anchor + register port. (PRIORITY #1 for this page.)**

**VISUAL CONCEPT** — Say "we know this ground" *visually*. A single, restrained, warm-lit documentary still of **drill core in sample trays / a core-logging bench (no people, no text, no numbers)** anchors the hero — the literal evidence of the work this audience does daily. It earns the credibility the headline currently asserts on faith. Headline ports to `v2-display`; the gold accent stays on "better than anyone." The shimmer field stays subdued so the page reads sober, not flashy.

**LAYOUT** — Keep the centered hero but introduce the still as a **restrained band** either behind the type (with a dark scrim keeping text at AA) or as a letterboxed band directly above the CTA. One soft gold light points the eye to the CTA. Do NOT full-bleed a busy image behind the headline — protect legibility; this audience reads carefully.

**IMAGERY** —
- The drill-core / core-logging still: cylindrical rock cores laid in wooden or metal sample trays on a field/logging bench, warm directional light, fine mineral detail, shallow depth of field, sober and documentary, **no people, no text, no numbers, no logos**.
- AI PROMPT (text-free): *"A row of cylindrical rock drill cores laid in core-sample trays on a logging bench, warm directional light, fine mineral and quartz-vein detail, shallow depth of field, sober documentary photography, photoreal, no people, no text, no numbers, no logos, no charts."*
- ROUTE: **author-manual (Tier-4 photoreal)** — per DGB image doctrine, photoreal NATGEO-grade images default to author-manual; surface the prompt for the author to run, do NOT auto-fire Higgsfield. **Preferred: reuse the `/v1` Beat-7 drill-core asset if it exists — zero new production.**
- SOURCE/ASSET: reuse `/v1` drill-core still if produced; else author-manual generate from the prompt above.

**MOTION** — Optional gentle Ken-Burns (≤1.04 scale, very slow) on the still, OR fully static. Headline/sub/CTA reveal-up on load. **Reduced-motion:** static still, no Ken-Burns.

**CONVERSION RATIONALE** — This audience converts on "these people actually know the industry." A real, *accurate* piece of fieldwork imagery (drill core — not a stock gold-bar cliché, which would instantly mark the page as outsider marketing) signals respect and competence, directly lifting reviewer sign-ups. The register port adds the same premium credibility the rest of the brand earns.

**RESPONSIVE** — Desktop: still as a side band or scrimmed backdrop beside the centered type. Tablet/phone: letterboxed band ABOVE the CTA (never full-bleed behind text on small screens — contrast risk). Headline clamps to ~2rem on phone; CTA full-width thumb zone.

**ACCESSIBILITY** — `alt="Rock drill cores laid in sample trays on a logging bench"`; no people; dark scrim maintains AA over any text-over-image; `<h1>` carries the headline.

**PERFORMANCE** — One lazy AVIF/WebP ≤450KB, explicit dimensions (zero CLS), `fetchpriority` only if it becomes the LCP element (prefer the HTML headline as LCP). If reusing the `/v1` asset, it's already optimized.

> **PUSHBACK (image):** do NOT substitute a gold-bars / gold-coins / "treasure" stock image here — that is the single fastest way to lose this audience. If no accurate fieldwork image is available, **LEAVE the hero all-type** (it's strong) rather than ship an inaccurate or cliché image. An honest type-only hero beats a wrong picture for skeptics.

---

## SECTION M2 — WHY YOUR READ MATTERS  (maps to: 3 cards · lines 69–88)

**CURRENT:** 3 `.card`s (You see what outsiders miss / It's about your industry's next chapter / Honest beats flattering). Strong, respectful copy.

**VERDICT: LEAVE AS-IS (visual) + register port only.**

**RATIONALE** — Text carries the argument to a professional audience that wants substance, not decoration. The three points are well-constructed peer-to-peer appeals (expertise, relevance, honesty). An icon or image per card would read as consumer-marketing gloss and *lower* credibility — the opposite of the goal. Cover test passes hard. Only change: port `.card` → `v2-tile` and headings to the v2 register for brand consistency; keep the content exactly as flat and serious as it is.

> **CONVERSION (non-visual):** consider re-ordering so **"Honest beats flattering"** (the lowest-pressure, most flattering-to-the-reader card) is more prominent, or echoed as a one-line reassurance directly above the capture form — "we want the hard feedback" is the line that most lowers the perceived risk of saying yes. Layout/copy call.

---

## SECTION M3 — HOW IT WORKS  (maps to: 4 steps · lines 90–115)

**CURRENT:** 4 numbered steps (put name down → we send the book → give honest read → help shape it) with gold number chips.

**VERDICT: LEAVE AS-IS (visual) + register port + optional gold connector.**

**RATIONALE** — Clear, low-friction process; the gold number chips are already the right single accent. This section's job is to make the commitment feel small and defined ("4 steps, I get a free book, I give my read on my own time") — clarity is the conversion, decoration isn't. Optional: a thin gold connector thread through the 4 steps (same pattern as `/affiliates` A3) to make the process feel like one continuous, easy path — but lower priority here than the hero anchor. Reduced-motion: drawn static.

> **CONVERSION (non-visual):** Step 2 "We send you the book" is the *value the reviewer receives* — make sure it visually reads as a benefit (they get the full book free), since "free book for your expertise" is the core trade that converts this audience. A subtle benefit-emphasis on that step (not a loud badge) helps.

---

## SECTION M4 — AUTHOR (Andrew Fletcher)  (maps to: lines 117–131)

**CURRENT:** `eyebrow` + name + a credentials paragraph (former president of Great Eagle Gold Corp → NatBridge Resources, first NatGold supply agreement, "writes from inside the industry"). Text-only.

**VERDICT: ADD (conditional) — author portrait or environment still + credentials-forward layout; register port. (PRIORITY #2 for this page.)**

**VISUAL CONCEPT** — For the most skeptical audience, the author *is* the credibility. Pair the credentials with a **real author portrait** (sober, professional) framed in a thin gold rule — a named, pictured industry insider is far more convincing than an all-type bio. If no real photo, fall back to an honest field/operations environment still (no identifiable face).

**LAYOUT** — Portrait + credentials side-by-side on desktop (portrait ~40% column, framed with one thin gold rule = the repeated accent), stacked on tablet/phone (portrait centered ~64% width above the text). Consider pulling the strongest credential ("former president … signed the first NatGold supply agreement," "200+ gold projects assessed" if verified) into a short credential strip for instant scan-able authority.

**IMAGERY** —
- **Author-supplied real photo** strongly preferred. **Do NOT AI-generate a person.** ROUTE: **author-supplied**. Fallback (only if no photo): an honest operations/field environment still, no people. ROUTE: **author-manual (Tier-4 photoreal)**, text-free prompt e.g. *"A weathered field exploration setting — sample tables, rock specimens, sober warm light, documentary, photoreal, no people, no text, no numbers, no logos."*
- SOURCE/ASSET: author to supply portrait; reuse across `/book` author beat too (shared asset).

**MOTION** — Panel reveal-up; no gimmicks (trust beats want stillness). **Reduced-motion:** static.

**CONVERSION RATIONALE** — "Writes from inside the industry" is *the* load-bearing proof for this page. A real, pictured, credentialed insider converts skeptics far more than a paragraph. The credential strip lets a busy professional verify authority in 2 seconds.

**RESPONSIVE** — Side-by-side desktop; stacked tablet/phone with portrait centered; credential strip wraps to a list on phone.

**ACCESSIBILITY** — `alt="Andrew Fletcher, author"` (real photo) or scene description (fallback, no people); AA contrast.

**PERFORMANCE** — One ≤250KB WebP, explicit dimensions, lazy.

> **PUSHBACK:** worth it ONLY with a real photo or an honest environment still. **Do not fabricate a person** to fill the slot — for THIS audience a fake face is a catastrophic credibility risk. If neither is available, the credential text stands on its own (it's strong) — LEAVE AS-IS with register port.
>
> **FACT FLAG (for `dgb-fact-verifier`):** any credential surfaced visually ("200+ projects," "first NatGold supply agreement," company names) must be verified before it's amplified into a credential strip — `SALES-COPY-WORKING.md` flag #5 marks the bio `[VERIFY]`. Do not promote an unverified credential into a prominent visual element.

---

## SECTION M5 — CAPTURE (the conversion event)  (maps to: `#review` · lines 133–153)

**CURRENT:** centered heading + sub + `IndustryReviewForm` (email required; name + company/role) + privacy line.

**VERDICT: ADD (focal treatment, sober) — make it the clear destination, but keep it dignified.**

**VISUAL CONCEPT** — The capture is the action; give it a quiet gold-edged destination panel on the deepest dark ground (the `.cta-card` lit-edge language), but *restrained* — a thin gold rule and a soft glow, not a flashy treatment. "A serious invitation, clearly the next step."

**LAYOUT** — Keep centered `max-w-[520px]`. Wrap the form in a `v2-tile`/`.cta-card`-style panel with one thin gold top-rule. Heading in v2 register. Submit button is the brightest element here, but the whole panel stays sober.

**IMAGERY** — None. ROUTE: **code-only**.

**MOTION** — Panel + form reveal-up on scroll-in; no pulse/flash (this audience reads excitement as a red flag). **Reduced-motion:** static.

**CONVERSION RATIONALE** — Elevating the capture from a bare form to a clear, dignified destination panel lifts completion without tipping into hype. The restraint *is* the conversion design for skeptics.

**RESPONSIVE** — Panel full-width on phone with comfortable padding; inputs ≥44px; button full-width.

**ACCESSIBILITY** — Form already has labels, `aria-live` status, validation. Keep. Email-first focus order. AA contrast.

**PERFORMANCE** — CSS only; lean client form already.

> **CONVERSION (non-visual) — form fields:** the form asks email (required) + name + company/role. For a *credibility* audience, capturing name + company/role is valuable (it qualifies the reviewer) and the audience won't balk at it — so unlike `/affiliates`, do NOT hide these. But make **email the only required field** (it already is) so a hesitant pro can join with minimal commitment, then optionally add their angle. Good as-is; confirm with `dgb-conversion-analytics`.
>
> **TRUST LINE:** consider a single sober reassurance directly above the form — "We're asking for your honest read, including where it's wrong" — to lower the perceived commitment. Copy call (`copywriting`).

---

## `/mining-industry` — MISSING SECTION (conversion gap, flagged)

**The page has no "what's in it for the reviewer / what we're NOT asking" reassurance beat near the bottom**, and **no trust/credibility proof beyond the author bio** (e.g. that the book is real, sourced, finished — "23 chapters, every statistic sourced," which the book pages use). For a skeptical professional weighing whether to spend hours reading, a short, sober **"What you'll be reading"** strip (the book is complete, X chapters, sourced, plain-English) between the author beat and the capture would lower risk and lift sign-up. This is a structural/conversion recommendation, not a visual one — route the content to `copywriting`/`dgb-funnel-copywriter`; I'd spec it as a calm 3-fact strip (no decoration) if added.

---

## `/mining-industry` — GLOBAL DESIGN NOTES

- **Restraint is the design.** This is the one page where *less* visual is *more* conversion. The only ADDs are: register port (everywhere), ONE documentary anchor (hero), ONE author portrait (conditional), and a sober capture panel. Everything else stays flat, serious, peer-to-peer.
- **Register port** to v2 (`v2-display`, `v2-eyebrow`, `v2-num`, `v2-tile`) for brand consistency — but tuned sober (the shimmer field opacity can sit at the lower VaultShell default; do not amplify it on this page).
- **One accent move:** the thin gold rule (hero light → author-portrait frame → capture-panel top-rule). No rising ladders, no big motion — those belong on `/affiliates`, not here.
- **No excitement typography, no count-ups, no price/token talk anywhere** — tone is the compliance line on this page.
- **Scroll behavior:** quiet reveal-up only; no pulses, no Ken-Burns beyond ≤1.04 if used at all.

## `/mining-industry` — ASSET LIST

| Asset | Route | New? |
|---|---|---|
| Drill-core / core-logging hero still | author-manual (reuse `/v1` Beat-7 if exists) | reuse preferred; else NEW photoreal |
| Author portrait (real photo) | author-supplied (shared with `/book`) | NEW (author) — do NOT AI-generate a person |
| Author fallback environment still | author-manual (only if no portrait) | conditional |
| Capture sober gold-edged panel | code-only | NEW (code) |
| Optional gold connector (How-it-works) | code-only | NEW (code, optional) |
| "What you'll be reading" fact strip | code-only (content via copy) | NEW (code), recommended |
| Register port across all sections | code-only | edit |

**Net new visual assets: up to 1 photoreal (reuse-preferred, 0 if `/v1` asset reused) · 1 author photo (author-supplied) · ~2 code-only.**

## `/mining-industry` — OPEN QUESTIONS / PUSHBACK (B)

1. **"Submit a deposit" scope.** The brief's goal mentions "submit a deposit." This page is built purely as a **reviewer-recruitment** page — there is no deposit-intake here, and deposit submission is a NatGold B2B process (likely `/projects`). If the owner wants `/mining-industry` to ALSO route deposit-submitters, that is a new section + a different form + a different (heavier) compliance posture — **flag and confirm scope before building.** My spec covers the reviewer goal as the page is currently built. Do not bolt a deposit pitch onto a reviewer page without a decision.
2. **Author portrait is the one genuinely-blocked ADD** and the highest-value one for this audience. Needs a real photo (author-supplied). Do NOT AI-generate a person. If unavailable, the credential text stands.
3. **Hero image accuracy is non-negotiable.** Drill-core / fieldwork only — never a gold-bar/treasure cliché. If no accurate image, ship type-only.
4. **Credential fact-check** before any credential is amplified into a visual strip (`SALES-COPY-WORKING.md` flag #5 is `[VERIFY]`). Route to `dgb-fact-verifier`.
5. **Missing reassurance beat** ("what you'll be reading" + "we want the hard read") is the biggest *non-visual* conversion gap — recommend adding via copy.

---
---

# CROSS-PAGE SUMMARY

| | `/affiliates` | `/mining-industry` |
|---|---|---|
| **Conversion goal** | Sign up as a LemonSqueezy affiliate (click out to LS) | Become an early reviewer (contact/capture) |
| **Audience** | Promoters/creators with an audience (skeptical of "earn money" pitches) | Gold/mining pros (most skeptical on the site) |
| **Design temperature** | Legit, clean, low-friction; one FLAT gold thread (no climbing) | Sober, documentary, peer-to-peer, restraint = conversion |
| **Top visual move** | Flat cash-commission structure (replaces the NATG ladder) | Documentary drill-core hero anchor |
| **Compliance lane** | Cash referral commission, % of each sale; never investment/returns/token | Tone — no hype/price/token-upside; restraint |
| **Biggest non-visual win** | LS signup as the primary CTA + remove wallet field; one-field email fallback | Add "what you'll be reading" reassurance beat + trust line |
| **Net new assets** | 4 code-only (1 optional) + 1 deferred B-roll | ≤1 photoreal (reuse-preferred) + 1 author photo + ~2 code-only |

**Shared lever both pages need: port from the basic `.card`/`.eyebrow` register up to the v2 register (`v2-display`/`v2-tile`/`v2-eyebrow`/`v2-num`).** The shimmer field is already present on both via `<VaultShell>` — the gap is the premium *type + tile* register, not the background.

**Handoff:** build specs → `framer-web-engineer` / `dgb-framer-converter`. Photoreal/author-photo briefs → the author (manual route). Copy flags → `copywriting` / `dgb-funnel-copywriter`. Credential facts → `dgb-fact-verifier`. Form-friction + analytics → `dgb-conversion-analytics`. A design review pass can follow — I do not self-certify.
