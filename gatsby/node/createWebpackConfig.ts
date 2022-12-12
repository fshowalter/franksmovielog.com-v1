import type { GatsbyNode } from "gatsby";

interface IWebPackConfig {
  plugins: IWebPackPlugin[];
}

interface IWebPackPlugin {
  constructor: {
    name: string;
  };
  options: {
    ignoreOrder: boolean;
  };
}

export const createWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  stage,
  getConfig,
}) => {
  if (stage === `develop` || stage === `build-javascript`) {
    const config = getConfig() as IWebPackConfig;

    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
    );

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }
};
