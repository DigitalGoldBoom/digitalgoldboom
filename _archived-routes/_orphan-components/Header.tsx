'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Prices', href: '/prices' },
  { name: 'Live', href: '/live' },
  { name: 'News', href: '/news' },
  { name: 'Book', href: '/book' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)]' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-[var(--text-inverse)] font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="gold-text">Digital Gold</span>
              <span className="text-[var(--text-tertiary)] font-normal ml-1">Boom</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-[15px] font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/book"
              className="btn btn-primary btn-sm hidden sm:flex"
            >
              Get the Free Book →
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] animate-fadeIn"
          >
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 px-4 pb-2">
                <Link
                  href="/book"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get the Free Book →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
