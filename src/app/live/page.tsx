import { Suspense } from 'react';
import type { Metadata } from 'next';
import { STATS_REGISTRY } from '@/data/stats-registry';
import { fetchLiveBundle } from '@/lib/live/sources';
import { hydrateRegistry } from '@/lib/live/derive';
import { generateMetadata as buildMetadata } from '@/lib/seo';
import LiveDashboard from './LiveDashboard';
import VaultShell from '@/components/VaultShell';
import LiveGate from '@/components/LiveGate';

export const metadata: Metadata = buildMetadata({
  title: 'Live Dashboard — Digital Gold Boom',
  description:
    'Every snapshot-dependent figure from the book, paired with today\'s live value. COMEX spot, AISC, BIV, tokenized gold, and the three-year forecast — refreshed every 5 minutes.',
  path: '/live',
  keywords: ['live gold price', 'BIV', 'AISC', 'NatGold', 'tokenized gold dashboard'],
});

// 5-minute ISR for the page-level fetch.
export const revalidate = 300;

export default async function LivePage() {
  const bundle = await fetchLiveBundle();
  const stats = hydrateRegistry(STATS_REGISTRY, bundle);

  return (
    <VaultShell>
      <main className="min-h-screen pt-16">
        <LiveGate>
          <Suspense fallback={null}>
            <LiveDashboard
              stats={stats}
              bundle={bundle}
              assembledAt={bundle.assembledAt}
              errors={bundle.errors}
            />
          </Suspense>
        </LiveGate>
      </main>
    </VaultShell>
  );
}
