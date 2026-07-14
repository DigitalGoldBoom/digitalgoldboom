import type { Metadata } from "next";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { FREE_CHAPTERS } from "@/lib/chapters";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Read the First 5 Chapters Free — Digital Gold Boom",
  description:
    "Start reading Digital Gold Boom free. The first five chapters — the plain-English opening on gold, why the old way of producing it is breaking down, and the shift almost no one has noticed. Sent straight to your inbox.",
  path: "/free",
});

// The five chapters come from src/lib/chapters.ts — the same source the home page reads, with the
// chapters' real titles and the author's own one-line case for each (book, Ch 8). The invented
// blurbs that used to sit here described a book that does not exist.

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
                {/* Was one 44-word sentence that opened on a book title, detoured through the
                    author's CV, and only then said what to do — and it rendered "Digital Gold
                    Boomby Andrew" because JSX ate the space at the line break. The offer comes
                    first now, the credential stands on its own line, and the mechanics are one
                    short sentence. */}
                <p
                  className="mt-6 text-xl leading-relaxed"
                  style={{ color: "var(--v2-dim)", maxWidth: "48ch" }}
                >
                  The opening of the book, in plain English. Enter your email, click the confirm link
                  we send, and the chapters are yours.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "48ch" }}>
                  By <span style={{ color: "var(--v2-dim)" }}>Andrew Fletcher</span> — former President
                  &amp; CEO of Great Eagle Gold, now NatBridge Resources.
                </p>

                {/* Same enclosure as the home opt-in: the form is the one thing on the page that
                    is acted on, so it is the one thing that gets a container. */}
                <div className="lm-shell mt-8 max-w-[520px]">
                  <div className="lm-core">
                    <LeadMagnetForm source="free_page" />
                  </div>
                </div>

                <ol className="mt-10 max-w-[560px]">
                  {FREE_CHAPTERS.map((c, i) => (
                    <li key={c.title} className="lm-row">
                      <span className="lm-row-n" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="lm-row-h">{c.title}</span>
                        <span className="lm-row-t">{c.line}</span>
                      </span>
                    </li>
                  ))}
                </ol>
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
