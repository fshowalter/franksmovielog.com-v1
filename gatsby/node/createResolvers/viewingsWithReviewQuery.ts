import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const viewingsWithReviewQuery = {
  Query: {
    viewingsWithReviews: {
      type: `[${SchemaNames.ViewingWithReview}!]!`,
      args: {
        limit: "Int",
        skip: "Int",
        sort: `${SchemaNames.ViewingWithReview}SortInput`,
      },
      resolve: async (
        _source: unknown,
        args: {
          limit?: number;
          skip?: number;
          sort?: {
            fields: string[];
            order: (boolean | "asc" | "desc" | "ASC" | "DESC")[];
          };
        },
        context: GatsbyNodeContext
      ) => {
        const { limit = 0, skip = 0, sort } = args;

        const { fields = ["sequence"], order = ["DESC"] } = sort ?? {};

        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.ViewingsJson,
          query: {
            filter: { reviewedMovie: { id: { ne: null } } },
            limit: limit,
            skip: skip,
            sort: { fields: fields, order: order },
          },
        });

        return entries;
      },
    },
  },
};
