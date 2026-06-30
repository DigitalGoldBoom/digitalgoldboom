import type { Metadata } from 'next';
import { fetchLiveBundle } from '@/lib/live/sources';
import { generateMetadata as buildMetadata } from '@/lib/seo';
import { PROJECTS, COMBINED_TOKENS, BIV_ANCHOR_USD } from '@/data/projects';
import VaultShell from '@/components/VaultShell';
import ProjectsDashboard from './ProjectsDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Projects — The Gold Behind the Tokens',
  description:
    'Friday and Cahuilla: two drilled, independently reported gold deposits moving through the NatGold tokenization pipeline. 561,702 NatGold Tokens, with live value tracked against today’s BIV.',
  path: '/projects',
  keywords: ['NatGold projects', 'Friday Gold Project', 'Cahuilla Gold Project', 'NI 43-101', 'tokenized gold deposit', 'gold tokenization pipeline'],
});

// 5-minute ISR — matches /live so the live BIV stays fresh without per-visit fetches.
export const revalidate = 300;

export default async function ProjectsPage() {
  const bundle = await fetchLiveBundle();
  const biv = bundle.biv?.value ?? BIV_ANCHOR_USD;

  return (
    <VaultShell>
      <main className="min-h-screen pt-16">
        <ProjectsDashboard
          projects={PROJECTS}
          combinedTokens={COMBINED_TOKENS}
          biv={biv}
          anchorBiv={BIV_ANCHOR_USD}
          bivUpdatedAt={bundle.biv?.updatedAt ?? null}
          bivStale={bundle.biv?.stale ?? false}
        />
      </main>
    </VaultShell>
  );
}
