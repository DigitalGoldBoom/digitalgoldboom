"use client";

import { useEffect, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

const KEY = "dgb_live_unlocked";

/**
 * LiveGate — soft email gate for the live dashboard. Shows a blurred preview with an email-capture
 * overlay; on submit it subscribes the visitor and reveals the data, remembering the unlock in
 * localStorage so returning visitors aren't asked again.
 */
export default function LiveGate({ children }: { children: React.ReactNode }) {
  // Locked by DEFAULT (including server render + first paint) so the gate is always there for a
  // direct /live visit — it only lifts once we confirm this visitor already unlocked. Promoted in
  // the book, so it must never flash the dashboard before the gate.
  const [locked, setLocked] = useState(true);
  // false until localStorage has been read — see the note by `showGate` below.
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setLocked(false);
    } catch {}
    setReady(true);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "live-gate" }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { message?: string };
        setStatus("error");
        setMsg(d.message ?? "Try again.");
        return;
      }
      track("live_gate_unlock");
      try {
        localStorage.setItem(KEY, "1");
      } catch {}
      setLocked(false);
    } catch {
      setStatus("error");
      setMsg("Network error. Try again.");
    }
  }

  // `locked` starts TRUE (server render + first paint) so a direct /live visit is never able to flash
  // the dashboard before the gate — the page is promoted in the book, so that leak must not happen.
  // But it means a visitor who ALREADY unlocked gets the gate thrown in their face for the split
  // second before this effect reads localStorage. That is the "bad bug" Andrew saw: he has given his
  // email, and the site still slams a modal at him on every visit.
  //
  // `ready` is the third state the component was missing: WE DO NOT KNOW YET. Until localStorage has
  // been read, the content stays blurred (so nothing leaks) but NO overlay is drawn (so nobody who
  // has already paid gets asked again). One tick later we know, and either it clears or the gate
  // appears. The gate is now only ever shown to someone we have actually established is locked out.
  const hidden = locked;
  const showGate = ready && locked;

  return (
    <div className="relative">
      <div
        aria-hidden={hidden}
        style={hidden ? { filter: "blur(9px)", pointerEvents: "none", userSelect: "none" } : undefined}
      >
        {children}
      </div>

      {showGate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-6" style={{ background: "rgba(8,8,13,0.72)" }}>
          <div className="v2-tile w-full max-w-[460px] p-8 md:p-10 text-center" style={{ background: "rgba(13,13,21,0.94)" }}>
            <p className="v2-eyebrow mb-5" style={{ justifyContent: "center" }}>Live data</p>
            <h2 className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}>
              See every number, <span className="v2-gold">live.</span>
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--v2-dim)" }}>
              COMEX spot, AISC, BIV and the full three-year forecast — refreshed live. Enter your email for free, instant access.
            </p>
            <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-3">
              <label htmlFor="live-gate-email" className="sr-only">Email address</label>
              <input
                id="live-gate-email" type="email" required autoComplete="email" inputMode="email"
                value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === "submitting"}
                placeholder="you@email.com" className="v2-input"
              />
              <button type="submit" className="v2-btn" disabled={status === "submitting"}>
                {status === "submitting" ? "Unlocking…" : "Unlock the live dashboard"}
              </button>
            </form>
            <p className="mt-3 text-xs" role="status" aria-live="polite" style={{ color: "var(--v2-faint)" }}>
              {status === "error" ? <span style={{ color: "#ff7a7a" }}>{msg}</span> : "Free. No spam. Unsubscribe anytime."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
