import type { CreateWebpackConfigArgs } from "gatsby";
import type { Configuration, WebpackPluginInstance } from "webpack";

interface MiniCssExtractPlugin extends WebpackPluginInstance {
  options: {
    ignoreOrder: boolean;
  };
}

export default function createWebpackConfig({
  actions,
  stage,
  plugins,
  getConfig,
}: CreateWebpackConfigArgs) {
  // get current webpack config
  const config = getConfig() as Configuration;

  if (!config.plugins) {
    return;
  }

  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
  ) as MiniCssExtractPlugin;

  if (miniCssExtractPlugin && miniCssExtractPlugin.options) {
    miniCssExtractPlugin.options.ignoreOrder = true;
  }

  // override config only during
  // production JS & CSS build
  if (stage === "build-javascript") {
    // our new cssnano options
    // are still based on default preset
    const options = {
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            calc: false,
          },
        ],
      },
    };

    if (config.optimization && config.optimization.minimizer) {
      // find CSS minimizer
      const minifyCssIndex = config.optimization.minimizer.findIndex(
        (minimizer) =>
          minimizer.constructor.name === "OptimizeCssAssetsWebpackPlugin"
      );
      // if found, overwrite existing CSS minimizer with the new one
      if (minifyCssIndex && minifyCssIndex > -1) {
        config.optimization.minimizer[minifyCssIndex] = plugins.minifyCss(
          options
        ) as WebpackPluginInstance;
      }
    }
  }

  // replace webpack config with the modified object
  actions.replaceWebpackConfig(config);
}
