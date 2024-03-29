const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const createNextIntlPlugin = require('next-intl/plugin');

const packages = ['@code-sync/translations', '@code-sync/logger'];

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: packages,
  experimental: {
    optimizePackageImports: [...packages, 'next-intl'],
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
