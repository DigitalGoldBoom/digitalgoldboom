"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Production URL for the natgold-token Vercel project.
// Clean global alias — auto-updated by Vercel to the latest main-branch deploy.
const TOKEN_APP_BASE = "https://natgold-token.vercel.app";
const TOKEN_URL = `${TOKEN_APP_BASE}/dashboard`;
const DEPOSITS_URL = `${TOKEN_APP_BASE}/cahuilla`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{
        background: scrolled ? "rgba(250, 250, 249, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-base)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between h-[72px] gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-tp"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Digital Gold Boom
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href={TOKEN_URL}
            className="hidden sm:inline-flex items-center rounded-full border border-[color:var(--border-base)] hover:border-[color:var(--ink-primary)] transition-colors"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            Token
          </Link>
          <Link
            href={DEPOSITS_URL}
            className="hidden sm:inline-flex items-center rounded-full border border-[color:var(--border-base)] hover:border-[color:var(--ink-primary)] transition-colors"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            Gold Deposits
          </Link>
          <Link
            href="#join"
            className="btn-primary"
            style={{ fontSize: "13px", padding: "10px 22px" }}
          >
            Join the waitlist →
          </Link>
        </div>
      </div>
    </nav>
  );
}
