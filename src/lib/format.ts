// Centralized formatting utilities for the live dashboard and price widgets.
// Extracted from PriceCard.tsx to deduplicate the formatPrice / formatTime helpers
// and add the delta + relative-time + large-number formatters required by /live.

export type DeltaDirection = 'up' | 'down' | 'flat';

/**
 * Whether "up" is good (price-style, positive polarity) or bad (cost-style,
 * negative polarity). The arrow always reflects raw direction; only the
 * color/sentiment flips for negative polarity.
 */
export type DirectionPolarity = 'positive' | 'negative';

export type DeltaSentiment = 'good' | 'bad' | 'flat';

export type DeltaResult = {
  absolute: number;
  percent: number;
  /** Raw direction the value moved (▲ ▼ ●) — independent of polarity. */
  direction: DeltaDirection;
  /** Sentiment colored by polarity: green/red/grey for good/bad/flat. */
  sentiment: DeltaSentiment;
};

const FLAT_THRESHOLD_PERCENT = 0.5;

/**
 * Format a USD price with two decimal places (e.g. $1,234.56).
 * Mirrors the original PriceCard implementation.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Render a Date as HH:MM with the timezone abbreviation (e.g. "10:34 AM EDT").
 * Mirrors the original PriceCard implementation.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/**
 * Compute the delta between a snapshot value and a live value.
 * Returns absolute change, percent change, raw direction, and a polarity-aware
 * sentiment. For positive polarity (default), up is good. For negative polarity
 * (cost stats — AISC, debt), up is bad and the color flips to red.
 */
export function formatDelta(
  snapshot: number,
  live: number,
  polarity: DirectionPolarity = 'positive',
): DeltaResult {
  const absolute = live - snapshot;
  const percent = snapshot === 0 ? 0 : (absolute / snapshot) * 100;
  let direction: DeltaDirection = 'flat';
  if (percent > FLAT_THRESHOLD_PERCENT) direction = 'up';
  else if (percent < -FLAT_THRESHOLD_PERCENT) direction = 'down';

  let sentiment: DeltaSentiment;
  if (direction === 'flat') {
    sentiment = 'flat';
  } else if (polarity === 'positive') {
    sentiment = direction === 'up' ? 'good' : 'bad';
  } else {
    sentiment = direction === 'up' ? 'bad' : 'good';
  }

  return { absolute, percent, direction, sentiment };
}

/**
 * Render a Date or ISO string as "3 minutes ago" / "2 hours ago" / "yesterday".
 * Returns "just now" for sub-minute values.
 */
export function formatRelativeTime(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Render a large number with a B/T/M suffix (e.g. 22_000_000_000_000 -> "$22.0T").
 * Honors the StatEntry.displayHint format/precision/suffix contract.
 */
export function formatLargeNumber(
  value: number,
  format: 'currency' | 'percent' | 'number' | 'price-per-oz',
  precision: number,
  suffix?: string,
): string {
  if (!Number.isFinite(value)) return '—';

  if (format === 'percent') {
    return `${value.toFixed(precision)}%`;
  }

  if (format === 'price-per-oz') {
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    return `$${formatted}/oz`;
  }

  // Honor explicit suffix (T, B, M) by scaling the value.
  if (suffix) {
    const trimmed = suffix.trim();
    let scaled = value;
    if (trimmed === 'T') scaled = value / 1_000_000_000_000;
    else if (trimmed === 'B') scaled = value / 1_000_000_000;
    else if (trimmed === 'M') scaled = value / 1_000_000;

    const body = scaled.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    if (format === 'currency') return `$${body}${trimmed}`;
    return `${body}${suffix}`;
  }

  // No suffix — auto-pick a humane unit for very large currency.
  if (format === 'currency') {
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

  // Plain number.
  return value.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}
