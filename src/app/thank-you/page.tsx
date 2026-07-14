import type { Metadata } from "next";
import Link from "next/link";
import VaultShell from "@/components/VaultShell";

export const metadata: Metadata = {
  title: "Thank you — Digital Gold Boom",
  description: "Your purchase is complete. Your download link and receipt are on the way by email.",
  // Order/confirmation pages should never be indexed.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
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
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            You&rsquo;re in. Thank you.
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            Your payment went through and <strong>Digital Gold Boom</strong>{" "}is on its way. Check your
            email for your download link (PDF, EPUB and Kindle) and your receipt.
          </p>

          <div
            className="text-left rounded-2xl p-6 mb-8"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-base)" }}
          >
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Didn&rsquo;t get the email?</strong>
            </p>
            <ul className="text-sm space-y-2" style={{ color: "var(--text-tertiary)" }}>
              <li>• Give it a couple of minutes — it&rsquo;s usually instant.</li>
              <li>• Check your spam / promotions folder for the receipt from LemonSqueezy.</li>
              <li>
                • Still nothing? Email{" "}
                <a href="mailto:fletcher@digitalgoldboom.com" style={{ color: "var(--accent-gold)" }}>
                  fletcher@digitalgoldboom.com
                </a>{" "}
                and we&rsquo;ll sort it out.
              </li>
            </ul>
          </div>

          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </main>
    </VaultShell>
  );
}
