import { NextResponse, type NextRequest } from "next/server";

/**
 * Host routing for the PixelShovel site.
 * pixelshovel.com (and www) is a separate brand served from the same app under /ps.
 * When that host hits the app, rewrite the root to /ps so visitors land on the
 * PixelShovel home at a clean address. /ps/* paths (its internal links) pass through.
 * digitalgoldboom.com and all other hosts are left completely untouched.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase().split(":")[0];
  const isPixelShovel = host === "pixelshovel.com" || host === "www.pixelshovel.com";
  if (!isPixelShovel) return NextResponse.next();

  const { pathname } = req.nextUrl;
  // Already on the PixelShovel subtree or an asset/api route — serve as-is.
  if (pathname === "/ps" || pathname.startsWith("/ps/")) return NextResponse.next();

  // Map the PixelShovel host onto the /ps subtree.
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/ps" : `/ps${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API and static files; run on real page routes only.
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
