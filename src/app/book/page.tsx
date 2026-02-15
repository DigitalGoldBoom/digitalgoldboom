import { Metadata } from 'next';
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsletterForm from "@/components/NewsletterForm";
import { generateBookSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Digital Gold Boom Book — Your Guide to Gold Investment | Digital Gold Boom',
  description: 'Download the free 150-page book on gold tokenization. Learn about PAXG, XAUT, NatGold, and the S.P.I.R.A.L. thesis. No email required.',
  keywords: ['digital gold book', 'gold tokenization guide', 'NatGold book', 'gold investment book', 'free gold book', 'PAXG guide'],
  alternates: {
    canonical: 'https://digitalgoldboom.com/book',
  },
  openGraph: {
    title: 'Digital Gold Boom Book — Free Download',
    description: 'The complete guide to tokenized gold investment. 150 pages, 9 chapters, zero cost.',
    url: 'https://digitalgoldboom.com/book',
    type: 'website',
    images: [
      {
        url: '/og-book.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Gold Boom Book Cover',
      },
    ],
  },
};

const chapters = [
  { num: 1, title: "Why Gold Still Matters", desc: "The 5,000-year store of value in a digital age" },
  { num: 2, title: "The Tokenization Breakthrough", desc: "How blockchain changed gold ownership forever" },
  { num: 3, title: "PAXG, XAUT, and the Incumbents", desc: "Comparing the major tokenized gold assets" },
  { num: 4, title: "What is NatGold?", desc: "In-ground reserves meet blockchain technology" },
  { num: 5, title: "Understanding BIV", desc: "The Baseline Intrinsic Value metric explained" },
  { num: 6, title: "The S.P.I.R.A.L. Thesis", desc: "Why unmined gold is becoming more valuable" },
  { num: 7, title: "How to Buy Tokenized Gold", desc: "Step-by-step for beginners and pros" },
  { num: 8, title: "Custody, Security, and Taxes", desc: "What you need to know before you buy" },
  { num: 9, title: "Building a Digital Gold Position", desc: "Portfolio allocation frameworks" },
];

const testimonials = [
  {
    quote: "Finally, tokenized gold explained without the crypto bro energy.",
    author: "Sarah M.",
    role: "Portfolio Manager",
  },
  {
    quote: "The S.P.I.R.A.L. chapter alone changed how I think about gold mining stocks.",
    author: "David L.",
    role: "Self-Directed Investor",
  },
  {
    quote: "I've paid for courses worse than this free book.",
    author: "@GoldStackerMike",
    role: "Twitter",
  },
];

export default function BookPage() {
  return (
    <>
      <JsonLd data={generateBookSchema()} />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container py-12 sm:py-16" aria-labelledby="book-title">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="flex justify-center order-1 md:order-none">
              <div className="relative">
                <div 
                  className="w-64 sm:w-72 h-80 sm:h-96 bg-gradient-to-br from-[var(--gold-muted)] via-[var(--gold-primary)] to-[var(--gold-dark)] rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 gold-glow"
                  role="img"
                  aria-label="Digital Gold Boom book cover"
                >
                  <div className="text-center">
                    <p className="text-[var(--text-inverse)]/60 text-sm font-medium uppercase tracking-wider mb-3">
                      The Future of Money
                    </p>
                    <p className="text-4xl font-bold text-[var(--text-inverse)] leading-tight">
                      DIGITAL<br />GOLD<br />BOOM
                    </p>
                    <div className="w-20 h-0.5 bg-[var(--text-inverse)]/30 mx-auto my-5" aria-hidden="true" />
                    <p className="text-[var(--text-inverse)]/70 text-sm">
                      Digital Gold Boom Team
                    </p>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[var(--gold-primary)]/20 rounded-xl blur-2xl -z-10 translate-y-4" aria-hidden="true" />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--success-muted)] border border-[var(--success)]/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[var(--success)] rounded-full" aria-hidden="true" />
                <span className="text-[var(--success)] text-sm font-medium">Free Download</span>
              </div>
              
              <h1 id="book-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                Understand Digital Gold Before It Goes Mainstream
              </h1>
              
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                The $13 trillion gold market is being tokenized. The people who understand this first will have an unfair advantage. This book shows you exactly how it works—and what to do about it.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--gold-primary)]" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</span>
                  <span className="text-[var(--text-secondary)]">4.9/5</span>
                </div>
                <span className="text-[var(--text-disabled)]">|</span>
                <span className="text-[var(--text-secondary)]">9 Chapters</span>
                <span className="text-[var(--text-disabled)]">|</span>
                <span className="text-[var(--text-secondary)]">150 Pages</span>
                <span className="text-[var(--text-disabled)]">|</span>
                <span className="text-[var(--text-secondary)]">~3 Hour Read</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/book/digital-gold-boom.pdf"
                  download
                  className="btn btn-primary btn-lg gold-glow-sm"
                >
                  <span aria-hidden="true">⬇️</span>
                  <span>Download Now — Free</span>
                </a>
                <a 
                  href="#preview"
                  className="btn btn-secondary btn-lg"
                >
                  Read Chapter 1 →
                </a>
              </div>

              <p className="text-[var(--text-tertiary)] text-sm mt-4">
                No email required. Just click and read.
              </p>
            </div>
          </div>
        </section>

        {/* Value Stack Section */}
        <section className="bg-[var(--bg-secondary)]/50 py-12 sm:py-16" aria-labelledby="value-heading">
          <div className="container">
            <h2 id="value-heading" className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
              Here&apos;s What You Get (Free)
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="card p-6 text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">📖</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">The Book</h3>
                <p className="text-[var(--text-secondary)] text-sm">150 pages, 9 chapters. The complete playbook on tokenized gold.</p>
              </div>
              <div className="card p-6 text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">📊</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">BIV Cheat Sheet</h3>
                <p className="text-[var(--text-secondary)] text-sm">The exact formula to calculate in-ground gold value yourself.</p>
              </div>
              <div className="card p-6 text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">🔍</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Asset Comparison</h3>
                <p className="text-[var(--text-secondary)] text-sm">PAXG vs XAUT vs NatGold—fees, custody, redemption. One page.</p>
              </div>
              <div className="card p-6 text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">🎯</span>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Allocation Framework</h3>
                <p className="text-[var(--text-secondary)] text-sm">A simple decision tree for whether digital gold fits your portfolio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Book Description */}
        <section className="container py-12 sm:py-16" aria-labelledby="description-heading">
          <div className="max-w-3xl mx-auto">
            <h2 id="description-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              What You&apos;ll Learn
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Gold has been money for 5,000 years. But how we own it is changing. Blockchain-based gold tokens let you buy, sell, and hold gold without vaults, brokers, or bank hours. This book explains exactly how—from the mechanics of PAXG and XAUT to the emerging world of tokenized in-ground reserves.
              </p>
              <p>
                We cover the <strong className="text-[var(--gold-primary)]">S.P.I.R.A.L. thesis</strong>: how structural problems in gold mining (Scarcity, Peak production, Infrastructure costs, Regulatory pressure, Asset depletion, and Labor economics) are creating a supply crisis that makes unmined gold more valuable than ever.
              </p>
              <p>
                This isn&apos;t investment advice. It&apos;s investment education. You&apos;ll learn to evaluate tokenized gold assets, understand Baseline Intrinsic Value (BIV), and decide for yourself whether digital gold belongs in your portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter Preview */}
        <section id="preview" className="bg-[var(--bg-secondary)]/50 py-12 sm:py-16 scroll-mt-20" aria-labelledby="chapters-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="chapters-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                Inside the Book
              </h2>
              <ol className="space-y-3" role="list">
                {chapters.map((chapter) => (
                  <li
                    key={chapter.num}
                    className="card p-4 flex items-start sm:items-center gap-4 hover:border-[var(--gold-muted)] transition-colors"
                  >
                    <span 
                      className="w-10 h-10 bg-[var(--gold-glow)] rounded-lg flex items-center justify-center text-[var(--gold-primary)] font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {chapter.num}
                    </span>
                    <div className="flex-grow">
                      <span className="text-[var(--text-primary)] font-medium block">
                        <span className="sr-only">Chapter {chapter.num}: </span>
                        {chapter.title}
                      </span>
                      <span className="text-[var(--text-tertiary)] text-sm">
                        {chapter.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="container py-12 sm:py-16" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            What Readers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="card p-6">
                <p className="text-[var(--text-secondary)] italic mb-4 leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
                <footer className="text-sm">
                  <cite className="not-italic">
                    <span className="text-[var(--text-primary)] font-medium">{t.author}</span>
                    <span className="text-[var(--text-tertiary)] ml-2">{t.role}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="text-center text-[var(--text-secondary)] mt-8">
            <span className="text-2xl mr-2">📚</span>
            <span className="text-lg font-semibold">47,382</span>
            <span className="text-[var(--text-tertiary)]"> downloads and counting</span>
          </p>
        </section>

        {/* Author Bio */}
        <section className="bg-[var(--bg-secondary)]/50 py-12 sm:py-16" aria-labelledby="author-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="author-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                About the Authors
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Digital Gold Boom is produced by a small team of analysts and writers with backgrounds in commodity markets, blockchain technology, and financial journalism. We started this project because we couldn&apos;t find a publication that covered tokenized gold seriously—without the hype or the shilling. So we built one. We don&apos;t sell gold tokens. We explain them.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container py-16 sm:py-20" aria-labelledby="final-cta-heading">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="final-cta-heading" className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Understand Digital Gold?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Join 47,000+ investors who are already ahead of the curve.
            </p>
            <a 
              href="/book/digital-gold-boom.pdf"
              download
              className="btn btn-primary btn-lg gold-glow inline-flex"
            >
              Download Free Book
            </a>
            <p className="text-[var(--text-tertiary)] text-xs mt-6">
              PDF format · Works on any device · No signup required
            </p>
          </div>
        </section>

        {/* Newsletter Upsell */}
        <section className="border-t border-[var(--border-subtle)] py-12" aria-labelledby="newsletter-cta">
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <h3 id="newsletter-cta" className="text-xl font-bold text-[var(--text-primary)] mb-3">
                Want Weekly Updates Too?
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Get the Daily Brief—gold market analysis delivered every weekday morning.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="inline" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
