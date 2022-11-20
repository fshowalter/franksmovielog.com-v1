import { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { SchemaNames } from "./schemaNames";
import { GatsbyNodeContext } from "./type-definitions";
import findReviewedMovieNode from "./utils/findReviewedMovieNode";

export default {
  Query: {
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}!`,
      args: {
        imdbId: "String!",
      },
      resolve: async (
        _source: ReviewedMovieNode,
        args: { imdbId: string },
        context: GatsbyNodeContext
      ) => {
        return findReviewedMovieNode(args.imdbId, context.nodeModel);
      },
    },
  },
};
