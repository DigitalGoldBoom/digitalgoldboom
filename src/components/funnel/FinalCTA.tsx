"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import Book3D from "@/components/Book3D";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "final-cta" }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("final_cta_email_submit");
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
    <section ref={sectionRef} className="section section-deep relative overflow-hidden">
      {/* Atmospheric warm wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 700px at 30% 40%, rgba(202,138,4,0.1), transparent 60%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div data-reveal className="hidden lg:flex items-center justify-center order-1">
            <Book3D />
          </div>
          <div className="order-2 text-center lg:text-left">
            <p
              data-reveal
              className="eyebrow mb-8"
              style={{ color: "var(--accent-gold)" }}
            >
              Understand it before Wall Street does
            </p>
            <h2
              data-reveal
              className="display-xl"
              style={{
                color: "var(--text-on-dark-primary)",
                maxWidth: "18ch",
                fontWeight: 300,
              }}
            >
              Missed Bitcoin?
              <br />
              Don&rsquo;t wait to read about digital gold mining in{" "}
              <span style={{ color: "var(--accent-gold)" }}>the Wall Street Journal.</span>
            </h2>
            <p
              data-reveal
              className="mt-10"
              style={{
                color: "var(--text-on-dark-secondary)",
                fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
                lineHeight: 1.6,
                maxWidth: "46ch",
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              Read it here first.
            </p>

            <form
              data-reveal
              onSubmit={handleSubmit}
              noValidate
              className="mt-12 flex w-full max-w-[560px] mx-auto lg:mx-0 flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="final-email" className="sr-only">Email address</label>
              <input
                id="final-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                placeholder="you@email.com"
                className="flex-1 min-w-0 disabled:opacity-60"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  borderRadius: "var(--r-md)",
                  padding: "16px 20px",
                  fontSize: 16,
                  color: "var(--text-on-dark-primary)",
                  fontFamily: "inherit",
                  transition: "border-color 240ms, box-shadow 240ms",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "var(--accent-gold)";
                  (e.currentTarget as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(202,138,4,0.24)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={locked}
                className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "submitting" ? "Adding you…" : status === "success" ? "You are on the list" : "Join the waitlist →"}
              </button>
            </form>

            <p role="status" aria-live="polite" className="mt-3 min-h-[1rem]" style={{ fontSize: "0.75rem", color: "var(--text-on-dark-tertiary)" }}>
              {status === "success" && <span style={{ color: "#4ADE80", fontWeight: 500 }}>{message}</span>}
              {status === "error" && <span style={{ color: "#F87171", fontWeight: 500 }}>{message}</span>}
              {(status === "idle" || status === "submitting") && <span>Free until the book drops. $39 after. No spam.</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
