'use client';

import type { TableEntry } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import { TABLE_SUMMARIES } from '@/lib/live/table-summary';
import ComparisonTable from './tables/ComparisonTable';
import BreakdownTable from './tables/BreakdownTable';
import FormulaCard from './tables/FormulaCard';
import CheckpointTable from './tables/CheckpointTable';
import TableSummary from './TableSummary';

type Props = {
  table: TableEntry;
  bundle: LiveBundle;
};

/**
 * Single dispatcher for every recreated chapter table on /live.
 * Picks the right format renderer, wraps it in a card-styled container with
 * the table title above, and renders the neutral prose summary below.
 */
export default function BookStyledTable({ table, bundle }: Props) {
  const summaryFn = TABLE_SUMMARIES[table.id];
  const summaryText = summaryFn ? summaryFn(bundle) : null;

  let body: React.ReactNode = null;
  if (table.format === 'comparison-2col' && table.columns && table.rows) {
    body = (
      <ComparisonTable
        columns={table.columns}
        rows={table.rows}
        bundle={bundle}
      />
    );
  } else if (
    table.format === 'breakdown-allocation' &&
    table.parts &&
    table.parts.length > 0
  ) {
    body = <BreakdownTable total={table.total} parts={table.parts} bundle={bundle} />;
  } else if (table.format === 'formula-card' && table.formula) {
    body = <FormulaCard formula={table.formula} bundle={bundle} />;
  } else if (
    table.format === 'checkpoint-timeline' &&
    table.checkpoints &&
    table.checkpoints.length > 0
  ) {
    body = <CheckpointTable checkpoints={table.checkpoints} bundle={bundle} />;
  }

  if (!body) return null;

  return (
    <div className="mb-4">
      <div
        className="border rounded-[var(--r-md)] overflow-hidden"
        style={{
          borderColor: 'var(--border-base)',
          background: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <header
          className="px-4 py-3 border-b"
          style={{
            borderColor: 'var(--border-base)',
            background: 'var(--bg-surface-elevated)',
          }}
        >
          <h4
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {table.title}
          </h4>
        </header>
        <div className="p-2 sm:p-3">{body}</div>
      </div>
      {summaryText && <TableSummary text={summaryText} />}
    </div>
  );
}
