"use client";

import { useRef } from "react";
import BuyButton from "@/components/BuyButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDrawOnEnter, useViewPing } from "./hooks";
import type { ColdVariantKey } from "./variants";

/**
 * S7 — THE RECEIPTS. A ledger, not a brag wall: four register entries with
 * thin gold rules that draw in. NO headshots, nothing counts, nothing pulses.
 * Design law: the framing line ("does and does not prove") lives in the SAME
 * tile as the $469M row — compliance framing travels with the number.
 */

const ROWS = [
  {
    label: "NatGold Digital",
    body: "The platform behind the model, NatGold Digital, is chaired by Mark Radke, former Chief of Staff of the U.S. Securities and Exchange Commission.",
  },
  {
    label: "NatBridge Resources",
    body: "NatBridge Resources, the first mining company built for the model, is chaired by Michelle Ash, former Chief Innovation Officer of Barrick Gold.",
  },
  {
    label: "Ten patent applications",
    body: "The method is the subject of ten patent applications now in examination at the U.S. Patent and Trademark Office.",
  },
  {
    label: "The demand signal",
    body: null, // rendered specially — the $469M row keeps v2-num figures
  },
];

export default function SReceipts({
  variant,
  checkoutUrl,
}: {
  variant: ColdVariantKey;
  checkoutUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  useDrawOnEnter(ref, { duration: 0.5, stagger: 0.08 });
  useViewPing(ctaRef, "s_receipts_cta_view", { page: "new", variant });

  return (
    <section id="cold-s7" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <p data-reveal className="v2-eyebrow">Who built it</p>
        <h2
          data-reveal
          className="v2-display mt-6"
          style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "20ch" }}
        >
          The people who wrote the rules <span className="v2-gold">joined it.</span>
        </h2>

        <div data-reveal className="v2-tile mt-12 p-7 md:p-10">
          <dl className="m-0 flex flex-col">
            {ROWS.map((r, i) => (
              <div key={r.label} className={i === 0 ? "" : "mt-8"}>
                <div className="cold-rule mb-6" data-draw="scaleX" />
                <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10">
                  <dt
                    className="v2-num mb-2 md:mb-0"
                    style={{ color: "var(--v2-gold)", letterSpacing: "0.16em" }}
                  >
                    {r.label.toUpperCase()}
                  </dt>
                  <dd className="m-0">
                    {r.body ? (
                      <p className="cold-body !max-w-none">{r.body}</p>
                    ) : (
                      <>
                        <p className="cold-body !max-w-none">
                          And before a single NatGold Token traded,{" "}
                          <span
                            className="whitespace-nowrap"
                            style={{
                              fontFamily: "var(--font-mono), ui-monospace, monospace",
                              fontVariantNumeric: "tabular-nums",
                              color: "#F4F4F7",
                              fontSize: "1.25rem",
                            }}
                          >
                            17,466 people
                          </span>{" "}
                          across{" "}
                          <span
                            className="whitespace-nowrap"
                            style={{
                              fontFamily: "var(--font-mono), ui-monospace, monospace",
                              fontVariantNumeric: "tabular-nums",
                              color: "#F4F4F7",
                              fontSize: "1.25rem",
                            }}
                          >
                            162 countries
                          </span>{" "}
                          reserved{" "}
                          <span
                            className="whitespace-nowrap"
                            style={{
                              fontFamily: "var(--font-mono), ui-monospace, monospace",
                              fontVariantNumeric: "tabular-nums",
                              color: "#F4F4F7",
                              fontSize: "1.25rem",
                            }}
                          >
                            $469 million
                          </span>{" "}
                          worth — reservations on the public record, no money changing hands.
                        </p>
                        {/* the framing line may never separate from these figures */}
                        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--v2-faint)" }}>
                          The book examines each of these facts — who these people are, what the
                          applications cover, and what that demand signal does and does not prove.
                        </p>
                      </>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div ref={ctaRef} data-reveal className="mt-10 flex flex-col items-start gap-3">
          <BuyButton
            checkoutUrl={checkoutUrl}
            label="Get the book — $37"
            event="s_receipts_cta_click"
            eventProps={{ page: "new", variant }}
            className="v2-btn-ghost"
          />
          <p className="text-xs" style={{ color: "var(--v2-faint)" }}>
            Educational — not financial advice.
          </p>
        </div>

        <p data-reveal className="cold-loop mt-10">
          The facts are on the record. The story of how they fit together needed a teller. So
          who wrote it?
        </p>
      </div>
    </section>
  );
}
