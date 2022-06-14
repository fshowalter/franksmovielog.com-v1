const babelOptions = {
  presets: [
    ["babel-preset-gatsby", { reactRuntime: "automatic" }],
    "@babel/preset-typescript",
  ],
};

module.exports = require("babel-jest").default.createTransformer(babelOptions);
