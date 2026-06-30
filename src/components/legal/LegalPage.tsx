import Footer from "@/components/Footer";
import VaultShell from "@/components/VaultShell";
import { LEGAL } from "@/lib/legal";

export type LegalBlock = {
  h: string;
  p?: string[];
  ul?: string[];
};

/**
 * Shared chrome + typographic rhythm for the legal pages (Privacy / Terms / Disclaimer). Keeps them
 * on-brand (VaultShell dark theme, token colors) and consistent. Content is passed as structured
 * blocks so each page stays just data. A `note` renders a highlighted callout (used for the
 * not-a-lawyer / confirm-before-launch flags).
 */
export default function LegalPage({
  title,
  intro,
  blocks,
  note,
}: {
  title: string;
  intro?: string;
  blocks: LegalBlock[];
  note?: string;
}) {
  return (
    <VaultShell>
      <section className="pt-32 pb-12 md:pt-36 md:pb-14" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[760px] px-6">
          <p className="eyebrow mb-4">Legal</p>
          <h1
            className="font-extrabold tracking-[-0.03em] leading-[1.1]"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
            Last updated: {LEGAL.lastUpdated}
          </p>
          {intro ? (
            <p className="mt-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {intro}
            </p>
          ) : null}
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[760px] px-6">
          {note ? (
            <div
              className="mb-10 rounded-[var(--r-lg)] border p-5 text-sm leading-relaxed"
              style={{ borderColor: "var(--border-gold)", background: "var(--accent-gold-wash)", color: "var(--text-secondary)" }}
            >
              {note}
            </div>
          ) : null}

          <div className="space-y-9">
            {blocks.map((b, i) => (
              <div key={b.h}>
                <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  <span className="mr-2 font-mono text-sm" style={{ color: "var(--accent-gold)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {b.h}
                </h2>
                {b.p?.map((para, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {para}
                  </p>
                ))}
                {b.ul ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {b.ul.map((li, k) => (
                      <li key={k}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm" style={{ color: "var(--text-tertiary)" }}>
            Questions about this page? Contact us at{" "}
            <a href={`mailto:${LEGAL.contactEmail}`} style={{ color: "var(--accent-gold)" }}>
              {LEGAL.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </VaultShell>
  );
}
