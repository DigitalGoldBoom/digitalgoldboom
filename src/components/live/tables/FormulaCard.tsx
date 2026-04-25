'use client';

import type { FormulaSpec, TableCell } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import { deriveCellValue, formatCellValue } from '@/lib/live/table-derive';

type Props = {
  formula: FormulaSpec;
  bundle: LiveBundle;
};

function renderCell(cell: TableCell, bundle: LiveBundle): string {
  if (cell.staticValue !== undefined) return cell.staticValue;
  if (cell.derivation) {
    const value = deriveCellValue(cell.derivation, bundle);
    if (value === undefined) return '—';
    return formatCellValue(value, cell.format, cell.precision, cell.suffix);
  }
  return '—';
}

function Term({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center text-center min-w-0">
      <span
        className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {label}
      </span>
      <span
        className="text-xl sm:text-2xl font-semibold tabular-nums whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          color: 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return (
    <span
      className="text-2xl font-light px-2"
      style={{ color: 'var(--text-tertiary)' }}
      aria-hidden="true"
    >
      {symbol}
    </span>
  );
}

export default function FormulaCard({ formula, bundle }: Props) {
  const lhs = renderCell(formula.lhs, bundle);
  const rhs = renderCell(formula.rhs, bundle);
  const result = renderCell(formula.result, bundle);

  return (
    <div
      className="px-4 py-6 sm:py-8 rounded-[var(--r-md)]"
      style={{ background: 'var(--bg-canvas)' }}
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <Term label={formula.lhs.label} value={lhs} />
        <Operator symbol={formula.operator} />
        <Term label={formula.rhs.label} value={rhs} />
        <Operator symbol="=" />
        <div className="flex flex-col items-center text-center min-w-0">
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2"
            style={{ color: 'var(--accent-gold)' }}
          >
            {formula.result.label}
          </span>
          <span
            className="text-xl sm:text-2xl font-semibold tabular-nums whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              color: 'var(--accent-gold)',
            }}
          >
            {result}
          </span>
        </div>
      </div>
    </div>
  );
}
