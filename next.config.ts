import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pokemon/:path*', 
        destination: 'https://pokeapi.co/api/:path*',
      },
      {
        source: '/api/hotels/:path*',
        destination: 'http://176.108.253.5/hotels/:path*',
      },
    ];
  },
};

export default nextConfig;
