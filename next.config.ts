import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images:{
    domains: ['mybillbook.in','utfs.io'],
  },
  serverExternalPackages:["@node-rs/argon2"],
};

export default nextConfig;
