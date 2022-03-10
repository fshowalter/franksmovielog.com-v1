import path from "path";
import { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "./type-definitions";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import sliceMoviesForBrowseMore from "./utils/sliceMoviesForBrowseMore";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface WatchlistEntityNode extends GatsbyNode {
  name: string;
  slug: string;
  entity_type: string;
}

const WatchlistEntitiesJson = {
  name: SchemaNames.WATCHLIST_ENTITIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String",
    name: "String!",
    slug: "String!",
    title_count: "Int!",
    review_count: "Int!",
    entity_type: "String!",
    avatar: {
      type: "File",
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
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
    watchlistMovies: {
      type: `[${SchemaNames.WATCHLIST_MOVIES_JSON}]`,
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        if (source.entity_type == "collection") {
          const { entries } = await context.nodeModel.findAll({
            type: SchemaNames.WATCHLIST_MOVIES_JSON,
            query: {
              filter: {
                collection_names: { in: [source.name] },
              },
            },
          });
          return entries;
        }

        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_MOVIES_JSON,
          query: {
            filter: {
              [`${source.entity_type}_imdb_ids`]: { in: [source.imdb_id] },
            },
          },
        });

        return entries;
      },
    },
    browseMore: {
      type: `[${SchemaNames.REVIEWED_MOVIES_JSON}]`,
      args: {
        movieImdbId: "String!",
      },
      resolve: async (
        source: WatchlistEntityNode,
        args: { movieImdbId: string },
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const watchlistMovies = await resolveFieldForNode<WatchlistMovieNode[]>(
          "watchlistMovies",
          source,
          context,
          info,
          args
        );

        if (!watchlistMovies) {
          return [];
        }

        const watchlistMovieImdbIds = Array.from(watchlistMovies).map(
          (movie) => movie.imdb_id
        );

        const { entries } = await context.nodeModel.findAll<ReviewedMovieNode>({
          type: SchemaNames.REVIEWED_MOVIES_JSON,
          query: {
            filter: {
              imdb_id: {
                in: watchlistMovieImdbIds,
              },
            },
            sort: {
              fields: ["release_date"],
              order: ["ASC"],
            },
          },
        });

        if (!entries) {
          return [];
        }

        return sliceMoviesForBrowseMore(Array.from(entries), args.movieImdbId);
      },
    },
  },
};

export default WatchlistEntitiesJson;
