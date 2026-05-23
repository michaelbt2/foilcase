import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/browse',
        destination: '/market',
        permanent: true,
      },
    ]
  },
}

export default nextConfig