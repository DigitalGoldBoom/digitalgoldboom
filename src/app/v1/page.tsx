import type { Metadata } from "next";
import V1Funnel from "./V1Funnel";

/**
 * /v1 — the LONG sales-funnel page for the $37 book (full sales arc).
 * Split-tested against /s. Root (/) is untouched and still renders /v2.
 *
 * noindex: this is an A/B test variant, not the canonical homepage — keep it out of
 * search so it doesn't compete with / for duplicate content. Flip to index only if it
 * is ever promoted to root (author decision).
 */
export const metadata: Metadata = {
  title: "Digital Gold Boom — It's not gold. It's not bitcoin.",
  description:
    "A plain-English account of the shift underway in how the world's oldest asset works — independently verified gold, represented digitally without mining it out. The $37 book, by Andrew Fletcher.",
  robots: { index: false, follow: false },
};

export default function V1Page() {
  return <V1Funnel />;
}
