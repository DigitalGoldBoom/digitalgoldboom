"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDrawOnEnter } from "./hooks";
import NumberCounter from "@/components/NumberCounter";

/**
 * S3 — THE OLD ROAD. Three heavy slab-facts land in under 4 seconds on a
 * phone; the $22T stat band below them stays deliberately QUIET — body-scale
 * type, never display-scale (2026-07-03 directive), with the as-of date
 * rendered in the same visual unit as the number (the photograph framing).
 * THE page's single counter lives here — nothing else on the page counts.
 */

const SLABS = [
  { num: "39 days", cap: "A $10 billion operating mine shut down — Panama, 2023." },
  { num: "29 years", cap: "US average from discovery to production for a new mine." },
  { num: "124 tonnes", cap: "Rock moved to produce one ounce of gold today." },
];

export default function SOldRoad() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, { stagger: 0.12, y: 24 });
  useDrawOnEnter(ref, { duration: 0.7 });

  return (
    <section id="cold-s3" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <p data-reveal className="v2-eyebrow">The problem</p>
        <h2
          data-reveal
          className="v2-display mt-6"
          style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "20ch" }}
        >
          The world still wants gold. <span className="v2-gold">It no longer wants the digging.</span>
        </h2>
        <p data-reveal className="cold-body mt-8">
          Because until now there was no other way — and the one way is breaking down. In 2023,
          Panama shut down an operating $10 billion mine in 39 days. In the US, a new mine now
          averages 29 years from discovery to production. One ounce today means moving roughly
          124 tonnes of rock — and record prices don’t fix it; they fund the chase into worse
          rock.
        </p>
        <p data-reveal className="cold-body mt-5">
          The book maps the six forces tightening on the old model — the Extraction S.P.I.R.A.L.
        </p>

        {/* The three slabs — blocks of rock. */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SLABS.map((s) => (
            <div key={s.num} data-reveal className="cold-slab p-7 md:p-8">
              <div className="cold-slab-num">{s.num}</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                {s.cap}
              </p>
            </div>
          ))}
        </div>

        {/* The thread kinks through this section — the only decorative comment. */}
        <div className="my-12 flex justify-center" aria-hidden>
          <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
            <path
              d="M20 0 V 34 L 10 52 V 70 L 28 92 V 120"
              stroke="var(--v2-gold)"
              strokeWidth="1.5"
              opacity="0.8"
              pathLength={1}
              data-draw="stroke"
            />
          </svg>
        </div>

        {/* The $22T stat band — supporting proof, never a hero element. */}
        <div data-reveal className="cold-stat-band px-6 py-8 md:px-10">
          <p className="text-sm italic leading-relaxed" style={{ color: "var(--v2-faint)" }}>
            A million seconds is eleven and a half days. A trillion seconds is thirty-one
            thousand years.
          </p>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "62ch" }}>
            Now hold this:{" "}
            <strong style={{ color: "#F4F4F7" }}>
              <NumberCounter
                start={0}
                end={22}
                prefix="$"
                suffix=" trillion"
                durationMs={900}
                staticFirst
                ariaLabel="$22 trillion of gold has already been found, at $5,194 per ounce on February 26, 2026"
              />{" "}
              of gold has already been found
            </strong>{" "}
            — drilled, verified, documented in the ground (at $5,194/oz on February 26, 2026,
            the date the book locks every figure to). More than 40 percent of verified gold
            discoveries never reach production.
          </p>
          <p className="mt-4 text-lg" style={{ color: "#F4F4F7" }}>
            The gold is real. The road to it is closing.
          </p>
        </div>

        <p data-reveal className="cold-loop mt-10">
          Found, proven, stuck — that was the end of the story. Then a second road opened.
        </p>
      </div>
    </section>
  );
}
