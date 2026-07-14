"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * PsContactForm — the PixelShovel contact form. Posts to /api/contact, which SAVES the message to
 * the database first and emails it second (see src/lib/contact.ts): the visitor is only ever shown
 * a thank-you once the message is genuinely stored.
 *
 * The `company` field is a honeypot — hidden from people, irresistible to bots.
 */
const FIELD: React.CSSProperties = {
  background: "rgb(33,33,33)",
  border: "1px solid rgb(0,0,0)",
  color: "rgb(225,227,233)",
  fontFamily: "var(--font-ps-rethink), sans-serif",
  fontWeight: 500,
};

export default function PsContactForm({ source = "ps-contact" }: { source?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMsg("");
    track("ps_contact_submit", { source });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, company, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setState("err");
        setMsg(data.message ?? "Something went wrong. Please try again.");
        track("ps_contact_fail", { source });
        return;
      }
      track("ps_contact_success", { source });
      setState("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState("err");
      setMsg("Network error. Please try again.");
      track("ps_contact_fail", { source });
    }
  };

  if (state === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full rounded-[var(--ps-r-card)] border p-8"
        style={{ borderColor: "rgb(13,222,51)", background: "rgba(13,222,51,0.07)" }}
      >
        <p className="text-[19px] font-semibold text-white">Message sent.</p>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgb(167,173,190)" }}>
          We have it, and a real person will get back to you — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={state === "loading"}
        autoComplete="name"
        aria-label="Your name"
        className="h-[60px] w-full rounded-full px-5 text-[17px] outline-none"
        style={FIELD}
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "loading"}
        autoComplete="email"
        aria-label="Your email"
        className="h-[60px] w-full rounded-full px-5 text-[17px] outline-none"
        style={FIELD}
      />
      <textarea
        required
        minLength={5}
        rows={6}
        placeholder="What can we help with?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={state === "loading"}
        aria-label="Your message"
        className="w-full resize-y rounded-[24px] px-5 py-4 text-[17px] outline-none"
        style={FIELD}
      />

      {/* Honeypot — off-screen, never announced, never tabbed to. */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={state === "loading"}
        className="ps-cta mt-1 h-[54px] justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Send message"}
      </button>

      <span
        className="text-[12px]"
        style={{
          color: state === "err" ? "#ff8b8b" : "rgb(167,173,190)",
          fontFamily: "var(--font-ps-manrope), sans-serif",
        }}
        aria-live="polite"
      >
        {state === "err" ? msg : "We reply to every message. No lists, no spam."}
      </span>
    </form>
  );
}
