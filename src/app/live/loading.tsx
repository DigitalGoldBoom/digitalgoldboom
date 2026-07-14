import VaultShell from "@/components/VaultShell";

/**
 * /live loading skeleton.
 *
 * THE BUG THIS FIXES: it rendered a bare <main> with `background: var(--bg-canvas)` — and OUTSIDE
 * the `.v2` scope that token is **#FAFAF9, a near-white**. The dark override (`--bg-canvas:
 * transparent`) only applies inside `.v2`, which VaultShell provides, and this file never used it.
 * So every visit to /live flashed a FULL-SCREEN WHITE PAGE on a black site. It looked exactly like a
 * crash, which is how Andrew reported it.
 *
 * It is wrapped in VaultShell now — the same shell the real page uses — so the skeleton is drawn on
 * the same dark canvas as the thing it stands in for. A loading state should be invisible: the
 * reader should not be able to tell where the wait ended and the page began.
 *
 * The lesson generalises, and it is why the tokens are named the way they are: a raw `var(--bg-*)`
 * token OUTSIDE the `.v2` scope resolves to the LIGHT theme. Any file that paints a background and
 * does not sit inside VaultShell will do this again.
 */
export default function Loading() {
  return (
    <VaultShell>
      <main className="min-h-screen pt-16">
        <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-10">
            <div className="mb-3 h-3 w-24 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="mb-2 h-8 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="h-4 w-2/3 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-[20px] border"
                style={{
                  borderColor: "var(--v2-line)",
                  background: "rgba(255,255,255,0.03)",
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </VaultShell>
  );
}
