import Image from "next/image";

/**
 * PhotorealSlot — a clean SWAP POINT for the 5 author-manual Tier-4 photoreal images.
 *
 * The funnel is NOT blocked on image generation. Until the author delivers a real photoreal
 * file, this renders an on-brand, code-only decorative panel (a gold-lit dark field) — it is
 * deliberately ABSTRACT, never a fabricated scene/number/photo (compliance + "no placeholder
 * data" rule). The moment a real asset exists, pass `src` (+ `alt`) and it renders a properly
 * optimized next/image (explicit dimensions via the aspect box → zero CLS); nothing else about
 * the section changes.
 *
 *   <PhotorealSlot label="hero gold-mass" alt="…" />            // interim panel
 *   <PhotorealSlot label="hero gold-mass" src="/x.avif" alt="…" priority />  // shipped
 */
export default function PhotorealSlot({
  src,
  alt,
  label,
  aspect = "1 / 1",
  priority = false,
  tone = "gold",
  className = "",
}: {
  /** Real asset path once the author delivers it. Omit for the interim panel. */
  src?: string;
  alt: string;
  /** Short asset name — surfaced in a data-attr + dev comment so swaps are easy to find. */
  label: string;
  aspect?: string;
  priority?: boolean;
  /** "gold" = lit-from-within; "somber" = the muted documentary-cost still. */
  tone?: "gold" | "somber";
  className?: string;
}) {
  return (
    <div
      data-photoreal-slot={label}
      className={`relative overflow-hidden rounded-[22px] ${className}`}
      style={{ aspectRatio: aspect, border: "1px solid var(--v2-line)" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, 45vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        // Interim, code-only, decorative-only panel. Marked aria-hidden: it carries no meaning.
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "#0a0a12" }} />
          {tone === "gold" ? (
            <>
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(60% 55% at 50% 45%, rgba(232,178,58,0.28), rgba(232,178,58,0.06) 45%, transparent 72%)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(40% 35% at 50% 42%, rgba(255,238,200,0.22), transparent 60%)" }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(80% 70% at 50% 30%, rgba(120,120,140,0.10), transparent 65%), linear-gradient(180deg, rgba(20,20,28,0.2), rgba(6,6,12,0.8))" }}
            />
          )}
          {/* faint grain so the interim never looks like a flat error block */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.6px)",
              backgroundSize: "4px 4px",
            }}
          />
          <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)" }} />
        </div>
      )}
    </div>
  );
}
