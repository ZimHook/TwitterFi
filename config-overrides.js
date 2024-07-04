const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

function getFileLoaderRule(rules) {
  for (const rule of rules) {
    if ("oneOf" in rule) {
      const found = getFileLoaderRule(rule.oneOf);
      if (found) {
        return found;
      }
    } else if (rule.test === undefined && rule.type === "asset/resource") {
      return rule;
    }
  }
}

module.exports = {
  webpack: function (config, env) {
    const fileLoaderRule = getFileLoaderRule(config.module.rules);
    if (!fileLoaderRule) {
      throw new Error("File loader not found");
    }
    fileLoaderRule.exclude.push(/\.cjs$/);
    config.resolve.alias = {
      "@": path.resolve("src"),
    };
    config.ignoreWarnings = [(warning) => true];
    config.plugins = [...config.plugins, new NodePolyfillPlugin()];
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      //add devserver config
      return config;
    };
  },
};
