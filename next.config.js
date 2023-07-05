const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  webpack(config, { nextRuntime }) { 
    // as of Next.js latest versions, the nextRuntime is preferred over `isServer`, because of edge-runtime
    if (typeof nextRuntime === "undefined") {
      const { IgnorePlugin } = require("webpack");
      const ignoreFs = new IgnorePlugin({ resourceRegExp: /fs/ });
      config.plugins.push(ignoreFs);
    }

    return config;
  },
  i18n,
};

module.exports = nextConfig;