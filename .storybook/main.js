const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");

    return config;
  },
  features: {
    storyStoreV7: false,
  },
};
