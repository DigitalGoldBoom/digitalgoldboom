"use client";

/*
  HERO H — Broadsheet Front-Page Takeover (Dark + Gold)
  =====================================================
  Pattern: Newspaper front page · headline IS the hero · dateline at top
  Framework: PlayStation (three-surface, weight-300 display, 1.2× scale-hover, gallery whitespace)
  Palette: Original DGB dark #0A0A0F + gold #D4A843 + Plus Jakarta + Geist Mono

  Layout:
  - Top strip: black dateline bar with issue number, volume, date — full width
  - Center: MASSIVE headline dominates, spans full viewport with dramatic line breaks
  - Book3D: small floating element inset bottom-left as "artifact"
  - Right sidebar: byline + pull-quote + credits in narrow column
  - Bottom band: inverted black strip with form + stats ribbon running horizontally
*/

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import Book3D from "@/components/Book3D";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success" | "error";

const DARK = {
  bg: "#0A0A0F",
  bgAlt: "#050508",
  bgElev: "#111118",
  tp: "#F5F5F7",
  ts: "#C6C6CC",
  tt: "#9A9AA0",
  gold: "#D4A843",
  goldHover: "#F4C563",
  goldMuted: "#8F6F1E",
  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.16)",
};

export default function HeroH() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const book = bookRef.current;
    if (!section || !content) return;

    if (prefersReducedMotion()) {
      section.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const reveals = content.querySelectorAll("[data-reveal]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(reveals, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, delay: 0.15 });
    if (book) tl.fromTo(book, { opacity: 0, scale: 0.92, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.4);

    const bookParallax = book
      ? gsap.to(book, {
          y: -50,
          rotate: 1.5,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
        })
      : null;

    return () => {
      if (bookParallax?.scrollTrigger) bookParallax.scrollTrigger.kill();
      bookParallax?.kill();
      tl.kill();
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "hero-h" }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("hero_email_submit");
      setStatus("success");
      setMessage("You are on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const locked = status === "submitting" || status === "success";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: `radial-gradient(1400px 1000px at 50% 30%, rgba(212,168,67,0.09), transparent 55%), ${DARK.bg}`,
        color: DARK.tp,
        minHeight: "100dvh",
      }}
    >
      {/* DATELINE BAR — top strip, newspaper masthead feel */}
      <div
        className="relative z-10 w-full pt-24 md:pt-28 pb-5"
        style={{
          borderBottom: `1px solid ${DARK.border}`,
          background: `linear-gradient(180deg, ${DARK.bgAlt}, transparent)`,
        }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
          <div
            className="font-mono flex items-center gap-3"
            style={{
              fontSize: "10.5px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: DARK.tt,
              fontWeight: 600,
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: DARK.gold }} />
            <span>DGB · Vol 01 · No. 01</span>
          </div>
          <div
            className="font-mono hidden sm:block"
            style={{
              fontSize: "10.5px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: DARK.gold,
              fontWeight: 600,
            }}
          >
            The Next Gold Rush · April 2026
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "10.5px",
              letterSpacing: "0.15em",
              color: DARK.tt,
              fontWeight: 500,
            }}
          >
            $0 · Free
          </div>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* MASSIVE headline spans cols 1-12 on mobile, 1-9 on desktop */}
          <h1
            data-reveal
            className="col-span-12 lg:col-span-9"
            style={{
              fontSize: "clamp(2.75rem, 9vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: DARK.tp,
            }}
          >
            Missed
            <br />
            Bitcoin?
            <span className="block mt-2" style={{ color: DARK.gold }}>
              <em className="italic" style={{ fontWeight: 300 }}>Don&rsquo;t miss</em>
              <br />
              this one.
            </span>
          </h1>

          {/* RIGHT SIDEBAR — byline + pull quote */}
          <aside
            data-reveal
            className="col-span-12 lg:col-span-3 flex flex-col"
            style={{ gap: 28 }}
          >
            <div
              className="pt-6"
              style={{ borderTop: `2px solid ${DARK.gold}` }}
            >
              <div
                className="font-mono mb-3"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DARK.gold,
                  fontWeight: 600,
                }}
              >
                Byline
              </div>
              <div style={{ fontSize: 14, color: DARK.ts, lineHeight: 1.55 }}>
                Written by{" "}
                <span style={{ color: DARK.tp, fontWeight: 600 }}>Andrew Fletcher</span>
                , former president of Great Eagle Gold Corp — now NatBridge Resources.
              </div>
            </div>

            <div
              className="pt-6"
              style={{ borderTop: `1px solid ${DARK.border}` }}
            >
              <div
                className="font-mono mb-3"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DARK.tt,
                  fontWeight: 600,
                }}
              >
                Pull Quote
              </div>
              <blockquote
                className="italic"
                style={{
                  fontSize: 15,
                  color: DARK.tp,
                  lineHeight: 1.5,
                  fontWeight: 300,
                  letterSpacing: "-0.005em",
                }}
              >
                &ldquo;Gold only gets digitized once. That&rsquo;s the thing to be early to.&rdquo;
              </blockquote>
            </div>
          </aside>

          {/* Subhead + Book3D row */}
          <div className="col-span-12 lg:col-span-7 mt-6">
            <p
              data-reveal
              style={{
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                lineHeight: 1.55,
                color: DARK.ts,
                fontWeight: 400,
                maxWidth: "46ch",
                fontStyle: "normal",
              }}
            >
              Tokenization just triggered the biggest gold rush in history. This time it&rsquo;s{" "}
              <span style={{ color: DARK.tp, fontWeight: 500 }}>digital</span>,{" "}
              <span style={{ color: DARK.tp, fontWeight: 500 }}>eco-friendly</span>, and{" "}
              <span style={{ color: DARK.tp, fontWeight: 500 }}>global</span>.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:row-span-2 flex items-end justify-center lg:justify-end relative">
            {/* Mobile static cover */}
            <div
              className="lg:hidden relative mx-auto"
              style={{ maxWidth: 200, width: "100%", aspectRatio: "500/763" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(55% 45% at 50% 50%, rgba(212,168,67,0.3), transparent 65%)",
                  filter: "blur(32px)",
                  transform: "scale(1.4)",
                }}
              />
              <Image
                src="/images/Digital Gold Boom Cover (1).png"
                alt="Digital Gold Boom"
                fill
                priority
                sizes="200px"
                style={{ objectFit: "contain", filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.6))" }}
              />
            </div>

            {/* Desktop Book3D — floats bottom-right, slightly tilted */}
            <div
              ref={bookRef}
              className="hidden lg:block relative"
              style={{ perspective: "1400px", transform: "rotate(-1.5deg)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(55% 45% at 50% 50%, rgba(212,168,67,0.3), transparent 65%)",
                  filter: "blur(60px)",
                  transform: "scale(1.5)",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <Book3D />
              </div>
              {/* Caption beneath book — magazine style */}
              <div
                className="absolute left-0 right-0 text-center"
                style={{ bottom: -48 }}
              >
                <div
                  className="font-mono inline-block px-3"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: DARK.tt,
                    fontWeight: 600,
                  }}
                >
                  Fig. 01 — The Book
                </div>
              </div>
            </div>
          </div>

          {/* Left form */}
          <div data-reveal className="col-span-12 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 flex w-full max-w-[540px] flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="hero-h-email" className="sr-only">Email address</label>
              <input
                id="hero-h-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                placeholder="you@email.com"
                className="flex-1 min-w-0"
                style={{
                  background: "transparent",
                  border: `1px solid ${DARK.borderStrong}`,
                  borderRadius: 3,
                  padding: "16px 20px",
                  color: DARK.tp,
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  transition: "border-color 180ms, box-shadow 180ms",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = DARK.gold;
                  e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,67,0.2)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = DARK.borderStrong;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={locked}
                className="shrink-0 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap hero-h-cta"
              >
                {status === "submitting" ? "Adding you…" : status === "success" ? "You are on the list" : "Join the waitlist →"}
              </button>
            </form>
            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-[1rem]"
              style={{ fontSize: 12, color: DARK.tt }}
            >
              {status === "success" && <span style={{ color: "#4ADE80", fontWeight: 500 }}>{message}</span>}
              {status === "error" && <span style={{ color: "#F87171", fontWeight: 500 }}>{message}</span>}
              {(status === "idle" || status === "submitting") && <span>Free until the book drops. $39 after. No spam.</span>}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM STAT RIBBON — inverted black strip with horizontal mono stats */}
      <div
        className="relative z-10 w-full"
        style={{
          borderTop: `1px solid ${DARK.border}`,
          background: DARK.bgAlt,
        }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {[
            { v: "$469M", l: "Reserved" },
            { v: "17,466", l: "Investors" },
            { v: "162", l: "Countries" },
            { v: "10", l: "Patents" },
            { v: "7yr", l: "Built" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex items-baseline gap-3 md:gap-4"
            >
              <div
                className="font-mono tabular-nums"
                style={{
                  fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)",
                  fontWeight: 400,
                  color: DARK.gold,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: "9.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DARK.tt,
                  fontWeight: 600,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-h-cta {
          background: ${DARK.gold};
          color: ${DARK.bg};
          padding: 16px 30px;
          border-radius: 0;
          border: none;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }
        .hero-h-cta:hover {
          background: ${DARK.goldHover};
          transform: scale(1.2);
          box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px ${DARK.gold};
        }
        .hero-h-cta:active {
          opacity: 0.8;
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
