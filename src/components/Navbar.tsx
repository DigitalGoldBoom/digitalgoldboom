"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Navbar — replica of the Digital Gold Boom Framer navbar.
 * Left: white wordmark. Right: translucent pill (PixelShovel logo + nav links)
 * and a blue-gradient "Contact Us" CTA. Collapses to a hamburger dropdown on
 * tablet / all mobile widths (< lg). Links use the exact Framer hrefs.
 */

const LINKS = [
  { label: "Digital Gold Boom", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Live Stats", href: "/live" },
  { label: "Waitlist", href: "/waitlist" },
];

const CTA_GRADIENT = "linear-gradient(180deg, #4D76FF 0%, #003BFF 100%)";
const INACTIVE = "rgb(109,119,146)";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-5 sm:pt-[30px]">
      <div className="pointer-events-auto mx-auto flex w-[92%] max-w-[1320px] items-center justify-between gap-4">
        {/* Left wordmark */}
        <Link href="/" className="shrink-0" aria-label="Digital Gold Boom — home">
          <Image
            src="/nav-framer/logo-wordmark.png"
            alt="Digital Gold Boom"
            width={180}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 rounded-full p-2 lg:gap-4 lg:pr-6"
            style={{
              background: "rgba(10,13,31,0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Image
              src="/nav-framer/logo-pixelshovel.svg"
              alt="PixelShovel"
              width={97}
              height={33}
              className="mx-1 h-[26px] w-auto sm:h-[31px]"
            />

            {/* Desktop links */}
            <div className="hidden items-center lg:flex">
              {LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium transition-colors hover:text-white"
                    style={{
                      background: active ? "rgb(19,24,57)" : "transparent",
                      color: active ? "#fff" : INACTIVE,
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {/* Hamburger — tablet / mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex items-center justify-center rounded-full px-4 py-3 lg:hidden"
              style={{ background: "rgb(14,18,46)" }}
            >
              <Image src="/nav-framer/menu.svg" alt="" width={24} height={24} className="h-6 w-6" />
            </button>
          </div>

          {/* Contact CTA — desktop */}
          <Link
            href="/contact"
            className="hidden items-center whitespace-nowrap rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-flex"
            style={{ padding: "14px 20px", background: CTA_GRADIENT }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile / tablet dropdown */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-3 flex w-[92%] max-w-[1320px] justify-end lg:hidden">
          <div
            className="flex w-[230px] flex-col gap-4 rounded-2xl p-5"
            style={{ background: "rgb(10,13,31)" }}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium transition-colors hover:text-white"
                style={{ color: isActive(l.href) ? "#fff" : INACTIVE }}
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
