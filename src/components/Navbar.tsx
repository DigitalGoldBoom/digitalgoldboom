"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-tp font-bold text-lg md:text-xl tracking-tight">
            Digital Gold Boom
          </span>
        </Link>

        <Link
          href="#playbook"
          className="text-xs md:text-sm font-semibold border border-border text-tp rounded-lg px-4 md:px-6 py-2 md:py-2.5 hover:border-border-hover hover:bg-surface-active/40 transition-all duration-300 active:scale-[0.98]"
        >
          Join the waitlist
        </Link>
      </div>
    </nav>
  );
}
