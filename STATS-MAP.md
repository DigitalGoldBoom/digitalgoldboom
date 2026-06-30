# Live-Stats Map — the dashboard's single index

**One organized place that lists every dashboard stat and where it points.**
Use it as the quick reference and the thing we build on.

> **Important — this is a *map*, not the master copy.** The real numbers live in
> three code files (below). They are the source of truth. This file organizes and
> explains them so you can see the whole picture at a glance. When you add or
> change a stat in the code, update the table here too.

---

## The three files that hold everything

| File | What it holds | Plain words |
|------|---------------|-------------|
| [src/data/stats-registry.ts](src/data/stats-registry.ts) | every stat: its book value, where it appears in the book, its citation, the feed it points to, and the formula | **the list of stats** |
| [src/data/sources-catalog.ts](src/data/sources-catalog.ts) | every feed: who provides it, the web address, free/paid, how often it refreshes | **the list of feeds** |
| [src/lib/live/derive.ts](src/lib/live/derive.ts) | the actual math that turns a feed number into a stat | **the calculator** |
| [src/lib/live/sources.ts](src/lib/live/sources.ts) | the code that actually goes and *fetches* the live feeds right now | **the fetcher (what's truly wired)** |

A stat shows a **live** number on the dashboard only when **all three** line up:
the feed is actually fetched (sources.ts) **and** there's a formula handler for it
(derive.ts). If either is missing, the dashboard shows the **book snapshot** value
instead — still real, just frozen at the Feb 26 2026 book date.

---

## The feeds — where the numbers come from

### Wired and live right now (fetched every load by [sources.ts](src/lib/live/sources.ts))
| Feed (registry id) | Actually fetched from | Gives us |
|--------------------|-----------------------|----------|
| `gold-spot` | **NatGold snapshot API** (`api.natgold.com/.../natgold-snapshots/latest`) | gold spot price |
| `natgold-aisc` | same NatGold snapshot | AISC (cost per oz) |
| `natgold-biv` | derived in the snapshot (spot − AISC) | BIV per token |
| `btc-market-cap` | CoinGecko (bitcoin) | Bitcoin market cap |
| `paxg` | CoinGecko (pax-gold) | PAXG price + market cap |
| `xaut` | CoinGecko (tether-gold) | XAUT price + market cap |
| `tokenized-gold-market-cap` | derived (PAXG + XAUT) | tokenized gold total |
| `rwa-tokenized-market-cap` | **DefiLlama** (RWA category sum) | tokenized RWA total |
| `us-debt` | US Treasury | national debt *(fetched, but no stat uses it yet)* |

> **Two honest mismatches** between the plan and the wiring (worth knowing before
> you build on it): the catalog *names* TradingView/GoldAPI for `gold-spot` and
> rwa.xyz for the RWA cap, but the live code actually pulls **gold/AISC/BIV from
> the NatGold snapshot API** and **RWA from DefiLlama**. The catalog is the older
> plan; sources.ts is the truth. Worth reconciling the catalog notes one day.

### Catalogued but NOT live yet (show book snapshot only)
`gold-etf-aum`, `esg-aum`, `wgc-central-bank-purchases`, `wgc-gold-demand-trends`,
`usgs-wgc-gold-stocks`, `sp-global-mining` (paid), `fed-balance-sheet`,
`natgold-biv-historical` (locked on purpose). These are mostly slow-moving figures
(monthly/quarterly) that the plan marks "manual refresh."

---

## Master stat list (book reading order)

**Live** = updates on the dashboard now. **Snapshot** = shows the frozen book value
until its feed/handler is built. IDs match `stats-registry.ts` exactly.

### Section 1 — Why Gold No Longer Needs Mining

| Stat id | What it is | Points to | Formula | Status |
|---------|-----------|-----------|---------|--------|
| `ch01-in-ground-gold-value` | In-ground gold value (~$22T) | gold-spot | 132,000 t × 32,150.7 × spot | 🟢 Live |
| `ch01-above-ground-gold-value` | Above-ground gold value (~$36T) | gold-spot | 219,890 t × 32,150.7 × spot | 🟢 Live |
| `ch01-bitcoin-market-cap` | Bitcoin market cap | btc-market-cap | CoinGecko mcap | 🟢 Live |
| `ch01-cb-gold-purchases-2025-ytd` | Central-bank gold buys | wgc-central-bank-purchases | WGC tonnes | ⚪ Snapshot |
| `ch02-ath-gold-price-jan-2026` | Gold all-time high | gold-spot | running max of spot | ⚪ Snapshot* |
| `ch02-global-aisc` | Global AISC | natgold-aisc | live AISC | 🟢 Live |
| `ch02-us-aisc` | US AISC | sp-global-mining | S&P quarterly | ⚪ Snapshot |
| `ch02-exploration-spend-current` | Gold exploration spend | sp-global-mining | S&P/PDAC annual | ⚪ Snapshot |
| `ch02-gold-etf-aum` | Gold ETF AUM | gold-etf-aum | WGC monthly | ⚪ Snapshot |
| `ch03-above-ground-inventory-tonnes` | Above-ground tonnes | usgs-wgc-gold-stocks | USGS/WGC annual | ⚪ Snapshot |
| `ch03-total-gold-ecosystem-value` | Total gold ecosystem (~$58T) | gold-spot | (132k+219.89k) t × 32,150.7 × spot | 🟢 Live |
| `ch03-gold-demand-total-tonnes` | Annual gold demand | wgc-gold-demand-trends | WGC total | ⚪ Snapshot |
| `ch04-tokenized-rwa-market` | Tokenized RWA market | rwa-tokenized-market-cap | DefiLlama RWA sum | 🟢 Live |
| `ch04-tokenized-gold-market` | Tokenized gold market | tokenized-gold-market-cap | PAXG + XAUT | 🟢 Live |
| `ch04-paxg-market-cap` | PAXG market cap | paxg | CoinGecko mcap | 🟢 Live |
| `ch04-xaut-market-cap` | XAUT market cap | xaut | CoinGecko mcap | 🟢 Live |
| `ch05-comex-spot-locked` | COMEX spot (scorecard) | gold-spot | live spot | 🟢 Live |
| `ch05-traditional-aisc` | Traditional AISC | natgold-aisc | live AISC | 🟢 Live |
| `ch05-traditional-gross-revenue` | Trad. gross revenue | gold-spot | 508,000 × spot | 🟢 Live |
| `ch05-traditional-operating-cost` | Trad. operating cost | natgold-aisc | 508,000 × AISC | 🟢 Live |
| `ch05-traditional-net-value` | Trad. net value | gold-spot | 508k×spot − 508k×AISC − $80M | 🟢 Live |
| `ch05-biv-per-token` | BIV per token | natgold-biv | spot − AISC | 🟢 Live |
| `ch05-digital-gross-value` | Digital gross value | natgold-biv | 420,000 × BIV | 🟢 Live |
| `ch05-digital-operating-cost` | Digital op cost (AITC) | natgold-biv | 420,000 × BIV × 0.33 | 🟢 Live |
| `ch05-digital-net-value` | Digital net value (67%) | natgold-biv | 420,000 × 0.67 × BIV | 🟢 Live |
| `ch06-gld-aum` | GLD AUM | gold-etf-aum | State Street GLD | ⚪ Snapshot |
| `ch06-gold-etf-category-aum` | Gold ETF category AUM | gold-etf-aum | WGC monthly | ⚪ Snapshot |
| `ch06-esg-aum` | ESG AUM (canonical $35T) | esg-aum | GSIA/Bloomberg | ⚪ Snapshot† |
| `ch06-tokenized-gold-market` | Tokenized gold (early 26) | tokenized-gold-market-cap | PAXG + XAUT | 🟢 Live |
| `ch06-in-ground-verified-gold-restate` | In-ground $22T restate | gold-spot | 132k × 32,150.7 × spot | 🟢 Live |
| `ch07-gold-etf-aum` | Gold ETF AUM (book anchor) | gold-etf-aum | WGC monthly | ⚪ Snapshot |
| `ch07-esg-aum-current` | ESG AUM ($33T, Ch7) | esg-aum | GSIA/Bloomberg | ⚪ Snapshot† |
| `ch07-in-ground-verified-gold-restate` | In-ground $22T restate | gold-spot | 132k × 32,150.7 × spot | 🟢 Live |
| `ch08-gold-price-feb-2026` | Gold spot (Ch8 anchor) | gold-spot | live spot | 🟢 Live |
| `ch08-gold-market-cap-feb-2026` | Above-ground gold mcap | gold-spot | 219,890 t × 32,150.7 × spot | 🟢 Live |
| `ch08-tokenized-gold-mar-2026` | Tokenized gold (Mar 26) | tokenized-gold-market-cap | PAXG + XAUT | 🟢 Live |
| `ch08-cb-purchases-2025` | Central-bank buys 2025 | wgc-central-bank-purchases | WGC tonnes | ⚪ Snapshot |
| `ch08-esg-aum-current` | ESG AUM ($30T+, Ch8) | esg-aum | GSIA/Bloomberg | ⚪ Snapshot† |

### Section 2 — The NatGold Digital Mining Ecosystem

| Stat id | What it is | Points to | Formula | Status |
|---------|-----------|-----------|---------|--------|
| `ch11-anchor-comex-spot` | COMEX spot (BIV anchor) | gold-spot | live spot | 🟢 Live |
| `ch11-anchor-aisc` | AISC (BIV anchor) | natgold-aisc | live AISC | 🟢 Live |
| `ch11-anchor-biv` | BIV per token (anchor) | natgold-biv | spot − AISC | 🟢 Live |
| `ch11-pre-market-reservation-amount` | Pre-market reservation $ | natgold-biv | 133,518 × BIV | 🟢 Live‡ |
| `ch13-hypothetical-mining-company-proceeds` | 370k-oz deal proceeds | natgold-biv | 128,000 × 0.73 × BIV | 🟢 Live |
| `ch15-three-year-forecast-gross-value` | 3-yr forecast ($61.6B) | natgold-biv | 17,500,000 × BIV | 🟢 Live |
| `ch15-mining-company-73pct-cumulative` | Miner 73% cumulative | natgold-biv | 17.5M × 0.73 × BIV | 🟢 Live |
| `ch15-natgold-digital-20pct-cumulative` | NatGold 20% cumulative | natgold-biv | 17.5M × 0.20 × BIV | 🟢 Live |
| `ch15-integrity-fund-5pct-cumulative` | Integrity Fund 5% | natgold-biv | 17.5M × 0.05 × BIV | 🟢 Live |
| `ch15-social-giveback-2pct-cumulative` | Social Giveback 2% | natgold-biv | 17.5M × 0.02 × BIV | 🟢 Live |
| `ch15-social-giveback-year1` | Social Giveback yr1 | natgold-biv | 2,500,000 × 0.02 × BIV | 🟢 Live |
| `ch15-idle-asset-22-trillion` | Idle in-ground $22T | gold-spot | 132k × 32,150.7 × spot | 🟢 Live |
| `ch15-newmont-comparison-year3` | Year-3 vs Newmont | natgold-biv | year-3 tokens × BIV | ⚪ Snapshot* |
| `ch16-pre-market-reservation-value` | Reservation $ at current BIV | natgold-biv | 133,518 × BIV | 🟢 Live‡ |
| `ch16-closing-biv-per-token` | Closing BIV | natgold-biv | spot − AISC | 🟢 Live |
| `ch16-gold-spot-at-close` | Gold spot at close | gold-spot | live spot | 🟢 Live |
| `ch16-aisc-at-close` | AISC at close | natgold-aisc | live AISC | 🟢 Live |
| `ch16-biv-jun-2025-checkpoint` | BIV Jun 16 2025 | natgold-biv-historical | locked | ⚪ Snapshot (locked) |
| `ch16-biv-jul-2025-checkpoint` | BIV Jul 17 2025 | natgold-biv-historical | locked | ⚪ Snapshot (locked) |
| `ch16-biv-yearend-2025-checkpoint` | BIV Dec 31 2025 | natgold-biv-historical | locked | ⚪ Snapshot (locked) |
| `ch16-biv-jan-12-2026-checkpoint` | BIV Jan 12 2026 | natgold-biv-historical | locked | ⚪ Snapshot (locked) |
| `ch16-biv-late-wave-avg` | BIV late-wave avg | natgold-biv-historical | locked | ⚪ Snapshot (locked) |

**Footnotes**
- `*` **No formula handler yet** but conceptually live — needs special logic
  (running all-time-high tracker; year-3 token count from the forecast schedule).
- `†` **ESG AUM divergence**, author-acknowledged: Ch6 $35T / Ch7 $33T / Ch8 $30T+
  for the same metric. Pin the live badge to `ch06-esg-aum` until the book
  reconciles. (Notes are inside the registry entries.)
- `‡` **Now live (fixed 2026-06-30):** the **pre-market reservation dollar figure**
  is computed as `133,518 reserved tokens × current BIV` via the `'133518 × biv'`
  handler in derive.ts. The token *count* stays static (reserved, not "raised") and
  the **locked $469.66M book figure stays in the "Book snapshot" column**; the live
  "Live" column shows today's worth of those reserved tokens, with a delta vs. book.

---

## Quick rollups

- **~33 stats live now** (gold-price-driven + BIV-driven + crypto market caps).
- **~9 snapshot-only stats** waiting on slow feeds (ETF AUM, ESG AUM, WGC tonnes,
  S&P data) — these move monthly/quarterly, so manual refresh is acceptable for now.
- **5 locked historical** BIV checkpoints — never go live (by design).
- **`us-debt` feed is fetched but unused** — no stat points to it yet; either wire
  a debt stat or drop the fetch.

### Highest-value things to build next
1. ~~`133518 × biv` handler → headline US$469M reservation figure live~~ **✅ done 2026-06-30.**
2. **Running all-time-high tracker** for `ch02-ath-gold-price-jan-2026` — needs
   stored history (the database), so it waits on DATABASE-OUTLINE.md. (*)
3. **Year-3 token count** for `ch15-newmont-comparison-year3` — can't connect until
   the year-3 token number is defined (won't guess it). (*)
4. **Reconcile the catalog** so `gold-spot`/RWA provider notes match the real
   wiring (NatGold snapshot + DefiLlama).
5. **Decide on the slow feeds** (ETF/ESG/WGC): wire a real API or accept manual.

---

## How to add a new stat (the build-on recipe)

1. Add a `StatEntry` to [stats-registry.ts](src/data/stats-registry.ts) — give it
   an `id`, the book value, the `liveSourceId` (a feed), and a `derivation` string.
2. If that feed isn't fetched yet, add it to
   [sources.ts](src/lib/live/sources.ts) so the bundle includes it.
3. Add a handler in [derive.ts](src/lib/live/derive.ts) keyed by the **exact**
   `derivation` string → return the typed math. (No handler = snapshot only.)
4. Add the row to this map and mark it 🟢 / ⚪.
5. `findUnhandledDerivations()` in derive.ts lists any stat whose formula has no
   handler — run it to catch gaps automatically.

*This map reflects the code as of this writing. Keep it in step with the three
files above — they remain the source of truth.*
