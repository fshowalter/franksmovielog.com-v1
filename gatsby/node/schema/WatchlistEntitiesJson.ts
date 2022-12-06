import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import path from "path";
import { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "./type-definitions";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface WatchlistEntityNode extends GatsbyNode {
  name: string;
  slug: string | null;
  entityType: string;
  imdbId: string;
}

const WatchlistEntitiesJson = {
  name: SchemaNames.WATCHLIST_ENTITIES_JSON,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    imdbId: "String!",
    entityType: "String!",
    titleCount: "Int!",
    slug: {
      type: "String",
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const slug = source.slug;
        const reviewCount = await resolveFieldForNode<number>(
          "reviewCount",
          source,
          context,
          info,
          {}
        );

        if (reviewCount && reviewCount > 0) {
          return slug;
        }

        return null;
      },
    },
    avatar: {
      type: "File",
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        if (!source.slug) {
          return null;
        }

        return await context.nodeModel.findOne({
          type: "File",
          query: {
            filter: {
              absolutePath: {
                eq: path.resolve(`./content/assets/avatars/${source.slug}.png`),
              },
            },
          },
        });
      },
    },
    reviewCount: {
      type: `Int!`,
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const watchlistMovies = await resolveFieldForNode<WatchlistMovieNode[]>(
          "watchlistMovies",
          source,
          context,
          info,
          {}
        );

        if (!watchlistMovies) {
          return 0;
        }

        const watchlistMovieImdbIds = Array.from(
          watchlistMovies.map((movie) => movie.imdbId)
        );

        const { totalCount } =
          await context.nodeModel.findAll<ReviewedMovieNode>({
            type: SchemaNames.REVIEWED_MOVIES_JSON,
            query: {
              filter: {
                imdbId: { in: watchlistMovieImdbIds },
              },
            },
          });

        return totalCount();
      },
    },
    watchlistMovies: {
      type: `[${SchemaNames.WATCHLIST_MOVIES_JSON}]`,
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        if (source.entityType == "collection") {
          const { entries } = await context.nodeModel.findAll({
            type: SchemaNames.WATCHLIST_MOVIES_JSON,
            query: {
              filter: {
                collectionNames: { in: [source.name] },
              },
            },
          });
          return entries;
        }

        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_MOVIES_JSON,
          query: {
            filter: {
              [`${source.entityType}ImdbIds`]: { in: [source.imdbId] },
            },
          },
        });

        return entries;
      },
    },
  },
};

export default function buildWatchlistEntitiesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(WatchlistEntitiesJson)];
}
