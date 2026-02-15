'use client';

import { useState } from 'react';
import BookCTA from '@/components/BookCTA';

// Note: Metadata must be in a separate file for client components
// See newsletter/metadata.ts

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (ConvertKit, Mailchimp, Resend, etc.)
    console.log('Newsletter signup:', email);
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How often do you send emails?',
      a: 'Once a week, typically on Tuesday mornings. Occasionally we\'ll send breaking news if something major happens in the gold or tokenization space.',
    },
    {
      q: 'Is it really free?',
      a: 'Yes, completely free. We may offer premium content in the future, but the weekly newsletter will always be free.',
    },
    {
      q: 'Can I unsubscribe anytime?',
      a: 'Of course. Every email has an unsubscribe link at the bottom. One click and you\'re out.',
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-xl" aria-hidden="true">📧</span>
            <span className="text-yellow-400 text-sm font-medium">Free Weekly Newsletter</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Stay Ahead of the<br />
            <span className="gold-text">Gold Revolution</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join 5,000+ investors, miners, and crypto enthusiasts who receive 
            exclusive insights on tokenized gold every week.
          </p>
        </header>

        {/* Signup Form */}
        <section className="max-w-lg mx-auto mb-16" aria-labelledby="signup-heading">
          <h2 id="signup-heading" className="sr-only">Newsletter Signup</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gold-gradient text-gray-900 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-gray-500 text-sm text-center mt-4">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          ) : (
            <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 text-center" role="alert">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl" aria-hidden="true">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re In!</h3>
              <p className="text-gray-400">
                Check your inbox for a confirmation email. Your first issue arrives this week.
              </p>
            </div>
          )}
        </section>

        {/* What You'll Get */}
        <section className="mb-16" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="text-2xl font-bold text-white text-center mb-8">
            What You&apos;ll Get Every Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📊',
                title: 'Market Analysis',
                description: 'Expert breakdowns of gold prices, tokenized asset movements, and BIV trends.',
              },
              {
                icon: '🔮',
                title: 'Industry Insights',
                description: 'Behind-the-scenes looks at what\'s happening in mining and tokenization.',
              },
              {
                icon: '💡',
                title: 'Exclusive Reports',
                description: 'Research and analysis you won\'t find anywhere else, from industry insiders.',
              },
            ].map((item, i) => (
              <article key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <span className="text-4xl mb-4 block" aria-hidden="true">{item.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-16" aria-labelledby="testimonials-heading">
          <h3 id="testimonials-heading" className="text-lg font-semibold text-white text-center mb-6">
            What Subscribers Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: 'The BIV analysis alone is worth subscribing. Changed how I think about gold investments.',
                author: 'Michael K.',
                role: 'Portfolio Manager',
              },
              {
                quote: 'Finally, someone who actually understands both the mining and crypto sides of this industry.',
                author: 'Sarah L.',
                role: 'Mining Engineer',
              },
            ].map((testimonial, i) => (
              <blockquote key={i} className="border-l-2 border-yellow-500/30 pl-4">
                <p className="text-gray-300 italic mb-3">&quot;{testimonial.quote}&quot;</p>
                <footer className="text-sm">
                  <cite className="not-italic">
                    <span className="text-white font-medium">{testimonial.author}</span>
                    <span className="text-gray-500 ml-2">{testimonial.role}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Sample Issue */}
        <section className="mb-16" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="text-2xl font-bold text-white text-center mb-8">
            Preview: Recent Issue
          </h2>
          <article className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <header className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 border-b border-gray-800">
              <p className="text-gray-500 text-sm mb-2">
                <time dateTime="2026-02-10">Issue #47 • Feb 10, 2026</time>
              </p>
              <h3 className="text-xl font-semibold text-white">
                Why AISC Matters More Than Gold Prices Right Now
              </h3>
            </header>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                This week: All-In Sustaining Costs hit a new record of $1,631/oz across the top 20 miners. 
                We break down what this means for traditional gold investments and why tokenized alternatives 
                are suddenly looking a lot more attractive...
              </p>
              <p className="text-yellow-400 text-sm font-medium">
                Subscribe to read the full issue →
              </p>
            </div>
          </article>
        </section>

        {/* Book CTA */}
        <BookCTA variant="inline" className="mb-8" />

        {/* FAQ */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-white mb-6">Questions?</h2>
          <dl className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <dt className="text-white font-medium mb-2">{faq.q}</dt>
                <dd className="text-gray-400 text-sm">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
