import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"],
  },
  reactCompiler: true,
};

export default nextConfig;
