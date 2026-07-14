import Link from "next/link";
import Image from "next/image";
import { PS_WORDMARK } from "./psAssets";

const MENU = [
  { label: "Home", href: "/ps" },
  { label: "Digital Gold Boom", href: "/ps#dgb" },
  { label: "Contact", href: "/ps/contact" },
  { label: "Cookie Policy", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function PsFooter() {
  return (
    <footer
      id="contact"
      className="border-t"
      style={{ borderColor: "var(--ps-line)", background: "var(--ps-bg-soft)" }}
    >
      {/* CTA band */}
      <div className="ps-section" style={{ paddingBottom: "clamp(40px,6vw,72px)" }}>
        <div className="ps-wrap flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] text-[clamp(2rem,5vw,4.25rem)]">
            History&rsquo;s Biggest Gold Rush Just Started. Get Informed.
          </h2>
          {/* A PLAIN <a>, not next/link. The App Router does not reliably scroll to a hash when the
              target is on the page you are already standing on — it treats it as a same-route
              navigation and leaves you where you were, which is exactly why this button did
              nothing. The browser's own hash handling has never had that problem. */}
          <a href="/ps#dgb" className="ps-cta shrink-0">
            Get 5 Free Chapters
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="ps-section" style={{ paddingBlock: "clamp(28px,4vw,48px)" }}>
        <div className="ps-wrap grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Image
              src={PS_WORDMARK}
              alt="PixelShovel"
              width={180}
              height={30}
              className="h-7 w-auto self-start"
            />
            <p className="max-w-[28ch] text-sm text-[var(--ps-text-2)]">
              PixelShovel educates, invests and connects in the future of digital gold mining.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="ps-eyebrow">Contact Us</p>
            <p className="text-[var(--ps-text-2)]">Melbourne. Australia.</p>
            <p className="text-[var(--ps-text-2)]">Panama City. Panama.</p>
            <a
              href="mailto:fletcher@digitalgoldboom.com"
              className="text-[var(--ps-text)] underline-offset-4 hover:underline"
            >
              email us here.
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="ps-eyebrow">Menu</p>
            {MENU.map((m) =>
              // Hash targets get a plain <a>: next/link will not scroll to a hash on the page you
              // are already standing on, which is the bug that made these do nothing.
              m.href.includes("#") ? (
                <a
                  key={m.label}
                  href={m.href}
                  className="text-[var(--ps-text-2)] transition-colors hover:text-white"
                >
                  {m.label}
                </a>
              ) : (
                <Link
                  key={m.label}
                  href={m.href}
                  className="text-[var(--ps-text-2)] transition-colors hover:text-white"
                >
                  {m.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="ps-eyebrow">Careers</p>
            <Link href="/ps/contact" className="ps-ghost">
              Join our Team
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="ps-section border-t"
        style={{ borderColor: "var(--ps-line)", paddingBlock: "24px" }}
      >
        <div className="ps-wrap flex flex-col items-center justify-between gap-2 text-sm text-[var(--ps-text-3)] sm:flex-row">
          <p>© 2026 PixelShovel</p>
          <p>An AI-first launch house for digital gold &amp; tokenization.</p>
        </div>
      </div>
    </footer>
  );
}
