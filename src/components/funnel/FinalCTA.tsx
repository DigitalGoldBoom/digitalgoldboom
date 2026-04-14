"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import Book3D from "@/components/Book3D";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";

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
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      <SectionImage
        src="/images/earth-cubes/earth-cube-cahuilla-desert.png"
        alt=""
        position="full"
        opacity={0.18}
        parallax={0.4}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div data-reveal className="hidden lg:flex items-center justify-center order-1"><Book3D /></div>
          <div className="order-2 text-center lg:text-left">
            <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">UNDERSTAND IT BEFORE WALL STREET DOES</p>
            <h2 data-reveal className="text-tp font-extrabold tracking-[-0.035em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.75rem)" }}>
              Missed Bitcoin?<br />
              Don&rsquo;t wait to read about digital gold mining<br />
              <span className="text-gold">in the Wall Street Journal.</span>
            </h2>
            <p data-reveal className="mt-8 text-ts leading-[1.7] max-w-[52ch] mx-auto lg:mx-0" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>Read it here first.</p>
            <form data-reveal onSubmit={handleSubmit} noValidate className="mt-12 flex w-full max-w-[560px] mx-auto lg:mx-0 flex-col gap-3 sm:flex-row sm:items-stretch">
              <label htmlFor="final-email" className="sr-only">Email address</label>
              <input id="final-email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={locked} placeholder="you@email.com" className="flex-1 min-w-0 bg-transparent border border-border px-5 py-4 text-sm text-tp placeholder:text-tt/60 focus:outline-none focus:border-gold transition-colors duration-300 rounded-lg disabled:opacity-60" />
              <button type="submit" disabled={locked} className="shrink-0 bg-btn-bg text-btn-text text-sm font-semibold px-7 py-4 rounded-lg hover:opacity-90 transition-all duration-200 active:scale-[0.98] active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap">
                {status === "submitting" ? "Adding you…" : status === "success" ? "You are on the list" : "Join the waitlist — free →"}
              </button>
            </form>
            <p role="status" aria-live="polite" className="mt-3 text-xs text-tt min-h-[1rem]">
              {status === "success" && <span className="text-green">{message}</span>}
              {status === "error" && <span className="text-[#ff6b6b]">{message}</span>}
              {(status === "idle" || status === "submitting") && <span>Free until the book drops. $39 after. No spam.</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
