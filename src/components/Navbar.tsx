"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isPixelShovelView } from "@/lib/pixelshovel";
import { CHAPTERS_LIVE } from "@/lib/flags";

/**
 * Navbar — replica of the Digital Gold Boom Framer navbar.
 * Layout: PixelShovel wordmark (left), centered translucent pill of nav links,
 * blue-gradient "Contact Us" CTA (right). Links highlight (pill fill) on hover
 * and on the current page. Collapses to a hamburger dropdown on tablet/mobile.
 */

// "Chapters" is built but not announced: it appears here only when CHAPTERS_LIVE is switched on
// (src/lib/flags.ts). Until then /chapters is reachable by direct link and nothing else.
// "The Book" points at /buy — the product page, with /checkout behind it.
//
// It is here because a purchase path that cannot be NAVIGATED to does not exist. The payment
// processor reviewing this store follows the site the way a customer would: front door, nav, product,
// checkout. Handing a reviewer a direct URL proves nothing about the flow, and a product page linked
// from nowhere reads as one built for the review rather than for customers. It is also simply true
// that anyone who already wants the book should never have to hunt for the price.
const LINKS = [
  ...(CHAPTERS_LIVE ? [{ label: "Chapters", href: "/chapters" }] : []),
  { label: "The Book", href: "/buy" },
  { label: "Projects", href: "/projects" },
  { label: "Mining", href: "/mining-industry" },
  { label: "Live Stats", href: "/live" },
];

// Sourced from the v2 token set (globals.css) rather than four loose hexes, so the nav can never
// drift away from the rest of the site's gold.
const CTA_GRADIENT =
  "linear-gradient(180deg, color-mix(in srgb, var(--v2-gold) 92%, white) 0%, color-mix(in srgb, var(--v2-gold) 78%, black) 100%)";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // PixelShovel is a separate site (pixelshovel.com) living under /ps with its own nav — never
  // show the Digital Gold Boom navbar there. (The /film and /deposit* exceptions that used to sit
  // here went with those routes: they are archived in web/_archived-routes/.)
  const isPixelShovel = isPixelShovelView(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // min-h-[44px] + grid place-items-center: the tap box clears the 44px floor without the label
  // growing. Under that, a thumb misses — and on a phone the nav is nearly all thumb.
  const linkClass = (active: boolean) =>
    [
      "grid min-h-[44px] place-items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-200",
      active
        ? "bg-[var(--v2-surface-2,rgba(255,255,255,0.08))] text-white"
        : "text-[var(--v2-faint)] hover:bg-[var(--v2-surface-2,rgba(255,255,255,0.08))] hover:text-white",
    ].join(" ");

  if (isPixelShovel) return null;

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Translucent black strip — only appears on scroll, keeps the white logo legible over light sections */}
      <div
        aria-hidden
        className="nav-blur pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: scrolled ? 1 : 0,
          background: "rgba(0,2,12,0.65)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      <div className="pointer-events-auto relative mx-auto flex w-[92%] max-w-[1320px] items-center justify-between gap-4 py-[10px] lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Left — PixelShovel wordmark. Steps down on phone so the CTA has room to live in the
            top bar beside it (see below) rather than being exiled into the hamburger. */}
        <Link href="/" className="shrink-0 lg:justify-self-start" aria-label="Digital Gold Boom — home">
          <Image
            src="/nav-framer/logo-wordmark.png"
            alt="PixelShovel"
            // The wordmark art is 4200×700 — a true 6:1. The box must hold that ratio or the
            // letterforms squash (it was 4.5:1 against the older, padded export).
            width={240}
            height={40}
            priority
            className="h-7 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        {/* Center — pill of nav links. Desktop only: on a phone the BROWSE links are what
            collapses into the hamburger. Never the ask. */}
        <div
          className="nav-blur-strong hidden items-center gap-1 rounded-full p-1.5 lg:flex lg:justify-self-center"
          style={{ background: "rgba(10,13,31,0.8)" }}
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right — the ask, then the menu.
            The CTA used to be `hidden … lg:inline-flex`, so the site's ONE conversion action did
            not render at all below 1024px — i.e. on every phone and every tablet, which is most of
            the traffic. It now renders at every width; the label shortens on phone so the bar fits
            at 320px. This was the single most expensive line of code on the site. */}
        <div className="flex shrink-0 items-center gap-2 lg:justify-self-end">
          <Link
            href="/free"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 text-[13px] font-semibold text-[#0A0A0F] transition-opacity hover:opacity-90 sm:px-5 sm:text-sm lg:px-[20px]"
            style={{ background: CTA_GRADIENT }}
          >
            <span className="sm:hidden">Free chapters</span>
            <span className="hidden sm:inline">Free Chapters</span>
          </Link>

          {/* Hamburger — tablet / mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
            className="nav-blur-strong grid h-[44px] w-[44px] place-items-center rounded-full text-white transition-colors lg:hidden"
            style={{ background: "rgba(10,13,31,0.8)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / tablet dropdown */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-3 flex w-[92%] max-w-[1320px] justify-end lg:hidden">
          {/* Browse links only. The CTA is no longer duplicated in here — it lives in the top bar
              at every width now, so repeating it would be a second copy of the same ask. */}
          <div className="flex w-[230px] flex-col gap-1.5 rounded-2xl p-3" style={{ background: "rgb(10,13,31)" }}>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={linkClass(isActive(l.href))}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
