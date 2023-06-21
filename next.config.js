/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const CompressionPlugin = require("compression-webpack-plugin");

const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["auth.bssm.kro.kr"],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  experimental: { appDir: true },
  webpack: (config) => {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
};

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      compress: true,
      webpack: (config, { webpack }) => {
        const prod = process.env.NODE_ENV === "production";
        const plugins = [...config.plugins];
        return {
          ...config,
          mode: prod ? "production" : "development",
          devtool: prod ? "hidden-source-map" : "eval",
          plugins,
        };
      },
    }),
  ],
  nextConfig
);
