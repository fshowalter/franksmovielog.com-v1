import path from "path";
import { SchemaNames } from "../schemaNames";
import { GatsbyNodeContext, GatsbyResolveInfo } from "../type-definitions";
import { resolveFieldForNode } from "../utils/resolveFieldForNode";
import { sliceMoviesForBrowseMore } from "../utils/sliceMoviesForBrowseMore";
import { ReviewedMovieNode } from "./ReviewedMoviesJson";
import { WatchlistEntityNode } from "./WatchlistEntitiesJson";
import { WatchlistMovieNode } from "./WatchlistMoviesJson";

export const ReviewedMovieWatchlistEntity = {
  name: SchemaNames.ReviewedMovieWatchlistEntity,
  fields: {
    imdbId: "String!",
    name: "String!",
    slug: "String!",
    entityType: `${SchemaNames.WatchlistEntityType}!`,
    avatar: {
      type: "File!",
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
    browseMore: {
      type: `[${SchemaNames.ReviewedMoviesJson}!]!`,
      args: {
        sourceReviewId: "String!",
      },
      resolve: async (
        source: WatchlistEntityNode,
        args: { sourceReviewId: string },
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const watchlistMovies = await resolveFieldForNode<WatchlistMovieNode[]>(
          { fieldName: "watchlistMovies", source, context, info, args }
        );

        if (!watchlistMovies) {
          return [];
        }

        const watchlistMovieImdbIds = Array.from(watchlistMovies).map(
          (movie) => movie.imdbId
        );

        const { entries, totalCount } =
          await context.nodeModel.findAll<ReviewedMovieNode>({
            type: SchemaNames.ReviewedMoviesJson,
            query: {
              filter: {
                imdbId: {
                  in: watchlistMovieImdbIds,
                },
              },
              sort: {
                fields: ["releaseDate"],
                order: ["ASC"],
              },
            },
          });

        if ((await totalCount()) < 5) {
          return [];
        }

        return sliceMoviesForBrowseMore(
          Array.from(entries),
          args.sourceReviewId
        );
      },
    },
  },
};
