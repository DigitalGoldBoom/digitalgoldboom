// Live data sources referenced by stats-registry.ts.
// Each source is the upstream data feed for one or more StatEntry.liveSourceId values.
// Auto-assembled from Phase 1 audit of Digital Gold Boom Ch 1-16.

export type FetchStrategy =
  | 'rest-api'
  | 'iframe-widget'
  | 'scrape'
  | 'manual-refresh'
  | 'derived';

export type CostTier = 'free' | 'paid' | 'tbd';

export type SourceEntry = {
  id: string;
  label: string;
  provider: string;
  fetchStrategy: FetchStrategy;
  endpoint?: string;
  authRequired: boolean;
  costTier: CostTier;
  cacheTtlSeconds: number;
  notes: string;
};

export const SOURCES_CATALOG: SourceEntry[] = [
  {
    id: 'gold-spot',
    label: 'COMEX Gold Spot Price (USD/oz)',
    provider: 'TradingView (COMEX:GC1!) / GoldAPI.io / Metals.dev',
    fetchStrategy: 'iframe-widget',
    endpoint:
      'https://www.tradingview.com/widgetembed/?symbol=COMEX%3AGC1%21&interval=D',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'Iframe already used in c:\\DGB-site\\web\\src\\components\\PriceWidget.tsx (lines 113-119). For server-side derivation in Phase 2, use GoldAPI.io ($10/mo for 10k req/mo) or Metals.dev (free tier). Book snapshot anchor: $5,194/oz Feb 26 2026 (pre-market close).',
  },
  {
    id: 'natgold-aisc',
    label: 'NatGold Real-Time AISC Index (USD/oz)',
    provider: 'NatGold Digital',
    fetchStrategy: 'iframe-widget',
    endpoint: 'https://widgets.natgold.com/real-time-aisc-index',
    authRequired: false,
    costTier: 'tbd',
    cacheTtlSeconds: 3600,
    notes:
      'NatGold widget; no public JSON API confirmed. Ch 11 cites 37 publicly reporting producers aggregated. Phase 2 decision: ask NatGold team for JSON endpoint or scrape carefully. Book snapshot anchor: $1,676/oz Feb 26 2026.',
  },
  {
    id: 'natgold-biv',
    label: 'NatGold Baseline Intrinsic Value per Token (USD)',
    provider: 'NatGold Digital (or derived: spot - aisc)',
    fetchStrategy: 'derived',
    endpoint: 'https://widgets.natgold.com/baseline-intrinsic-value',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'Defined by Ch 11 as BIV = COMEX spot - AISC. Server-side derivation preferred (gold-spot - natgold-aisc). NatGold also publishes an iframe widget. Book snapshot anchor: $3,518/token Feb 26 2026.',
  },
  {
    id: 'natgold-biv-historical',
    label: 'NatGold BIV — Historical Checkpoints (locked at publication)',
    provider: 'NatGold Digital, Pre-Market Reservation Reports',
    fetchStrategy: 'manual-refresh',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Historical BIV checkpoint values cited in Ch 16 (Jun 16 2025 $1,854; Jul 17 2025 $1,761.69; Dec 31 2025 $2,721.23; Jan 12 2026 $3,001; late-wave avg $3,260). Locked at publication. Not live-tracked; included in registry so the dashboard can render the demand-curve narrative alongside live BIV.',
  },
  {
    id: 'paxg',
    label: 'Paxos Gold (PAXG) — price & market cap',
    provider: 'TradingView (KRAKEN:PAXGUSD) / CoinGecko',
    fetchStrategy: 'rest-api',
    endpoint: 'https://api.coingecko.com/api/v3/coins/pax-gold',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'CoinGecko free tier 50/min. TradingView iframe also available. Used for tokenized-gold market cap comparison vs NatGold token economics.',
  },
  {
    id: 'xaut',
    label: 'Tether Gold (XAUT) — price & market cap',
    provider: 'TradingView (KRAKEN:XAUTUSD) / CoinGecko',
    fetchStrategy: 'rest-api',
    endpoint: 'https://api.coingecko.com/api/v3/coins/tether-gold',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'CoinGecko free tier 50/min. PAXG + XAUT combined ~96-97% of tokenized gold market (per Ch 6 endnote 14).',
  },
  {
    id: 'tokenized-gold-market-cap',
    label: 'Tokenized Gold — total market capitalization (USD)',
    provider: 'Aggregate of paxg + xaut + smaller tokens',
    fetchStrategy: 'derived',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'Sum of PAXG + XAUT market caps + minor tokenized gold products. Book snapshot $6B (early 2026, Ch 4, 6, 8). Tripled from $1.9B in early 2025 to $6B in early 2026 (Ch 6 endnote 14).',
  },
  {
    id: 'rwa-tokenized-market-cap',
    label: 'Tokenized RWA market capitalization (USD)',
    provider: 'rwa.xyz',
    fetchStrategy: 'scrape',
    endpoint: 'https://app.rwa.xyz',
    authRequired: false,
    costTier: 'tbd',
    cacheTtlSeconds: 86400,
    notes:
      'rwa.xyz is the canonical source. API access policy unconfirmed — Phase 2 needs to evaluate paid API tier vs. scraping the public dashboard. Manual quarterly refresh is the fallback.',
  },
  {
    id: 'btc-market-cap',
    label: 'Bitcoin market capitalization (USD)',
    provider: 'CoinGecko',
    fetchStrategy: 'rest-api',
    endpoint: 'https://api.coingecko.com/api/v3/coins/bitcoin',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 60,
    notes:
      'Free tier 50/min. Used for the BTC vs gold market-cap comparison in Ch 1.',
  },
  {
    id: 'esg-aum',
    label: 'Global ESG-mandated assets under management (USD)',
    provider: 'GSIA / Bloomberg Intelligence / Morningstar',
    fetchStrategy: 'manual-refresh',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'GSIA publishes biennially. Bloomberg Intelligence updates approximately annually. Manual refresh; the figure moves slowly enough that a quarterly check is sufficient. Book cites $30T (2021), $33T (2024), $35T (2026), $50T (2025 projection), $40T+ (2030 projection).',
  },
  {
    id: 'us-debt',
    label: 'US Treasury total public debt outstanding (USD)',
    provider: 'fiscaldata.treasury.gov',
    fetchStrategy: 'rest-api',
    endpoint:
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Free, no auth. Daily updates. Used for Ch 1 US debt vs gold comparison and Ch 8 Fed balance sheet expansion context.',
  },
  {
    id: 'wgc-central-bank-purchases',
    label: 'World Gold Council — central bank gold purchases (tonnes)',
    provider: 'World Gold Council',
    fetchStrategy: 'manual-refresh',
    endpoint:
      'https://www.gold.org/goldhub/data/gold-demand-by-central-banks',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'WGC publishes Gold Demand Trends quarterly. Manual refresh sufficient. Book cites: 1,136t (2022), 1,050t (2023), 1,045t (2024), 863t (2025 9-month YTD).',
  },
  {
    id: 'wgc-gold-demand-trends',
    label: 'World Gold Council — Gold Demand Trends (tonnes by category)',
    provider: 'World Gold Council',
    fetchStrategy: 'manual-refresh',
    endpoint:
      'https://www.gold.org/goldhub/research/gold-demand-trends',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Quarterly. Used for Ch 3 demand breakdown (jewelry/investment/CB/industrial) and Ch 7 ETF holdings + bar/coin demand.',
  },
  {
    id: 'gold-etf-aum',
    label: 'Global gold-backed ETF assets under management (USD)',
    provider: 'World Gold Council / SPDR / iShares / providers',
    fetchStrategy: 'manual-refresh',
    endpoint: 'https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'WGC publishes monthly. Book cites GLD ~$180B (Ch 6), gold ETF total $701B (Ch 2, 6) and $559B (Ch 7) — note divergence; flag for author. Manual refresh.',
  },
  {
    id: 'usgs-wgc-gold-stocks',
    label: 'USGS / WGC — total above-ground & in-ground gold stocks (tonnes)',
    provider: 'USGS Mineral Commodity Summaries / WGC / Metals Focus',
    fetchStrategy: 'manual-refresh',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Annual updates. Above-ground 219,890 tonnes, in-ground reserves+resources ~132,000 tonnes (per Ch 6, 7 endnote 14, 17). The tonnage is the static input; the USD valuation moves with spot price.',
  },
  {
    id: 'sp-global-mining',
    label: 'S&P Global Market Intelligence — mining cost & exploration data',
    provider: 'S&P Global',
    fetchStrategy: 'manual-refresh',
    authRequired: true,
    costTier: 'paid',
    cacheTtlSeconds: 86400,
    notes:
      'Paid subscription. Source for global AISC, exploration spend ($5.6B 2025 vs $10.5B 2012 peak), discovery counts. Manual refresh; data points are quarterly/annual.',
  },
  {
    id: 'fed-balance-sheet',
    label: 'Federal Reserve total assets (USD)',
    provider: 'Federal Reserve / FRED (WALCL series)',
    fetchStrategy: 'rest-api',
    endpoint: 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=WALCL',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Free FRED CSV. Used for Ch 8 reference to $4.8T expansion Mar 2020 - Apr 2022.',
  },
  {
    id: 'none-static',
    label: 'Static historical fact — no live tracking',
    provider: 'N/A',
    fetchStrategy: 'manual-refresh',
    authRequired: false,
    costTier: 'free',
    cacheTtlSeconds: 86400,
    notes:
      'Sentinel for stats catalogued in the audit but determined NOT to be snapshot-dependent on inspection (historical event values, fixed methodology constants, illustrative calculations). These should be filtered out of the live dashboard rendering.',
  },
];
