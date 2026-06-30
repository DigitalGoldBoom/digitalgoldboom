# Live-Stats Map — the dashboard's single index

**One organized place that lists every dashboard stat and where it points.**
Use it as the quick reference and the thing we build on.

> **Important — this is a *map*, not the master copy.** The real numbers live in
> the code files (below). They are the source of truth. This file organizes and
> explains them so you can see the whole picture at a glance. When you add or
> change a stat in the code, update the table here too.

> **Reworked 2026-06-30.** Rebuilt to the **current 17-chapter / 2-section book**
> (Operation Condense). The old map was built on the dead 23→16-chapter book and
> repeated the same number many times. New rules: **(1)** only figures that move
> with a live input; **(2)** each figure appears **once**, at its home chapter;
> **(3)** the current chapter's value wins on drift (ESG is now **$30T**, not
> $35T). The locked anchors (spot / AISC / BIV) show in the page's top **Key
> Inputs** row + the Ch 11 formula table, so they are **not** duplicated as cards.
> Every value + quote was re-verified verbatim against `C:\DGB-Book\chapters\ch-*`.

---

## The files that hold everything

| File | What it holds | Plain words |
|------|---------------|-------------|
| [src/data/stats-registry.ts](src/data/stats-registry.ts) | every one-number **card**: book value, where it appears, citation, the feed it points to, the formula | **the list of cards** |
| [src/data/tables-registry.ts](src/data/tables-registry.ts) | the 6 live **tables** recreated from the book (scorecard, BIV formula, exchange ratios, allocation, forecast, BIV trajectory) | **the list of tables** |
| [src/data/sources-catalog.ts](src/data/sources-catalog.ts) | every feed: who provides it, the web address, free/paid, how often it refreshes | **the list of feeds** |
| [src/lib/live/derive.ts](src/lib/live/derive.ts) | the math that turns a feed number into a **card** value | **the card calculator** |
| [src/lib/live/table-derive.ts](src/lib/live/table-derive.ts) | the math for each **table** cell | **the table calculator** |
| [src/lib/live/sources.ts](src/lib/live/sources.ts) | the code that actually *fetches* the live feeds right now | **the fetcher (what's truly wired)** |
| [src/data/section-blurbs.ts](src/data/section-blurbs.ts) | the short intro text for each book section | **the section intros** |

A stat shows a **live** number only when the feed is actually fetched (sources.ts)
**and** there's a formula handler for it (derive.ts / table-derive.ts). If either
is missing, the dashboard shows the **book snapshot** value instead — still real,
just frozen at the Feb 26 2026 book date.

---

## The feeds — where the numbers come from

### Wired and live right now (fetched every load by [sources.ts](src/lib/live/sources.ts))
| Feed (registry id) | Actually fetched from | Gives us |
|--------------------|-----------------------|----------|
| `gold-spot` | **NatGold snapshot API** (`api.natgold.com/.../natgold-snapshots/latest`) | gold spot price |
| `natgold-aisc` | same NatGold snapshot | AISC (cost per oz) |
| `natgold-biv` | derived in the snapshot (spot − AISC) | BIV per token |
| `paxg` | CoinGecko (pax-gold) | PAXG price + market cap |
| `xaut` | CoinGecko (tether-gold) | XAUT price + market cap |
| `tokenized-gold-market-cap` | derived (PAXG + XAUT) | tokenized gold total |
| `rwa-tokenized-market-cap` | **DefiLlama** (RWA category sum) | tokenized RWA total |
| `btc-market-cap` | CoinGecko (bitcoin) | *fetched, but no card uses it anymore* |
| `us-debt` | US Treasury | *fetched, but no card uses it yet* |

> **Catalog vs wiring:** the catalog *names* TradingView/GoldAPI for `gold-spot`
> and rwa.xyz for the RWA cap, but the live code pulls **gold/AISC/BIV from the
> NatGold snapshot API** and **RWA from DefiLlama**. sources.ts is the truth.

### Catalogued but NOT live yet (show book snapshot only)
`gold-etf-aum`, `esg-aum`, `wgc-central-bank-purchases`, `wgc-gold-demand-trends`
— slow-moving figures (monthly/quarterly) the plan marks "manual refresh."

---

## The cards (stats-registry.ts) — book reading order

**Rule (author directive, 2026-06-30):** a figure earns a card ONLY if it has live
data behind it — a feed drives it, OR it is a fixed INPUT to a number a feed drives.
Everything else ("what it is" with no feed) was **stripped**. All cards below are
🟢 Live. IDs match `stats-registry.ts` exactly.

### Section 1 — The Inevitability Case

| Stat id | What it is | Points to | Formula |
|---------|-----------|-----------|---------|
| `ch01-in-ground-gold-value` | In-ground gold value (~$22T) | gold-spot | 132,000 t × 32,150.7 × spot |
| `ch01-above-ground-gold-value` | Above-ground gold value (~$36T) | gold-spot | 219,890 t × 32,150.7 × spot |
| `ch04-tokenized-rwa-market` | Tokenized RWA market ($35B) | rwa-tokenized-market-cap | DefiLlama RWA sum |
| `ch04-tokenized-gold-market` | Tokenized gold market ($6B) | tokenized-gold-market-cap | PAXG + XAUT |
| `ch04-total-gold-ecosystem-value` | Total gold ecosystem (~$58T) | gold-spot | (132k+219.89k) t × 32,150.7 × spot |

### Section 2 — The NatGold Ecosystem

| Stat id | What it is | Points to | Formula |
|---------|-----------|-----------|---------|
| `ch16-pre-market-reservation-value` | Reserved tokens' worth at BIV ($469M) | natgold-biv | 133,518 (fixed input) × live BIV ‡ |

### Stripped 2026-06-30 (no live feed behind them — "what they are")
`ch02-gold-etf-aum` ($701B), `ch03-gold-demand-total-tonnes` (4,974 t),
`ch06-gld-aum` ($180B), `ch07-esg-aum` ($30T), `ch07-central-bank-purchases`
(1,045 t). Also kept OFF entirely: the 98% operating margin and Fireblocks
corporate stats (irrelevant / static). Section 2's gold-anchored token economics
live in the **tables** below, not as cards. Ch 17 (The Road Ahead) has no
live-moving figure, so no panel.

---

## The tables (tables-registry.ts) — live recreations of book tables

| Table id | Chapter | What it shows | Live cells |
|----------|---------|---------------|-----------|
| `ch05-scorecard-2-financial` | Ch 5 | Traditional (508,000 oz) vs Digital (**462,000 tokens**) financial scorecard on a 1M-oz benchmark deposit | spot / AISC / BIV-driven |
| `ch11-biv-formula` | Ch 11 | COMEX spot − AISC = BIV | spot, aisc, biv |
| `ch11-exchange-ratios` | Ch 11 | Measured ×0.80 / Indicated ×0.40 / Inferred ×0.20 (Inferred-only excluded) | biv × ratio |
| `ch13-token-allocation` | Ch 13 | 73/20/5/2 (external) vs 93/5/2 (direct). 5% bucket = **Contingency Fund** | static % |
| `ch15-three-year-forecast` | Ch 15 | 17.5M tokens × BIV = ~$61.6B, split 73/20/5/2 | 17.5M × BIV |
| `ch16-biv-trajectory` | Ch 16 | BIV checkpoints Jun 16 2025 $1,854 → Jul 17 $1,762 → Dec 31 $2,721 → Jan 12 2026 $3,001 → close $3,518 → **live** | last row = live BIV |

---

## Quick rollups

- **6 live cards** (gold-price-driven + BIV-driven + token/RWA market caps).
- **4 snapshot-only cards** waiting on slow feeds (ETF AUM, GLD, ESG AUM, WGC tonnes)
  — these move monthly/quarterly, so manual refresh is acceptable for now.
- **6 live tables** (5 recompute against spot/AISC/BIV; the allocation split is static %).
- **Down from ~50 cards** before the 2026-06-30 dedup.

**Footnote**
- `‡` Pre-market card: 133,518 tokens were **reserved** (a locked historical count,
  never "raised"/"paid"). The **Book snapshot** column shows the locked close value
  (133,518 × $3,518 ≈ $469.66M; actual cumulative reservations were $469.138M as BIV
  rose over time); the **Live** column shows what those reserved tokens are worth at
  today's BIV via the `'133518 × biv'` handler.

### Things to build next
1. **Decide on the slow feeds** (ETF / GLD / ESG / WGC tonnes): wire a real API or
   accept manual refresh. These four are the only ⚪ snapshot cards left.
2. **Reconcile the catalog** so `gold-spot` / RWA provider notes match the real
   wiring (NatGold snapshot + DefiLlama).
3. **`btc-market-cap` + `us-debt` feeds are fetched but unused** — either wire a
   card or drop the fetch to save two requests per load.

---

## How to add a new stat (the build-on recipe)

1. Add a `StatEntry` to [stats-registry.ts](src/data/stats-registry.ts) — `id`, the
   book value, the `liveSourceId` (a feed), and a `derivation` string. **Verify the
   value + quote verbatim against the current chapter file first** (Golden Rule #1).
2. If that feed isn't fetched yet, add it to
   [sources.ts](src/lib/live/sources.ts) so the bundle includes it.
3. Add a handler in [derive.ts](src/lib/live/derive.ts) (cards) or
   [table-derive.ts](src/lib/live/table-derive.ts) (tables), keyed by the **exact**
   `derivation` string → return the typed math. (No handler = snapshot only.)
4. Add the row to this map and mark it 🟢 / ⚪.
5. `findUnhandledDerivations()` in derive.ts lists any card whose formula has no
   handler — run it to catch gaps automatically.

*This map reflects the code as of 2026-06-30. Keep it in step with the code files
above — they remain the source of truth.*
