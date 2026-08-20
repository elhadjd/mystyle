import type { NextConfig } from "next";

function siteApiRemotePatterns() {
  const host = process.env.SITE_API_HOST?.trim();
  if (!host) return [];

  try {
    const url = new URL(host);
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
