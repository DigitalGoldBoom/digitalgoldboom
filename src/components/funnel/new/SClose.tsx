"use client";

import { useEffect, useRef } from "react";
import Book3D from "@/components/Book3D";
import BuyButton from "@/components/BuyButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useViewPing } from "./hooks";
import type { ColdVariantKey } from "./variants";

/**
 * S9 — INSIDE THE BOOK + THE CLOSE. Arrival: the depth arc reaches full warm
 * glow and the product appears for the FIRST time exactly where it can be
 * bought (delayed reveal mirrors the delayed offer). Book3D is the existing
 * CSS-3D build — pointer-tilt on desktop, static 3/4 pose on touch/reduced-
 * motion, no WebGL anywhere. The gold thread terminates in a small glow burst
 * behind the CTA; nothing else moves — at the buy moment, stillness = confidence.
 * Verdict headline = kinetic line 4 of 4 (kept as a plain reveal here: the
 * headline IS the offer, and useScrollReveal already lands it — one motion).
 */

const BULLETS = [
  "Why the old way of producing gold is breaking down — and why record prices make it worse.",
  "How verified, in-ground gold becomes a digital asset: the proof, the gate, the mint.",
  "Two real deposits — Cahuilla in California and Friday in Idaho — in the pipeline, not through it. The book tells both stories.",
  "The full risk chapter: nine hard questions, one left open.",
];

export default function SClose({
  variant,
  checkoutUrl,
}: {
  variant: ColdVariantKey;
  checkoutUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, { stagger: 0.07 });
  useViewPing(ctaRef, "s_close_cta_view", { page: "new", variant });

  // The thread's terminus: one 0.4s glow burst behind the CTA, once, subtle.
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.classList.add("is-lit");
        obs.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="cold-s9" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* The product, finally. Phone: the book leads the section. */}
          <div data-reveal className="order-1 flex justify-center">
            <div style={{ ["--bw" as string]: "min(260px, 62vw)" }} className="md:[--bw:300px]">
              <Book3D />
            </div>
          </div>

          <div className="order-2">
            <p data-reveal className="v2-eyebrow">Read it for yourself</p>
            <h2
              data-reveal
              className="v2-display mt-6"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", maxWidth: "18ch" }}
            >
              Understand it for the price of a <span className="v2-gold">paperback.</span>
            </h2>
            <p data-reveal className="v2-num mt-6" style={{ letterSpacing: "0.16em" }}>
              17 CHAPTERS IN TWO SECTIONS · PLAIN ENGLISH · EVERY FIGURE DATED AND SOURCED
            </p>

            <ul className="mt-7 flex list-none flex-col gap-4 p-0">
              {BULLETS.map((b) => (
                <li key={b} data-reveal className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-3 h-px w-6 shrink-0"
                    style={{ background: "var(--v2-gold)" }}
                  />
                  <span className="cold-body !max-w-none">{b}</span>
                </li>
              ))}
            </ul>

            <p data-reveal className="cold-body mt-8 !max-w-none">
              <em>Digital Gold Boom</em> is a one-time{" "}
              <strong>$37</strong> — the early-reader price, in exchange for an honest review,
              before it moves to its regular $97. The complete digital book, delivered the
              moment you check out.
            </p>

            {/* Guarantee as a certificate, not a footnote. */}
            <div data-reveal className="cold-cert mt-7 p-5 md:p-6">
              <p className="v2-num mb-2" style={{ color: "var(--v2-gold)", letterSpacing: "0.18em" }}>
                60-DAY GUARANTEE
              </p>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                If it is not worth your time, email within 60 days for a full refund. No
                questions asked.
              </p>
            </div>

            <div ref={ctaRef} data-reveal className="relative mt-8 inline-block">
              <div ref={glowRef} aria-hidden className="cold-cta-glow" />
              <div className="relative">
                <BuyButton
                  checkoutUrl={checkoutUrl}
                  label="Get the book — $37"
                  event="s_close_cta_click"
                  eventProps={{ page: "new", variant }}
                  className="v2-btn w-full min-h-[56px] px-9 text-base sm:w-auto"
                />
              </div>
            </div>
            <p data-reveal className="mt-4 text-xs leading-relaxed" style={{ color: "var(--v2-faint)" }}>
              Secure checkout via LemonSqueezy. Educational content — not financial advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
