import Hero from "@/components/Hero";
import PriceWidget from "@/components/PriceWidget";
import ArticleCard from "@/components/ArticleCard";
import BookCTA from "@/components/BookCTA";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";

// Mock featured articles - TODO: Replace with Sanity CMS integration
const featuredArticles = [
  {
    category: 'Digital Gold',
    title: 'Why Traditional Mining Is Becoming Obsolete',
    excerpt: 'The S.P.I.R.A.L. of extraction costs is crushing traditional miners. Here\'s what the industry insiders know but won\'t tell you.',
    date: 'Feb 14, 2026',
    slug: 'traditional-mining-obsolete',
    readTime: '6 min read',
    featured: true,
  },
  {
    category: 'Tokenization',
    title: 'Understanding the NatGold Standard',
    excerpt: 'How in-ground gold reserves are being tokenized without extraction, creating a new paradigm for gold ownership.',
    date: 'Feb 13, 2026',
    slug: 'natgold-standard-explained',
    readTime: '8 min read',
  },
  {
    category: 'Market Analysis',
    title: 'Gold Hits $2,850: What It Means for Digital Assets',
    excerpt: 'Record prices are accelerating the shift to tokenized alternatives. Analysis of the impact on PAXG, XAUT, and emerging NatGold.',
    date: 'Feb 12, 2026',
    slug: 'gold-2850-digital-assets',
    readTime: '5 min read',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Live Prices Section */}
      <section className="py-12 sm:py-16 bg-[var(--bg-secondary)]/50" aria-labelledby="prices-heading">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 id="prices-heading" className="text-2xl font-bold text-[var(--text-primary)]">
                Live Prices
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Real-time gold and tokenized asset prices
              </p>
            </div>
            <Link 
              href="/prices" 
              className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] text-sm font-medium transition-colors"
              aria-label="View all gold prices"
            >
              View Full Dashboard →
            </Link>
          </div>
          <PriceWidget />
        </div>
      </section>

      {/* What is Digital Gold Section */}
      <section className="py-12 sm:py-16" aria-labelledby="explainer-heading">
        <div className="container">
          <div className="max-w-3xl">
            <h2 id="explainer-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              What is Digital Gold?
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Digital gold is physical gold represented as blockchain tokens. Each token equals a specific amount of real gold—usually one troy ounce—held in secure vaults. You own the gold. You can trade it 24/7. You can redeem it for physical bars if you want.
              </p>
              <p>
                The biggest players are <strong className="text-[var(--text-primary)]">PAXG</strong> (Paxos Gold) and <strong className="text-[var(--text-primary)]">XAUT</strong> (Tether Gold). Both are fully backed, audited, and redeemable. But there&apos;s also <strong className="text-[var(--gold-primary)]">NatGold</strong>—tokenized in-ground gold reserves—which changes everything about how we value unmined gold.
              </p>
            </div>
            <Link 
              href="/news/natgold-standard-explained"
              className="inline-flex items-center gap-1 text-[var(--gold-primary)] hover:text-[var(--gold-light)] font-medium mt-4 transition-colors"
            >
              What&apos;s the difference? Read our guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12 sm:py-16 bg-[var(--bg-secondary)]/30" aria-labelledby="articles-heading">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 id="articles-heading" className="text-2xl font-bold text-[var(--text-primary)]">
              Latest Insights
            </h2>
            <Link 
              href="/news" 
              className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] text-sm font-medium transition-colors"
            >
              View All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA Section */}
      <BookCTA />

      {/* Newsletter Section */}
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
