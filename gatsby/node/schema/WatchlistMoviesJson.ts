import path from "path";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import findReviewedMovieNode from "./utils/findReviewedMovieNode";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import type { WatchlistEntityNode } from "./WatchlistEntitiesJson";

export interface WatchlistMovieNode extends GatsbyNode {
  sequence: number;
  imdb_id: string;
  performer_imdb_ids: string[];
  director_imdb_ids: string[];
  writer_imdb_ids: string[];
  collection_names: string[];
}

const WatchlistMoviesJson = {
  name: SchemaNames.WATCHLIST_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    sort_title: "String!",
    release_date: "String!",
    director_imdb_ids: "[String!]!",
    performer_imdb_ids: "[String!]!",
    writer_imdb_ids: "[String!]!",
    collection_names: "[String!]!",
    directorNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdb_id: { in: source.director_imdb_ids },
                entity_type: { eq: "director" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        if (!entries) {
          return [];
        }

        return entries.map((node) => node.name);
      },
    },
    performerNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdb_id: { in: source.performer_imdb_ids },
                entity_type: { eq: "performer" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        return entries.map((node) => node.name);
      },
    },
    writerNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdb_id: { in: source.writer_imdb_ids },
                entity_type: { eq: "writer" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        return entries.map((node) => node.name);
      },
    },
    lastReviewDate: {
      type: "Date",
      extensions: {
        dateformat: {},
      },
      resolve: async (
        source: WatchlistMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return null;
        }

        return resolveFieldForNode(
          "lastReviewDate",
          reviewedMovie,
          context,
          info,
          args
        );
      },
    },
    lastReviewGrade: {
      type: "String",
      resolve: async (
        source: WatchlistMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return null;
        }

        return resolveFieldForNode(
          "lastReviewGrade",
          reviewedMovie,
          context,
          info,
          args
        );
      },
    },
    lastReviewGradeValue: {
      type: "Int",
      resolve: async (
        source: WatchlistMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return null;
        }

        return resolveFieldForNode(
          "lastReviewGradeValue",
          reviewedMovie,
          context,
          info,
          args
        );
      },
    },
    reviewedMovieSlug: {
      type: "String",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return null;
        }

        return reviewedMovie.slug;
      },
    },
    poster: {
      type: "File",
      resolve: async (
        source: WatchlistMovieNode,
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

export default WatchlistMoviesJson;
