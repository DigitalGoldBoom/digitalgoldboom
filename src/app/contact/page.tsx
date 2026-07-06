import type { Metadata } from "next";
import Link from "next/link";
import VaultShell from "@/components/VaultShell";

const CONTACT_EMAIL = "fletcher@digitalgoldboom.com";

export const metadata: Metadata = {
  title: "Contact — Digital Gold Boom",
  description:
    "Get in touch about Digital Gold Boom — questions about the book, your order, refunds, or the affiliate program.",
};

export default function ContactPage() {
  return (
    <VaultShell>
      <main className="pt-32 pb-24" style={{ minHeight: "70vh" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div
            aria-hidden
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--accent-gold-wash)", color: "var(--accent-gold)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="m3.5 7 8.5 6 8.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Get in touch.
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            Questions about the book, your order, a refund, or the affiliate program? Email us
            directly and a real person will get back to you — usually within one business day.
          </p>

          <div
            className="rounded-2xl p-6 mb-8"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-base)" }}
          >
            <p className="text-sm mb-2" style={{ color: "var(--text-tertiary)" }}>
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xl font-semibold break-words"
              style={{ color: "var(--accent-gold)" }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
              Send an email
            </a>
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
          </div>

          <p className="mt-10 text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Already bought the book and didn&rsquo;t get your download link? Check your spam or
            promotions folder for the receipt from LemonSqueezy first — then email us and
            we&rsquo;ll sort it out.
          </p>
        </div>
      </main>
    </VaultShell>
  );
}
