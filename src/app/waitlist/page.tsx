import type { Metadata } from "next";
import Link from "next/link";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Join the Waitlist — Digital Gold Boom",
  description:
    "Be first to know when the full Digital Gold Boom is ready. Join the waitlist for early access and plain-English updates on the digital gold industry. The first five chapters are free to read now.",
  path: "waitlist",
});

const POINTS = [
  "Be first to know the moment the complete book is ready.",
  "Early access before it opens to everyone.",
  "Occasional plain-English updates on the digital gold industry — no noise.",
];

export default function WaitlistPage() {
  return (
    <div className="v2 dgb-vault-bg relative overflow-clip">
      <main className="relative z-10">
        <section className="min-h-[100svh] flex items-center">
          <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              <div>
                <p className="v2-eyebrow mb-6">The full book</p>
                <h1 className="v2-display" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
                  Be first when the <span className="v2-gold">full book</span> drops.
                </h1>
                <p
                  className="mt-6 text-xl leading-relaxed"
                  style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}
                >
                  <span style={{ color: "#F4F4F7" }}>Digital Gold Boom</span> by Andrew Fletcher is the
                  whole story of digital gold mining, start to finish. Join the waitlist and you&rsquo;ll
                  be first in line — with early access before it opens to everyone.
                </p>

                <div className="mt-8 max-w-[620px]">
                  <LeadMagnetForm mode="waitlist" source="waitlist_page" />
                </div>

                <ul className="mt-10 space-y-3">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="v2-gold mt-1" aria-hidden>
                        ✦
                      </span>
                      <span style={{ color: "var(--v2-dim)" }}>{p}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm" style={{ color: "var(--v2-faint)" }}>
                  Can&rsquo;t wait?{" "}
                  <Link href="/free" className="v2-gold" style={{ textDecoration: "underline" }}>
                    Read the first 5 chapters free
                  </Link>{" "}
                  right now.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end order-first lg:order-none">
                <Book3D />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
