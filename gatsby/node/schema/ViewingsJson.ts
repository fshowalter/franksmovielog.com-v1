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

export interface ViewingNode extends GatsbyNode {
  imdb_id: string;
  sequence: number;
}

export default {
  name: SchemaNames.VIEWINGS_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    release_date: "String!",
    viewing_date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    viewing_year: "Int!",
    sequence: "Int!",
    venue: "String",
    medium: "String",
    medium_notes: "String",
    sort_title: "String!",
    genres: "[String!]!",
    reviewedMovie: {
      type: SchemaNames.REVIEWED_MOVIES_JSON,
      resolve: async (
        source: ViewingNode,
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        return await findReviewedMovieNode(source.imdb_id, context.nodeModel);
      },
    },
    viewingNotes: {
      type: SchemaNames.MARKDOWN_REMARK,
      resolve: async (
        source: ViewingNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        return await context.nodeModel.findOne({
          type: SchemaNames.MARKDOWN_REMARK,
          query: {
            filter: {
              fileAbsolutePath: {
                regex: `//viewing_notes/${source.sequence
                  .toString()
                  .padStart(4, "0")}-.*/`,
              },
            },
          },
        });
      },
    },
    poster: {
      type: "File",
      resolve: async (
        source: ViewingNode,
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
  extensions: {
    infer: false,
  },
};
