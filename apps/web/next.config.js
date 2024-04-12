const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const createNextIntlPlugin = require('next-intl/plugin');
const securityHeaders = require('./securityHeaders');

const packages = ['@code-sync/translations', '@code-sync/ui'];

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: packages,
  experimental: {
    optimizePackageImports: [...packages, 'next-intl'],
    serverComponentsExternalPackages: ['@code-sync/logger'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: securityHeaders,
        missing: [
          { type: 'header', key: 'next-router-prefetch' },
          { type: 'header', key: 'purpose', value: 'prefetch' },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withBundleAnalyzer = createBundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [withNextIntl, withBundleAnalyzer];

const nextConfig = plugins.reduce(
  (config, plugin) => plugin(config),
  baseConfig,
);

module.exports = nextConfig;
