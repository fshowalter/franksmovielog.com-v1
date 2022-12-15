import {
  GatsbyFieldConfig,
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "../type-definitions";
import addReviewLinks from "../utils/addReviewLinks";

interface MarkdownNode extends GatsbyNode {
  html: string;
}

export const linkReviewedMoviesExtension = {
  name: `linkReviewedMovies`,
  extend(
    _options: Record<string, unknown>,
    prevFieldConfig: GatsbyFieldConfig
  ) {
    const { resolve } = prevFieldConfig;
    return {
      resolve: async (
        source: MarkdownNode,
        args: Record<string, unknown>,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        if (!resolve) {
          return "";
        }

        const fieldValue = (await resolve(
          source,
          args,
          context,
          info
        )) as string;

        return await addReviewLinks(fieldValue, context.nodeModel);
      },
    };
  },
};
