'use client';

import { HeroPriceGrid } from './PriceCard';

/**
 * HeroPriceWidget - Wrapper for the hero section price display
 * 
 * Uses the new PriceCard components instead of third-party iframes.
 * Zero third-party branding. Bloomberg × Stripe aesthetic.
 * 
 * Responsive layouts:
 * - Mobile (<768px): Single BIV card, full-width
 * - Tablet (768-1023px): BIV featured + 2 compact cards below
 * - Desktop (≥1024px): 3-column grid
 */
export default function HeroPriceWidget() {
  return <HeroPriceGrid />;
}
