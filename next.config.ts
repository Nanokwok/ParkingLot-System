import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
