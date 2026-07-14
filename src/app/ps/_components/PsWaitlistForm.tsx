"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * PsWaitlistForm — the PixelShovel opt-in: first name + email in exchange for the first five
 * chapters of Digital Gold Boom. Posts to /api/subscribe, which stores the lead in the owned list
 * (Supabase) and mirrors it into Kit; the chapters arrive only in Kit's double opt-in confirmation
 * email, so the success state's whole job is to get the reader into their inbox.
 *
 * Design notes (deliberate departures from the Framer node it replaces):
 *   - The CTA is BELOW the fields, not floating inside the email pill. Inside the pill it stole
 *     ~150px of a ~330px phone input, leaving a slot too narrow to read your own address in.
 *   - Labels sit above their inputs. Placeholder-as-label vanishes the moment you type, which is
 *     exactly when a stranger filling a form most wants to check what they are being asked for.
 *   - The consent row is a real target (the whole row is the label, ≥44px tall) with a visible
 *     custom box — the 16px native checkbox was the hardest thing on the page to hit on a phone.
 *   - Errors land inline, in place, with aria-live, rather than as a colour change on a footnote.
 *
 * Radius system, held to across the block: inputs 14px, card 18px (--ps-r-card), CTA full pill.
 * Motion is limited to focus, press and reveal; all of it collapses under prefers-reduced-motion.
 */

type State = "idle" | "loading" | "ok" | "err";

export default function PsWaitlistForm({ source = "ps-home" }: { source?: string }) {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const errId = `${uid}-err`;

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>("idle");
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

  const busy = state === "loading";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;

    // Guard in the component, not just the markup: the consent box is what makes the mail legal.
    if (!consent) {
      setState("err");
      setMsg("Please tick the box so we can email you the chapters.");
      return;
    }

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
        // The API's own words: a rate-limit, a bad address and a store outage each need a
        // different response from the reader, and one generic line tells them none of it.
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
        className="w-full max-w-[540px] rounded-[18px] border p-6 sm:p-7"
        style={{ borderColor: "rgba(0,255,0,0.45)", background: "rgba(0,255,0,0.06)" }}
      >
        <p className="text-[19px] font-semibold leading-tight text-white">
          Almost there. Check your inbox.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ps-text-2)]">
          We sent a confirmation to{" "}
          <strong className="break-all font-semibold text-white">{sentTo}</strong>. Click the button
          inside it and your five chapters arrive straight away.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ps-text-3)]">
          Not there? Look in <span className="text-white">spam</span> or{" "}
          <span className="text-white">promotions</span>. A first email from a new sender often
          lands there. Drag it to your inbox and everything after it comes straight through.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[540px]" noValidate={false}>
      {/* Two fields, side by side once there is room for both to stay legible. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="ps-field-label">
            First name
          </label>
          <input
            id={nameId}
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={busy}
            autoComplete="given-name"
            placeholder="Andrew"
            className="ps-field"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="ps-field-label">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            aria-describedby={state === "err" ? errId : undefined}
            aria-invalid={state === "err" || undefined}
            className="ps-field"
          />
        </div>
      </div>

      {/* Consent — the whole row is the target, and the box is drawn big enough to hit. */}
      <label className="ps-consent group mt-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (state === "err") setState("idle");
          }}
          className="peer sr-only"
        />
        <span className="ps-consent-box" aria-hidden>
          <svg viewBox="0 0 16 16" className="ps-consent-tick" fill="none" aria-hidden>
            <path
              d="M3.5 8.4l3 3 6-6.8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[13px] leading-[1.5] text-[var(--ps-text-2)]">
          Email me the free chapters and tell me when the full book is ready. Unsubscribe any time.{" "}
          <a
            href="/privacy"
            className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
          >
            Privacy policy
          </a>
          .
        </span>
      </label>

      <button type="submit" disabled={busy} className="ps-submit mt-5">
        {busy ? "Sending…" : "Get 5 free chapters"}
      </button>

      <div className="mt-3 min-h-[20px]">
        {state === "err" ? (
          <p
            id={errId}
            role="alert"
            aria-live="assertive"
            className="text-[13px] font-medium text-[#ff8b8b]"
          >
            {msg}
          </p>
        ) : (
          <p className="text-[13px] text-[var(--ps-text-3)]">
            No payment. No spam. The chapters land in your inbox after one confirming click.
          </p>
        )}
      </div>
    </form>
  );
}
