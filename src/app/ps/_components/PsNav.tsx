"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PS_WORDMARK } from "./psAssets";

/**
 * PsNav — PixelShovel top bar (clone of the Framer "Top Nav").
 * Logo left · centred translucent pill of links · "Get 5 Free Chapters"
 * pill CTA right. Collapses to a hamburger drawer on tablet / phone.
 */

// No "Home": the wordmark to its left already goes home, and a nav that spends a slot repeating
// the logo is a nav that has nothing to say.
const LINKS = [
  { label: "Digital Gold Boom", href: "/ps#dgb" },
  { label: "Contact", href: "/ps/contact" },
];

/**
 * Any link carrying a #hash renders as a PLAIN <a>, never next/link.
 *
 * The App Router does not reliably scroll to a hash when the target is on the page you are already
 * standing on: it treats it as a same-route navigation and leaves you exactly where you were. That
 * is why "Get 5 Free Chapters" did nothing when clicked from the bottom of /ps. The browser's own
 * hash handling has never had that problem. Real route changes (Contact) keep next/link and its
 * prefetching.
 */
function NavItem({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function PsNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Translucent strip — invisible over the hero, fades in once the page scrolls under it, so
          the white wordmark never has to sit on whatever content happens to be passing beneath.
          Same behaviour as the Digital Gold Boom navbar. */}
      <div
        aria-hidden
        className="nav-blur pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: scrolled ? 1 : 0,
          background: "rgba(10,11,10,0.72)",
          borderBottom: "1px solid var(--ps-line)",
        }}
      />

      <div className="relative mx-auto flex w-[94%] max-w-[1320px] items-center justify-between gap-4 py-4">
        {/* Logo */}
        <Link
          href="/ps"
          aria-label="PixelShovel — home"
          className="pointer-events-auto shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src={PS_WORDMARK}
            alt="PixelShovel"
            width={168}
            height={28}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* Desktop links pill */}
        <nav
          className="pointer-events-auto hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md lg:flex"
          style={{
            background: scrolled ? "rgba(17,19,17,0.7)" : "rgba(17,19,17,0.45)",
            borderColor: "var(--ps-line)",
            transition: "background var(--ps-dur) var(--ps-ease)",
          }}
        >
          {LINKS.map((l) => (
            <NavItem
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ps-text-2)] transition-colors duration-200 hover:bg-white/8 hover:text-white"
            >
              {l.label}
            </NavItem>
          ))}
        </nav>

        {/* Desktop CTA (wrapper hides it on mobile — .ps-cta forces its own display) */}
        <div className="pointer-events-auto hidden lg:block">
          <NavItem href="/ps#dgb" className="ps-cta">
            Get 5 Free Chapters
          </NavItem>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ps-burger pointer-events-auto"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto mx-auto w-[94%] max-w-[1320px] lg:hidden">
          <nav
            className="flex flex-col gap-1 rounded-3xl border p-3 backdrop-blur-xl"
            style={{ background: "rgba(10,11,10,0.92)", borderColor: "var(--ps-line)" }}
          >
            {LINKS.map((l) => (
              <NavItem
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[var(--ps-text-2)] hover:bg-white/8 hover:text-white"
              >
                {l.label}
              </NavItem>
            ))}
            <NavItem
              href="/ps#dgb"
              onClick={() => setOpen(false)}
              className="ps-cta mt-2 justify-center"
            >
              Get 5 Free Chapters
            </NavItem>
          </nav>
        </div>
      )}
    </header>
  );
}
