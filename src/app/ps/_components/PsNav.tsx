"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PS_WORDMARK } from "./psAssets";

/**
 * PsNav — PixelShovel top bar (clone of the Framer "Top Nav").
 * Logo left · centred translucent pill of links · "Get Digital Gold Boom Free"
 * pill CTA right. Collapses to a hamburger drawer on tablet / phone.
 */

const LINKS = [
  { label: "Home", href: "/ps" },
  { label: "Get Digital Gold Boom", href: "/ps#dgb" },
  { label: "About", href: "/ps#about" },
  { label: "Contact", href: "/ps#contact" },
];

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
      <div className="mx-auto flex w-[94%] max-w-[1320px] items-center justify-between gap-4 py-4">
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
            <Link
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ps-text-2)] transition-colors duration-200 hover:bg-white/8 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA (wrapper hides it on mobile — .ps-cta forces its own display) */}
        <div className="pointer-events-auto hidden lg:block">
          <Link href="/ps#dgb" className="ps-cta">
            Get Digital Gold Boom Free
          </Link>
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
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[var(--ps-text-2)] hover:bg-white/8 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/ps#dgb"
              onClick={() => setOpen(false)}
              className="ps-cta mt-2 justify-center"
            >
              Get Digital Gold Boom Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
