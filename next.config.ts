import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
