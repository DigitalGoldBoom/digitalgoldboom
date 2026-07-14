"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * LeadMagnetForm — capture an email into Andrew's OWN database (Supabase via /api/subscribe) in
 * exchange for the first 5 chapters.
 *
 * Delivery is BY EMAIL ONLY. The chapters used to download instantly on submit; that was removed
 * deliberately. An instant download means a reader never has to prove the address is real, so the
 * list fills with addresses that can never be mailed — and the list is the whole asset. Now Kit's
 * double opt-in confirmation email carries the book, and the click that fetches it is what proves
 * the address. The success state's job is therefore to get them INTO their inbox, spam folder
 * included: a brand-new sending domain has no reputation yet, so the first email often lands there.
 *
 * Permission-based: a required consent checkbox (stored with a timestamp server-side). First-touch
 * UTM/source captured on mount. PII-safe: the email is never sent to analytics (track gets only
 * `source`) — it is only echoed back to the person who just typed it, so they can catch a typo.
 */
export default function LeadMagnetForm({
  mode = "download",
  source,
  className = "",
}: {
  /** "download" = instant 5-chapter delivery; "waitlist" = join the list, no download. */
  mode?: "download" | "waitlist";
  source?: string;
  className?: string;
}) {
  const isWaitlist = mode === "waitlist";
  const src = source ?? (isWaitlist ? "waitlist" : "home_lead_magnet");
  const tag = isWaitlist ? "waitlist" : "free-chapters";
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // Held after the inputs are cleared: the success panel shows the address back to them, which is
  // how a typo gets caught before they sit waiting for mail that was never going to arrive.
  const [sentTo, setSentTo] = useState("");
  const utm = useRef<Record<string, string>>({});

  // First-touch attribution: grab utm_* / ref / gclid off the landing URL once.
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const keep: Record<string, string> = {};
      p.forEach((v, k) => {
        if (/^utm_/.test(k) || k === "ref" || k === "gclid") keep[k] = v.slice(0, 120);
      });
      utm.current = keep;
    } catch {
      /* no-op */
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    track("lead_magnet_submit", { source: src });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          consent,
          source: src,
          tag,
          utm: Object.keys(utm.current).length ? utm.current : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        track("lead_magnet_submit_fail", { source: src });
        return;
      }
      track("lead_magnet_success", { source: src });
      setSentTo(email);
      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
      track("lead_magnet_submit_fail", { source: src });
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-[20px] border p-6 ${className}`}
        style={{ borderColor: "rgba(232,178,58,0.4)", background: "rgba(232,178,58,0.08)" }}
      >
        {isWaitlist ? (
          <p className="text-center" style={{ color: "#F4F4F7", fontWeight: 600, fontSize: "1.05rem" }}>
            You&rsquo;re on the list — we&rsquo;ll email you the moment the full book is ready.
          </p>
        ) : (
          <>
            <p style={{ color: "#F4F4F7", fontWeight: 600, fontSize: "1.15rem" }}>
              Almost there — check your inbox.
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              I&rsquo;ve sent a confirmation to{" "}
              <strong style={{ color: "#F4F4F7", wordBreak: "break-all" }}>{sentTo}</strong>. Click the
              button inside it and your five chapters arrive straight away.
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              <strong style={{ color: "#F4F4F7" }}>Not there?</strong> Look in <strong>spam</strong> or{" "}
              <strong>promotions</strong> — a first email from a new sender often lands there. When you
              find it, drag it into your inbox so everything after it comes straight through.
            </p>
            <div
              className="mt-4 rounded-[12px] p-3 text-xs leading-relaxed"
              style={{ background: "rgba(0,2,18,0.45)", color: "var(--v2-faint)" }}
            >
              From <strong style={{ color: "var(--v2-dim)" }}>Andrew Fletcher</strong> ·
              fletcher@digitalgoldboom.com
              <br />
              Subject: <em>One click and your five chapters are on the way</em>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col gap-3">
        <label htmlFor="lm-first" className="sr-only">
          First name
        </label>
        <input
          type="text"
          id="lm-first"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          disabled={status === "loading"}
          className="lm-field"
          autoComplete="given-name"
        />
        <label htmlFor="lm-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="lm-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          disabled={status === "loading"}
          className="lm-field"
          autoComplete="email"
        />
      </div>

      <label className="lm-consent mt-5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="lm-cb sr-only"
        />
        <span className="lm-box" aria-hidden>
          <svg viewBox="0 0 16 16" className="lm-tick" fill="none" aria-hidden>
            <path
              d="M3.5 8.4l3 3 6-6.8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[13px] leading-[1.55]" style={{ color: "var(--v2-dim)" }}>
          {isWaitlist
            ? "Add me to the waitlist, plus updates and offers."
            : "Email me the chapters, plus updates and offers."}{" "}
          <a href="/privacy" className="v2-gold" style={{ textDecoration: "underline" }}>
            Unsubscribe any time
          </a>
          .
        </span>
      </label>

      <button type="submit" disabled={status === "loading"} className="lm-submit mt-5">
        <span>
          {status === "loading"
            ? "Sending…"
            : isWaitlist
              ? "Join the waitlist"
              : "Get the first 5 chapters"}
        </span>
        {/* The arrow lives in its own disc, flush to the pill's inner edge — it leans forward on
            hover. A naked arrow beside a label is the tell of a button nobody designed. */}
        <span className="lm-submit-disc" aria-hidden>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      <div className="mt-3 min-h-[18px]">
        {status === "error" ? (
          <p role="status" aria-live="polite" className="text-[13px]" style={{ color: "#ff8b8b" }}>
            {message}
          </p>
        ) : (
          <p className="text-[11px]" style={{ color: "var(--v2-faint)" }}>
            No payment. Educational — not financial advice.
          </p>
        )}
      </div>
    </form>
  );
}
