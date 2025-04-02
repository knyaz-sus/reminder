import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mjhoedbqqtdajctqrurl.supabase.co",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/today",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/auth/signin",
        permanent: true,
      },
    ];
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
