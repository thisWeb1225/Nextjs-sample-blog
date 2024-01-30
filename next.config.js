const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
  i18n,
};

module.exports = nextConfig;
