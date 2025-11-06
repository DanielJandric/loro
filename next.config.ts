import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoids workspace root inference warning with multiple lockfiles
    root: __dirname,
  },
};

export default nextConfig;
