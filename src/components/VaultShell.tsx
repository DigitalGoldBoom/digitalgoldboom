/**
 * VaultShell — the dark "Vault" page chrome: the .v2 scope that flips the design tokens to dark
 * so wrapped content darkens automatically. Drop any page's content inside it for the Vault look.
 *
 * The gold shimmer field is no longer mounted here — it lives ONCE in the root layout
 * (SiteBackground), so it stays continuous across every Vault page instead of re-popping on each
 * navigation. `dgb-vault-bg` makes this shell's base transparent so that single field shows through.
 */
export default function VaultShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 dgb-vault-bg relative overflow-clip">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
