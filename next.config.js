const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.alias["@splinetool/react-spline"] = path.resolve(
      "./node_modules/@splinetool/react-spline/dist/react-spline.js"
    );
    return config;
  },
};

module.exports = nextConfig;
