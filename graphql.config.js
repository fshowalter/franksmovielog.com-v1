const gatsbyConfig = require("./.cache/typegen/graphql.config.json");

module.exports = {
  ...gatsbyConfig,
  exclude: ["src/**/*.fixtures.*", "*.js"],
};
