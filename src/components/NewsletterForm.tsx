'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  variant?: 'inline' | 'stacked' | 'sidebar';
  className?: string;
}

export default function NewsletterForm({ variant = 'stacked', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Integrate with Beehiiv API
    // POST to /api/newsletter with { email }
    // For now, simulate success
    setTimeout(() => {
      console.log('Newsletter signup:', email);
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className={`bg-[var(--success-muted)] border border-[var(--success)]/30 rounded-lg p-4 text-center ${className}`}>
        <p className="text-[var(--success)] font-medium">You&apos;re in! Check your inbox.</p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-0 ${className}`}>
        <label htmlFor="newsletter-email-inline" className="sr-only">Email address</label>
        <input
          type="email"
          id="newsletter-email-inline"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className="input flex-1 rounded-r-none border-r-0 focus:z-10"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary rounded-l-none whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending...' : 'Subscribe'}
        </button>
      </form>
    );
  }

  if (variant === 'sidebar') {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <p className="text-[var(--text-primary)] font-semibold text-sm">5-Minute Gold Briefing</p>
        <p className="text-[var(--text-tertiary)] text-xs">What moved. Why it matters. Every weekday.</p>
        <label htmlFor="newsletter-email-sidebar" className="sr-only">Email address</label>
        <input
          type="email"
          id="newsletter-email-sidebar"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          disabled={status === 'loading'}
          className="input text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary w-full text-sm"
        >
          {status === 'loading' ? 'Sending...' : 'Send It To Me →'}
        </button>
      </form>
    );
  }

  // Default stacked variant
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="newsletter-email-stacked" className="block text-[var(--text-primary)] font-medium mb-2 text-sm">
          Email Address
        </label>
        <input
          type="email"
          id="newsletter-email-stacked"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          className="input"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full"
      >
        {status === 'loading' ? 'Sending...' : 'Start My Free Subscription'}
      </button>
      <p className="text-[var(--text-tertiary)] text-xs text-center">
        Unsubscribe anytime. We send what we&apos;d want to read.
      </p>
    </form>
  );
}
