import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const watchlistPerformerQuery = {
  Query: {
    watchlistPerformer: {
      type: `${SchemaNames.WatchlistPerformersJson}!`,
      args: {
        id: "String!",
      },
      resolve: (
        _source: unknown,
        args: {
          id: string;
        },
        context: GatsbyNodeContext,
      ) => {
        return context.nodeModel.getNodeById({ id: args.id });
      },
    },
  },
};
