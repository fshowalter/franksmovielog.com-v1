import { WatchlistMovieNode } from "../createSchemaCustomization/objects/WatchlistMoviesJson";
import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const watchlistProgressQuery = {
  Query: {
    watchlistProgress: {
      type: `${SchemaNames.WatchlistProgress}!`,
      resolve: async (
        _source: unknown,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { totalCount } =
          await context.nodeModel.findAll<WatchlistMovieNode>({
            type: SchemaNames.WatchlistMoviesJson,
            query: {
              filter: { reviewedMovie: { id: { ne: null } } },
            },
          });

        return {
          reviewedCount: totalCount(),
        };
      },
    },
  },
};
