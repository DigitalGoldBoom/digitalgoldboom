'use client';

type Props = {
  /** The neutral prose summary string from lib/live/table-summary.ts. */
  text: string;
};

/**
 * Renders the small "what's changed since the book" card directly underneath
 * each recreated chapter table. Visual treatment is deliberately distinct
 * from the stat cards: lighter background, italic body, no shadow.
 */
export default function TableSummary({ text }: Props) {
  return (
    <p
      className="text-sm italic leading-relaxed px-4 py-3 mt-2 border rounded-[var(--r-md)]"
      style={{
        background: 'var(--bg-canvas)',
        borderColor: 'var(--border-base)',
        color: 'var(--text-secondary)',
      }}
    >
      {text}
    </p>
  );
}
