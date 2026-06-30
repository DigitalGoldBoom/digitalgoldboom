'use client';

import { useMemo, useState } from 'react';
import type { HydratedStat } from '@/lib/live/derive';
import type { SectionBlurb } from '@/data/section-blurbs';
import { tablesForChapter, tableChaptersForSection } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import ChapterPanel from './ChapterPanel';

type Props = {
  section: number;
  sectionTitle: string;
  blurb?: SectionBlurb;
  stats: HydratedStat[];
  /** Live bundle for table cell derivations. */
  bundle?: LiveBundle;
  defaultOpen?: boolean;
  /** Open this section's first chapter by default (lead section only) so the
   *  page doesn't open as a wall of closed accordions on mobile. */
  firstChapterOpen?: boolean;
};

type ChapterGroup = {
  chapter: number;
  chapterTitle: string;
  stats: HydratedStat[];
};

function groupByChapter(stats: HydratedStat[], section: number): ChapterGroup[] {
  const map = new Map<number, ChapterGroup>();
  for (const s of stats) {
    const c = s.entry.location.chapter;
    if (!map.has(c)) {
      map.set(c, {
        chapter: c,
        chapterTitle: s.entry.location.chapterTitle,
        stats: [],
      });
    }
    map.get(c)!.stats.push(s);
  }
  // Merge in chapters that carry a TABLE but no stat card, so their live tables
  // still render (e.g. the Ch 5 scorecard, Ch 11 BIV formula, Ch 15 forecast).
  for (const { chapter, chapterTitle } of tableChaptersForSection(section)) {
    if (!map.has(chapter)) {
      map.set(chapter, { chapter, chapterTitle, stats: [] });
    }
  }
  for (const group of map.values()) {
    group.stats.sort(
      (a, b) => a.entry.location.orderInChapter - b.entry.location.orderInChapter,
    );
  }
  return [...map.values()].sort((a, b) => a.chapter - b.chapter);
}

export default function SectionPanel({
  section,
  sectionTitle,
  blurb,
  stats,
  bundle,
  defaultOpen = false,
  firstChapterOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const chapters = useMemo(() => groupByChapter(stats, section), [stats, section]);
  const id = `section-${section}`;
  const panelId = `${id}-panel`;

  return (
    <section
      id={id}
      className="border rounded-[var(--r-lg)] scroll-mt-24"
      style={{
        borderColor: 'var(--border-base)',
        background: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 sm:px-6 py-4 sm:py-5"
        style={{ minHeight: '44px' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1"
              style={{ color: 'var(--accent-gold)' }}
            >
              Section {section}
            </p>
            <h2
              className="text-lg sm:text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {sectionTitle}
            </h2>
          </div>
          <span className="flex items-center gap-3 shrink-0 pt-1">
            <span
              className="text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {chapters.length} ch · {stats.length} stats
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
        </div>
        {blurb?.blurb && (
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {blurb.blurb}
          </p>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          className="px-3 sm:px-6 pb-4 sm:pb-6 pt-1 sm:space-y-3"
        >
          {chapters.map((c, ci) => (
            <ChapterPanel
              key={c.chapter}
              chapter={c.chapter}
              chapterTitle={c.chapterTitle}
              stats={c.stats}
              tables={tablesForChapter(c.chapter)}
              bundle={bundle}
              defaultOpen={firstChapterOpen && ci === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
