/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    scrollRestoration: true,
    legacyBrowsers: false,
    esmExternals: 'loose'
  },
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
