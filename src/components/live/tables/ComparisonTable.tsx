'use client';

import type { ComparisonColumn, ComparisonRow, TableCell } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import { deriveCellValue, formatCellValue } from '@/lib/live/table-derive';

type Props = {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
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

export default function ComparisonTable({ columns, rows, bundle }: Props) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-sm"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ borderBottom: '1.5px solid var(--border-hover)' }}>
            <th
              scope="col"
              className="text-left px-3 py-2 font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Metric
            </th>
            {columns.map((col) => (
              <th
                key={col.id}
                scope="col"
                className="text-right px-3 py-2 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.id}
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
                {row.label}
              </th>
              {columns.map((col) => (
                <td
                  key={col.id}
                  className="text-right px-3 py-2 tabular-nums whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    color: 'var(--text-primary)',
                  }}
                >
                  {renderCell(row.cells[col.id], bundle)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
