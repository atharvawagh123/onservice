import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverMinification: false,
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  output: "standalone",
  productionBrowserSourceMaps: false,
};

export default nextConfig;
