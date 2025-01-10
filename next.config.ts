import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images:{
    domains: ['mybillbook.in','utfs.io','sq75y4yd7b.ufs.sh'],
  },
  serverExternalPackages:["@node-rs/argon2"],
};

export default nextConfig;
