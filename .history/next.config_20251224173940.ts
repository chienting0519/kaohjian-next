import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 Zeabur 部署必備
  output: "standalone", 
  
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;