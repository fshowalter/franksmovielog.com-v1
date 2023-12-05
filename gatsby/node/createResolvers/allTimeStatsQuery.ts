import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const allTimeStatsQuery = {
  Query: {
    allTimeStats: {
      type: `${SchemaNames.AllTimeStatsJson}!`,
      args: {},
      resolve: (
        _source: unknown,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        return context.nodeModel.findOne({
          type: SchemaNames.AllTimeStatsJson,
        });
      },
    },
  },
};
