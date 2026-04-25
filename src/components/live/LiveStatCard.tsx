'use client';

import type { StatEntry } from '@/data/stats-registry';
import type { LiveValue } from '@/lib/live/sources';
import {
  formatDelta,
  formatLargeNumber,
  formatRelativeTime,
  type DeltaResult,
} from '@/lib/format';
import { generateCommentary } from '@/lib/live/commentary';

type Props = {
  entry: StatEntry;
  liveValue?: number;
  liveSource?: LiveValue;
};

function DeltaPill({ delta }: { delta: DeltaResult }) {
  const pct = Math.abs(delta.percent).toFixed(1);
  if (delta.direction === 'up') {
    return (
      <span className="text-sm font-medium text-[var(--success,#15803d)]">
        ▲ +{pct}%
      </span>
    );
  }
  if (delta.direction === 'down') {
    return (
      <span className="text-sm font-medium text-[var(--error,#b91c1c)]">
        ▼ −{pct}%
      </span>
    );
  }
  return (
    <span className="text-sm font-medium text-[var(--text-muted)]">
      ● {pct}%
    </span>
  );
}

export default function LiveStatCard({ entry, liveValue, liveSource }: Props) {
  const snapshot = entry.bookSnapshot;
  const hint = entry.displayHint;

  const snapshotFormatted = formatLargeNumber(
    snapshot.value,
    hint.format,
    hint.precision,
    hint.suffix,
  );

  const liveFormatted =
    liveValue !== undefined
      ? formatLargeNumber(liveValue, hint.format, hint.precision, hint.suffix)
      : null;

  const delta =
    liveValue !== undefined ? formatDelta(snapshot.value, liveValue) : null;

  const commentary = liveValue !== undefined ? generateCommentary(entry, delta) : null;
  const isStale = liveSource?.stale === true;

  return (
    <article
      className="card relative"
      style={{ padding: '24px' }}
      aria-label={entry.label}
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

      <header className="mb-4">
        <p
          className="text-[10px] tracking-[0.18em] uppercase mb-1"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Ch {entry.location.chapter}
          {entry.location.figure ? ` · ${entry.location.figure}` : ''}
        </p>
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {entry.label}
        </h3>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.18em] mb-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Book snapshot
          </p>
          <p
            className="text-xl font-semibold tabular-nums"
            style={{ color: 'var(--text-primary)' }}
          >
            {snapshotFormatted}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {snapshot.date}
          </p>
        </div>
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.18em] mb-1"
            style={{ color: 'var(--accent-gold)' }}
          >
            Live
          </p>
          {liveFormatted ? (
            <>
              <p
                className="text-xl font-semibold tabular-nums"
                style={{ color: 'var(--accent-gold)' }}
              >
                {liveFormatted}
              </p>
              {delta && (
                <p className="mt-0.5">
                  <DeltaPill delta={delta} />
                </p>
              )}
            </>
          ) : (
            <p
              className="text-xl font-semibold tabular-nums"
              style={{ color: 'var(--text-muted)' }}
              title="No live derivation available for this entry"
            >
              —
            </p>
          )}
        </div>
      </div>

      {commentary && (
        <p
          className="text-xs italic leading-relaxed mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {commentary}
        </p>
      )}

      <footer
        className="pt-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: 'var(--border-base)' }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.18em] truncate"
          style={{ color: 'var(--text-tertiary)' }}
          title={liveSource?.source}
        >
          {liveSource?.source ?? 'No live source'}
        </span>
        {liveSource?.updatedAt && (
          <span
            className="text-[10px] whitespace-nowrap"
            style={{ color: 'var(--text-muted)' }}
          >
            {formatRelativeTime(liveSource.updatedAt)}
          </span>
        )}
      </footer>
    </article>
  );
}
