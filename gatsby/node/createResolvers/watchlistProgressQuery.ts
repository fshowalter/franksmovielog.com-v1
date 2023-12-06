import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const watchlistProgressQuery = {
  Query: {
    watchlistProgress: {
      type: `${SchemaNames.WatchlistProgressJson}!`,
      args: {},
      resolve: (
        _source: unknown,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        return context.nodeModel.findOne({
          type: SchemaNames.WatchlistProgressJson,
        });
      },
    },
  },
};
