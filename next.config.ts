import type { NextConfig } from "next";

const cmsOrigin =
  process.env.NODE_ENV === "development" ? "*" : process.env.CMS_URL || "*";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: cmsOrigin },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-bumimik.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "crystal-phalangeal-concernedly.ngrok-free.dev",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
