'use client';

import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';

interface NewsletterFormProps {
  variant?: 'inline' | 'stacked' | 'sidebar';
  className?: string;
  /** Where on the site this form lives — tags the subscriber by origin. */
  source?: string;
}

export default function NewsletterForm({
  variant = 'stacked',
  className = '',
  source = 'newsletter',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Real capture: POST to the existing /api/subscribe route (zod-validated, talks to Kit,
  // logs a waitlist line when no key is set). Mirrors Hero.tsx — set status from the REAL
  // response (never fake success on a non-2xx) and track() only after a confirmed 200.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus('error');
        setMessage(data.message ?? 'Something went wrong. Try again.');
        return;
      }
      track('newsletter_email_submit', { source });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-[var(--success-muted)] border border-[var(--success)]/30 rounded-lg p-4 text-center ${className}`}>
        <p className="text-[var(--success)] font-medium">You&apos;re in! Check your inbox to confirm.</p>
      </div>
    );
  }

  const errorLine = status === 'error' && (
    <p role="status" aria-live="polite" className="text-[#ff6b6b] text-xs">
      {message}
    </p>
  );

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
        <div className="flex gap-0">
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
        </div>
        {errorLine}
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
        {errorLine}
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
      {errorLine}
      <p className="text-[var(--text-tertiary)] text-xs text-center">
        Unsubscribe anytime. We send what we&apos;d want to read.
      </p>
    </form>
  );
}
