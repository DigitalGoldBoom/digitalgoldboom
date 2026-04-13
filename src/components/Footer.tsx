import Link from "next/link";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "BOOK",
    links: [
      { label: "Overview", href: "#playbook" },
      { label: "Chapter Previews", href: "/previews" },
      { label: "Press Kit", href: "/press-kit" },
      { label: "Waitlist", href: "#playbook" },
    ],
  },
  {
    heading: "RESEARCH",
    links: [
      { label: "Pipeline Scorecards", href: "/pipeline" },
      { label: "NatGold Model", href: "/model" },
      { label: "Methodology", href: "/methodology" },
      { label: "Sources", href: "/sources" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "Author", href: "/author" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "LEGAL",
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
      className="relative z-10 mt-32 border-t border-white/10"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-16 lg:gap-24">
          <div>
            <p className="text-white font-extrabold tracking-tight text-2xl mb-4">
              Digital Gold Boom
            </p>
            <p
              className="leading-[1.7] mb-6 max-w-[36ch]"
              style={{ color: "#C6C6CC", fontSize: "14px" }}
            >
              The complete map of a new asset class. Not a pitch.
            </p>
            <p style={{ color: "#9A9AA0", fontSize: "11px" }}>
              © {new Date().getFullYear()} Andrew Fletcher. Digital Gold Boom™.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p
                  className="font-semibold mb-5"
                  style={{ color: "#D4A843", fontSize: "10px", letterSpacing: "0.22em" }}
                >
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors duration-300 block"
                        style={{ color: "#C6C6CC", fontSize: "13px" }}
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

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
          <p
            className="leading-[1.7] max-w-[80ch]"
            style={{ color: "#9A9AA0", fontSize: "11px" }}
          >
            Digital Gold Boom is an educational book about a new asset class.
            Nothing on this site constitutes financial, investment, or tax
            advice. Always conduct your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
