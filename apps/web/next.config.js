const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const createNextIntlPlugin = require('next-intl/plugin');
const securityHeaders = require('./securityHeaders');
const cacheHeaders = require('./cacheHeaders');
const path = require('path');

const packages = ['@code-sync/translations', '@code-sync/ui'];

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: packages,
  output: 'standalone',
  experimental: {
    optimizePackageImports: [...packages, 'next-intl'],
    serverComponentsExternalPackages: ['@code-sync/logger'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [...securityHeaders, ...cacheHeaders];
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
