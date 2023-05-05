/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config,{ isServer }) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // // Add file-loader rule to handle .ttf files
    // config.module.rules.push({
    //   test: /\.ttf$/,
    //   use: "file-loader",
    // });
    // // Add html-loader rule to handle .html files
    // config.module.rules.push({
    //   test: /\.html$/,
    //   use: "html-loader",
    // });

    // config.module.rules.push({
    //   test: /\.map$/,
    //   loader: "null-loader",
    // });

    // if (!isServer) {
    //   // Exclude Puppeteer and Playwright-core from the client-side bundle
    //   config.externals = {
    //     puppeteer: 'require("puppeteer")',
    //     'playwright-core': 'require("playwright-core")',
    //   };
    // }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
    ],
  },
};

module.exports = nextConfig;
