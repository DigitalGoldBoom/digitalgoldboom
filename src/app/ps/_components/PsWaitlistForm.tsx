"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * PsWaitlistForm — the PixelShovel opt-in: email in exchange for the first 5 chapters of Digital
 * Gold Boom. Node-exact clone of the Framer pill form (fill rgb(33,33,33), radius 100px, green CTA
 * on the right), wired to the same /api/subscribe route as the DGB site so every signup lands in the
 * ONE owned list (Supabase) and is mirrored into Kit.
 *
 * Delivery is BY EMAIL ONLY — no instant download. Kit's double opt-in confirmation email carries
 * the chapters, so the click that fetches them is what proves the address is real. The success panel
 * therefore points them at their inbox (spam included: a young sending domain often lands there).
 *
 * `source` is prefixed "ps-" so the API routes it to the PixelShovel Kit form (KIT_PS_FORM_ID) —
 * same sender, separate list segment. PII-safe: the email never goes to analytics.
 */
const CHECK_ICON = "https://framerusercontent.com/images/AmSPZcDJDRerBarMeWXXOO7Ae90.svg";

// Both pills share the Framer field styling — same fill, radius, type. Kept in one place so the
// name field can never drift away from the email field it sits above.
const PILL: React.CSSProperties = {
  background: "rgb(33,33,33)",
  border: "1px solid rgb(0,0,0)",
  color: "rgb(225,227,233)",
  fontFamily: "var(--font-ps-rethink), sans-serif",
  fontWeight: 500,
};

export default function PsWaitlistForm({ source = "ps-home" }: { source?: string }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email || !consent || state === "loading") return;
    setState("loading");
    setMsg("");
    track("ps_optin_submit", { source });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName.trim(),
          consent,
          source,
          tag: "free-chapters",
          utm: Object.keys(utm.current).length ? utm.current : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        // Surface the server's own words — rate-limit, bad email, storage down all read differently.
        setState("err");
        setMsg(data.message ?? "Something went wrong. Please try again.");
        track("ps_optin_fail", { source });
        return;
      }
      track("ps_optin_success", { source });
      setSentTo(email);
      setState("ok");
      setEmail("");
      setFirstName("");
    } catch {
      setState("err");
      setMsg("Network error. Please try again.");
      track("ps_optin_fail", { source });
    }
  };

  if (state === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-[530px] rounded-[var(--ps-r-card)] border p-6"
        style={{ borderColor: "rgb(13,222,51)", background: "rgba(13,222,51,0.07)" }}
      >
        <p className="text-[17px] font-semibold text-white">Almost there — check your inbox.</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(167,173,190)" }}>
          We sent a confirmation to{" "}
          <strong style={{ color: "#fff", wordBreak: "break-all" }}>{sentTo}</strong>. Click the button
          inside it and your five chapters arrive straight away.
        </p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(167,173,190)" }}>
          <strong style={{ color: "#fff" }}>Not there?</strong> Look in <strong>spam</strong> or{" "}
          <strong>promotions</strong> — a first email from a new sender often lands there. Drag it to
          your inbox so everything after it comes straight through.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[530px] flex-col items-center gap-3">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-2.5">
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={state === "loading"}
          autoComplete="given-name"
          aria-label="First name"
          className="h-[60px] w-full rounded-full px-5 text-[17px] outline-none"
          style={PILL}
        />
        <div className="relative w-full">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "loading"}
            autoComplete="email"
            aria-label="Email address"
            className="h-[60px] w-full rounded-full pl-5 pr-[190px] text-[17px] outline-none"
            style={PILL}
          />
          <button
            type="submit"
            disabled={state === "loading" || !consent}
            className="ps-cta absolute right-1.5 top-1.5 h-[48px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === "loading" ? "Sending…" : "Get 5 Free Chapters"}
          </button>
        </div>
      </form>

      <label className="flex w-full cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ accentColor: "rgb(13,222,51)" }}
        />
        <span
          className="text-[12px] leading-relaxed"
          style={{ color: "rgb(167,173,190)", fontFamily: "var(--font-ps-manrope), sans-serif" }}
        >
          Yes, email me the free chapters and tell me when the full book is ready. Unsubscribe
          anytime. See our{" "}
          <a href="/privacy" style={{ color: "rgb(13,222,51)", textDecoration: "underline" }}>
            privacy policy
          </a>
          .
        </span>
      </label>

      <div className="flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHECK_ICON} alt="" width={15} height={15} aria-hidden />
        <span
          className="text-[11px] font-medium"
          style={{
            color: state === "err" ? "#ff8b8b" : "rgb(167,173,190)",
            fontFamily: "var(--font-ps-manrope), sans-serif",
          }}
          aria-live="polite"
        >
          {state === "err" ? msg : "No spam, just genuine updates!"}
        </span>
      </div>
    </div>
  );
}
