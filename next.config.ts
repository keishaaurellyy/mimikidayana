import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // localhost development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // ngrok tunnel (wildcard subdomain)
      {
        protocol: "https",
        hostname: "*.ngrok-free.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.ngrok-free.dev",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
