'use client';

import { formatRelativeTime } from '@/lib/format';

type Props = {
  /** ISO timestamp of when the live bundle was assembled. */
  assembledAt: string;
  /** Number of upstream sources that returned an error. */
  errorCount: number;
};

export default function LastUpdatedBadge({ assembledAt, errorCount }: Props) {
  const ok = errorCount === 0;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-pill)] border text-xs"
      style={{
        borderColor: 'var(--border-base)',
        background: 'var(--bg-surface)',
        color: 'var(--text-secondary)',
      }}
      title={`Live bundle assembled at ${assembledAt}${
        errorCount > 0 ? ` · ${errorCount} upstream error(s)` : ''
      }`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: ok
            ? 'var(--success, #15803d)'
            : 'var(--warning, #b45309)',
        }}
        aria-hidden="true"
      />
      <span>Updated {formatRelativeTime(assembledAt)}</span>
      {!ok && (
        <span style={{ color: 'var(--warning, #b45309)' }}>
          · {errorCount} stale
        </span>
      )}
    </div>
  );
}
