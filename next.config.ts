import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'www.sernet.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.vitrissimo.fr',
      },

    ],
  },
};

export default nextConfig;
