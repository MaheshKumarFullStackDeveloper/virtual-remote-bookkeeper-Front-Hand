import type { NextConfig } from "next";
const allowedOrigins: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // or '500kb', '3mb', etc.
      allowedOrigins: [allowedOrigins]
    }
  }

};

export default nextConfig;