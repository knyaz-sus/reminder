import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/today",
        permanent: false,
      },
      {
        source: "/auth",
        destination: "/auth/signin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
