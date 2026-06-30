import ShimmerDots from "@/components/ShimmerDots";

/**
 * VaultShell — the dark "Vault" page chrome: a fixed gold-shimmer field + dark vignette behind,
 * and the .v2 scope that flips the design tokens to dark so wrapped content darkens automatically.
 * Drop any page's content inside it to put it in the Vault look.
 */
export default function VaultShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 relative overflow-clip">
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        <ShimmerDots opacity={0.4} />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 50% at 50% -5%, rgba(232,178,58,0.10), transparent 55%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,8,13,0.25), rgba(8,8,13,0.82))" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
