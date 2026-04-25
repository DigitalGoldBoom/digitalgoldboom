'use client';

import { useState } from 'react';
import type { HydratedStat } from '@/lib/live/derive';
import type { TableEntry } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import LiveStatCard from './LiveStatCard';
import BookStyledTable from './BookStyledTable';

type Props = {
  chapter: number;
  chapterTitle: string;
  stats: HydratedStat[];
  /** Recreated chapter tables (filtered to this chapter). */
  tables?: TableEntry[];
  /** Live bundle, required when tables are present. */
  bundle?: LiveBundle;
  /** When true, render expanded by default. */
  defaultOpen?: boolean;
};

export default function ChapterPanel({
  chapter,
  chapterTitle,
  stats,
  tables,
  bundle,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `chapter-${chapter}`;
  const panelId = `${id}-panel`;

  return (
    <div
      id={id}
      className="border rounded-[var(--r-md)] scroll-mt-24"
      style={{
        borderColor: 'var(--border-base)',
        background: 'var(--bg-surface)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
        style={{ minHeight: '44px' }}
      >
        <span className="flex items-baseline gap-3 min-w-0">
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-semibold"
            style={{ color: 'var(--accent-gold)' }}
          >
            Ch {chapter}
          </span>
          <span
            className="text-sm font-medium truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {chapterTitle}
          </span>
        </span>
        <span className="flex items-center gap-3 shrink-0">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {tables && tables.length > 0
              ? `${tables.length} table${tables.length === 1 ? '' : 's'} · `
              : ''}
            {stats.length} stat{stats.length === 1 ? '' : 's'}
          </span>
          <span
            className="transition-transform"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              color: 'var(--text-tertiary)',
            }}
            aria-hidden="true"
          >
            ▾
          </span>
        </span>
      </button>

      {open && (
        <div id={panelId} className="px-5 pb-5 pt-1">
          {tables && tables.length > 0 && bundle && (
            <div className="mb-4">
              {tables.map((t) => (
                <BookStyledTable key={t.id} table={t} bundle={bundle} />
              ))}
            </div>
          )}
          {stats.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((s) => (
                <LiveStatCard
                  key={s.entry.id}
                  entry={s.entry}
                  liveValue={s.liveValue}
                  liveSource={s.liveSource}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
