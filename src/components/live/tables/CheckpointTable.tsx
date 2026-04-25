'use client';

import type { Checkpoint, TableCell } from '@/data/tables-registry';
import type { LiveBundle } from '@/lib/live/sources';
import { deriveCellValue, formatCellValue } from '@/lib/live/table-derive';

type Props = {
  checkpoints: Checkpoint[];
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

export default function CheckpointTable({ checkpoints, bundle }: Props) {
  const lastIdx = checkpoints.length - 1;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1.5px solid var(--border-hover)' }}>
            <th
              scope="col"
              className="text-left px-3 py-2 font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Date
            </th>
            <th
              scope="col"
              className="text-left px-3 py-2 font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Checkpoint
            </th>
            <th
              scope="col"
              className="text-right px-3 py-2 font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              BIV
            </th>
          </tr>
        </thead>
        <tbody>
          {checkpoints.map((cp, idx) => {
            const isLive = idx === lastIdx;
            return (
              <tr
                key={cp.id}
                style={{
                  borderTop: '1px solid var(--border-base)',
                  background:
                    idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-canvas)',
                }}
              >
                <td
                  className="text-left px-3 py-2 tabular-nums whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {cp.date}
                </td>
                <td
                  className="text-left px-3 py-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {cp.label}
                </td>
                <td
                  className="text-right px-3 py-2 tabular-nums whitespace-nowrap font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    color: isLive ? 'var(--accent-gold)' : 'var(--text-primary)',
                  }}
                >
                  {renderCell(cp.value, bundle)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
