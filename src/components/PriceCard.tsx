'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatPrice, formatTime } from '@/lib/format';

// ============================================
// TYPES
// ============================================

type PriceSymbol = 'XAU' | 'PAXG' | 'XAUT' | 'AISC' | 'BIV';
type CardVariant = 'default' | 'featured' | 'compact';
type PriceStatus = 'loading' | 'loaded' | 'error';
type ChangeDirection = 'up' | 'down' | 'flat';

interface PriceData {
  price: number;
  change24h: number;
  changeDirection: ChangeDirection;
  lastUpdated: Date;
}

interface PriceCardProps {
  symbol: PriceSymbol;
  label: string;
  sublabel?: string;
  variant?: CardVariant;
  className?: string;
  showCalculation?: boolean; // For BIV to show breakdown
  goldSpotPrice?: number; // Pass for BIV calculation
  aiscPrice?: number; // Pass for BIV calculation
}

// ============================================
// CONSTANTS
// ============================================

// Static AISC value (quarterly update)
const AISC_VALUE = 1450.00;

// Static gold spot (will be replaced with API)
const GOLD_SPOT_STATIC = 2847.50;

// CoinGecko API endpoints
const COINGECKO_IDS: Record<string, string> = {
  PAXG: 'pax-gold',
  XAUT: 'tether-gold',
};

// Refresh interval (30 seconds)
const REFRESH_INTERVAL = 30000;

// ============================================
// PRICE FETCHING HOOK
// ============================================

function usePriceData(symbol: PriceSymbol) {
  const [data, setData] = useState<PriceData | null>(null);
  const [status, setStatus] = useState<PriceStatus>('loading');
  const [lastKnownPrice, setLastKnownPrice] = useState<number | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      // Handle static values
      if (symbol === 'AISC') {
        setData({
          price: AISC_VALUE,
          change24h: 0,
          changeDirection: 'flat',
          lastUpdated: new Date(),
        });
        setStatus('loaded');
        return;
      }

      if (symbol === 'XAU') {
        // Static gold spot for now - will be replaced with API
        const mockChange = 0.42; // Simulated change
        setData({
          price: GOLD_SPOT_STATIC,
          change24h: mockChange,
          changeDirection: mockChange > 0.01 ? 'up' : mockChange < -0.01 ? 'down' : 'flat',
          lastUpdated: new Date(),
        });
        setStatus('loaded');
        return;
      }

      if (symbol === 'BIV') {
        // BIV is calculated from Gold Spot - AISC
        const bivPrice = GOLD_SPOT_STATIC - AISC_VALUE;
        const mockChange = 1.24; // Simulated change
        setData({
          price: bivPrice,
          change24h: mockChange,
          changeDirection: mockChange > 0.01 ? 'up' : mockChange < -0.01 ? 'down' : 'flat',
          lastUpdated: new Date(),
        });
        setStatus('loaded');
        return;
      }

      // Fetch from CoinGecko for PAXG/XAUT
      const coinId = COINGECKO_IDS[symbol];
      if (!coinId) {
        throw new Error(`Unknown symbol: ${symbol}`);
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
        { cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const json = await response.json();
      const coinData = json[coinId];

      if (!coinData) {
        throw new Error('No data returned');
      }

      const price = coinData.usd;
      const change = coinData.usd_24h_change || 0;
      const direction: ChangeDirection = 
        change > 0.01 ? 'up' : change < -0.01 ? 'down' : 'flat';

      setData({
        price,
        change24h: change,
        changeDirection: direction,
        lastUpdated: new Date(),
      });
      setLastKnownPrice(price);
      setStatus('loaded');
    } catch (error) {
      console.error(`Failed to fetch ${symbol}:`, error);
      setStatus('error');
    }
  }, [symbol]);

  const retry = useCallback(() => {
    setStatus('loading');
    fetchPrice();
  }, [fetchPrice]);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return { data, status, lastKnownPrice, retry };
}

// ============================================
// SKELETON COMPONENT
// ============================================

function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{
        background: 'linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-elevated) 50%, var(--bg-tertiary) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}

// ============================================
// STATUS DOT COMPONENT
// ============================================

function StatusDot({ status }: { status: PriceStatus }) {
  const baseClasses = 'w-2 h-2 rounded-full';
  
  if (status === 'loading') {
    return (
      <span 
        className={`${baseClasses} bg-[var(--text-tertiary)]`}
        style={{ animation: 'pulse 2s ease-in-out infinite' }}
      />
    );
  }
  
  if (status === 'error') {
    return (
      <span 
        className={`${baseClasses} bg-[var(--error)]`}
        style={{ animation: 'pulse 3s ease-in-out infinite' }}
      />
    );
  }
  
  return (
    <span 
      className={`${baseClasses} bg-[var(--success)]`}
      style={{ animation: 'pulse 2s ease-in-out infinite' }}
    />
  );
}

// ============================================
// PRICE CHANGE INDICATOR
// ============================================

function PriceChange({ 
  change, 
  direction,
  size = 'default' 
}: { 
  change: number; 
  direction: ChangeDirection;
  size?: 'default' | 'compact';
}) {
  const formattedChange = Math.abs(change).toFixed(2);
  const textSize = size === 'compact' ? 'text-xs' : 'text-sm';
  
  if (direction === 'up') {
    return (
      <span className={`${textSize} font-medium text-[var(--success)]`}>
        ▲ +{formattedChange}%
      </span>
    );
  }
  
  if (direction === 'down') {
    return (
      <span className={`${textSize} font-medium text-[var(--error)]`}>
        ▼ −{formattedChange}%
      </span>
    );
  }
  
  return (
    <span className={`${textSize} font-medium text-[var(--text-muted)]`}>
      ● {formattedChange}%
    </span>
  );
}

// ============================================
// FORMAT HELPERS — imported from @/lib/format (deduped 2026-04-25)
// ============================================
// formatPrice and formatTime are now centralized in src/lib/format.ts so the
// /live dashboard and PriceCard share one implementation.

// ============================================
// COMPACT VARIANT
// ============================================

function CompactCard({ 
  label, 
  sublabel, 
  data, 
  status, 
  lastKnownPrice,
  retry,
  className = '' 
}: {
  label: string;
  sublabel?: string;
  data: PriceData | null;
  status: PriceStatus;
  lastKnownPrice: number | null;
  retry: () => void;
  className?: string;
}) {
  return (
    <div 
      className={`
        p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]
        flex justify-between items-center min-w-[240px]
        transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg
        ${className}
      `}
    >
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        {sublabel && (
          <div className="text-xs text-[var(--text-tertiary)]">{sublabel}</div>
        )}
      </div>
      
      <div className="text-right">
        {status === 'loading' && (
          <>
            <Skeleton className="w-20 h-6 mb-1" />
            <Skeleton className="w-12 h-4 ml-auto" />
          </>
        )}
        
        {status === 'loaded' && data && (
          <>
            <div className="text-xl font-bold text-[var(--text-primary)] price-value">
              {formatPrice(data.price)}
            </div>
            <PriceChange change={data.change24h} direction={data.changeDirection} size="compact" />
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-xl font-bold text-[var(--text-primary)] opacity-60 price-value">
              {lastKnownPrice ? formatPrice(lastKnownPrice) : '—'}
            </div>
            <button 
              onClick={retry}
              className="text-xs text-[var(--warning)] hover:underline"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// DEFAULT VARIANT
// ============================================

function DefaultCard({ 
  label, 
  sublabel, 
  data, 
  status, 
  lastKnownPrice,
  retry,
  className = '' 
}: {
  label: string;
  sublabel?: string;
  data: PriceData | null;
  status: PriceStatus;
  lastKnownPrice: number | null;
  retry: () => void;
  className?: string;
}) {
  return (
    <div 
      className={`
        p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]
        min-w-[280px] max-w-[340px]
        transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg
        ${className}
      `}
      role="region"
      aria-label={`${label} price`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
          {label}
        </span>
        <div className="flex items-center gap-1.5" role="status">
          <StatusDot status={status} />
          <span className="text-xs text-[var(--text-tertiary)]">
            {status === 'loading' ? '···' : status === 'error' ? '···' : 'LIVE'}
          </span>
        </div>
      </div>
      
      {/* Sublabel */}
      {sublabel && (
        <div className="text-sm text-[var(--text-tertiary)] mb-4">{sublabel}</div>
      )}
      
      {/* Price Display */}
      <div className="text-center my-4" aria-live="polite">
        {status === 'loading' && (
          <>
            <Skeleton className="w-36 h-10 mx-auto mb-2" />
            <Skeleton className="w-16 h-4 mx-auto" />
          </>
        )}
        
        {status === 'loaded' && data && (
          <>
            <div className="text-4xl font-bold text-[var(--text-primary)] price-value">
              {formatPrice(data.price)}
            </div>
            <div className="mt-1">
              <PriceChange change={data.change24h} direction={data.changeDirection} />
            </div>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-4xl font-bold text-[var(--text-primary)] opacity-60 price-value">
              {lastKnownPrice ? formatPrice(lastKnownPrice) : '—'}
            </div>
            <div className="text-xs text-[var(--text-muted)] italic mt-1">
              (Last known)
            </div>
          </>
        )}
      </div>
      
      {/* Footer */}
      {status === 'loaded' && data && (
        <div className="text-xs text-[var(--text-muted)] text-center">
          Updated {formatTime(data.lastUpdated)}
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--warning)]">
            <span>⚠</span>
            <span>Unable to fetch live data</span>
          </div>
          <button 
            onClick={retry}
            className="px-4 py-2 text-xs border border-[var(--border-default)] rounded-md
                       hover:bg-[var(--bg-elevated)] transition-colors"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// FEATURED VARIANT (BIV Only)
// ============================================

function FeaturedCard({ 
  label, 
  sublabel, 
  data, 
  status, 
  lastKnownPrice,
  retry,
  showCalculation = false,
  className = '' 
}: {
  label: string;
  sublabel?: string;
  data: PriceData | null;
  status: PriceStatus;
  lastKnownPrice: number | null;
  retry: () => void;
  showCalculation?: boolean;
  className?: string;
}) {
  return (
    <div 
      className={`
        relative rounded-xl overflow-hidden
        min-w-[280px] max-w-[340px]
        transition-all duration-200 hover:translate-y-[-2px]
        ${className}
      `}
      style={{
        background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.08) 0%, var(--bg-secondary) 100%)',
        border: '1px solid var(--gold-dark)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)',
      }}
      role="region"
      aria-label={`${label} price - featured`}
    >
      {/* Gold gradient bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'var(--gold-primary)' }}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <span 
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: 'var(--gold-primary)' }}
          >
            {label}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" role="status">
              <StatusDot status={status} />
              <span className="text-xs text-[var(--text-tertiary)]">
                {status === 'loading' ? '···' : status === 'error' ? '···' : 'LIVE'}
              </span>
            </div>
            {/* BIV Badge */}
            <span 
              className="px-2 py-0.5 text-[11px] font-bold tracking-wide rounded"
              style={{ 
                background: 'var(--gold-primary)', 
                color: 'var(--bg-primary)',
                letterSpacing: '0.05em',
              }}
            >
              BIV
            </span>
          </div>
        </div>
        
        {/* Sublabel */}
        {sublabel && (
          <div className="text-sm text-[var(--text-tertiary)] mb-4">{sublabel}</div>
        )}
        
        {/* Price Display */}
        <div className="text-center my-4" aria-live="polite">
          {status === 'loading' && (
            <>
              <Skeleton className="w-36 h-10 mx-auto mb-2" />
              <Skeleton className="w-16 h-4 mx-auto" />
            </>
          )}
          
          {status === 'loaded' && data && (
            <>
              <div 
                className="text-4xl font-bold price-value"
                style={{ color: 'var(--gold-primary)' }}
              >
                {formatPrice(data.price)}
              </div>
              <div className="mt-1">
                <PriceChange change={data.change24h} direction={data.changeDirection} />
              </div>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div 
                className="text-4xl font-bold opacity-60 price-value"
                style={{ color: 'var(--gold-primary)' }}
              >
                {lastKnownPrice ? formatPrice(lastKnownPrice) : '—'}
              </div>
              <div className="text-xs text-[var(--text-muted)] italic mt-1">
                (Last known)
              </div>
            </>
          )}
        </div>
        
        {/* Calculation Breakdown */}
        {showCalculation && status === 'loaded' && (
          <div 
            className="text-center text-[13px] text-[var(--text-muted)] font-mono mb-3"
          >
            = {formatPrice(GOLD_SPOT_STATIC)} − {formatPrice(AISC_VALUE)}
          </div>
        )}
        
        {/* Footer */}
        {status === 'loaded' && data && (
          <div className="text-xs text-[var(--text-muted)] text-center">
            Updated {formatTime(data.lastUpdated)}
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[var(--warning)]">
              <span>⚠</span>
              <span>Unable to fetch live data</span>
            </div>
            <button 
              onClick={retry}
              className="px-4 py-2 text-xs border border-[var(--border-default)] rounded-md
                         hover:bg-[var(--bg-elevated)] transition-colors"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN PRICECARD COMPONENT
// ============================================

export default function PriceCard({
  symbol,
  label,
  sublabel,
  variant = 'default',
  className = '',
  showCalculation = false,
}: PriceCardProps) {
  const { data, status, lastKnownPrice, retry } = usePriceData(symbol);
  
  const commonProps = {
    label,
    sublabel,
    data,
    status,
    lastKnownPrice,
    retry,
    className,
  };
  
  if (variant === 'compact') {
    return <CompactCard {...commonProps} />;
  }
  
  if (variant === 'featured') {
    return <FeaturedCard {...commonProps} showCalculation={showCalculation} />;
  }
  
  return <DefaultCard {...commonProps} />;
}

// ============================================
// HERO PRICE GRID COMPONENT
// ============================================

export function HeroPriceGrid() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Mobile: Single BIV card */}
      <div className="md:hidden">
        <div className="flex justify-center">
          <PriceCard
            symbol="BIV"
            label="Bullion Intrinsic Value"
            sublabel="Gold Spot − Mining Cost"
            variant="featured"
            showCalculation
            className="w-full max-w-sm"
          />
        </div>
        <a 
          href="/prices" 
          className="block text-center text-sm mt-4 py-3 hover:underline transition-colors"
          style={{ 
            color: 'var(--text-secondary)',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          View all live prices →
        </a>
      </div>

      {/* Tablet: BIV featured + 2 compact below */}
      <div className="hidden md:block lg:hidden">
        <div className="flex justify-center mb-5">
          <PriceCard
            symbol="BIV"
            label="Bullion Intrinsic Value"
            sublabel="= Gold Spot − Mining Cost"
            variant="featured"
            showCalculation
            className="w-full max-w-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <PriceCard
            symbol="XAU"
            label="Gold Spot"
            sublabel="XAU/USD"
            variant="compact"
          />
          <PriceCard
            symbol="AISC"
            label="Mining Cost"
            sublabel="AISC"
            variant="compact"
          />
        </div>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
        <div className="opacity-85">
          <PriceCard
            symbol="XAU"
            label="COMEX Gold Spot"
            sublabel="XAU/USD"
            variant="default"
            className="w-full"
          />
        </div>
        <div className="opacity-85">
          <PriceCard
            symbol="AISC"
            label="Mining Cost"
            sublabel="AISC (Quarterly)"
            variant="default"
            className="w-full"
          />
        </div>
        <PriceCard
          symbol="BIV"
          label="Bullion Intrinsic Value"
          sublabel="Gold Spot − Mining Cost"
          variant="featured"
          showCalculation
          className="w-full"
        />
      </div>
    </div>
  );
}

// ============================================
// EXPORTS FOR FLEXIBILITY
// ============================================

export { usePriceData, formatPrice, formatTime };
export type { PriceCardProps, PriceData, PriceSymbol, CardVariant, PriceStatus };

