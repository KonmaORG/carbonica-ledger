/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { experiments: any }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

module.exports = nextConfig;
