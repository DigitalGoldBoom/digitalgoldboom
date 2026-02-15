import Link from 'next/link';

interface BookCTAProps {
  variant?: 'full' | 'compact' | 'inline' | 'contextual';
  context?: string; // For contextual variant - e.g., "Chapter 3 explains why PAXG trades above spot"
  className?: string;
}

function BookCover({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-32 h-44',
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-gradient-to-br from-[var(--gold-muted)] via-[var(--gold-primary)] to-[var(--gold-dark)] rounded-lg shadow-lg flex flex-col items-center justify-center p-2`}
      role="img"
      aria-label="Digital Gold Boom book cover"
    >
      <div className="text-center">
        <p className="text-[var(--text-inverse)]/60 text-[8px] font-medium uppercase tracking-wider mb-1">
          The Future
        </p>
        <p className={`text-[var(--text-inverse)] font-bold leading-tight ${size === 'sm' ? 'text-[8px]' : 'text-xs'}`}>
          DIGITAL<br/>GOLD<br/>BOOM
        </p>
      </div>
    </div>
  );
}

export default function BookCTA({ variant = 'full', context, className = '' }: BookCTAProps) {
  // Contextual variant - used within article content
  if (variant === 'contextual') {
    return (
      <div className={`cta-card p-4 my-6 ${className}`}>
        <div className="flex items-center gap-4">
          <span className="text-2xl" aria-hidden="true">📖</span>
          <div className="flex-1">
            <p className="text-[var(--text-secondary)] text-sm">
              {context || "Want to go deeper? The free book covers this in detail."}
            </p>
          </div>
          <Link
            href="/book"
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            Free Book →
          </Link>
        </div>
      </div>
    );
  }

  // Inline variant - compact horizontal
  if (variant === 'inline') {
    return (
      <div className={`cta-card p-4 ${className}`}>
        <div className="flex items-center gap-4">
          <BookCover size="sm" />
          <div className="flex-grow min-w-0">
            <p className="text-[var(--text-primary)] font-medium text-sm mb-1">
              📖 Grab the Free Book
            </p>
            <p className="text-[var(--text-tertiary)] text-xs">
              9 chapters, zero cost
            </p>
          </div>
          <Link
            href="/book"
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            Download
          </Link>
        </div>
      </div>
    );
  }

  // Compact variant - sidebar-friendly
  if (variant === 'compact') {
    return (
      <div className={`cta-card p-6 text-center ${className}`}>
        <div className="flex justify-center mb-4">
          <BookCover size="md" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Free Download
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Digital Gold Boom — 150 pages on tokenized gold investment.
        </p>
        <Link
          href="/book"
          className="btn btn-primary w-full"
        >
          Get the Book →
        </Link>
      </div>
    );
  }

  // Full variant (default) - large CTA section
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="container">
        <div className="cta-card p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <BookCover size="lg" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Understand Digital Gold Before It Goes Mainstream
          </h2>
          
          <p className="text-[var(--text-secondary)] text-lg mb-6 max-w-xl mx-auto">
            The $13 trillion gold market is being tokenized. The people who understand this first will have an unfair advantage.
          </p>

          {/* Value stack preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-8">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-[var(--gold-primary)]">✓</span>
              <span className="text-[var(--text-secondary)]">150 pages, 9 chapters</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-[var(--gold-primary)]">✓</span>
              <span className="text-[var(--text-secondary)]">BIV Calculator Cheat Sheet</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-[var(--gold-primary)]">✓</span>
              <span className="text-[var(--text-secondary)]">Asset Comparison Matrix</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-[var(--gold-primary)]">✓</span>
              <span className="text-[var(--text-secondary)]">5-Min Allocation Framework</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="btn btn-primary btn-lg gold-glow-sm"
            >
              Download Now — Free
            </Link>
            <Link
              href="/book#preview"
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors font-medium"
            >
              Read Chapter 1 →
            </Link>
          </div>

          <p className="text-[var(--text-disabled)] text-xs mt-6">
            47,000+ downloads · No email required
          </p>
        </div>
      </div>
    </section>
  );
}
