import FeaturedArticlesGrid from './FeaturedArticlesGrid';
import TrendingSection from './TrendingSection';
import NewsletterForm from './NewsletterForm';

export default function ArticlesWithTrending() {
  return (
    <>
      {/* Main Articles Section with Trending Sidebar */}
      <section className="py-12 sm:py-16 bg-[var(--bg-secondary)]/30" aria-labelledby="featured-articles-section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content Area - Featured Articles */}
            <div className="lg:col-span-3">
              <FeaturedArticlesGrid limit={6} />
            </div>

            {/* Sidebar - Trending Section */}
            <div className="mt-12 lg:mt-0 lg:col-span-1">
              <TrendingSection />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Inline After Articles */}
      <section className="py-12 sm:py-16 border-t border-[var(--border-subtle)]" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 id="newsletter-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Know What&apos;s Moving Gold — Before The Markets Do
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Every weekday at 5am UTC, get the one email that makes you sound like you know what&apos;s happening.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="inline" />
            </div>
            <p className="text-[var(--text-tertiary)] text-xs mt-4">
              Join 12,000+ readers · Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
}