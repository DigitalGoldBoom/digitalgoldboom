'use client';

import type { LiveValue } from '@/lib/live/sources';
import {
  formatDelta,
  formatLargeNumber,
  formatRelativeTime,
  type DeltaResult,
  type DirectionPolarity,
} from '@/lib/format';

// Snapshot anchors locked at the book's pre-market close (Feb 25-26 2026).
const SNAPSHOT_SPOT = 5_194;
const SNAPSHOT_AISC = 1_676;
const SNAPSHOT_BIV = 3_518;

type KeyInput = {
  label: string;
  caption: string;
  snapshotValue: number;
  unitSuffix: string; // e.g. "/oz", "/token"
  liveValue?: number;
  liveSource?: LiveValue;
  polarity: DirectionPolarity;
};

function DeltaPill({ delta }: { delta: DeltaResult }) {
  const pct = Math.abs(delta.percent).toFixed(1);
  const arrow =
    delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : '●';
  const sign =
    delta.direction === 'up' ? '+' : delta.direction === 'down' ? '−' : '';
  const color =
    delta.sentiment === 'good'
      ? 'var(--success,#15803d)'
      : delta.sentiment === 'bad'
        ? 'var(--error,#b91c1c)'
        : 'var(--text-muted)';
  return (
    <span className="text-sm font-semibold" style={{ color }}>
      {arrow} {sign}
      {pct}%
    </span>
  );
}

function KeyInputCard({ input }: { input: KeyInput }) {
  const liveFormatted =
    input.liveValue !== undefined
      ? formatLargeNumber(input.liveValue, 'currency', 0, input.unitSuffix)
      : null;
  const snapshotFormatted = formatLargeNumber(
    input.snapshotValue,
    'currency',
    0,
    input.unitSuffix,
  );
  const delta =
    input.liveValue !== undefined
      ? formatDelta(input.snapshotValue, input.liveValue, input.polarity)
      : null;
  const isStale = input.liveSource?.stale === true;

  return (
    <article
      className="card-feature relative"
      style={{ padding: '20px 24px' }}
      aria-label={input.label}
    >
      {isStale && (
        <span
          className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded"
          style={{
            background: 'var(--warning, #b45309)',
            color: 'var(--text-on-dark-primary)',
          }}
        >
          stale
        </span>
      )}
      <p
        className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1"
        style={{ color: 'var(--accent-gold)' }}
      >
        {input.caption}
      </p>
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {input.label}
      </h3>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className="text-2xl sm:text-3xl font-semibold tabular-nums"
          style={{
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            color: 'var(--text-primary)',
          }}
        >
          {liveFormatted ?? snapshotFormatted}
        </span>
        {delta && <DeltaPill delta={delta} />}
      </div>
      <div className="mt-3 pt-2 border-t flex items-center justify-between gap-2 text-[11px]"
        style={{ borderColor: 'var(--border-base)' }}
      >
        <span style={{ color: 'var(--text-tertiary)' }}>
          Book: {snapshotFormatted}
        </span>
        {input.liveSource?.updatedAt && (
          <span style={{ color: 'var(--text-muted)' }}>
            {formatRelativeTime(input.liveSource.updatedAt)}
          </span>
        )}
      </div>
    </article>
  );
}

type Props = {
  spot?: LiveValue;
  aisc?: LiveValue;
  biv?: LiveValue;
};

/**
 * Three-card "control panel" pinned at the top of /live. Surfaces the live
 * anchors that drive every recreated chapter table: COMEX gold spot, the
 * NatGold Real-Time AISC Index, and BIV (= spot − AISC).
 *
 * AISC carries `negative` polarity — when costs rise the delta colors red.
 */
export default function KeyInputsRow({ spot, aisc, biv }: Props) {
  const inputs: KeyInput[] = [
    {
      label: 'COMEX Gold Spot',
      caption: 'Live anchor',
      snapshotValue: SNAPSHOT_SPOT,
      unitSuffix: '/oz',
      liveValue: spot?.value,
      liveSource: spot,
      polarity: 'positive',
    },
    {
      label: 'NatGold Real-Time AISC',
      caption: 'Cost input',
      snapshotValue: SNAPSHOT_AISC,
      unitSuffix: '/oz',
      liveValue: aisc?.value,
      liveSource: aisc,
      polarity: 'negative',
    },
    {
      label: 'NatGold BIV per Token',
      caption: 'Derived value',
      snapshotValue: SNAPSHOT_BIV,
      unitSuffix: '/token',
      liveValue: biv?.value,
      liveSource: biv,
      polarity: 'positive',
    },
  ];

  return (
    <section
      aria-label="Key live inputs"
      className="mb-8 sm:mb-10"
    >
      <p
        className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
        style={{ color: 'var(--text-tertiary)' }}
      >
        Today&apos;s anchors
      </p>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
        {inputs.map((input) => (
          <KeyInputCard key={input.label} input={input} />
        ))}
      </div>
    </section>
  );
}
