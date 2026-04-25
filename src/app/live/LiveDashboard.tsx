'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { HydratedStat } from '@/lib/live/derive';
import { SECTION_BLURBS, type SectionBlurb } from '@/data/section-blurbs';
import LayoutToggle, { type LiveView } from '@/components/live/LayoutToggle';
import LastUpdatedBadge from '@/components/live/LastUpdatedBadge';
import SectionPanel from '@/components/live/SectionPanel';
import ContinuousList from '@/components/live/ContinuousList';

type Props = {
  stats: HydratedStat[];
  assembledAt: string;
  errors: Record<string, string>;
};

type SectionGroup = {
  section: number;
  sectionTitle: string;
  blurb?: SectionBlurb;
  stats: HydratedStat[];
};

function groupBySection(stats: HydratedStat[]): SectionGroup[] {
  const map = new Map<number, SectionGroup>();
  for (const s of stats) {
    const sec = s.entry.location.section;
    if (!map.has(sec)) {
      map.set(sec, {
        section: sec,
        sectionTitle: s.entry.location.sectionTitle,
        blurb: SECTION_BLURBS.find((b) => b.number === sec),
        stats: [],
      });
    }
    map.get(sec)!.stats.push(s);
  }
  return [...map.values()].sort((a, b) => a.section - b.section);
}

export default function LiveDashboard({ stats, assembledAt, errors }: Props) {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get('view');
  const view: LiveView = viewParam === 'continuous' ? 'continuous' : 'section';

  const sectionGroups = useMemo(() => groupBySection(stats), [stats]);
  const errorCount = Object.keys(errors).length;

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8 sm:py-12">
      <header className="mb-8 sm:mb-10">
        <p
          className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-2"
          style={{ color: 'var(--accent-gold)' }}
        >
          Live dashboard
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <h1
              className="display-md mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Every number from the book — updated against today&apos;s market
            </h1>
            <p
              className="text-sm sm:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              The book&apos;s figures are anchored to the pre-market reservation
              close on Feb 25–26, 2026. Each card pairs that snapshot with the
              live value so you can see exactly how the math has moved since.
            </p>
          </div>
          <LastUpdatedBadge assembledAt={assembledAt} errorCount={errorCount} />
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <LayoutToggle value={view} />
        <span
          className="text-xs"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {stats.length} stats across the book
        </span>
      </div>

      {view === 'section' ? (
        <div className="space-y-4">
          {sectionGroups.map((sec, idx) => (
            <SectionPanel
              key={sec.section}
              section={sec.section}
              sectionTitle={sec.sectionTitle}
              blurb={sec.blurb}
              stats={sec.stats}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
      ) : (
        <ContinuousList stats={stats} blurbs={SECTION_BLURBS} />
      )}

      <footer
        className="mt-12 pt-6 border-t text-xs leading-relaxed"
        style={{
          borderColor: 'var(--border-base)',
          color: 'var(--text-tertiary)',
        }}
      >
        <p className="mb-2">
          <strong style={{ color: 'var(--text-secondary)' }}>Methodology.</strong>{' '}
          COMEX spot, AISC, BIV, and the BTC reference are pulled from a single
          NatGold snapshot endpoint refreshed every 5 minutes. PAXG, XAUT, and
          BTC market cap come from CoinGecko (5-minute cache). US public debt
          comes from fiscaldata.treasury.gov (24-hour cache). Tokenized RWA
          market cap comes from rwa.xyz (1-hour cache); when the upstream is
          unavailable, the card falls back to the book&apos;s last-known value
          and is flagged stale.
        </p>
        <p>
          Derived figures (BIV-anchored token economics, in-ground gold value,
          three-year forecast totals) are computed server-side from the live
          inputs above, with the formula visible on each card.
        </p>
      </footer>
    </div>
  );
}
