"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import Book3D from "@/components/Book3D";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success" | "error";

export default function HeroBoardD() {
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
    tl.fromTo(reveals, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: 0.1 });
    if (book) tl.fromTo(book, { opacity: 0, scale: 0.96, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 1.1 }, 0.25);

    const bookParallax = book
      ? gsap.to(book, {
          y: -30,
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
        body: JSON.stringify({ email, source: "hero-board-d" }),
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
        minHeight: "100dvh",
        background:
          "radial-gradient(1200px 800px at 85% 15%, rgba(202,138,4,0.09), transparent 55%), radial-gradient(900px 600px at 0% 100%, rgba(28,25,23,0.04), transparent 60%), var(--bg-canvas)",
      }}
    >
      {/* Top editorial hairline */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-gold) 30%, var(--accent-gold) 70%, transparent)",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full pt-32 md:pt-40 pb-16 md:pb-24 min-h-[100dvh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center w-full">
          {/* LEFT — content */}
          <div ref={contentRef}>
            {/* Eyebrow — flat mono with bullet, no pill */}
            <div data-reveal className="flex items-center gap-3 mb-10">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent-gold)" }}
              />
              <span className="eyebrow">Decoding the next gold rush</span>
            </div>

            {/* Headline — no underline. Emphasis via color + italic weight 300 */}
            <h1
              data-reveal
              className="text-tp"
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                maxWidth: "13ch",
              }}
            >
              Missed Bitcoin?
              <span className="block mt-3">
                <em className="italic" style={{ fontWeight: 300 }}>Don&rsquo;t miss</em>{" "}
                <span style={{ color: "var(--accent-gold)" }}>digital gold mining.</span>
              </span>
            </h1>

            <p
              data-reveal
              className="mt-10"
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: "48ch",
              }}
            >
              Tokenization just triggered the biggest gold rush in history. This time it&rsquo;s digital, eco-friendly, and global.
            </p>

            {/* Form */}
            <form
              data-reveal
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="hero-email-d" className="sr-only">Email address</label>
              <input
                id="hero-email-d"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                placeholder="you@email.com"
                className="input flex-1 min-w-0 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={locked}
                className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "submitting"
                  ? "Adding you…"
                  : status === "success"
                  ? "You are on the list"
                  : "Join the waitlist →"}
              </button>
            </form>

            <p
              role="status"
              aria-live="polite"
              data-reveal
              className="mt-3 text-tt min-h-[1rem]"
              style={{ fontSize: "0.8125rem" }}
            >
              {status === "success" && (
                <span style={{ color: "#15803D", fontWeight: 500 }}>{message}</span>
              )}
              {status === "error" && (
                <span style={{ color: "#B91C1C", fontWeight: 500 }}>{message}</span>
              )}
              {(status === "idle" || status === "submitting") && (
                <span>Free until the book drops. $39 after. No spam.</span>
              )}
            </p>

            {/* Stats strip — tight divider pattern, not a row */}
            <div
              data-reveal
              className="mt-14 pt-8 grid grid-cols-3 gap-6 md:gap-10"
              style={{ borderTop: "1px solid var(--border-base)", maxWidth: 520 }}
            >
              {[
                { v: "$469M", l: "Reserved" },
                { v: "17,466", l: "Investors" },
                { v: "162", l: "Countries" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-mono tabular-nums"
                    style={{
                      fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-2 font-mono"
                    style={{
                      fontSize: "9.5px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Book3D on desktop, static cover on mobile */}
          <div className="relative flex items-center justify-center">
            {/* Mobile — static cover image (order still after content on mobile) */}
            <div
              className="lg:hidden relative mt-4"
              style={{ maxWidth: 240, width: "100%", aspectRatio: "500/763" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(55% 45% at 50% 50%, rgba(202,138,4,0.22), transparent 65%)",
                  filter: "blur(32px)",
                  transform: "scale(1.3)",
                }}
              />
              <Image
                src="/images/Digital Gold Boom Cover (1).png"
                alt="Digital Gold Boom book cover"
                fill
                priority
                sizes="240px"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 24px 40px rgba(12,10,9,0.25))",
                }}
              />
            </div>

            {/* Desktop — interactive Book3D */}
            <div
              ref={bookRef}
              className="hidden lg:block relative"
              style={{ perspective: "1400px" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 50%, rgba(202,138,4,0.22), transparent 65%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <Book3D />
              </div>
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  bottom: -40,
                  width: "70%",
                  height: 24,
                  background:
                    "radial-gradient(ellipse at center, rgba(12,10,9,0.35), transparent 70%)",
                  filter: "blur(12px)",
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom editorial hairline — scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-8"
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="font-mono"
            style={{
              fontSize: "9.5px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              fontWeight: 600,
            }}
          >
            Scroll
          </span>
          <div
            className="w-px"
            style={{
              height: 32,
              background: "linear-gradient(180deg, var(--accent-gold), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
