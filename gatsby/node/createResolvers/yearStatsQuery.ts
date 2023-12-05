import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const yearStatsQuery = {
  Query: {
    yearStats: {
      type: `${SchemaNames.YearStatsJson}!`,
      args: {
        year: "String!",
      },
      resolve: async (
        _source: unknown,
        args: { year: string },
        context: GatsbyNodeContext,
      ) => {
        return await context.nodeModel.findOne({
          type: SchemaNames.YearStatsJson,
          query: {
            filter: { year: { eq: args.year } },
          },
        });
      },
    },
  },
};
