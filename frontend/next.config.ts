import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/maps/:path*",
        destination: `${backendUrl}/api/v1/maps/:path*`,
      },
    ];
  },
};

export default nextConfig;