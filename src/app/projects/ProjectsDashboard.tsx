'use client';

import Image from 'next/image';
import type { Project, SourceTag, TokenBacking } from '@/data/projects';
import { formatDelta, formatLargeNumber, formatRelativeTime, type DeltaResult } from '@/lib/format';
import CountUp from '@/components/projects/CountUp';

type Props = {
  projects: Project[];
  combinedTokens: number;
  /** Live BIV per token (NatGold feed); falls back to anchorBiv server-side. */
  biv: number;
  anchorBiv: number;
  bivUpdatedAt: string | null;
  bivStale: boolean;
};

// ---- formatters -----------------------------------------------------------
const fmtUSD = (n: number) => formatLargeNumber(n, 'currency', n >= 1e9 ? 2 : 1);
const fmtTokens = (n: number) => Math.round(n).toLocaleString('en-US');
const fmtOz = (n: number) => `${n.toLocaleString('en-US')} oz`;
const fmtTonnes = (n: number) => `${n.toLocaleString('en-US')} t`;
const fmtRatio = (r: number) => `×${r.toFixed(2)}`;
const mono = 'var(--font-mono), ui-monospace, "SF Mono", monospace';

// ---- small primitives -----------------------------------------------------
function DeltaPill({ delta }: { delta: DeltaResult }) {
  const pct = Math.abs(delta.percent).toFixed(1);
  const arrow = delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : '●';
  const sign = delta.direction === 'up' ? '+' : delta.direction === 'down' ? '−' : '';
  const color =
    delta.sentiment === 'good'
      ? 'var(--success,#34d399)'
      : delta.sentiment === 'bad'
        ? 'var(--error,#f87171)'
        : 'var(--v2-dim,#a1a1aa)';
  return (
    <span className="text-xs font-semibold whitespace-nowrap" style={{ color }}>
      {arrow} {sign}
      {pct}% <span style={{ color: 'var(--v2-faint,#71717a)' }}>vs book close</span>
    </span>
  );
}

function CheckMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusChip({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
        style={{ background: 'rgba(232,178,58,0.16)', color: 'var(--accent-gold,#E8B23A)' }}
      >
        <CheckMark /> QP-verified · current
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
      style={{ border: '1px solid rgba(232,178,58,0.35)', color: 'var(--accent-gold,#E8B23A)' }}
    >
      <span className="pj-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-gold,#E8B23A)' }} />
      In pipeline · historical
    </span>
  );
}

const SOURCE_META: Record<SourceTag, { label: string; title: string }> = {
  report: { label: 'NI 43-101 report', title: 'Sourced from the independent QP-reviewed NI 43-101 technical report' },
  release: { label: 'Company disclosure', title: 'Sourced from a company press release / disclosure' },
  book: { label: 'Book framing', title: "As framed in the book's pipeline narrative" },
};

function SourceChip({ tag }: { tag: SourceTag }) {
  const m = SOURCE_META[tag];
  const solid = tag === 'report';
  return (
    <span
      title={m.title}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={
        solid
          ? { background: 'rgba(232,178,58,0.14)', color: 'var(--accent-gold,#E8B23A)' }
          : { border: '1px solid rgba(255,255,255,0.16)', color: 'var(--v2-dim,#a1a1aa)' }
      }
    >
      {m.label}
    </span>
  );
}

function HistoricalTag() {
  return (
    <span
      className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider align-middle"
      style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'var(--v2-faint,#8a8a93)' }}
    >
      historical
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="v2-eyebrow mb-4">{children}</p>;
}

// ---- pipeline card (hero) -------------------------------------------------
function PipelineCard({ project, biv, index }: { project: Project; biv: number; index: number }) {
  const { pipeline } = project;
  const liveValue = pipeline.totalTokens * biv;
  return (
    <article className="pj-glass pj-rise p-6 sm:p-7" style={{ '--i': index } as React.CSSProperties}>
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold" style={{ color: '#F4F4F7' }}>
            {project.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>
            {project.location.split(',').slice(-2).join(',').trim()}
          </p>
        </div>
        <StatusChip verified={project.verified} />
      </div>

      <div className="flex items-end justify-between gap-3 mb-1">
        <CountUp
          value={pipeline.totalTokens}
          format={fmtTokens}
          className="text-3xl sm:text-[2.6rem] font-semibold leading-none tabular-nums"
          style={{ fontFamily: mono, color: '#F4F4F7' }}
        />
        <span className="text-[11px] uppercase tracking-[0.16em] pb-1" style={{ color: 'var(--accent-gold,#E8B23A)' }}>
          NatGold Tokens
        </span>
      </div>

      <div className="pj-rule my-5" />

      {/* oz -> ratio -> tokens, by resource category */}
      <ul className="space-y-2.5">
        {pipeline.backing.map((b: TokenBacking) => (
          <li key={b.category} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm">
            <span style={{ color: 'var(--v2-dim,#cfcfd6)' }}>
              <span className="tabular-nums" style={{ fontFamily: mono }}>
                {fmtOz(b.ounces)}
              </span>{' '}
              <span className="text-xs" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                {b.category}
              </span>
              {b.isHistorical && <HistoricalTag />}
            </span>
            <span className="text-xs tabular-nums" style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}>
              {fmtRatio(b.ratio)}
            </span>
            <span className="text-sm tabular-nums text-right" style={{ fontFamily: mono, color: '#F4F4F7' }}>
              {fmtTokens(b.tokens)}
            </span>
          </li>
        ))}
      </ul>

      <div className="pj-rule my-5" />

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
            Live value
          </p>
          <CountUp
            value={liveValue}
            format={fmtUSD}
            className="text-2xl font-semibold tabular-nums"
            style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}
          />
        </div>
        <p className="text-[11px] text-right leading-relaxed" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>
          NatGold {pipeline.natgoldPct}%<br />
          {pipeline.sellerName} {pipeline.sellerPct}%
        </p>
      </div>
    </article>
  );
}

// ---- per-project deep section ---------------------------------------------
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'var(--accent-gold,#E8B23A)' }}>
      {children}
    </h4>
  );
}

function ProjectBlock({ project, biv, anchorBiv }: { project: Project; biv: number; anchorBiv: number }) {
  const { pipeline } = project;
  const liveValue = pipeline.totalTokens * biv;
  const delta = formatDelta(pipeline.totalTokens * anchorBiv, liveValue, 'positive');

  return (
    <section id={project.id} className="scroll-mt-24 pt-16 sm:pt-24">
      {/* asset header — asymmetric */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <StatusChip verified={project.verified} />
            <SourceChip tag="report" />
          </div>
          <h2 className="v2-display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>
            {project.name.replace(/ Gold Project$/, '')} <span className="v2-gold">Gold Project</span>
          </h2>
          <p className="mt-3 text-base max-w-[60ch]" style={{ color: 'var(--v2-dim,#cfcfd6)' }}>
            {project.tagline}
          </p>
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div className="flex flex-col">
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Location</dt>
              <dd style={{ color: '#F4F4F7' }}>{project.location}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Status</dt>
              <dd style={{ color: '#F4F4F7' }}>{project.status}</dd>
            </div>
          </dl>
        </div>

        {/* live token-value panel */}
        <div className="lg:col-span-5 pj-glass p-6 sm:p-7 w-full">
          <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
            {fmtTokens(pipeline.totalTokens)} tokens · live value
          </p>
          <CountUp
            value={liveValue}
            format={fmtUSD}
            className="block text-4xl sm:text-5xl font-semibold tabular-nums leading-none"
            style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}
          />
          <div className="mt-3">
            <DeltaPill delta={delta} />
          </div>
          <div className="pj-rule my-5" />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>
            {pipeline.backingNote}
          </p>
        </div>
      </div>

      {/* token calculation table */}
      <div className="mt-12">
        <SectionHeading>Token calculation — resource split</SectionHeading>
        <div className="pj-glass overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-left" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider">Category</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Controlled oz</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Ratio</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.backing.map((b) => (
                <tr key={b.category} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <th scope="row" className="px-4 sm:px-5 py-3 text-left font-medium" style={{ color: '#F4F4F7' }}>
                    {b.category}
                    {b.isHistorical && <HistoricalTag />}
                  </th>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums" style={{ fontFamily: mono, color: 'var(--v2-dim,#cfcfd6)' }}>
                    {b.ounces.toLocaleString('en-US')}
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums" style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}>
                    {fmtRatio(b.ratio)}
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums font-semibold" style={{ fontFamily: mono, color: '#F4F4F7' }}>
                    {b.tokens.toLocaleString('en-US')}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: '1.5px solid rgba(232,178,58,0.4)' }}>
                <th scope="row" className="px-4 sm:px-5 py-3 text-left text-[11px] uppercase tracking-wider" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                  Total minted
                </th>
                <td />
                <td />
                <td className="px-4 sm:px-5 py-3 text-right tabular-nums font-semibold text-base" style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}>
                  {pipeline.totalTokens.toLocaleString('en-US')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* full deposit resource table */}
      <div className="mt-12">
        <SectionHeading>Mineral resource</SectionHeading>
        <div className="pj-glass overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-left" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider">Category</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Tonnes</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Grade</th>
                <th className="px-4 sm:px-5 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Ounces Au</th>
              </tr>
            </thead>
            <tbody>
              {project.resource.map((r, i) => (
                <tr key={`${r.category}-${i}`} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <th scope="row" className="px-4 sm:px-5 py-3 text-left font-medium" style={{ color: '#F4F4F7' }}>
                    {r.category}
                    {r.isHistorical && <HistoricalTag />}
                  </th>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums" style={{ fontFamily: mono, color: 'var(--v2-dim,#cfcfd6)' }}>
                    {r.tonnes ? fmtTonnes(r.tonnes) : '—'}
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums" style={{ fontFamily: mono, color: 'var(--v2-dim,#cfcfd6)' }}>
                    {r.gradeGt ? `${r.gradeGt.toFixed(2)} g/t` : '—'}
                  </td>
                  <td className="px-4 sm:px-5 py-3 text-right tabular-nums font-semibold" style={{ fontFamily: mono, color: '#F4F4F7' }}>
                    {r.ounces.toLocaleString('en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>
          {project.resourceNote} <span style={{ color: 'var(--v2-faint,#8a8a93)' }}>Cut-off: {project.cutoff}.</span>
        </p>
      </div>

      {/* history + drilling */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <SectionHeading>Deposit history</SectionHeading>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.history}</p>
        </div>
        <div>
          <SectionHeading>Drilling program</SectionHeading>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.drilling}</p>
        </div>
      </div>

      {/* diagrams */}
      {project.figures.length > 0 && (
        <div className="mt-12">
          <SectionHeading>Figures &amp; maps</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.figures.map((fig, i) => (
              <figure key={fig.src} className="pj-rise" style={{ '--i': i } as React.CSSProperties}>
                <div className="pj-glass relative aspect-[4/3] overflow-hidden" style={{ background: 'rgba(8,8,13,0.5)' }}>
                  <Image
                    src={fig.src}
                    alt={fig.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    style={{ objectFit: 'contain', padding: '0.5rem' }}
                  />
                </div>
                <figcaption className="mt-2 text-xs" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                  {fig.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* ownership / report / royalties */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="pj-glass p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <SectionHeading>Ownership &amp; deal</SectionHeading>
            <SourceChip tag={project.deal.sourceTag} />
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Acquisition price</dt>
              <dd className="font-semibold" style={{ color: '#F4F4F7' }}>{project.deal.price}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Terms</dt>
              <dd style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.deal.terms}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Key dates</dt>
              <dd style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.deal.keyDates}</dd>
            </div>
          </dl>
        </div>

        <div className="pj-glass p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <SectionHeading>Independent report</SectionHeading>
            <SourceChip tag="report" />
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Effective date</dt>
              <dd className="font-semibold" style={{ color: '#F4F4F7' }}>{project.report.effectiveDate}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Qualified Person</dt>
              <dd style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.report.qp}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Firm</dt>
              <dd style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.report.firm}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--v2-faint,#8a8a93)' }}>Prepared for</dt>
              <dd style={{ color: 'var(--v2-dim,#cfcfd6)' }}>{project.report.preparedFor}</dd>
            </div>
          </dl>
        </div>
      </div>

      {project.royalties && (
        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
          <span className="uppercase tracking-[0.16em] mr-2" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>Royalties</span>
          {project.royalties}
        </p>
      )}
    </section>
  );
}

// ---- page -----------------------------------------------------------------
export default function ProjectsDashboard({
  projects,
  combinedTokens,
  biv,
  anchorBiv,
  bivUpdatedAt,
  bivStale,
}: Props) {
  const liveCombined = combinedTokens * biv;
  const anchorCombined = combinedTokens * anchorBiv;
  const combinedDelta = formatDelta(anchorCombined, liveCombined, 'positive');

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-10 sm:py-16">
      {/* ===================== PIPELINE SUMMARY (hero) ===================== */}
      <section aria-label="Tokenization pipeline summary">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Eyebrow>NatGold Tokenization Pipeline</Eyebrow>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--v2-dim,#a1a1aa)' }}>
            <span className="pj-dot inline-block w-2 h-2 rounded-full" style={{ background: bivStale ? 'var(--warning,#b45309)' : 'var(--accent-gold,#E8B23A)' }} />
            <span className="tabular-nums" style={{ fontFamily: mono }}>
              BIV ${biv.toLocaleString('en-US', { maximumFractionDigits: 0 })}/token
            </span>
            {bivUpdatedAt && <span style={{ color: 'var(--v2-faint,#71717a)' }}>· {bivStale ? 'last known' : `updated ${formatRelativeTime(bivUpdatedAt)}`}</span>}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-2">
          {/* headline + combined value */}
          <div className="lg:col-span-5">
            <h1 className="v2-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              Two verified gold deposits,<br />
              <span className="v2-gold">one</span> tokenization pipeline.
            </h1>
            <p className="mt-4 text-base max-w-[52ch]" style={{ color: 'var(--v2-dim,#cfcfd6)' }}>
              Drilled, independently reported gold — converted to NatGold Tokens at the
              published resource-tier ratios. Every figure traces to an NI 43-101 report
              or a company disclosure.
            </p>

            <div className="mt-8 pj-glass p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                Combined live value · {fmtTokens(combinedTokens)} tokens
              </p>
              <CountUp
                value={liveCombined}
                format={fmtUSD}
                durationMs={1400}
                className="block text-5xl sm:text-6xl font-semibold tabular-nums leading-none"
                style={{ fontFamily: mono, color: 'var(--accent-gold,#E8B23A)' }}
              />
              <div className="mt-3 flex items-center gap-3">
                <DeltaPill delta={combinedDelta} />
              </div>
              <div className="pj-flowline h-px w-full mt-6" />
              <p className="mt-3 text-xs" style={{ color: 'var(--v2-faint,#8a8a93)' }}>
                = {fmtTokens(combinedTokens)} NatGold Tokens × live BIV. Moves with the gold price.
              </p>
            </div>
          </div>

          {/* the two pipeline cards */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <PipelineCard key={p.id} project={p} biv={biv} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PER-PROJECT DEEP SECTIONS ===================== */}
      {projects.map((p) => (
        <ProjectBlock key={p.id} project={p} biv={biv} anchorBiv={anchorBiv} />
      ))}

      <footer className="mt-20 pt-6 border-t text-xs leading-relaxed" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--v2-faint,#71717a)' }}>
        <p>
          Token counts are fixed published figures; each project&apos;s live value is{' '}
          <span style={{ fontFamily: mono }}>tokens × live BIV</span>, refreshed from the NatGold
          feed every 5 minutes (the same source as the Live dashboard). Resource, grade, drilling
          and report figures are from the independent NI 43-101 technical reports; deal terms and
          token counts are from company disclosures. Historical estimates are labelled.
        </p>
      </footer>
    </div>
  );
}
