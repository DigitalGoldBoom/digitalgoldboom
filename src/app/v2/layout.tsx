import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Gold Boom — v2 (preview)",
  description: "Bold redesign preview.",
  // Private preview — keep it out of search.
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
