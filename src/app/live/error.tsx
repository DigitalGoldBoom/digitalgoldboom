'use client';

import { useEffect } from 'react';
import VaultShell from '@/components/VaultShell';

/**
 * /live error boundary.
 *
 * Same bug as loading.tsx, same fix: it painted `background: var(--bg-canvas)` outside the `.v2`
 * scope, where that token is #FAFAF9 — a NEAR-WHITE. So the one moment the site had to look
 * composed, a failed data feed, it slammed a full-screen white page onto a black site. The failure
 * looked like a crash, on top of the failure it was reporting.
 *
 * Wrapped in VaultShell, so a bad upstream feed now looks like a message on our page rather than a
 * different website.
 */
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
    <VaultShell>
      <main className="flex min-h-screen items-center justify-center pt-16">
        <div className="max-w-md px-6 py-12 text-center">
          <p className="v2-eyebrow mb-4" style={{ justifyContent: 'center' }}>
            Live dashboard
          </p>
          <h1 className="v2-display mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            We couldn&apos;t reach the live feeds.
          </h1>
          <p className="mb-7 text-sm leading-relaxed" style={{ color: 'var(--v2-dim)' }}>
            Try again in a moment — upstream rate limits usually clear quickly.
          </p>
          <button type="button" onClick={reset} className="v2-btn">
            Retry
          </button>
        </div>
      </main>
    </VaultShell>
  );
}
