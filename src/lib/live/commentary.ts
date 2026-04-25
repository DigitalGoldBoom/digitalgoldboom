// Rule-based, no-AI commentary generator for live stat cards.
// Templates per category + direction. Returns a short sentence the card may
// render under the value. If no template matches, returns null and the card
// simply omits the commentary slot.

import type { StatEntry } from '@/data/stats-registry';
import type { DeltaResult } from '@/lib/format';

export function generateCommentary(
  entry: StatEntry,
  delta: DeltaResult | null,
): string | null {
  if (!delta) return null;

  const pct = Math.abs(delta.percent).toFixed(1);
  const dir = delta.direction;

  switch (entry.category) {
    case 'anchor': {
      if (dir === 'flat') return null;
      const verb = dir === 'up' ? 'risen' : 'fallen';
      return `Gold spot has ${verb} ${pct}% since the book's snapshot. Derived figures here move with it.`;
    }
    case 'token': {
      if (dir === 'flat') return null;
      const verb = dir === 'up' ? 'risen' : 'fallen';
      return `Tokenized-gold prices have ${verb} ${pct}% since the snapshot — tracking spot.`;
    }
    case 'derived': {
      if (entry.bookSnapshot.formula) {
        return `Derived live from spot, AISC, and BIV per: ${entry.bookSnapshot.formula}.`;
      }
      return 'Derived live from current spot, AISC, and BIV.';
    }
    case 'market-cap': {
      return `Updated daily; the book's snapshot was ${entry.bookSnapshot.date}.`;
    }
    case 'comparison': {
      return `Comparison anchor; book snapshot dated ${entry.bookSnapshot.date}.`;
    }
    default:
      return null;
  }
}
