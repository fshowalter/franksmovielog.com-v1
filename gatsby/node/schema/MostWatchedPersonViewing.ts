import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import findDefaultPosterNode from "./utils/findDefaultPosterNode";
import findReviewedMovieNode from "./utils/findReviewedMovieNode";
import resolveFieldForNode from "./utils/resolveFieldForNode";

export interface MostWatchedPersonViewingNode extends GatsbyNode {
  imdb_id: string;
}

const MostWatchedPersonViewing = {
  name: SchemaNames.MOST_WATCHED_PERSON_VIEWING,
  fields: {
    sequence: "Int!",
    imdb_id: "String!",
    venue: "String",
    medium: "String",
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    title: "String!",
    year: "Int!",
    reviewedMovie: {
      type: SchemaNames.REVIEWED_MOVIES_JSON,
      resolve: async (
        source: MostWatchedPersonViewingNode,
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        return await findReviewedMovieNode(source.imdb_id, context.nodeModel);
      },
    },
    poster: {
      type: "File!",
      resolve: async (
        source: MostWatchedPersonViewingNode,
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

export default MostWatchedPersonViewing;
