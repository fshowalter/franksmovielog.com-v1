import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const collectionQuery = {
  Query: {
    collection: {
      type: `${SchemaNames.CollectionsJson}!`,
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
