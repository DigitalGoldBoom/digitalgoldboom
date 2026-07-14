"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { setPanelSoundVisible, type SectionToken } from "./filmBus";

/**
 * ModulePanel — ONE component for all four video modules; the page reads as a
 * chaptered film. State machine (build plan §3.4):
 *
 *   PLACEHOLDER  no master exists → code-only title board, NO play affordance
 *                (a play button that plays nothing is a dead pixel).
 *   POSTER       posterSrc set, video not yet playing → poster + play ring.
 *   PLAYING      videoSrc set + ≥50% in view (300ms debounce) → muted autoplay,
 *                captions burned into the file; "Tap for sound" pill.
 *   SOUND-ON     tap/click → unmute in place, native controls.
 *   OFFSCREEN    <25% visible → pause; 30s fully offscreen → unload src.
 *
 * Masters drop in later as pure prop swaps (posterSrc → videoSrc) — zero rework.
 * Analytics per dgb-conversion-analytics video taxonomy: `<section>_video_*`
 * with { module, video_version } props. Quartiles fire on max CONTINUOUSLY
 * reached time (scrub-guarded). Reduced-motion: no autoplay — poster + play ring,
 * tap = play with sound + controls.
 */

type Props = {
  section: SectionToken;
  module: "m1" | "m2" | "m3" | "m4";
  chip: string; // "01 · THE MODEL"
  title: string;
  promise: string; // the module's hook line, static text on the title board
  duration: string; // "2:20"
  posterSrc?: string;
  posterAlt?: string;
  videoSrc?: string;
  videoVersion?: string;
};

const QUARTILES = [0.25, 0.5, 0.75] as const;

export default function ModulePanel({
  section,
  module: mod,
  chip,
  title,
  promise,
  duration,
  posterSrc,
  posterAlt = "",
  videoSrc,
  videoVersion = "placeholder",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mountVideo, setMountVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [active, setActive] = useState(false); // ≥50% in view (border warm-up)
  const impressionFired = useRef(false);
  const playFired = useRef(false);
  const soundFired = useRef(false);
  const quartilesFired = useRef(new Set<number>());
  const maxReached = useRef(0);
  const lastTime = useRef(0);
  const offscreenTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playDebounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const props = { module: mod, video_version: videoVersion };

  /* Visibility machine: impression, pre-mount, autoplay, pause, unload. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    // Pre-mount the video element one viewport early (metadata only).
    const pre = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting) && videoSrc) {
          setMountVideo(true);
          pre.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    pre.observe(el);

    const io = new IntersectionObserver(
      (es) => {
        const e = es[0];
        const ratio = e?.intersectionRatio ?? 0;

        if (ratio >= 0.5) {
          setActive(true);
          if (!impressionFired.current) {
            impressionFired.current = true;
            track(`${section}_video_impression`, props);
          }
          clearTimeout(offscreenTimer.current);
          const v = videoRef.current;
          if (v && videoSrc && !reduced) {
            clearTimeout(playDebounce.current);
            playDebounce.current = setTimeout(() => {
              v.play().catch(() => {});
            }, 300);
          }
        } else {
          setActive(false);
          clearTimeout(playDebounce.current);
        }

        if (ratio < 0.25) {
          const v = videoRef.current;
          if (v && !v.paused) v.pause();
          if (ratio === 0) {
            // After 30s fully offscreen, unload to free memory (back to POSTER).
            clearTimeout(offscreenTimer.current);
            offscreenTimer.current = setTimeout(() => {
              setMountVideo(false);
              setPlaying(false);
              setSoundOn(false);
              setPanelSoundVisible(mod, false);
            }, 30_000);
          }
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    io.observe(el);

    return () => {
      pre.disconnect();
      io.disconnect();
      clearTimeout(offscreenTimer.current);
      clearTimeout(playDebounce.current);
      setPanelSoundVisible(mod, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc, section, mod, videoVersion]);

  /* The sticky pill hides while this panel is sound-on AND ≥50% visible. */
  useEffect(() => {
    setPanelSoundVisible(mod, soundOn && active);
  }, [soundOn, active, mod]);

  const onPlay = () => {
    setPlaying(true);
    if (!playFired.current) {
      playFired.current = true;
      track(`${section}_video_play`, props);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    // Scrub guard: only count time reached by continuous playback (≤1.5s steps).
    const t = v.currentTime;
    if (t - lastTime.current <= 1.5 && t > maxReached.current) maxReached.current = t;
    lastTime.current = t;
    const p = maxReached.current / v.duration;
    for (const q of QUARTILES) {
      if (p >= q && !quartilesFired.current.has(q)) {
        quartilesFired.current.add(q);
        track(`${section}_video_${q * 100}`, props);
      }
    }
    if (p >= 0.95 && !quartilesFired.current.has(1)) {
      quartilesFired.current.add(1);
      track(`${section}_video_complete`, props);
    }
  };

  const enableSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    v.muted = false;
    if (!soundOn) {
      setSoundOn(true);
      if (!soundFired.current) {
        soundFired.current = true;
        track(`${section}_video_sound_on`, props);
      }
    }
  };

  const restart = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const hasMedia = Boolean(videoSrc || posterSrc);

  return (
    <div ref={wrapRef} className="sfilm-panel" data-active={active}>
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <span key={c} aria-hidden className="sfilm-panel-tick" data-corner={c} />
      ))}

      {/* Chip + duration — panel chrome on every state */}
      <span
        className="v2-num absolute left-4 top-3 z-[3]"
        style={{ color: "var(--v2-gold)", letterSpacing: "0.22em" }}
      >
        {chip}
      </span>
      <span className="v2-num absolute right-4 top-3 z-[3]">{duration}</span>

      {!hasMedia ? (
        /* ── PLACEHOLDER title board (ships now): NO play affordance ── */
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p
            className="v2-display"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {title}
          </p>
          <p
            className="mt-3 max-w-[42ch] text-sm leading-relaxed"
            style={{ color: "var(--v2-dim)" }}
          >
            {promise}
          </p>
        </div>
      ) : (
        <>
          {posterSrc && (!mountVideo || !playing) && (
            <Image
              src={posterSrc}
              alt={posterAlt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
              priority={mod === "m1"}
            />
          )}
          {mountVideo && videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted={!soundOn}
              playsInline
              preload="metadata"
              controls={soundOn}
              onPlay={onPlay}
              onTimeUpdate={onTimeUpdate}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Play ring (poster / reduced-motion) or sound affordance */}
          {!playing ? (
            <button
              type="button"
              aria-label={`Play — ${title}`}
              onClick={() => {
                setMountVideo(true);
                enableSound();
              }}
              className="absolute left-1/2 top-1/2 z-[3] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ border: "1px solid var(--v2-gold)", background: "rgba(8,8,13,0.5)" }}
            >
              <span aria-hidden style={{ color: "var(--v2-gold)", fontSize: 18 }}>
                ▸
              </span>
            </button>
          ) : !soundOn ? (
            <button
              type="button"
              onClick={enableSound}
              className="absolute bottom-3 right-3 z-[3] rounded-full px-4 text-sm font-medium"
              style={{
                minHeight: 44,
                border: "1px solid var(--v2-line)",
                background: "rgba(8,8,13,0.7)",
                color: "#F4F4F7",
              }}
            >
              Tap for sound
            </button>
          ) : (
            <button
              type="button"
              aria-label="Restart video"
              onClick={restart}
              className="absolute right-3 top-10 z-[3] flex items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                border: "1px solid var(--v2-line)",
                background: "rgba(8,8,13,0.7)",
                color: "#F4F4F7",
              }}
            >
              ↺
            </button>
          )}
        </>
      )}
    </div>
  );
}
