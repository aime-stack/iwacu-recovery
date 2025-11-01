import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "iwacurecoverycentre.com", // non-www domain
          },
        ],
        destination: "https://www.iwacurecoverycentre.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;