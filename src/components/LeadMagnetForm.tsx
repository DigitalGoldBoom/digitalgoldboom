"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * LeadMagnetForm — capture an email into Andrew's OWN list (Upstash via /api/subscribe) in
 * exchange for the first 5 chapters, delivered INSTANTLY (no email-sender needed): on a real 200
 * the success state reveals + auto-starts the download the API returns. PII-safe: the email is
 * never sent to analytics (track gets only `source`). Mirrors the Hero submit pattern — status is
 * set from the REAL response, track() only after a confirmed success.
 */
export default function LeadMagnetForm({
  source = "home_lead_magnet",
  className = "",
}: {
  source?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [download, setDownload] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    track("lead_magnet_submit", { source });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
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
      // Auto-start the download so the reader gets their chapters immediately.
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
        <label htmlFor="lead-magnet-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="lead-magnet-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className="v2-input flex-1"
          autoComplete="email"
        />
        <button type="submit" disabled={status === "loading"} className="v2-btn whitespace-nowrap">
          {status === "loading" ? "Sending…" : "Get the first 5 chapters free"}
        </button>
      </div>
      {status === "error" ? (
        <p role="status" aria-live="polite" className="mt-2 text-sm" style={{ color: "#ff8b8b" }}>
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs" style={{ color: "var(--v2-faint)" }}>
          Free chapters, instant download. No spam — unsubscribe anytime. Educational, not financial advice.
        </p>
      )}
    </form>
  );
}
