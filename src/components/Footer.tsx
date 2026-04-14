import Link from "next/link";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Book",
    links: [
      { label: "Overview", href: "#playbook" },
      { label: "Chapter Previews", href: "/previews" },
      { label: "Press Kit", href: "/press-kit" },
      { label: "Waitlist", href: "#playbook" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Pipeline Scorecards", href: "/pipeline" },
      { label: "NatGold Model", href: "/model" },
      { label: "Methodology", href: "/methodology" },
      { label: "Sources", href: "/sources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Author", href: "/author" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "var(--bg-contrast-deep)",
        color: "var(--text-on-dark-secondary)",
        borderTop: "1px solid var(--border-on-dark)",
      }}
    >
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
              The complete map of a new asset class. Not a pitch.
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
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block transition-colors duration-200"
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
