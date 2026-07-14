import type { Metadata } from "next";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import StickyCTA from "@/components/StickyCTA";
import { FREE_CHAPTERS_V2 } from "@/lib/chapters";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Read the First 5 Chapters Free — Digital Gold Boom",
  description:
    "Gold's value no longer needs a mine. The first five chapters of Digital Gold Boom make the case, in plain English — free, sent to your inbox.",
  path: "/free",
});

/**
 * /free — the lead magnet. WARM traffic, arriving from a social post about the book.
 *
 * THE ORDER (the whole reason this page was rebuilt):
 *   claim → proof → the book itself → the principle → the five chapters → the ask.
 * The form used to render ABOVE the five chapters it buys, on every breakpoint: the visitor was
 * asked to pay before he was shown the goods. Do not move the form back up. Ever.
 *
 * THE BOOK IS A SELLING POINT, NOT DECORATION (author, 2026-07-15: "I definitely want on free to
 * show the book properly — it's a selling point for people coming from social media, not just
 * text"). So it is prominent on EVERY breakpoint. The earlier draft cut it from the phone entirely
 * because it was eating 73% of the fold — that fixed the fold and lost the product. The answer is
 * neither: the headline lands FIRST so the claim is never buried, then the book appears at real
 * size, then the receipt that backs the claim. The reader sees what he's being offered before he is
 * asked for anything.
 *
 * THE PIN (desktop): the book anchors and stays while the left column scrolls. Two traps, both
 * handled here — DO NOT reintroduce either:
 *   · the grid must be `items-start`. A vertically-centred cell gives a sticky child zero travel,
 *     so it looks pinned in review and behaves like a normal block in a browser.
 *   · the wrapper must NOT carry `overflow-clip`. An ancestor with a non-visible overflow becomes
 *     the sticky scroll box and the pin dies silently, with no error.
 *
 * COPY STATUS: dgb-copy-chief PASS 91/100 (gate clean), but the AUTHOR is not satisfied with it yet
 * — "it's better than the current one… but it's just still not saying exactly what it should, the
 * summaries of the chapters aren't hitting properly." He is working through them individually.
 * So this prose is LIVE BUT NOT FINAL. Changes route through dgb-funnel-copywriter → dgb-copy-chief,
 * never edited straight into this file.
 */
export default function FreeChaptersPage() {
  return (
    // .rd2 scopes the redesign's type hierarchy (see globals.css). Without it the chapter rows fall
    // back to the old weighting, where the book's numbers are the faintest text on the page.
    <div className="rd2 v2 dgb-vault-bg relative">
      <main className="relative z-10">
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-28 pt-24 md:px-10 md:pt-28 lg:pb-36">
          {/* items-start, NOT items-center — this is what gives the sticky book travel. */}
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16">
            {/* ── THE COLUMN THAT SCROLLS ────────────────────────────── */}
            <div>
              <p className="lm-eyebrow">Free · The first five chapters</p>

              {/* CLAIM — the book's own locked sentence (Ch 8). Static. Never animate it: it is the
                  LCP element on this page. */}
              <h1
                className="v2-display mt-7"
                style={{ fontSize: "clamp(2.35rem, 6.2vw, 4.1rem)", maxWidth: "15ch" }}
              >
                Gold&rsquo;s value no longer <span className="v2-gold">needs a mine.</span>
              </h1>

              {/* THE BOOK — phone/tablet only (on desktop it lives in the pinned column, right).
                  It sits directly under the headline: the claim lands, then the object it belongs
                  to. This is the thing a social visitor came to see. */}
              <div className="mt-9 flex justify-center md:hidden">
                <Book3D />
              </div>

              {/* PROOF — the receipt. Named seller, named deposit, named figure, no mine. */}
              <p
                className="mt-9 text-lg leading-relaxed sm:text-xl md:mt-7"
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
                {FREE_CHAPTERS_V2.map((c, i) => (
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

              {/* The author, as the witness. */}
              <p
                className="mt-8 text-sm leading-relaxed"
                style={{ color: "var(--v2-faint)", maxWidth: "52ch" }}
              >
                <span style={{ color: "var(--v2-dim)" }}>Andrew Fletcher</span> &mdash; former President
                &amp; CEO of Great Eagle Gold (now NatBridge Resources), the first gold company built
                for this model.
              </p>
            </div>

            {/* ── THE BOOK, PINNED. Desktop/tablet: anchors on the first fold and stays. ────── */}
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
