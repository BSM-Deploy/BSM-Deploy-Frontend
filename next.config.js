/** @type {import('next').NextConfig} */

const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProduction,
  register: true,
  skipWaiting: true,
});

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

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

const config = {
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
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

const nextConfig = withPWA(config);

module.exports = nextConfig;

// module.exports = withPlugins(
//   [
//     withBundleAnalyzer({
//       compress: true,
//       webpack: (config, { webpack }) => {
//         const plugins = [...config.plugins];
//         return {
//           ...config,
//           mode: isProduction ? "production" : "development",
//           devtool: isProduction ? "hidden-source-map" : "eval",
//           plugins,
//         };
//       },
//     }),
//   ],
//   nextConfig,
// );
