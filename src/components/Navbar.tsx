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
const LINKS = [
  ...(CHAPTERS_LIVE ? [{ label: "Chapters", href: "/chapters" }] : []),
  { label: "Projects", href: "/projects" },
  { label: "Mining", href: "/mining-industry" },
  { label: "Live Stats", href: "/live" },
];

const CTA_GRADIENT = "linear-gradient(180deg, #F0BE47 0%, #C99214 100%)";

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

  const linkClass = (active: boolean) =>
    [
      "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
      active
        ? "bg-[#131839] text-white"
        : "text-[#6d7792] hover:bg-[#131839] hover:text-white",
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
        {/* Left — PixelShovel wordmark */}
        <Link href="/" className="shrink-0 lg:justify-self-start" aria-label="Digital Gold Boom — home">
          <Image
            src="/nav-framer/logo-wordmark.png"
            alt="PixelShovel"
            // The wordmark art is 4200×700 — a true 6:1. The box must hold that ratio or the
            // letterforms squash (it was 4.5:1 against the older, padded export).
            width={240}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Center — pill of nav links */}
        <div
          className="nav-blur-strong flex items-center gap-1 rounded-full p-1.5 lg:justify-self-center"
          style={{
            background: "rgba(10,13,31,0.8)",
          }}
        >
          <div className="hidden items-center lg:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — tablet / mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex items-center justify-center rounded-full px-4 py-3 text-white transition-colors hover:bg-[#131839] lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Right — free-chapters CTA */}
        <Link
          href="/free"
          className="hidden items-center whitespace-nowrap rounded-full text-sm font-semibold text-[#0A0A0F] transition-opacity hover:opacity-90 lg:inline-flex lg:justify-self-end"
          style={{ padding: "13px 20px", background: CTA_GRADIENT }}
        >
          Free Chapters
        </Link>
      </div>

      {/* Mobile / tablet dropdown */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-3 flex w-[92%] max-w-[1320px] justify-end lg:hidden">
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
            <Link
              href="/free"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-full text-sm font-semibold text-[#0A0A0F]"
              style={{ padding: "12px 18px", background: CTA_GRADIENT }}
            >
              Free Chapters
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
