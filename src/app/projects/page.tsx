import type { Metadata } from 'next';
import { fetchLiveBundle } from '@/lib/live/sources';
import { generateMetadata as buildMetadata } from '@/lib/seo';
import {
  PROJECTS,
  PROJECTED_TOKENS,
  MINTED_TOKENS_PER_DISCLOSURE,
  BIV_ANCHOR_USD,
} from '@/data/projects';
import VaultShell from '@/components/VaultShell';
import ProjectsDashboard from './ProjectsDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Projects — The Gold Behind the Tokens',
  description:
    'Friday and Cahuilla: two drilled, independently reported gold deposits. See exactly which parcels have been tokenized — and how many NatGold Tokens exist on-chain today, read live from the Ethereum contract.',
  path: '/projects',
  keywords: [
    'NatGold projects',
    'NATG minted supply',
    'Friday Gold Project',
    'Cahuilla Gold Project',
    'NI 43-101',
    'tokenized gold deposit',
    'gold tokenization pipeline',
  ],
});

// 5-minute ISR — matches /live so both the BIV and the on-chain NATG supply stay
// fresh without a fetch on every visit.
export const revalidate = 300;

export default async function ProjectsPage() {
  const bundle = await fetchLiveBundle();
  const biv = bundle.biv?.value ?? BIV_ANCHOR_USD;

  // The chain is the arbiter of how many tokens exist. fetchNatgSupply() already
  // falls back to its own last verified chain read if every RPC is down, so a
  // missing leg here means the bundle itself failed — fall back to the company's
  // stated figure and let the UI flag it as unverified.
  const mintedOnChain = bundle.natgMinted?.value ?? MINTED_TOKENS_PER_DISCLOSURE;
  const mintedStale = bundle.natgMinted?.stale ?? true;

  return (
    <VaultShell>
      <main className="min-h-screen pt-16">
        <ProjectsDashboard
          projects={PROJECTS}
          projectedTokens={PROJECTED_TOKENS}
          mintedOnChain={mintedOnChain}
          mintedUpdatedAt={bundle.natgMinted?.updatedAt ?? null}
          mintedStale={mintedStale}
          disclosureTotal={MINTED_TOKENS_PER_DISCLOSURE}
          biv={biv}
          anchorBiv={BIV_ANCHOR_USD}
          bivUpdatedAt={bundle.biv?.updatedAt ?? null}
          bivStale={bundle.biv?.stale ?? false}
        />
      </main>
    </VaultShell>
  );
}
