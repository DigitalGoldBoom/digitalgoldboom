'use client';

import Link from 'next/link';

interface PriceWidgetProps {
  variant?: 'full' | 'compact' | 'mini';
  showBIV?: boolean;
  showAISC?: boolean;
}

export default function PriceWidget({ variant = 'full', showBIV = true, showAISC = true }: PriceWidgetProps) {
  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-tertiary)]">Gold:</span>
          <span className="text-[var(--gold-primary)] font-medium">LIVE</span>
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-tertiary)]">BIV:</span>
          <span className="text-[var(--text-primary)] font-medium">LIVE</span>
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
        </div>
        <Link href="/prices" className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors">
          Full Dashboard →
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Clean 2-card layout - only working widgets */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {/* AISC Widget - NatGold */}
        {showAISC && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-overline">Mining Cost</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
                <span className="text-xs text-[var(--text-tertiary)]">LIVE</span>
              </div>
            </div>
            <div className="flex justify-center">
              <iframe 
                src="https://widgets.natgold.com/real-time-aisc-index" 
                frameBorder="0" 
                style={{ border: 0, overflow: 'hidden', width: '100%', maxWidth: '320px', minHeight: '100px' }} 
                scrolling="no" 
                height="100"
                title="AISC - All-In Sustaining Cost"
              />
            </div>
          </div>
        )}

        {/* BIV Widget - NatGold */}
        {showBIV && (
          <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[rgba(255,215,0,0.05)] border border-[var(--gold-dark)] rounded-xl p-4 gold-glow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-overline text-[var(--gold-primary)]">Gold − AISC</span>
              <span className="text-xs font-semibold text-[var(--gold-primary)] bg-[var(--gold-glow)] px-2 py-1 rounded">
                BIV
              </span>
            </div>
            <div className="flex justify-center">
              <iframe 
                src="https://widgets.natgold.com/baseline-intrinsic-value" 
                frameBorder="0" 
                style={{ border: 0, overflow: 'hidden', width: '100%', maxWidth: '320px', minHeight: '100px' }} 
                scrolling="no" 
                height="100"
                title="NatGold BIV Widget"
              />
            </div>
            <div className="mt-2 text-center">
              <Link 
                href="/prices#biv"
                className="inline-block text-[var(--gold-primary)] text-xs hover:text-[var(--gold-light)] transition-colors"
              >
                What is BIV? →
              </Link>
            </div>
          </div>
        )}

        <Link 
          href="/prices" 
          className="text-center text-[var(--gold-primary)] text-sm hover:text-[var(--gold-light)] transition-colors py-2"
        >
          View Gold, PAXG & XAUT prices →
        </Link>
      </div>

      {/* Desktop: Full 5-card layout */}
      <div className={`hidden sm:grid gap-4 ${
        variant === 'compact' 
          ? 'sm:grid-cols-2 lg:grid-cols-3' 
          : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      }`}>
        {/* Gold Spot Price Card */}
        <div className="card-gold p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-overline">XAU/USD per oz</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--text-tertiary)]">LIVE</span>
            </div>
          </div>
          <div className="text-[var(--text-tertiary)] text-sm mb-2">COMEX Gold Spot</div>
          <iframe 
            src="https://s.tradingview.com/embed-widget/single-quote/?symbol=COMEX%3AGC1!&locale=en&colorTheme=dark"
            style={{ border: 0, overflow: 'hidden', width: '100%', height: '80px' }}
            frameBorder="0"
            scrolling="no"
            title="Gold Spot Price"
          />
        </div>

        {/* PAXG - Pax Gold */}
        <div className="card-gold p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-overline">1 token = 1 oz gold</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--text-tertiary)]">LIVE</span>
            </div>
          </div>
          <div className="text-[var(--text-tertiary)] text-sm mb-2">Pax Gold (PAXG)</div>
          <iframe 
            src="https://s.tradingview.com/embed-widget/single-quote/?symbol=KRAKEN%3APAXGUSD&locale=en&colorTheme=dark"
            style={{ border: 0, overflow: 'hidden', width: '100%', height: '80px' }}
            frameBorder="0"
            scrolling="no"
            title="PAXG Price"
          />
        </div>

        {/* XAUT - Tether Gold */}
        <div className="card-gold p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-overline">1 token = 1 oz gold</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--text-tertiary)]">LIVE</span>
            </div>
          </div>
          <div className="text-[var(--text-tertiary)] text-sm mb-2">Tether Gold (XAUT)</div>
          <iframe 
            src="https://s.tradingview.com/embed-widget/single-quote/?symbol=KRAKEN%3AXAUTUSD&locale=en&colorTheme=dark"
            style={{ border: 0, overflow: 'hidden', width: '100%', height: '80px' }}
            frameBorder="0"
            scrolling="no"
            title="XAUT Price"
          />
        </div>

        {/* AISC Widget - NatGold */}
        {showAISC && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 transition-all duration-200 hover:border-[var(--border-hover)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-overline">Production Cost</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
                <span className="text-xs text-[var(--text-tertiary)]">LIVE</span>
              </div>
            </div>
            <div className="text-[var(--text-tertiary)] text-sm mb-2">AISC (Industry Avg)</div>
            <div className="flex justify-center">
              <iframe 
                src="https://widgets.natgold.com/real-time-aisc-index" 
                frameBorder="0" 
                style={{ border: 0, overflow: 'hidden', width: '100%', maxWidth: '430px', minHeight: '110px' }} 
                scrolling="no" 
                height="110"
                title="AISC - All-In Sustaining Cost"
              />
            </div>
          </div>
        )}

        {/* BIV Widget - NatGold */}
        {showBIV && (
          <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[rgba(255,215,0,0.05)] border border-[var(--gold-dark)] rounded-xl p-4 gold-glow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-overline text-[var(--gold-primary)]">Gold − AISC</span>
              <span className="text-xs font-semibold text-[var(--gold-primary)] bg-[var(--gold-glow)] px-2 py-1 rounded">
                BIV
              </span>
            </div>
            <div className="text-[var(--text-tertiary)] text-sm mb-2">Baseline Intrinsic Value</div>
            <div className="flex justify-center">
              <iframe 
                src="https://widgets.natgold.com/baseline-intrinsic-value" 
                frameBorder="0" 
                style={{ border: 0, overflow: 'hidden', width: '100%', maxWidth: '430px', minHeight: '110px' }} 
                scrolling="no" 
                height="110"
                title="NatGold BIV Widget"
              />
            </div>
            <div className="mt-3 text-center">
              <Link 
                href="/prices#biv"
                className="inline-block text-[var(--gold-primary)] text-xs hover:text-[var(--gold-light)] transition-colors"
              >
                What is BIV? →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
