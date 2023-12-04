import path from "path";
import {
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "../../type-definitions";
import { resolveFieldForNode } from "../../utils/resolveFieldForNode";
import { findReviewedMovieNode } from "./reviewedTitleFieldResolver";

export const posterFieldResolver = {
  type: "File!",
  resolve: async (
    source: { imdbId: string },
    args: GatsbyResolveArgs,
    context: GatsbyNodeContext,
    info: GatsbyResolveInfo,
  ) => {
    const reviewedMovie = await findReviewedMovieNode(
      source.imdbId,
      context.nodeModel,
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

    return resolveFieldForNode({
      fieldName: "poster",
      source: reviewedMovie,
      context,
      info,
      args,
    });
  },
};
