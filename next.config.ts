import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pokemon/:path*', 
        destination: 'https://pokeapi.co/api/v2/pokemon/:path*',
      },
    ];
  },
};

export default nextConfig;
