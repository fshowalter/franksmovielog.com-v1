import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const watchlistEntityQuery = {
  Query: {
    watchlistEntity: {
      type: `${SchemaNames.WatchlistEntitiesJson}!`,
      args: {
        entityType: "String!",
        slug: "String!",
      },
      resolve: async (
        _source: unknown,
        args: {
          entityType: string;
          slug: string;
        },
        context: GatsbyNodeContext
      ) => {
        return context.nodeModel.findOne({
          type: SchemaNames.WatchlistEntitiesJson,
          query: {
            filter: {
              entityType: { eq: args.entityType },
              slug: { eq: args.slug },
            },
          },
        });
      },
    },
  },
};
