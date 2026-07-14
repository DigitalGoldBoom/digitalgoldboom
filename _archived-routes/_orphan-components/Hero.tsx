import Link from 'next/link';
import HeroPriceWidget from './HeroPriceWidget';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold-muted)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container text-center">
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 bg-[var(--gold-glow)] border border-[var(--gold-primary)]/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
          <span className="text-[var(--gold-primary)] text-sm font-medium">Live Prices Updated</span>
        </div>

        {/* Headline - Conversion optimized */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
          Gold went digital.
          <span className="gold-text"> You should know how.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
          Live prices, daily analysis, and a free book on tokenized gold.
        </p>

        {/* ==================== KEY METRICS - ABOVE THE FOLD ==================== */}
        <div className="mb-10">
          <HeroPriceWidget />
        </div>
        {/* ====================================================================== */}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/book"
            className="btn btn-primary btn-lg gold-glow-sm"
          >
            <span>📖</span>
            <span>Yes, I Want the Free Book</span>
          </Link>
          <Link
            href="/prices"
            className="btn btn-secondary btn-lg"
          >
            Full Price Dashboard →
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-[var(--text-tertiary)] text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span>47,000+ Downloads</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-[var(--text-disabled)] rounded-full" />
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span>4.9/5 Rating</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-[var(--text-disabled)] rounded-full" />
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <span>50+ Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
