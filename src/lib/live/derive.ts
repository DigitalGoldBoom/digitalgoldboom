// Derivation engine for live stat values.
// Each unique `derivation` string in stats-registry.ts maps to a typed function
// here. NEVER use eval or new Function — the registry is data, not code.
//
// To add a new pattern: copy the formula text from a StatEntry.derivation field
// verbatim into DERIVATION_HANDLERS, write the typed math, return the result.
// If a derivation field arrives that doesn't have a handler, the dashboard
// shows the book snapshot only and we log a warning to the server.

import type { StatEntry } from '@/data/stats-registry';
import type { LiveBundle, LiveValue } from './sources';

/** Inputs every derivation function may use. Undefined when upstream failed. */
type DerivationInputs = {
  spot?: number;
  aisc?: number;
  biv?: number;
  paxgMcap?: number;
  xautMcap?: number;
  btcMcap?: number;
  usDebt?: number;
  rwaMcap?: number;
};

const OZ_PER_TONNE = 32_150.7;
const IN_GROUND_TONNES = 132_000;
const ABOVE_GROUND_TONNES = 219_890;
const CLOSURE_LIABILITY_USD = 80_000_000;

type Handler = (inputs: DerivationInputs) => number | undefined;

/**
 * Map of (verbatim) registry derivation strings -> typed math handlers.
 * Patterns lifted from STATS_REGISTRY's `derivation` fields in stats-registry.ts.
 */
const DERIVATION_HANDLERS: Record<string, Handler> = {
  // -----------------------------------------------------------------------
  // Live anchors — the upstream value IS the derived value
  // -----------------------------------------------------------------------
  'live COMEX spot': ({ spot }) => spot,
  'NatGold Real-Time AISC Index live value': ({ aisc }) => aisc,
  'NatGold Real-Time AISC Index live': ({ aisc }) => aisc,
  'gold_spot_price − aisc': ({ biv }) => biv,

  // -----------------------------------------------------------------------
  // In-ground / above-ground gold ecosystem valuations
  // -----------------------------------------------------------------------
  'in_ground_tonnes (132000, USGS/WGC) × 32150.7 oz/tonne × gold_spot_price': ({
    spot,
  }) => (spot === undefined ? undefined : IN_GROUND_TONNES * OZ_PER_TONNE * spot),

  'above_ground_tonnes (219890, USGS/WGC) × 32150.7 oz/tonne × gold_spot_price': ({
    spot,
  }) => (spot === undefined ? undefined : ABOVE_GROUND_TONNES * OZ_PER_TONNE * spot),

  '(132000 + 219890 tonnes) × 32150.7 oz/tonne × gold_spot_price': ({ spot }) =>
    spot === undefined
      ? undefined
      : (IN_GROUND_TONNES + ABOVE_GROUND_TONNES) * OZ_PER_TONNE * spot,

  '132000 × 32150.7 × gold_spot_price': ({ spot }) =>
    spot === undefined ? undefined : IN_GROUND_TONNES * OZ_PER_TONNE * spot,

  '219890 × 32150.7 × gold_spot_price': ({ spot }) =>
    spot === undefined ? undefined : ABOVE_GROUND_TONNES * OZ_PER_TONNE * spot,

  // -----------------------------------------------------------------------
  // Chapter 5 traditional-mining 1M-oz benchmark
  // -----------------------------------------------------------------------
  '508000 × gold_spot_price': ({ spot }) =>
    spot === undefined ? undefined : 508_000 * spot,
  '508000 × aisc': ({ aisc }) => (aisc === undefined ? undefined : 508_000 * aisc),
  '(508000 × gold_spot_price) − (508000 × aisc) − 80_000_000 (closure liability midpoint)':
    ({ spot, aisc }) =>
      spot === undefined || aisc === undefined
        ? undefined
        : 508_000 * spot - 508_000 * aisc - CLOSURE_LIABILITY_USD,

  // -----------------------------------------------------------------------
  // Chapter 5 digital-mining (420k tokens × BIV)
  // -----------------------------------------------------------------------
  '420000 × biv': ({ biv }) => (biv === undefined ? undefined : 420_000 * biv),
  '420000 × biv × 0.33': ({ biv }) =>
    biv === undefined ? undefined : 420_000 * biv * 0.33,
  '420000 × 0.67 × biv': ({ biv }) =>
    biv === undefined ? undefined : 420_000 * 0.67 * biv,

  // -----------------------------------------------------------------------
  // Chapter 13 hypothetical 370k-oz / 128k token walkthrough
  // -----------------------------------------------------------------------
  '128000 × 0.73 × biv': ({ biv }) =>
    biv === undefined ? undefined : 128_000 * 0.73 * biv,

  // -----------------------------------------------------------------------
  // Chapter 15 three-year forecast (17.5M tokens)
  // -----------------------------------------------------------------------
  '17500000 × biv': ({ biv }) => (biv === undefined ? undefined : 17_500_000 * biv),
  '17500000 × 0.73 × biv': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * 0.73 * biv,
  '17500000 × 0.20 × biv': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * 0.2 * biv,
  '17500000 × 0.05 × biv': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * 0.05 * biv,
  '17500000 × 0.02 × biv': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * 0.02 * biv,
  '2500000 × 0.02 × biv': ({ biv }) =>
    biv === undefined ? undefined : 2_500_000 * 0.02 * biv,

  // -----------------------------------------------------------------------
  // Tokenized-gold combined market cap
  // -----------------------------------------------------------------------
  'paxg.market_cap + xaut.market_cap': ({ paxgMcap, xautMcap }) =>
    paxgMcap === undefined || xautMcap === undefined
      ? undefined
      : paxgMcap + xautMcap,
  'paxg.market_cap + xaut.market_cap (+ minor)': ({ paxgMcap, xautMcap }) =>
    paxgMcap === undefined || xautMcap === undefined
      ? undefined
      : paxgMcap + xautMcap,

  // -----------------------------------------------------------------------
  // Direct upstream pass-throughs (the live source IS the value)
  // -----------------------------------------------------------------------
  'CoinGecko bitcoin.market_data.market_cap.usd': ({ btcMcap }) => btcMcap,
  'CoinGecko pax-gold.market_data.market_cap.usd': ({ paxgMcap }) => paxgMcap,
  'CoinGecko tether-gold.market_data.market_cap.usd': ({ xautMcap }) => xautMcap,
  'rwa.xyz total tokenized RWA market cap': ({ rwaMcap }) => rwaMcap,
};

function inputsFromBundle(bundle: LiveBundle): DerivationInputs {
  return {
    spot: bundle.spot?.value,
    aisc: bundle.aisc?.value,
    biv: bundle.biv?.value,
    paxgMcap:
      typeof bundle.paxg?.meta?.marketCap === 'number'
        ? (bundle.paxg.meta.marketCap as number)
        : undefined,
    xautMcap:
      typeof bundle.xaut?.meta?.marketCap === 'number'
        ? (bundle.xaut.meta.marketCap as number)
        : undefined,
    btcMcap: bundle.btcMcap?.value,
    usDebt: bundle.usDebt?.value,
    rwaMcap: bundle.rwaMcap?.value,
  };
}

/**
 * Pick the LiveValue (timestamp + source) that best represents the inputs
 * a derivation consumed. Falls back to the first available source.
 */
function pickLiveSource(entry: StatEntry, bundle: LiveBundle): LiveValue | undefined {
  switch (entry.liveSourceId) {
    case 'gold-spot':
      return bundle.spot;
    case 'natgold-aisc':
      return bundle.aisc;
    case 'natgold-biv':
    case 'natgold-biv-historical':
      return bundle.biv;
    case 'paxg':
      return bundle.paxg;
    case 'xaut':
      return bundle.xaut;
    case 'btc-market-cap':
      return bundle.btcMcap;
    case 'us-debt':
      return bundle.usDebt;
    case 'rwa-tokenized-market-cap':
      return bundle.rwaMcap;
    case 'tokenized-gold-market-cap':
      return bundle.paxg ?? bundle.xaut;
    default:
      return undefined;
  }
}

export type HydratedStat = {
  entry: StatEntry;
  /** The current derived live value, or undefined if not derivable / no upstream. */
  liveValue?: number;
  /** The LiveValue the derivation pulled from (for source attribution + freshness). */
  liveSource?: LiveValue;
};

/**
 * Walk the full registry, derive a current value for every entry that has a
 * known formula handler, and pair each with the LiveValue we used so the card
 * can render attribution + freshness.
 */
export function hydrateRegistry(
  entries: StatEntry[],
  bundle: LiveBundle,
): HydratedStat[] {
  const inputs = inputsFromBundle(bundle);
  return entries.map((entry) => {
    const liveSource = pickLiveSource(entry, bundle);
    if (!entry.derivation) {
      return { entry, liveSource };
    }
    const handler = DERIVATION_HANDLERS[entry.derivation];
    if (!handler) {
      // Not every derivation is computable yet (manual-refresh sources, locked
      // historical checkpoints). Falling through is intentional.
      return { entry, liveSource };
    }
    const liveValue = handler(inputs);
    return { entry, liveValue, liveSource };
  });
}

/**
 * Compute a single derived value (used by /api/live/derived/[id]).
 */
export function deriveById(
  entries: StatEntry[],
  bundle: LiveBundle,
  id: string,
): { entry: StatEntry; liveValue?: number; liveSource?: LiveValue } | undefined {
  const entry = entries.find((e) => e.id === id);
  if (!entry) return undefined;
  const inputs = inputsFromBundle(bundle);
  const liveSource = pickLiveSource(entry, bundle);
  if (!entry.derivation) return { entry, liveSource };
  const handler = DERIVATION_HANDLERS[entry.derivation];
  if (!handler) return { entry, liveSource };
  return { entry, liveValue: handler(inputs), liveSource };
}

/**
 * Surface the set of registry derivations with no handler. Useful for surfacing
 * coverage gaps when the registry grows.
 */
export function findUnhandledDerivations(entries: StatEntry[]): string[] {
  const seen = new Set<string>();
  for (const entry of entries) {
    if (!entry.derivation) continue;
    if (DERIVATION_HANDLERS[entry.derivation]) continue;
    seen.add(entry.derivation);
  }
  return [...seen];
}
