const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const createNextIntlPlugin = require('next-intl/plugin');

const packages = ['@code-sync/translations'];

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: packages,
  experimental: {
    optimizePackageImports: [...packages, 'next-intl'],
    typedRoutes: true,
    serverComponentsExternalPackages: ['@code-sync/logger'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withBundleAnalyzer = createBundleAnalyzerPlugin({
  enabled: process.env['BUILD_ANALYZE'] === 'true',
});

const plugins = [withNextIntl, withBundleAnalyzer];

const nextConfig = plugins.reduce(
  (config, plugin) => plugin(config),
  baseConfig,
);

module.exports = nextConfig;
