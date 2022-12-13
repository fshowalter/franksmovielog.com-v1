import type { GatsbyNodeContext } from "../schema/type-definitions";

export const viewingsWithReviewQuery = {
  Query: {
    viewingsWithReviews: {
      type: `[ViewingWithReview!]!`,
      args: {
        limit: "Int",
        skip: "Int",
        sort: "ViewingWithReviewSortInput",
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
          type: "ViewingsJson",
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
