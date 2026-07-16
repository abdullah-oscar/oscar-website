import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack doesn't get
  // confused by other lockfiles higher up the filesystem.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
