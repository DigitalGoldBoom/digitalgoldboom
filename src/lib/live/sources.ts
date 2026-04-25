// Typed fetch wrappers for each upstream live source.
// All routes under /api/live/* return this shape; the page-level fetch hits the
// aggregator and hands back a fully typed bundle the dashboard can consume.

export type LiveValue = {
  value: number;
  unit: string;
  updatedAt: string; // ISO timestamp
  source: string;
  /** True when the value was served from a fallback / last-known cache. */
  stale?: boolean;
  /** Optional extras (24h change, market cap, etc.). */
  meta?: Record<string, number | string>;
};

export type LiveValueOrError = LiveValue | { error: string };

export type LiveBundle = {
  spot?: LiveValue;
  aisc?: LiveValue;
  biv?: LiveValue;
  paxg?: LiveValue;
  xaut?: LiveValue;
  btcMcap?: LiveValue;
  usDebt?: LiveValue;
  rwaMcap?: LiveValue;
  /** ISO timestamp of when the aggregator finished assembling the bundle. */
  assembledAt: string;
  /** Map of source key -> error message for any leg that failed. */
  errors: Record<string, string>;
};

const NATGOLD_SNAPSHOT_URL = 'https://api.natgold.com/api/natgold-snapshots/latest';
const COINGECKO_PAXG_URL =
  'https://api.coingecko.com/api/v3/coins/pax-gold?localization=false&tickers=false&community_data=false&developer_data=false';
const COINGECKO_XAUT_URL =
  'https://api.coingecko.com/api/v3/coins/tether-gold?localization=false&tickers=false&community_data=false&developer_data=false';
const COINGECKO_BTC_URL =
  'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false';
const TREASURY_DEBT_URL =
  'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1';
// DefiLlama tracks tokenized RWA TVL across 100+ protocols (BUIDL, USYC,
// XAUT, PAXG, Ondo, etc.). Their /protocols endpoint is free, no-auth, and
// returns a `category: "RWA"` filter we can sum. This is what rwa.xyz also
// aggregates under the hood, but DefiLlama exposes the data publicly.
const DEFILLAMA_PROTOCOLS_URL = 'https://api.llama.fi/protocols';

const SNAPSHOT_TTL_SECONDS = 300;
const COINGECKO_TTL_SECONDS = 300;
const TREASURY_TTL_SECONDS = 86_400;
const RWA_TTL_SECONDS = 3_600;

/** Last-known fallback for RWA tokenized total market cap (book snapshot). */
const RWA_FALLBACK_USD = 35_000_000_000;

type CoinGeckoCoin = {
  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    price_change_percentage_24h?: number;
    last_updated?: string;
  };
  last_updated?: string;
};

type NatGoldSnapshot = {
  data?: {
    timestamp?: string;
    aisc?: string;
    gold_price?: string;
    natgold_price?: string;
    bitcoin_price?: string;
    aisc_open?: string;
    aisc_previous_close?: string;
  };
};

type TreasuryResponse = {
  data?: Array<{
    tot_pub_debt_out_amt?: string;
    record_date?: string;
  }>;
};

type DefiLlamaProtocol = {
  name?: string;
  category?: string;
  tvl?: number | null;
};

/**
 * Fetch the NatGold snapshot once and derive spot, aisc, biv, btc price out of it.
 * The book's BIV definition is COMEX spot - AISC; we compute it server-side so
 * downstream derivations stay consistent.
 */
export async function fetchNatGoldSnapshot(): Promise<{
  spot: LiveValue;
  aisc: LiveValue;
  biv: LiveValue;
  btcPrice: LiveValue;
}> {
  const upstream = await fetch(NATGOLD_SNAPSHOT_URL, {
    next: { revalidate: SNAPSHOT_TTL_SECONDS },
  });
  if (!upstream.ok) {
    throw new Error(`NatGold snapshot upstream ${upstream.status}`);
  }
  const json = (await upstream.json()) as NatGoldSnapshot;
  const data = json.data;
  if (!data) throw new Error('NatGold snapshot missing data');

  const spotValue = parseFloat(data.gold_price ?? '');
  const aiscValue = parseFloat(data.aisc ?? '');
  const btcValue = parseFloat(data.bitcoin_price ?? '');
  const updatedAt = data.timestamp ?? new Date().toISOString();

  if (!Number.isFinite(spotValue) || !Number.isFinite(aiscValue)) {
    throw new Error('NatGold snapshot missing spot/aisc');
  }

  return {
    spot: {
      value: spotValue,
      unit: 'USD/oz',
      updatedAt,
      source: 'NatGold API (COMEX)',
    },
    aisc: {
      value: aiscValue,
      unit: 'USD/oz',
      updatedAt,
      source: 'NatGold Real-Time AISC Index',
      meta: {
        open: parseFloat(data.aisc_open ?? '0'),
        previousClose: parseFloat(data.aisc_previous_close ?? '0'),
      },
    },
    biv: {
      value: spotValue - aiscValue,
      unit: 'USD/token',
      updatedAt,
      source: 'Derived (NatGold spot − AISC)',
    },
    btcPrice: {
      value: Number.isFinite(btcValue) ? btcValue : 0,
      unit: 'USD',
      updatedAt,
      source: 'NatGold API (BTC reference)',
    },
  };
}

async function fetchCoinGeckoCoin(
  url: string,
  label: string,
  symbol: string,
): Promise<LiveValue> {
  const upstream = await fetch(url, { next: { revalidate: COINGECKO_TTL_SECONDS } });
  if (!upstream.ok) throw new Error(`CoinGecko ${symbol} upstream ${upstream.status}`);
  const json = (await upstream.json()) as CoinGeckoCoin;
  const price = json.market_data?.current_price?.usd ?? NaN;
  const marketCap = json.market_data?.market_cap?.usd ?? NaN;
  const change24h = json.market_data?.price_change_percentage_24h ?? 0;
  const updatedAt =
    json.market_data?.last_updated ?? json.last_updated ?? new Date().toISOString();
  if (!Number.isFinite(price)) throw new Error(`CoinGecko ${symbol} missing price`);

  return {
    value: price,
    unit: 'USD',
    updatedAt,
    source: label,
    meta: {
      marketCap: Number.isFinite(marketCap) ? marketCap : 0,
      change24h,
    },
  };
}

export function fetchPaxg(): Promise<LiveValue> {
  return fetchCoinGeckoCoin(COINGECKO_PAXG_URL, 'CoinGecko (PAXG)', 'pax-gold');
}

export function fetchXaut(): Promise<LiveValue> {
  return fetchCoinGeckoCoin(COINGECKO_XAUT_URL, 'CoinGecko (XAUT)', 'tether-gold');
}

/**
 * Bitcoin price + market cap from CoinGecko. NatGold gives us BTC price but not
 * the supply-derived market cap, so we hit CoinGecko for the cap value.
 */
export async function fetchBtcMcap(): Promise<LiveValue> {
  const upstream = await fetch(COINGECKO_BTC_URL, {
    next: { revalidate: COINGECKO_TTL_SECONDS },
  });
  if (!upstream.ok) throw new Error(`CoinGecko bitcoin upstream ${upstream.status}`);
  const json = (await upstream.json()) as CoinGeckoCoin;
  const marketCap = json.market_data?.market_cap?.usd ?? NaN;
  const price = json.market_data?.current_price?.usd ?? NaN;
  const updatedAt =
    json.market_data?.last_updated ?? json.last_updated ?? new Date().toISOString();
  if (!Number.isFinite(marketCap)) throw new Error('CoinGecko bitcoin missing market_cap');
  return {
    value: marketCap,
    unit: 'USD',
    updatedAt,
    source: 'CoinGecko (Bitcoin)',
    meta: {
      price: Number.isFinite(price) ? price : 0,
    },
  };
}

export async function fetchUsDebt(): Promise<LiveValue> {
  const upstream = await fetch(TREASURY_DEBT_URL, {
    next: { revalidate: TREASURY_TTL_SECONDS },
  });
  if (!upstream.ok) throw new Error(`Treasury upstream ${upstream.status}`);
  const json = (await upstream.json()) as TreasuryResponse;
  const row = json.data?.[0];
  if (!row?.tot_pub_debt_out_amt) throw new Error('Treasury missing debt row');
  const value = parseFloat(row.tot_pub_debt_out_amt);
  if (!Number.isFinite(value)) throw new Error('Treasury debt parse failed');
  const updatedAt = row.record_date
    ? new Date(`${row.record_date}T00:00:00Z`).toISOString()
    : new Date().toISOString();
  return {
    value,
    unit: 'USD',
    updatedAt,
    source: 'fiscaldata.treasury.gov',
  };
}

/**
 * RWA tokenized total market cap, sourced from DefiLlama's free public API.
 * We sum the TVL of every protocol categorized as "RWA" (BUIDL, USYC, XAUT,
 * PAXG, Ondo, Backed Finance, etc.). Falls back to the book's last-known $35B
 * snapshot if DefiLlama is unreachable or returns no RWA protocols.
 *
 * Why DefiLlama instead of rwa.xyz directly: rwa.xyz requires a paid API key;
 * DefiLlama aggregates the same on-chain TVL data publicly and is the
 * canonical public source for tokenized-asset analytics.
 */
export async function fetchRwaMcap(): Promise<LiveValue> {
  try {
    const upstream = await fetch(DEFILLAMA_PROTOCOLS_URL, {
      next: { revalidate: RWA_TTL_SECONDS },
    });
    if (!upstream.ok) throw new Error(`defillama upstream ${upstream.status}`);
    const protocols = (await upstream.json()) as DefiLlamaProtocol[];
    if (!Array.isArray(protocols)) throw new Error('defillama unexpected shape');
    const rwaProtocols = protocols.filter((p) => p.category === 'RWA');
    if (rwaProtocols.length === 0) throw new Error('defillama returned no RWA protocols');
    const value = rwaProtocols.reduce((sum, p) => sum + (p.tvl ?? 0), 0);
    if (!Number.isFinite(value) || value <= 0) throw new Error('defillama RWA sum invalid');
    const top = rwaProtocols
      .filter((p) => Number.isFinite(p.tvl) && (p.tvl ?? 0) > 0)
      .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0))[0];
    return {
      value,
      unit: 'USD',
      updatedAt: new Date().toISOString(),
      source: 'DefiLlama (RWA category aggregate)',
      meta: {
        protocolCount: rwaProtocols.length,
        topProtocol: top?.name ?? 'unknown',
        topProtocolTvl: top?.tvl ?? 0,
      },
    };
  } catch {
    return {
      value: RWA_FALLBACK_USD,
      unit: 'USD',
      updatedAt: '2026-02-26T00:00:00Z',
      source: 'DefiLlama (fallback — upstream failed)',
      stale: true,
    };
  }
}

/**
 * Build the full live bundle in parallel. Per-leg failures are isolated:
 * a single bad upstream never poisons the whole dashboard.
 */
export async function fetchLiveBundle(): Promise<LiveBundle> {
  const errors: Record<string, string> = {};

  const [snapshot, paxg, xaut, btcMcap, usDebt, rwaMcap] = await Promise.allSettled([
    fetchNatGoldSnapshot(),
    fetchPaxg(),
    fetchXaut(),
    fetchBtcMcap(),
    fetchUsDebt(),
    fetchRwaMcap(),
  ]);

  const bundle: LiveBundle = {
    assembledAt: new Date().toISOString(),
    errors,
  };

  if (snapshot.status === 'fulfilled') {
    bundle.spot = snapshot.value.spot;
    bundle.aisc = snapshot.value.aisc;
    bundle.biv = snapshot.value.biv;
  } else {
    errors.snapshot =
      snapshot.reason instanceof Error ? snapshot.reason.message : 'snapshot failed';
  }

  if (paxg.status === 'fulfilled') bundle.paxg = paxg.value;
  else errors.paxg = paxg.reason instanceof Error ? paxg.reason.message : 'paxg failed';

  if (xaut.status === 'fulfilled') bundle.xaut = xaut.value;
  else errors.xaut = xaut.reason instanceof Error ? xaut.reason.message : 'xaut failed';

  if (btcMcap.status === 'fulfilled') bundle.btcMcap = btcMcap.value;
  else
    errors.btcMcap =
      btcMcap.reason instanceof Error ? btcMcap.reason.message : 'btcMcap failed';

  if (usDebt.status === 'fulfilled') bundle.usDebt = usDebt.value;
  else
    errors.usDebt =
      usDebt.reason instanceof Error ? usDebt.reason.message : 'usDebt failed';

  if (rwaMcap.status === 'fulfilled') bundle.rwaMcap = rwaMcap.value;
  else
    errors.rwaMcap =
      rwaMcap.reason instanceof Error ? rwaMcap.reason.message : 'rwaMcap failed';

  return bundle;
}
