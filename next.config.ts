import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all origins in dev (Tailscale access)
  allowedDevOrigins: ["*"],
};

export default nextConfig;
