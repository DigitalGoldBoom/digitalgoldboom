/**
 * Is the visitor looking at the PixelShovel site?
 *
 * PixelShovel lives under /ps, but middleware REWRITES pixelshovel.com/ onto that
 * subtree — a rewrite keeps the browser URL at "/", so usePathname() reports "/" there.
 * A path-only check therefore misses the real PixelShovel host and the Digital Gold Boom
 * chrome renders a second time on top of PixelShovel's own nav/footer. Check the host too.
 *
 * The hostname read is safe during hydration: it runs on the client's first render (not in
 * an effect), so the client agrees with the server, which prerendered the real /ps route.
 */
export function isPixelShovelView(pathname: string): boolean {
  if (pathname === "/ps" || pathname.startsWith("/ps/")) return true;

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    return host === "pixelshovel.com" || host === "www.pixelshovel.com";
  }

  return false;
}
