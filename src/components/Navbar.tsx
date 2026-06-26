"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Navbar — replica of the Digital Gold Boom Framer navbar.
 * Layout: PixelShovel wordmark (left), centered translucent pill of nav links,
 * blue-gradient "Contact Us" CTA (right). Links highlight (pill fill) on hover
 * and on the current page. Collapses to a hamburger dropdown on tablet/mobile.
 */

const LINKS = [
  { label: "Digital Gold Boom", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Live Stats", href: "/live" },
  { label: "Waitlist", href: "/waitlist" },
];

const CTA_GRADIENT = "linear-gradient(180deg, #4D76FF 0%, #003BFF 100%)";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    [
      "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
      active
        ? "bg-[#131839] text-white"
        : "text-[#6d7792] hover:bg-[#131839] hover:text-white",
    ].join(" ");

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-5 sm:pt-[30px]">
      <div className="pointer-events-auto mx-auto flex w-[92%] max-w-[1320px] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Left — PixelShovel wordmark */}
        <Link href="/" className="shrink-0 lg:justify-self-start" aria-label="Digital Gold Boom — home">
          <Image
            src="/nav-framer/logo-wordmark.png"
            alt="PixelShovel"
            width={180}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Center — pill of nav links */}
        <div
          className="flex items-center gap-1 rounded-full p-1.5 lg:justify-self-center"
          style={{
            background: "rgba(10,13,31,0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
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

        {/* Right — Contact CTA */}
        <Link
          href="/contact"
          className="hidden items-center whitespace-nowrap rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-flex lg:justify-self-end"
          style={{ padding: "13px 20px", background: CTA_GRADIENT }}
        >
          Contact Us
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
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ padding: "12px 18px", background: CTA_GRADIENT }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
