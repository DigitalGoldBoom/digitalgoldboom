import type { Metadata } from "next";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Read the First 5 Chapters Free — Digital Gold Boom",
  description:
    "Start reading Digital Gold Boom free. The first five chapters — the plain-English opening on gold, why the old way of producing it is breaking down, and the shift almost no one has noticed. Sent straight to your inbox.",
  path: "free",
});

const POINTS = [
  "What gold really is — and why central banks are quietly moving back onto it.",
  "Why the six-thousand-year-old way of producing gold is finally breaking down.",
  "Where gold's value actually comes from — and the part everyone assumed couldn't change.",
  "The reframe: gold mining already runs on verification, not just extraction.",
  "The model that reaches $22 trillion of already-verified gold — in plain English.",
];

export default function FreeChaptersPage() {
  return (
    <div className="v2 dgb-vault-bg relative overflow-clip">
      <main className="relative z-10">
        <section className="min-h-[100svh] flex items-center">
          <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              <div>
                <p className="v2-eyebrow mb-6">Free preview · No payment</p>
                <h1 className="v2-display" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
                  Read the first <span className="v2-gold">5 chapters</span> free.
                </h1>
                <p
                  className="mt-6 text-xl leading-relaxed"
                  style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}
                >
                  The plain-English opening of <span style={{ color: "#F4F4F7" }}>Digital Gold Boom</span> by
                  Andrew Fletcher — former President &amp; CEO of Great Eagle Gold, now NatBridge
                  Resources. Enter your email, confirm it with one click, and the chapters are yours —
                  and you&rsquo;re first in line when the full book is ready.
                </p>

                {/* Same enclosure as the home opt-in: the form is the one thing on the page that
                    is acted on, so it is the one thing that gets a container. */}
                <div className="lm-shell mt-8 max-w-[520px]">
                  <div className="lm-core">
                    <LeadMagnetForm source="free_page" />
                  </div>
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
