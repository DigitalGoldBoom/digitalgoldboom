'use client';

import Link from 'next/link';
import { useState } from 'react';
import NewsletterForm from './NewsletterForm';

const footerLinks = {
  explore: [
    { name: 'Home', href: '/' },
    { name: 'Prices', href: '/prices' },
    { name: 'News', href: '/news' },
    { name: 'Book', href: '/book' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'About', href: '/about' },
  ],
  resources: [
    { name: 'What is PAXG?', href: '/news/paxg-vs-xaut-comparison' },
    { name: 'What is BIV?', href: '/prices#biv' },
    { name: 'Gold vs. Digital Gold', href: '/news/traditional-mining-obsolete' },
    { name: 'S.P.I.R.A.L. Thesis', href: '/book' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] mt-20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Stay Updated
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Get weekly insights on digital gold and tokenization.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                <span className="text-[var(--text-inverse)] font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">
                <span className="gold-text">Digital Gold</span>
                <span className="text-[var(--text-tertiary)] font-normal ml-1">Boom</span>
              </span>
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm mb-4 leading-relaxed">
              Making sense of tokenized gold since 2026.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/digitalgoldboom" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors text-lg"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a 
                href="mailto:hello@digitalgoldboom.com"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-overline mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-overline mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-overline mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-tertiary)] text-sm">
            © 2026 Digital Gold Boom. Not financial advice. Do your own research.
          </p>
          <p className="text-[var(--text-disabled)] text-xs">
            A PixelShovel Production
          </p>
        </div>
      </div>
    </footer>
  );
}
