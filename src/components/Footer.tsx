"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isPixelShovelView } from "@/lib/pixelshovel";
import LeadMagnetForm from "@/components/LeadMagnetForm";

// Footer links — only routes that actually exist today (no dead links). Affiliates
// and Mining Industry are surfaced here and in the navbar so they're reachable.
const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Live Stats", href: "/live" },
      { label: "Projects", href: "/projects" },
      { label: "Mining Industry", href: "/mining-industry" },
    ],
  },
  {
    heading: "The Book",
    links: [
      { label: "Free Chapters", href: "/free" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    heading: "Partners",
    links: [{ label: "Affiliate Program", href: "/partners" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  // PixelShovel (/ps) has its own brand footer; /concept-* are internal design
  // previews that bring their own. The standard footer renders on every other page.
  // (The /film and /deposit* exceptions that used to sit here went with those routes: they are
  // archived in web/_archived-routes/.)
  if (isPixelShovelView(pathname) || pathname.startsWith("/concept")) {
    return null;
  }

  // The footer's last ask is suppressed on the pages that already END in this exact ask — two
  // identical forms stacked back-to-back is not a second chance, it's a stutter.
  const showAsk = pathname !== "/free" && pathname !== "/newsletter" && pathname !== "/waitlist";

  return (
    <footer
      className="relative z-10"
      style={{
        background: "var(--bg-contrast-deep)",
        color: "var(--text-on-dark-secondary)",
        borderTop: "1px solid var(--border-on-dark)",
      }}
    >
      {/* THE LAST ASK — the footer used to be the largest block on every page and carried zero
          conversion path: it ended the page and handed the visitor ten exits. A reader who reaches
          the bottom of a long page has read the whole argument and has nowhere to act. */}
      {showAsk && (
        <div style={{ borderBottom: "1px solid var(--border-on-dark)" }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <div>
                <h2
                  className="v2-display"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)", maxWidth: "18ch" }}
                >
                  Read the first five chapters. <span className="v2-gold">Free.</span>
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "var(--v2-dim)", maxWidth: "46ch" }}
                >
                  The opening case, in plain English — sent straight to your inbox.
                </p>
              </div>
              <div className="lm-shell w-full">
                <div className="lm-core">
                  <LeadMagnetForm source="footer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-16 lg:gap-24">
          <div>
            <p
              style={{
                color: "var(--text-on-dark-primary)",
                fontSize: "1.375rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: 16,
              }}
            >
              Digital Gold Boom
            </p>
            <p
              style={{
                color: "var(--text-on-dark-secondary)",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "36ch",
                marginBottom: 24,
              }}
            >
              The complete map of a new asset class.
            </p>
            <p
              className="font-mono"
              style={{ color: "var(--text-on-dark-tertiary)", fontSize: "11px", letterSpacing: "0.02em" }}
            >
              © {new Date().getFullYear()} Andrew Fletcher · Digital Gold Boom™
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p
                  className="font-mono"
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 20,
                  }}
                >
                  {col.heading}
                </p>
                {/* Targets were ~20px tall with 12px between them — a fat thumb hits the wrong
                    link. min-h-[44px] gives each its own honest tap box. */}
                <ul className="-my-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-[44px] items-center transition-colors duration-200"
                        style={{ color: "var(--text-on-dark-secondary)", fontSize: "13.5px" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-on-dark)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
          <p
            style={{
              color: "var(--text-on-dark-tertiary)",
              fontSize: "11px",
              lineHeight: 1.7,
              maxWidth: "80ch",
            }}
          >
            Digital Gold Boom is an educational book about a new asset class. Nothing on this site constitutes financial, investment, or tax advice. Always conduct your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
