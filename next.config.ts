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
    return [
      {
        source: "/:dir(book3d-framer|images|press|hero-shimmer|nav-framer)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
