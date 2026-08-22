import type { NextConfig } from "next";
import { normalizeSiteApiHost } from "./lib/sisgesc";

function siteApiRemotePatterns() {
  const raw = process.env.SITE_API_HOST?.trim();
  if (!raw) return [];

  try {
    const url = new URL(normalizeSiteApiHost(raw));
    return [
      {
        protocol: (url.protocol.replace(":", "") || "https") as "http" | "https",
        hostname: url.hostname,
        port: url.port || "",
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: siteApiRemotePatterns(),
  },
};

export default nextConfig;
