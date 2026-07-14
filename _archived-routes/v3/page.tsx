import type { Metadata } from "next";
import V3Funnel from "./V3Funnel";

/**
 * /v3 — the LONG-FORM, VSL-derived sales-funnel page (15 beats). Split-tested against
 * /v1 (long) and /s (short). Root (/) is untouched and still renders /v2.
 *
 * noindex: A/B test variant. ALSO: the copy is a DRAFT (not yet graded / fact-verified —
 * 7 open [VERIFY] flags) and Beat 12 carries the reserved-demand numbers in compliant
 * framing — keep out of search until reviewed and approved.
 */
export const metadata: Metadata = {
  title: "Digital Gold Boom — It's not gold. It's not bitcoin.",
  description:
    "Twenty-two trillion dollars of gold has already been found, sitting in the ground. For six thousand years there was one way to reach it. This book is about the other way. By Andrew Fletcher.",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return <V3Funnel />;
}
