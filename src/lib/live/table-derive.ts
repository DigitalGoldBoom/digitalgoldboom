// Per-cell derivation engine for the recreated chapter tables.
//
// Each unique `derivation` string used inside TABLES_REGISTRY maps to a typed
// math handler here. NEVER use eval / new Function — the registry is data, not
// executable code.
//
// To add a new derivation: copy the formula string verbatim into
// TABLE_DERIVATION_HANDLERS, write the typed math, return the number (or
// undefined when an upstream input is missing).

import type { LiveBundle } from './sources';

type Inputs = {
  spot?: number;
  aisc?: number;
  biv?: number;
};

const CLOSURE_LIABILITY_USD = 80_000_000;
const CAPEX_PLUS_CLOSURE_USD = 380_000_000; // $300M CapEx + $80M closure
const DIGITAL_CASH_DEPLOYED_USD = 51_000_000; // $51M CapEx + cash app fee

type Handler = (inputs: Inputs) => number | undefined;

/**
 * Map of (verbatim) cell derivation strings -> typed math handlers.
 * The strings appear in `tables-registry.ts` as TableCell.derivation values.
 */
const TABLE_DERIVATION_HANDLERS: Record<string, Handler> = {
  // -----------------------------------------------------------------------
  // Direct anchor pass-throughs
  // -----------------------------------------------------------------------
  spot: ({ spot }) => spot,
  aisc: ({ aisc }) => aisc,
  biv: ({ biv }) => biv,

  // -----------------------------------------------------------------------
  // Ch 5 — Scorecard 2: 1M-oz benchmark
  // -----------------------------------------------------------------------
  '508000 × spot': ({ spot }) => (spot === undefined ? undefined : 508_000 * spot),
  '508000 × aisc': ({ aisc }) => (aisc === undefined ? undefined : 508_000 * aisc),
  '420000 × biv': ({ biv }) => (biv === undefined ? undefined : 420_000 * biv),
  '420000 × biv × 0.33': ({ biv }) =>
    biv === undefined ? undefined : 420_000 * biv * 0.33,
  '420000 × 0.67 × biv': ({ biv }) =>
    biv === undefined ? undefined : 420_000 * 0.67 * biv,
  '508000 × spot - 508000 × aisc - 80000000': ({ spot, aisc }) =>
    spot === undefined || aisc === undefined
      ? undefined
      : 508_000 * spot - 508_000 * aisc - CLOSURE_LIABILITY_USD,
  '508000 × aisc + 380000000': ({ aisc }) =>
    aisc === undefined ? undefined : 508_000 * aisc + CAPEX_PLUS_CLOSURE_USD,
  '(508000 × spot - 508000 × aisc - 80000000) / (508000 × aisc + 380000000)': ({
    spot,
    aisc,
  }) => {
    if (spot === undefined || aisc === undefined) return undefined;
    const numerator = 508_000 * spot - 508_000 * aisc - CLOSURE_LIABILITY_USD;
    const denominator = 508_000 * aisc + CAPEX_PLUS_CLOSURE_USD;
    if (denominator === 0) return undefined;
    return numerator / denominator;
  },
  '(420000 × 0.67 × biv) / 51000000': ({ biv }) =>
    biv === undefined ? undefined : (420_000 * 0.67 * biv) / DIGITAL_CASH_DEPLOYED_USD,

  // -----------------------------------------------------------------------
  // Ch 11 — Exchange ratios applied to BIV
  // -----------------------------------------------------------------------
  'biv × 0.80': ({ biv }) => (biv === undefined ? undefined : biv * 0.8),
  'biv × 0.40': ({ biv }) => (biv === undefined ? undefined : biv * 0.4),
  'biv × 0.20': ({ biv }) => (biv === undefined ? undefined : biv * 0.2),

  // -----------------------------------------------------------------------
  // Ch 15 — Three-year forecast, 17.5M tokens
  // -----------------------------------------------------------------------
  '17500000 × biv': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * biv,
  '17500000 × biv × 0.73': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * biv * 0.73,
  '17500000 × biv × 0.20': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * biv * 0.2,
  '17500000 × biv × 0.05': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * biv * 0.05,
  '17500000 × biv × 0.02': ({ biv }) =>
    biv === undefined ? undefined : 17_500_000 * biv * 0.02,
};

function inputsFromBundle(bundle: LiveBundle): Inputs {
  return {
    spot: bundle.spot?.value,
    aisc: bundle.aisc?.value,
    biv: bundle.biv?.value,
  };
}

/**
 * Resolve a single cell derivation against the live bundle.
 * Returns undefined when the formula is unknown OR when a required input is
 * missing — the renderer falls back to an em-dash in that case.
 */
export function deriveCellValue(
  derivation: string,
  bundle: LiveBundle,
): number | undefined {
  const handler = TABLE_DERIVATION_HANDLERS[derivation];
  if (!handler) return undefined;
  return handler(inputsFromBundle(bundle));
}

/**
 * Format a numeric cell value per the cell's format/precision/suffix contract.
 * Mirrors lib/format.ts formatLargeNumber but accepts the table-cell suffix
 * vocabulary ("/oz", "/token", "B", "M", etc.) and the multiplier format.
 */
export function formatCellValue(
  value: number,
  format: 'currency' | 'percent' | 'number' | 'multiplier' | undefined,
  precision: number = 0,
  suffix?: string,
): string {
  if (!Number.isFinite(value)) return '—';

  if (format === 'percent') {
    return `${value.toFixed(precision)}%`;
  }

  if (format === 'multiplier') {
    return `${value.toFixed(precision)}×`;
  }

  if (format === 'number') {
    const body = value.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    return suffix ? `${body}${suffix}` : body;
  }

  // currency (default for table cells)
  if (suffix) {
    const trimmed = suffix.trim();
    let scaled = value;
    if (trimmed === 'T') scaled = value / 1_000_000_000_000;
    else if (trimmed === 'B') scaled = value / 1_000_000_000;
    else if (trimmed === 'M') scaled = value / 1_000_000;
    if (trimmed === 'T' || trimmed === 'B' || trimmed === 'M') {
      const body = scaled.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      });
      return `$${body}${trimmed}`;
    }
    // Suffixes like "/oz", "/token" — render full number, append literal.
    const body = scaled.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    return `$${body}${suffix}`;
  }

  // Currency, no suffix — auto-pick humane unit for very large amounts.
  if (Math.abs(value) >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(precision)}T`;
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(precision)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(precision)}M`;
  }
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`;
}
