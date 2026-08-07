/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin tracing to this project — a stray lockfile in the home directory
  // otherwise makes Next infer the wrong workspace root.
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
