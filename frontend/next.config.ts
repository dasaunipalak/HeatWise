import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/maps/:path*",
        destination: "http://localhost:8000/api/v1/maps/:path*",
      },
    ];
  },
};

export default nextConfig;
