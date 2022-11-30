import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import posterResolver from "./resolvers/posterResolver";
import type { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { SchemaNames } from "./schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "./type-definitions";
import type { WatchlistEntityNode } from "./WatchlistEntitiesJson";

export interface WatchlistMovieNode extends GatsbyNode {
  imdbId: string;
  performer_imdb_ids: string[];
  director_imdb_ids: string[];
  writer_imdb_ids: string[];
  collectionNames: string[];
  reviewedMovie: ReviewedMovieNode | null;
}

const WatchlistMoviesJson = {
  name: SchemaNames.WATCHLIST_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "Int!",
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    sortTitle: {
      type: "String!",
      extensions: {
        proxy: {
          from: "sort_title",
        },
      },
    },
    releaseDate: {
      type: "String!",
      extensions: {
        proxy: {
          from: "release_date",
        },
      },
    },
    collectionNames: {
      type: "[String!]!",
      extensions: {
        proxy: {
          from: "collection_names",
        },
      },
    },
    director_imdb_ids: "[String!]!",
    performer_imdb_ids: "[String!]!",
    writer_imdb_ids: "[String!]!",
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
                imdbId: { in: source.director_imdb_ids },
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
                imdbId: { in: source.performer_imdb_ids },
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
                imdb_id: { in: source.writer_imdb_ids },
                entity_type: { eq: "writer" },
              },
            },
            type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          });

        return Array.from(entries.map((node) => node.name));
      },
    },
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      extensions: {
        link: {
          from: "imdb_id",
          by: "imdbId",
        },
      },
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
