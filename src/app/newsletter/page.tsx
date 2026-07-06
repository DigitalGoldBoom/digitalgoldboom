"use client";

import { useState, type FormEvent } from "react";
import VaultShell from "@/components/VaultShell";
import JsonLd from "@/components/JsonLd";
import { generateFAQSchema } from "@/lib/seo";
import { track } from "@vercel/analytics";

// Metadata lives in newsletter/layout.tsx (this is a client component).

const BENEFITS = [
  { t: "Market analysis", b: "Plain-English reads on gold, AISC, BIV and the tokenization shift — what moved and why it matters." },
  { t: "Industry signal", b: "What's actually happening in mining and digital gold mining, explained by someone who spent his career in the gold industry." },
  { t: "Early on the launch", b: "Milestones on the road to the NATG token launch — straight to your inbox." },
];

const FAQS = [
  { q: "How often will I hear from you?", a: "About once a week, plus the occasional note if something major happens in gold or tokenization." },
  { q: "Is it free?", a: "Yes — the weekly email is free. Unsubscribe anytime, one click." },
  { q: "Is this financial advice?", a: "No. It's educational analysis about a new asset class. Nothing in it is financial, investment or tax advice." },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      const d = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) { setStatus("error"); setMsg(d.message ?? "Something went wrong. Try again."); return; }
      track("newsletter_submit");
      setStatus("success"); setMsg("You're on the list. Check your inbox."); setEmail("");
    } catch { setStatus("error"); setMsg("Network error. Try again."); }
  }
  const locked = status === "submitting" || status === "success";

  return (
    <VaultShell>
      <JsonLd data={generateFAQSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-[820px] px-6">
          <p className="v2-eyebrow mb-6">Free weekly briefing</p>
          <h1 className="v2-display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            Stay ahead of the <span className="v2-gold">gold shift.</span>
          </h1>
          <p className="mt-6 text-lg" style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}>
            A short weekly read on gold, digital gold mining and the road to the NATG launch. Plain English, no hype.
          </p>

          <form onSubmit={submit} noValidate className="mt-9 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email" type="email" required autoComplete="email" inputMode="email"
              value={email} onChange={(e) => setEmail(e.target.value)} disabled={locked}
              placeholder="you@email.com" className="v2-input flex-1"
            />
            <button type="submit" disabled={locked} className="v2-btn shrink-0 whitespace-nowrap" style={{ opacity: locked ? 0.7 : 1 }}>
              {status === "submitting" ? "Adding you…" : status === "success" ? "You're in ✓" : "Join free"}
            </button>
          </form>
          <p className="mt-3 text-xs" role="status" aria-live="polite" style={{ color: "var(--v2-faint)" }}>
            {status === "success" ? <span className="v2-gold">{msg}</span>
              : status === "error" ? <span style={{ color: "#ff7a7a" }}>{msg}</span>
              : "Free. No spam. Unsubscribe anytime."}
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {BENEFITS.map((x) => (
              <div key={x.t} className="v2-tile p-7">
                <h2 style={{ color: "#F4F4F7", fontSize: "1.125rem", fontWeight: 500, marginBottom: 8 }}>{x.t}</h2>
                <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{x.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="v2-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: 20 }}>Questions</h2>
            <dl className="divide-y" style={{ borderColor: "var(--v2-line)" }}>
              {FAQS.map((f) => (
                <div key={f.q} className="py-5" style={{ borderColor: "var(--v2-line)" }}>
                  <dt style={{ color: "#F4F4F7", fontWeight: 500 }}>{f.q}</dt>
                  <dd className="mt-2 text-sm" style={{ color: "var(--v2-dim)", lineHeight: 1.6 }}>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </VaultShell>
  );
}
