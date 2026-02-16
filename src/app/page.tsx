import Hero from "@/components/Hero";
import PriceWidget from "@/components/PriceWidget";
import BookCTA from "@/components/BookCTA";
import ArticlesWithTrending from "@/components/ArticlesWithTrending";
import Link from "next/link";

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

      {/* Featured Articles Grid with Trending Section */}
      <ArticlesWithTrending />

      {/* Book CTA Section */}
      <BookCTA />
    </>
  );
}
