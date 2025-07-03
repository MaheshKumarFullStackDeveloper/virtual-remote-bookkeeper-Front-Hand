import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // update with the domain you're loading from
        port: '',
        pathname: '/**',
      },
    ],

  }
};

export default nextConfig;
