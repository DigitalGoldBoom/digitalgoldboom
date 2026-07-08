"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * LeadMagnetForm — capture an email into Andrew's OWN database (Supabase via /api/subscribe) in
 * exchange for the first 5 chapters, delivered INSTANTLY (no email-sender needed): on a real 200
 * the success state reveals + auto-starts the download the API returns.
 *
 * Permission-based: a required consent checkbox (stored with a timestamp server-side) so the list
 * is lawful to email once a sender is connected. First-touch UTM/source captured on mount and sent
 * with the signup so we can see which promo drove it. PII-safe: the email is never sent to analytics
 * (track gets only `source`).
 */
export default function LeadMagnetForm({
  source = "home_lead_magnet",
  className = "",
}: {
  source?: string;
  className?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [download, setDownload] = useState("");
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
    track("lead_magnet_submit", { source });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          consent,
          source,
          utm: Object.keys(utm.current).length ? utm.current : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; download?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        track("lead_magnet_submit_fail", { source });
        return;
      }
      track("lead_magnet_success", { source });
      setDownload(data.download ?? "");
      setStatus("success");
      setEmail("");
      setFirstName("");
      if (data.download && typeof window !== "undefined") {
        const a = document.createElement("a");
        a.href = data.download;
        a.setAttribute("download", "");
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        track("lead_magnet_download", { source });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
      track("lead_magnet_submit_fail", { source });
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-[20px] border p-6 text-center ${className}`}
        style={{ borderColor: "rgba(232,178,58,0.4)", background: "rgba(232,178,58,0.08)" }}
      >
        <p style={{ color: "#F4F4F7", fontWeight: 600, fontSize: "1.05rem" }}>
          You&rsquo;re in — your 5 free chapters are downloading now.
        </p>
        {download ? (
          <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
            Didn&rsquo;t start?{" "}
            <a href={download} download className="v2-gold" style={{ textDecoration: "underline" }}>
              Download the chapters here
            </a>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="lm-first" className="sr-only">
          First name (optional)
        </label>
        <input
          type="text"
          id="lm-first"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          disabled={status === "loading"}
          className="v2-input sm:w-[38%]"
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
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className="v2-input flex-1"
          autoComplete="email"
        />
      </div>

      <label className="mt-4 flex items-start gap-3 text-left cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--v2-gold)]"
          style={{ accentColor: "#E8B23A" }}
        />
        <span className="text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Yes, email me the free chapters and occasional updates. Unsubscribe anytime. See our{" "}
          <a href="/privacy" className="v2-gold" style={{ textDecoration: "underline" }}>
            privacy policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="v2-btn mt-5 w-full"
      >
        {status === "loading" ? "Sending…" : "Get the first 5 chapters free"}
      </button>

      {status === "error" ? (
        <p role="status" aria-live="polite" className="mt-2 text-sm" style={{ color: "#ff8b8b" }}>
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-center" style={{ color: "var(--v2-faint)" }}>
          Free chapters, instant download. Educational — not financial advice.
        </p>
      )}
    </form>
  );
}
