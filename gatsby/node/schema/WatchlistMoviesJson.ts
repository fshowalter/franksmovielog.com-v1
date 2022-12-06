import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import posterResolver from "./resolvers/posterResolver";
import { reviewedMovieResolver } from "./resolvers/reviewedMovieResolver";
import type { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { SchemaNames } from "./schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "./type-definitions";
import type { WatchlistEntityNode } from "./WatchlistEntitiesJson";

export interface WatchlistMovieNode extends GatsbyNode {
  imdbId: string;
  performerImdbIds: string[];
  directorImdbIds: string[];
  writerImdbIds: string[];
  collectionNames: string[];
  reviewedMovie: ReviewedMovieNode | null;
}

const WatchlistMoviesJson = {
  name: SchemaNames.WATCHLIST_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "Int!",
    imdbId: "String!",
    sortTitle: "String!",
    releaseDate: "String!",
    collectionNames: "[String!]!",
    directorImdbIds: "[String!]!",
    performerImdbIds: "[String!]!",
    writerImdbIds: "[String!]!",
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
                imdbId: { in: source.directorImdbIds },
                entityType: { eq: "director" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        if (!entries) {
          return [];
        }

        return Array.from(entries.map((node) => node.name));
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
                imdbId: { in: source.performerImdbIds },
                entityType: { eq: "performer" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        return Array.from(entries.map((node) => node.name));
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
                imdbId: { in: source.writerImdbIds },
                entityType: { eq: "writer" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        return Array.from(entries.map((node) => node.name));
      },
    },
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      resolve: reviewedMovieResolver(),
    },
    poster: posterResolver,
  },
  extensions: {
    infer: false,
  },
};

export default function buildWatchlistMoviesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(WatchlistMoviesJson)];
}
