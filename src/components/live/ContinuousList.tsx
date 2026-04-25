'use client';

import { useMemo } from 'react';
import type { HydratedStat } from '@/lib/live/derive';
import type { SectionBlurb } from '@/data/section-blurbs';
import { tablesForChapter } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import LiveStatCard from './LiveStatCard';
import BookStyledTable from './BookStyledTable';

type Props = {
  stats: HydratedStat[];
  blurbs: SectionBlurb[];
  bundle?: LiveBundle;
};

type ChapterGroup = {
  chapter: number;
  chapterTitle: string;
  stats: HydratedStat[];
};

type SectionGroup = {
  section: number;
  sectionTitle: string;
  blurb?: SectionBlurb;
  chapters: ChapterGroup[];
};

function group(stats: HydratedStat[], blurbs: SectionBlurb[]): SectionGroup[] {
  const sections = new Map<number, SectionGroup>();
  for (const s of stats) {
    const sec = s.entry.location.section;
    if (!sections.has(sec)) {
      sections.set(sec, {
        section: sec,
        sectionTitle: s.entry.location.sectionTitle,
        blurb: blurbs.find((b) => b.number === sec),
        chapters: [],
      });
    }
    const sectionGroup = sections.get(sec)!;
    let chapterGroup = sectionGroup.chapters.find(
      (c) => c.chapter === s.entry.location.chapter,
    );
    if (!chapterGroup) {
      chapterGroup = {
        chapter: s.entry.location.chapter,
        chapterTitle: s.entry.location.chapterTitle,
        stats: [],
      };
      sectionGroup.chapters.push(chapterGroup);
    }
    chapterGroup.stats.push(s);
  }
  for (const sec of sections.values()) {
    sec.chapters.sort((a, b) => a.chapter - b.chapter);
    for (const c of sec.chapters) {
      c.stats.sort(
        (a, b) => a.entry.location.orderInChapter - b.entry.location.orderInChapter,
      );
    }
  }
  return [...sections.values()].sort((a, b) => a.section - b.section);
}

export default function ContinuousList({ stats, blurbs, bundle }: Props) {
  const sections = useMemo(() => group(stats, blurbs), [stats, blurbs]);

  // Flat chapter list for the sticky rail.
  const chapterRail = sections.flatMap((s) =>
    s.chapters.map((c) => ({
      section: s.section,
      chapter: c.chapter,
      chapterTitle: c.chapterTitle,
    })),
  );

  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
      {/* Mobile: horizontal scroll rail */}
      <nav
        aria-label="Chapter navigation"
        className="lg:hidden sticky top-16 z-10 -mx-4 px-4 py-2 mb-4 overflow-x-auto"
        style={{
          background: 'var(--bg-canvas)',
          borderBottom: '1px solid var(--border-base)',
        }}
      >
        <div className="flex gap-2 whitespace-nowrap">
          {chapterRail.map((c) => (
            <a
              key={c.chapter}
              href={`#chapter-${c.chapter}`}
              className="px-3 py-1.5 text-xs rounded-[var(--r-pill)] border"
              style={{
                borderColor: 'var(--border-base)',
                color: 'var(--text-secondary)',
              }}
            >
              Ch {c.chapter}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop: sticky chapter rail */}
      <aside
        aria-label="Chapter navigation"
        className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2"
      >
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Jump to chapter
        </p>
        <ul className="space-y-1">
          {chapterRail.map((c) => (
            <li key={c.chapter}>
              <a
                href={`#chapter-${c.chapter}`}
                className="block py-1.5 px-2 text-xs rounded-[var(--r-sm)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--accent-gold)', marginRight: 6 }}>
                  Ch {c.chapter}
                </span>
                <span className="truncate">{c.chapterTitle}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="space-y-12">
        {sections.map((sec) => (
          <section
            key={sec.section}
            id={`section-${sec.section}`}
            className="scroll-mt-24"
          >
            <header className="mb-6">
              <p
                className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1"
                style={{ color: 'var(--accent-gold)' }}
              >
                Section {sec.section}
              </p>
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {sec.sectionTitle}
              </h2>
              {sec.blurb?.blurb && (
                <p
                  className="mt-3 text-sm leading-relaxed max-w-3xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {sec.blurb.blurb}
                </p>
              )}
            </header>

            <div className="space-y-8">
              {sec.chapters.map((c) => {
                const chapterTables = tablesForChapter(c.chapter);
                return (
                  <div
                    key={c.chapter}
                    id={`chapter-${c.chapter}`}
                    className="scroll-mt-24"
                  >
                    <h3
                      className="text-sm font-semibold mb-3 flex items-baseline gap-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.18em] font-semibold"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        Ch {c.chapter}
                      </span>
                      <span>{c.chapterTitle}</span>
                    </h3>
                    {chapterTables.length > 0 && bundle && (
                      <div className="mb-4">
                        {chapterTables.map((t) => (
                          <BookStyledTable key={t.id} table={t} bundle={bundle} />
                        ))}
                      </div>
                    )}
                    {c.stats.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {c.stats.map((s) => (
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
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
