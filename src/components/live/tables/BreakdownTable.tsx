'use client';

import type { AllocationPart, TableCell, TableEntry } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import { deriveCellValue, formatCellValue } from '@/lib/live/table-derive';

type Props = {
  total: TableEntry['total'];
  parts: AllocationPart[];
  bundle: LiveBundle;
};

function renderCell(cell: TableCell | undefined, bundle: LiveBundle): string {
  if (!cell) return '—';
  if (cell.staticValue !== undefined) return cell.staticValue;
  if (cell.derivation) {
    const value = deriveCellValue(cell.derivation, bundle);
    if (value === undefined) return '—';
    return formatCellValue(value, cell.format, cell.precision, cell.suffix);
  }
  return '—';
}

export default function BreakdownTable({ total, parts, bundle }: Props) {
  const totalLabel = total?.label ?? 'Total';
  const totalValue = total ? renderCell(total, bundle) : null;

  return (
    <div>
      {total && (
        <div
          className="flex items-baseline justify-between gap-4 px-3 py-3 border-b"
          style={{ borderColor: 'var(--border-hover)' }}
        >
          <span
            className="text-xs uppercase tracking-[0.18em] font-semibold"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {totalLabel}
          </span>
          {totalValue && (
            <span
              className="text-base font-semibold tabular-nums whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                color: 'var(--accent-gold)',
              }}
            >
              {totalValue}
            </span>
          )}
        </div>
      )}
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead className="sr-only">
          <tr>
            <th>Allocation</th>
            <th>Share</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part, idx) => (
            <tr
              key={part.id}
              style={{
                borderTop: '1px solid var(--border-base)',
                background:
                  idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-canvas)',
              }}
            >
              <th
                scope="row"
                className="text-left px-3 py-2 font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {part.label}
              </th>
              <td
                className="text-right px-3 py-2 tabular-nums whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  color: 'var(--text-tertiary)',
                  width: '5rem',
                }}
              >
                {(part.pct * 100).toFixed(0)}%
              </td>
              <td
                className="text-right px-3 py-2 tabular-nums whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  color: 'var(--text-primary)',
                }}
              >
                {renderCell(part.value, bundle)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
