'use client';

import { useEffect } from 'react';

export default function LiveError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[/live] render error', error);
  }, [error]);

  return (
    <main
      className="min-h-screen pt-16 flex items-center justify-center"
      style={{ background: 'var(--bg-canvas)' }}
    >
      <div className="max-w-md px-6 py-12 text-center">
        <p
          className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-2"
          style={{ color: 'var(--accent-gold)' }}
        >
          Live dashboard
        </p>
        <h1
          className="text-2xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          We couldn&apos;t reach the live feeds.
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          The book&apos;s figures are still in the printed copy. Try again in a
          moment — upstream rate limits usually clear quickly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
