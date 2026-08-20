import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// ESM import rather than require(): the require() form was the single error
// failing `npm run lint`. swcMinify was also dropped here, it is a no-op in
// Next 16.
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Enable compression (gzip/brotli)
  compress: true,

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    // dangerouslyAllowSVG was enabled with no SVGs anywhere in public/. Removed
    // rather than carry the XSS surface for nothing.
  },

  // Add caching headers for static assets
  async headers() {
    return [
      {
        source: '/Background1.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/usecases/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Optimize production builds
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withPWA(nextConfig);
