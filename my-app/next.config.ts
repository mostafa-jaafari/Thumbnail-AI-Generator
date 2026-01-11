import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add 100 to the allowed qualities
    domains: ["lh3.googleusercontent.com", "randomuser.me.com", "image.pollinations.ai"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [25, 50, 75, 100], // <--- Add this line
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "studious-disco-97xpqr4p9wwwc766g-3000.app.github.dev"
      ],
    },
  },
};

export default nextConfig;