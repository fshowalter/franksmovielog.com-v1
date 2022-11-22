import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import findDefaultPosterNode from "./utils/findDefaultPosterNode";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import reviewedMovieResolver, {
  findReviewedMovieNode,
} from "./utils/reviewedMovieResolver";

export interface MostWatchedMovieNode extends GatsbyNode {
  imdb_id: string;
}

const MostWatchedMovie = {
  name: SchemaNames.MOST_WATCHED_MOVIE,
  fields: {
    viewing_count: "Int!",
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    reviewedMovie: reviewedMovieResolver,
    poster: {
      type: "File",
      resolve: async (
        source: MostWatchedMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return await findDefaultPosterNode(context.nodeModel);
        }

        return resolveFieldForNode(
          "poster",
          reviewedMovie,
          context,
          info,
          args
        );
      },
    },
  },
};

export default MostWatchedMovie;
