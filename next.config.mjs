/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    // Screens are the evidence, so they are served at the higher quality the
    // AssetFrame asks for. Next 16 refuses any quality not listed here.
    qualities: [75, 90],
  },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
}
export default nextConfig
