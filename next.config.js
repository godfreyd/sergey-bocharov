/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    GOOGLE_ANALYTICS_ID: 'G-CNJ57JP8WE',
  },
}

module.exports = nextConfig
