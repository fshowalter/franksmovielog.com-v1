import path from "path";
import {
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "../type-definitions";
import findReviewedMovieNode from "../utils/findReviewedMovieNode";
import resolveFieldForNode from "../utils/resolveFieldForNode";

export default {
  type: "File!",
  resolve: async (
    source: { imdb_id: string },
    args: GatsbyResolveArgs,
    context: GatsbyNodeContext,
    info: GatsbyResolveInfo
  ) => {
    const reviewedMovie = await findReviewedMovieNode(
      source.imdb_id,
      context.nodeModel
    );

    if (!reviewedMovie) {
      return await context.nodeModel.findOne({
        type: "File",
        query: {
          filter: {
            absolutePath: {
              eq: path.resolve(`./content/assets/posters/default.png`),
            },
          },
        },
      });
    }

    return resolveFieldForNode("poster", reviewedMovie, context, info, args);
  },
};
