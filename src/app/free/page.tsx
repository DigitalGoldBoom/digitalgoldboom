import type { Metadata } from "next";
import Image from "next/image";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import StickyCTA from "@/components/StickyCTA";
import { FREE_CHAPTERS } from "@/lib/chapters";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Read the First 5 Chapters Free — Digital Gold Boom",
  description:
    "Gold's value no longer needs a mine. The first five chapters of Digital Gold Boom make the case, in plain English — free, sent to your inbox.",
  path: "/free",
});

/**
 * /free — the lead magnet. Warm traffic, arriving from a social post about the book.
 *
 * REBUILT 2026-07-14 to the dgb-funnel-designer spec, after the author rejected the old page.
 * What was wrong, and what each fix is for:
 *
 *  1. THE ORDER. The email form rendered ABOVE the five chapters it buys — on every breakpoint.
 *     The visitor was asked to pay before he was shown the goods. That is the one defect this seat
 *     exists to prevent; it scored 0/15. The goods now come first; the form is last in the column.
 *
 *  2. THE PHONE FOLD. `order-first` put the 355px 3D book above the words, so 483px of a 664px
 *     first screen was padding and a book, and the headline was cut mid-sentence — no finished
 *     claim, no proof, no next step. The book is now desktop/tablet furniture. The phone fold
 *     carries the claim and the receipt that backs it.
 *
 *  3. THE PIN (the author's explicit directive). On desktop the book anchors on the first fold and
 *     stays while the left column scrolls. Two traps would have killed it silently, and both are
 *     handled here — DO NOT reintroduce either:
 *       · the grid must be `items-start`. A vertically-centred cell gives a sticky child zero
 *         travel, so it looks pinned in the editor and behaves like a normal block in a browser.
 *       · the page wrapper must NOT carry `overflow-clip`. An ancestor with a non-visible overflow
 *         becomes the sticky scroll box and the pin dies with no error.
 *
 *  4. ONE ASK BECAME TWO. The page had exactly one ask, ever. A phone reader who finished the five
 *     chapters — the warmest he will ever be — had nothing to tap. StickyCTA follows him down.
 *
 * The copy is dgb-copy-chief PASS 91/100 (gate clean) and is not edited here — it belongs to
 * dgb-funnel-copywriter. The five chapter lines come from lib/chapters.ts, the one source shared
 * with the home page, so two pages promising the same book can never describe two different books.
 */
export default function FreeChaptersPage() {
  return (
    <div className="v2 dgb-vault-bg relative">
      <main className="relative z-10">
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-28 pt-24 md:px-10 md:pt-28 lg:pb-36">
          {/* items-start, NOT items-center — this is what gives the sticky book travel. See note 3. */}
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16">
            {/* ── THE COLUMN THAT SCROLLS ────────────────────────────── */}
            <div>
              <p className="lm-eyebrow">Free · The first five chapters</p>

              {/* CLAIM — the book's own locked sentence (Ch 8). Static. Never animate this: it is
                  the LCP element on this page. */}
              <h1
                className="v2-display mt-7"
                style={{ fontSize: "clamp(2.35rem, 6.2vw, 4.1rem)", maxWidth: "15ch" }}
              >
                Gold&rsquo;s value no longer <span className="v2-gold">needs a mine.</span>
              </h1>

              {/* PROOF — the receipt. Named seller, named deposit, named figure, no mine. It lands
                  in beat two, not in a finale. */}
              <p
                className="mt-7 text-lg leading-relaxed sm:text-xl"
                style={{ color: "var(--v2-dim)", maxWidth: "46ch" }}
              >
                In 2025, Barrick Gold sold its half of the Donlin deposit in Alaska for{" "}
                <span style={{ color: "#F4F4F7", fontWeight: 600 }}>$1 billion in cash</span>. No mine
                had been built. Not one ounce had been lifted out of the ground.
              </p>

              {/* THE PRINCIPLE — weighted, in the skim layer, where a phone reader actually looks. */}
              <div className="lm-principle mt-8">
                <p>
                  The industry doesn&rsquo;t wait for the digging before it pays. Once geology proves
                  the gold is there, its value is bankable &mdash; that is what the billion was for.{" "}
                  <span style={{ color: "#F4F4F7" }}>Verification is the value.</span> Digging it up is
                  just the expensive, destructive way of collecting it.
                </p>
              </div>

              <p
                className="mt-8 text-base leading-relaxed"
                style={{ color: "var(--v2-dim)", maxWidth: "50ch" }}
              >
                You have every reason not to take that on faith. So don&rsquo;t. The first five
                chapters build the case one piece at a time &mdash; each part tested before the next is
                added, every figure sourced, in plain English.
              </p>

              {/* ── THE GOODS. Before the ask. Always. ───────────────── */}
              <h2
                className="v2-display mt-12"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", maxWidth: "22ch" }}
              >
                Read it yourself. The first five chapters, <span className="v2-gold">free.</span>
              </h2>

              <ol className="mt-7">
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

              {/* ── THE ASK. Last in the column. ─────────────────────── */}
              <div id="get-chapters" className="lm-shell mt-10 max-w-[540px] scroll-mt-28">
                <div className="lm-core">
                  <LeadMagnetForm source="free_page" />
                </div>
              </div>

              {/* The author as the witness. On phone the cover rides beside him — the book has to be
                  visible somewhere on a screen the 3D object never reaches. */}
              <div className="mt-10 flex items-center gap-5">
                <div className="relative h-[92px] w-[63px] shrink-0 md:hidden">
                  <Image
                    src="/book3d-framer/cover-front-v2.webp"
                    alt="Digital Gold Boom"
                    fill
                    sizes="63px"
                    className="rounded-[3px] object-cover"
                    style={{ boxShadow: "0 10px 30px -8px rgba(0,0,0,0.8)" }}
                  />
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--v2-faint)", maxWidth: "48ch" }}
                >
                  <span style={{ color: "var(--v2-dim)" }}>Andrew Fletcher</span> &mdash; former
                  President &amp; CEO of Great Eagle Gold (now NatBridge Resources), the first gold
                  company built for this model.
                </p>
              </div>
            </div>

            {/* ── THE BOOK. Pinned from tablet up; off the phone, where it ate the fold. ────── */}
            <div className="hidden md:block">
              <div className="sticky top-[112px] flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>
      </main>

      <StickyCTA targetId="get-chapters" label="Get the first 5 chapters" source="free_page_sticky" />
    </div>
  );
}
