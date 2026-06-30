# Sales Copy — Working File (Digital Gold Boom book funnel)

> **Status:** DRAFT v0.1 — copy in active review. Safe to start wiring structure; **do not treat copy as final** until this file says LOCKED.
> **Owner:** Andrew Fletcher · **Last updated:** 2026-06-30
> **Purpose of this file:** single source of truth for the website team. Holds the copy for the two sales pages + the rules that copy must follow. Edit here as we sort it; changelog at the bottom.

---

## 1. What we're building (plain)

Two landing pages that both sell ONE product — the **$17 book** — and send the buyer to checkout. They will be **split-tested** against each other:

- **Page A — LONG.** Full sales page. For warm/considered traffic. Build at **`/v1`**.
- **Page B — SHORT.** Fast, minimal page for **cold social-media traffic**. Build at **`/s`**.

> ⚠️ **Do NOT touch the root / live homepage.** Note: the root (`/`) currently renders the **`/v2`** page (`src/app/page.tsx` imports `<V2Home/>`), so `/v2` = the live homepage — that's why the new short page goes to **`/s`**, not `/v2`. Build and iterate ONLY on `/v1` and `/s`; repoint root to the winning page later, once approved.

> 🎨 **DESIGN: use the v2 design system** (the root look) — `v2-*` classes (`v2-display`, `v2-tile`, `v2-gold`, `v2-eyebrow`, `v2-btn`, `v2-input`, `v2-divider`), the `ShimmerDots` gold background, bento tiles. Do **NOT** use the old `/long` funnel components / `section-*` / `glass-tile` styling — that older design is exactly the mismatch the author flagged. `/v2` (`src/app/v2/page.tsx`) is the reference for the look; `/long` is NOT.
>
> ⚠️ The current root/`/v2` page has the **right design but non-compliant COPY** (it still says "Missed Bitcoin?", "you're early", "before Wall Street", has the email waitlist + Primer/Updates options + "$871M"/"5.3× the token supply"). When root is eventually repointed, its copy must be redone too. Keep the design, replace the copy.

The VSL (sales video) is separate and **not** part of this work.

**For now: $17 book only.** The Primer ($99) and Updates ($199) options come OFF the page. One product, one price, one button. (Reason below.)

### ⚠️ WHO writes the copy + the forensic-read rule (HARD — author directive)
- The copy must be written by a **sales-funnel + copywriting expert skill** — not a generalist.
- That writer, **and anyone involved in the copy**, must **forensically read the ENTIRE book — every chapter, in full. Not summaries, not the mastery file, not this handover.**
- Pay **special attention to "Read This First" and the Chapter 8 case summary** for the narrative FLOW — but still read every chapter forensically.
- **Status of the draft copy in sections 4–5 below:** v0.1 STARTING REFERENCE ONLY. It was written from the book-mastery file + a brief, NOT a forensic full-book read — so it does **not** yet meet this bar. The final copy must be (re)written under this rule, then graded by `dgb-copy-chief` (builder ≠ breaker), before it ships.

---

## 2. ⚠️ COMPLIANCE — read before touching a single line

We are getting the book approved for payment processing with **LemonSqueezy**. LemonSqueezy is a **Merchant of Record** — they take legal responsibility for every sale, so they **review the store and the copy** before approving. Their compliance team reads sales pages hunting for anything that looks like an **investment pitch, a "get rich" promise, or a crypto/token sale.**

**The product is an information product — a BOOK about the digital gold mining *industry*. It is NOT an investment, NOT a token, NOT financial advice. We sell KNOWLEDGE, not upside.** Every line must respect that.

### MUST STRIP (these are on the current site and will trigger a rejection)
- ❌ "Missed Bitcoin? Don't miss digital gold mining" → reads as an invitation to invest.
- ❌ "be early" / "the thing to be early to" / "before Wall Street" → investment timing pitch.
- ❌ "the biggest gold rush in history" → upside hype.
- ❌ "Join the waitlist" + the line **"Free until the book drops. $39 after."** → the book is **live now at $17**; this is false/expiring scarcity. Remove everywhere.
- ❌ Using **"$469M reserved / 17,466 investors / 162 countries"** as a reason for *the reader* to invest. (The numbers can stay only if framed as reported industry facts the book examines — never as "join them.")
- ❌ Any anonymous authority claims ("Former SEC Chief of Staff", "Former CFTC Counsel", "Ex-Barrick/BHP") — both a weak proof and a claim-verification risk on a public page. Name them (with permission) or cut.

### MUST KEEP / ADD
- ✅ Frame everything as **"understand this industry,"** not "profit from it."
- ✅ **"Educational — not financial advice."** visible near every CTA.
- ✅ Author's honest disclosure: **"The author holds a stake in the model he describes."**
- ✅ Clear product + delivery: a **digital book**, delivered instantly on checkout.
- ✅ A plain **refund/guarantee** line (processors want clear refund terms). [confirm window — see flags]
- ✅ "Secure checkout via LemonSqueezy."

> **CONFIRMED BY LEMONSQUEEZY (2026-06-30, email from Monalisa, LS support):** *"As a platform supporting digital content, we allow the sale of eBooks and informational products like yours. Since you are selling purely information and analysis about the tokenization industry — and are not selling the digital assets or tokens directly — your product aligns with our Terms of Service and Prohibited Products list."* → Our "sell the knowledge, not the asset" framing is the approved approach. The compliance rules above are exactly what keeps us inside that line — hold them.
>
> **They asked for two things to submit the application:** (1) a **sample/preview of the ebook**, (2) the **pricing model**. Both prepared — see the build note + pricing model below.

---

## 3. The angle (the one idea both pages ride)

> There's a real shift in how the gold industry works — gold's value being **verified and digitized without mining it** — and this book explains the whole thing in plain English, from someone who ran a gold company inside it.

**Curiosity hook (allowed):** *"It's not gold. It's not bitcoin."* — used to make people curious, NOT as an investment tease. Don't fully explain the mechanism in the hook; that's what the book is for.

**Tone laws (pass/fail):** calm and flat (no exclamation points), specific numbers not vague ones, named people not "experts," plain English with every term explained, report-don't-sell.

---

## 4. PAGE A — LONG (ready-to-paste draft)

> Build at **`/v1`** in the **v2 design system** (reference: `src/app/v2/page.tsx` — `v2-*` classes, ShimmerDots, bento tiles). Do NOT reuse the old `/long` components. Beat names below map to the page's argument flow. **Every CTA button = `Get the book — $17` → checkout** (no email/waitlist).

### Beat 1 — Hook → `HeroBoardD.tsx`
- **Eyebrow:** A shift in the gold industry
- **Headline:** It's not gold. It's not bitcoin.
- **Subhead:** There's a change underway in how the world's oldest asset works — and most people have never heard of it. This book explains it, start to finish, in plain English.
- **CTA:** Get the book — $17
- **Under CTA:** Digital book · delivered instantly · 12-month money-back guarantee
- *(Remove the email form, the "$39 after" line, and the "Missed Bitcoin" headline.)*

### Beat 2 — The shift / why it matters → `PersonalStake.tsx`
- **Eyebrow:** Why this matters
- **Headline:** Gold is being verified and digitized — without being mined.
- **Body:** For thousands of years, owning gold meant digging it out of the ground. That is starting to change. A new approach lets the value of gold be independently verified while it stays in the ground, then represented digitally. This book is a plain-English explanation of how that works, who is building it, and what it means for an industry that has not changed in a century.

### Beat 3 — The problem → `Problem.tsx`
- **Eyebrow:** The problem
- **Headline:** Traditional gold mining is under real pressure.
- **Body:** Environmental damage. Community displacement. Tighter regulation. Rising costs. The book lays out six compounding forces squeezing the old extraction model — what the author calls the Extraction S.P.I.R.A.L. — and why even record gold prices have not fixed the problem.
- **Stat callout:** **$22 trillion** `[VERIFY]` — gold that is geologically verified but still sits in the ground.
- **Stat caption:** Documented in the ground, while the model built to extract it comes under strain.

### Beat 4 — The reframe → `Insight.tsx`
- **Eyebrow:** The reframe
- **Headline:** Mining already runs on verification, not just digging.
- **Body:** No serious gold investment happens without a geologist first proving the gold is there. Verification is the backbone of the whole industry. Extraction is the step everyone assumed was unavoidable. The book explains why that assumption is now being tested.

### Beat 5 — The mechanism → `Solution.tsx`
- **Eyebrow:** The model
- **Headline:** How "digital gold mining" actually works.
- **3 steps:**
  - **01 Verify** — Independent geological proof that the gold exists in the ground.
  - **02 Digitize** — That verified ownership is recorded as a digital, gold-backed asset.
  - **03 Access** — It can be held and transferred without the cost and damage of extraction.
- **Definition card:** Digital gold mining is a process developed by NatGold Digital that represents independently verified in-ground gold as a digital, gold-backed asset — without the environmental destruction or social displacement of mining. `[VERIFY exact NatGold description + "patent-pending"]`

### Beat 6 — Why now → `Convergence.tsx`  *(rebuild: drop the "Halley's Comet" name)*
- **Eyebrow:** Why now
- **Headline:** Why this is worth understanding now.
- **Body:** Three things are happening at once: central banks are buying gold again, real-world assets are being represented digitally at scale, and a new generation wants exposure to gold without the environmental cost. Whether this model ultimately succeeds or fails, it is a real development in a multi-trillion-dollar industry — and worth understanding first-hand rather than hearing about secondhand later.
- *(Drop the loose $13T / $2T / 1.8B force-cards unless each can be sourced — see flags.)*

### Beat 7 — Credibility → `People.tsx` + `Book.tsx` byline  *(replace anonymous officials)*
- **Eyebrow:** Who wrote it
- **Headline:** Written by someone who ran a gold company inside this shift.
- **Body:** Andrew Fletcher is the former President of Great Eagle Gold Corp (now NatBridge Resources), the first company to sign a supply agreement with NatGold Digital. He has assessed more than 200 gold projects across multiple continents. `[VERIFY]` This is the industry explained by someone who has worked in it — not a summary written from the outside.
- **Disclosure line (keep visible):** The author holds a stake in the model he describes, and says so plainly throughout. This book is educational — not financial advice.

### Beat 8 — What you get → `Book.tsx`
- **Eyebrow:** What is inside
- **Headline:** The complete picture, in four parts.
- **Cards:**
  - **01 · Why gold may no longer need mining** (Ch 1–8) — the forces reshaping the old industry.
  - **02 · How the model works** (Ch 9–16) — the process, the people, the standards, the economics.
  - **03 · A real-world case study** (Ch 17–19) — one project followed through the process. `[VERIFY framing — see flags]`
  - **04 · Risks and outlook** (Ch 20–23) — an honest risk register and where this could go.
- **Sub:** 23 chapters. Every statistic sourced. Written in plain English.

### Beat 9 — Close → `FinalCTA.tsx` + `Stack.tsx`  *(single product, no email capture)*
- **Eyebrow:** Read it for yourself
- **Headline:** Understand it for the price of a paperback.
- **Body:** Digital Gold Boom is a one-time $17 purchase. You get the complete book, delivered digitally the moment you check out.
- **Guarantee:** If the book is not worth your time, email us within 12 months for a full refund. No questions asked.
- **CTA:** Get the book — $17
- **Fine print:** Secure checkout via LemonSqueezy. Educational content — not financial advice. The author holds a stake in the model described.

---

## 5. PAGE B — SHORT (ready-to-paste draft)

> Build at **`/s`** in the **v2 design system** (same look as `/v2`/root). New single-screen page for cold social traffic. No long scroll. One job: hook → one-breath explanation → buy.

- **Hook (headline):** It's not gold. It's not bitcoin.
- **Line 1:** There is a real shift happening in the gold industry, and most people have never heard of it.
- **Line 2 (what it is):** A way to verify and digitize gold's value without mining it — explained in plain English.
- **Credibility:** Written by Andrew Fletcher, former president of a gold company working inside this shift. `[VERIFY]`
- **What it is (the product):** One book explains the whole thing — 23 chapters, every statistic sourced.
- **CTA:** Get the book — $17
- **Under CTA:** Delivered instantly · 12-month money-back guarantee · Educational, not financial advice

---

## 6. The offer (locked for now)

| Item | Price | CTA | Notes |
|---|---|---|---|
| **Digital Gold Boom (the book)** | **$17 one-time** | Get the book — $17 | Digital delivery, instant. **12-month money-back guarantee.** The ONLY product on these sales pages for now. |
| **Industry Intelligence newsletter** | **$199 / year → tiering up to $999 / year** | — | **PLANNED product #2** — recurring subscription. **Founding-member pricing:** starts at $199/yr and steps up toward $999/yr as the member base passes set thresholds (**early members lock $199 for life** — confirm grandfathering in LS). Add AFTER the book is approved. See compliance note below. |
| ~~The Primer ($99)~~ | — | — | OFF the page for now. |

**Why one product first:** direct-response rule — one page, one decision, one button converts best, and a single clean info-product is the easiest thing for the processor to approve. Add the newsletter (and any other upsell) as a separate step once the book clears.

**Newsletter compliance note (carries the same LS rule):** sellable as an information/analysis subscription ONLY. It must stay **industry news + analysis** ("industry intelligence") and must NOT give buy/sell or investment guidance, price targets, picks, signals, or any promise of returns — that would turn it into regulated financial advice. Same disclosures apply (educational, not financial advice + author's stake). Describe it to LemonSqueezy the same way the book was described before listing it.

**Newsletter pricing model (founding-member / tiered):** $199/yr now, stepping up toward $999/yr as the member base passes set thresholds. Two rules: (1) frame the rising price as **early-member pricing for the newsletter** — never as "get in early on the opportunity"/investment timing (that re-introduces the trigger we stripped from the book page); (2) the threshold price-rise must be **real** (driven by real member counts), not a fake countdown. **Author decision (locked):** early members **lock their $199/yr rate for life** (as long as they stay subscribed). Mechanic: LemonSqueezy keeps each subscriber on the billing price they joined on (their plan variant) — new price for new members, existing members unchanged. That IS the grandfathering; no extra work beyond setting a new price/variant at each threshold.

### Newsletter pricing tiers — TO DISPLAY on the page
The page must **show the tier ladder**. Price **scales with TOTAL member count**: as the whole membership crosses thresholds, the price for NEW members steps up ($199 → … → $999). Each member stays locked at their join price.

**EXAMPLE ladder (PLACEHOLDER — author to supply the real thresholds + prices):**

| Tier | Total members | Price / year |
|---|---|---|
| Founding | 0 – 500 | $199 |
| Tier 2 | 501 – 1,500 | $349 |
| Tier 3 | 1,501 – 3,500 | $549 |
| Tier 4 | 3,501 – 7,500 | $749 |
| Final | 7,500+ | $999 |

**Display options:** (a) static ladder table (above), current tier highlighted; (b) **LIVE** indicator tied to the real member count — e.g. "Currently Tier 1: $199 · 312 members · 188 spots until $349" (needs a member-count data source; same pattern as the live-stats dashboard). Author to choose + provide real numbers + the count source.

**Compliance:** this is membership pricing (a product that costs more as it fills), NOT investment — fine. The price rises and "spots left" must be **real** (actually enforced at real member counts), never a fake countdown. Frame as "founding-member pricing," never "get in early on the opportunity."

---

## 7. 🚩 Fact-flags — verify BEFORE these go live

Nothing below is approved as fact yet. Confirm each, then delete the flag.

1. **"$22 trillion of verified in-ground gold"** — confirm figure + that it's framed as a reported industry fact (it is perishable / price-linked).
2. **NatGold "digital gold mining" definition** — confirm exact wording and whether to say "patent-pending."
3. **"10 patents"** (current ProofLine) — if used at all, must say **applications / pending**, not granted patents.
4. **The "$1B case study" (Cahuilla)** — given the real-world resource status, confirm how this is described on a *public sales page* before publishing.
5. **Author bio** — "200+ projects," "first NatGold supply agreement," company names — confirm exact wording.
6. **Convergence numbers** ($13T / $2T / 1.8B) — source each or cut the cards.
7. **Refund window** — **12 months** (author-set). Confirm it's operationally honored + set in LemonSqueezy.
8. **Any surviving "$469M / 17,466 / 162"** — only as reported facts, never as "join them and invest."

---

## 8. Instructions for the website team

1. **Structure first, copy second.** You can wire Page B and adjust Page A layout now; paste copy from sections 4–5 as it locks.
2. **Every CTA → checkout for the $17 book.** Remove all email-capture / waitlist forms from these two sales pages. (Email capture can live elsewhere, not on the buy pages.)
3. **Do not publish any line still carrying a `[VERIFY]` flag.** Leave it as placeholder text or hold the section.
4. **Keep the compliance lines** (educational disclaimer + author stake + LemonSqueezy checkout) on both pages.
5. **Split test:** serve Page A and Page B and track checkout conversion per page. (Confirm the test tool with Andrew.)
6. **Questions / changes:** edit this file inline and flag Andrew. This is the working doc — keep it current.

---

## 9. Changelog
- **v0.1 — 2026-06-30** — First working draft. Compliance pivot (sell the book, not the investment); $17-only offer; long + short beat maps and draft copy; fact-flags listed. Copy NOT yet fact-verified or final-graded.
- **v0.2 — 2026-06-30** — LemonSqueezy confirmed the framing (info/analysis about the industry, not selling tokens). Guarantee set to **12 months**. Added **newsletter ($199/yr)** as planned product #2 with its compliance note (analysis-only, no investment advice). LS asked for a sample + pricing model to submit (both prepared).
- **v0.3 — 2026-06-30** — Newsletter pricing = **founding-member tiered**: $199/yr stepping up toward $999/yr at member thresholds. Added pricing-framing compliance rule (early-member pricing, not invest-early) + grandfathering operational TODO. Open Q to author: do early members lock $199 for life, or move up over time?
- **v0.4 — 2026-06-30** — Author decision: early newsletter members **lock $199/yr for life**. Clean sample PDF built for LS (no watermark, placeholder Foreword + ISBN-TODO removed).
- **v1.0 — 2026-07-01** — Visual audit done (`SALES-VISUAL-AUDIT.md`, 5 ADDs, rest left clean). **LIVE pages compliance-fixed** (root/v2 + /book): hero→spine, waitlist→$17 buy, investor-stat/$871M/"you're early"/"Wall Street"/3-product grid REMOVED, disclosures added, guarantee 30-day→12-month sitewide (book/v2/buy/terms); /book got the 2 code-only visual ADDs. Build PASSES (27 routes). NOT deployed. Nav: temp V1/V2/S tabs added. OPEN: retire/redirect `/buy` duplicate; optional clean of `/newsletter` + `/affiliates` leans; newsletter tier numbers; Cahuilla framing + final chapter count; deploy is author's call.
- **v0.9 — 2026-06-30 — READY TO BUILD.** Design build spec delivered → `SALES-DESIGN-SPEC-v1-s.md` (one big idea: "verified gold lit from within while the old way falls away"; 5 hero conversion moments; 10 new visuals, page not blocked on them — Book3D interim hero). Website-build handover written → `WEBSITE-BUILD-HANDOVER-v1-s.md`. Package for the build session = copy + design + handover. Execution can begin (root untouched).
- **v0.8 — 2026-06-30** — Copy WRITTEN (dgb-funnel-copywriter, full forensic read) → graded (dgb-copy-chief) → fact-checked (dgb-fact-verifier) → revised → **LOCKED** in `SALES-COPY-FINAL-v1-s.md`. **Cahuilla RESTORED** (author reversal) as a compliant case-study beat (no $-outcome). Built a 2nd skill **`dgb-funnel-designer`** (killer web3 / full toolbox / always sale-optimized / desktop-tablet-mobile hardwired / compliance=claims-not-style). Design build spec in progress → `SALES-DESIGN-SPEC-v1-s.md`. **Execution waits for the design** (author: hand copy + design to the team together). Website-build handover instructions to follow once design lands.
- **v0.7 — 2026-06-30** — Routing corrected: `/v2` IS the live root (root renders `<V2Home/>`), so short page moves to **`/s`** (long stays **`/v1`**); root untouched, repoint to winner later. DESIGN locked: build both in the **v2 design system** (root look), NOT the old `/long` components — that mismatch is what the author flagged. Noted the root/v2 page has the right design but non-compliant copy (redo copy when root is repointed).
- **v0.6 — 2026-06-30** — Author directives: build long on **`/v1`**, short on **`/v2`** (later corrected to `/s` in v0.7), **do not touch root until approved**. Added the HARD rule: copy written by a **sales-funnel + copywriting expert skill** that **forensically reads every chapter** (special attention to Read This First + Ch 8 case summary for flow), not summaries. Marked the v0.1 draft as starting-reference-only (does not meet the forensic bar). Website-build handover instructions to be issued ONLY after the copy is confirmed perfect to guidelines.
- **v0.5 — 2026-06-30** — Newsletter price **scales with total member count** (grandfathering = LS keeps each member on their billing price). Added **tier-ladder display spec** (static or live) with an EXAMPLE placeholder ladder — awaiting author's real thresholds + prices. Sample PDF extended to **40 pp** (front matter + Ch 1 + opening of Ch 2).
