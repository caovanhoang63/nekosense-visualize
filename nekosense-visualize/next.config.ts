import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    images: {
        domains: ['www.google.com'],
    },
};

export default nextConfig;
