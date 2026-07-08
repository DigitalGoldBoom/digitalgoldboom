import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern formats from every <Image>: browsers get AVIF (smallest) or WebP,
  // regardless of the PNG/JPG source the optimizer reads. Free weight win site-wide.
  images: {
    formats: ["image/avif", "image/webp"],
    // PixelShovel assets are served from the Framer CDN for now (self-host later).
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "app.framerstatic.com" },
    ],
  },
  // Cache static raw assets for a day, but allow revalidation (no `immutable`) so updating a
  // file in place — e.g. swapping the book cover — actually shows up instead of being pinned.
  // (When asset filenames are content-hashed later, this can go back to long immutable.)
  async headers() {
    // Content-Security-Policy scoped to exactly the origins this site uses:
    // - scripts: self + LemonSqueezy (lemon.js checkout overlay) + Vercel analytics
    // - styles/fonts: self + inline (next/font is self-hosted; many inline styles in the design)
    // - images: self + the Framer image CDN (PixelShovel assets) + data/blob
    // - connect: self (/api) + LemonSqueezy + Vercel vitals
    // - frames: LemonSqueezy checkout overlay only
    // - clickjacking + injection locked down (frame-ancestors, base-uri, object-src none)
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // 'wasm-unsafe-eval' — Three.js KTX2/basis texture transcoder for the /deposit 3D hero.
      // 'unsafe-eval' is added ONLY in development (React dev tooling needs it); never in prod.
      // lmsqueezy.com (not a lemonsqueezy.com subdomain — LemonSqueezy's separate short domain)
      // serves the affiliate tracking script (affiliate.js) used site-wide for referral attribution.
      `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://app.lemonsqueezy.com https://lmsqueezy.com https://va.vercel-scripts.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://framerusercontent.com https://app.framerstatic.com",
      "font-src 'self' data:",
      // blob: — Three.js/GLTFLoader loads embedded GLB textures via blob URLs (the /deposit 3D hero)
      "connect-src 'self' blob: https://*.lemonsqueezy.com https://lmsqueezy.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "worker-src 'self' blob:",
      "frame-src https://*.lemonsqueezy.com",
      "form-action 'self' https://*.lemonsqueezy.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      { key: "Content-Security-Policy", value: csp },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ];

    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/:dir(book3d-framer|images|press|hero-shimmer|nav-framer)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The book (Ch 7) prints digitalgoldboom.com/partners — every reader who types it
      // must land on the affiliate program, not a 404. Permanent: the book URL never changes.
      { source: "/partners", destination: "/affiliates", permanent: true },
      { source: "/prices", destination: "/live", permanent: true },
      { source: "/news", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
