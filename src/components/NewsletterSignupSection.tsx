'use client';

import NewsletterForm from './NewsletterForm';

export default function NewsletterSignupSection() {
  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]"
      aria-labelledby="newsletter-heading"
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Gold accent line */}
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] mx-auto mb-8 rounded-full" />

          <h2
            id="newsletter-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            The Gold Rush Is{' '}
            <span className="bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] bg-clip-text text-transparent">
              Digital Now
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-3">
            Join thousands of investors reading the{' '}
            <strong className="text-[var(--text-primary)]">Digital Gold Boom</strong>{' '}
            newsletter. Get the insights from our upcoming book delivered to your
            inbox — market moves, NatGold breakthroughs, and tokenized gold
            strategies. Free, every weekday.
          </p>

          <p className="text-[var(--text-tertiary)] text-sm mb-8">
            No spam. Unsubscribe anytime. We send what we&apos;d want to read.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto">
            <NewsletterForm variant="inline" />
          </div>

          {/* Social proof */}
          <p className="text-[var(--text-tertiary)] text-xs mt-6">
            ★★★★★ &ldquo;The only gold newsletter I actually open.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
