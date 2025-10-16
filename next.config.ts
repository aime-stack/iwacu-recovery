import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
