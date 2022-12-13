import type { GatsbyNodeContext } from "../schema/type-definitions";

export const watchlistEntityQuery = {
  Query: {
    watchlistEntity: {
      type: "WatchlistEntitiesJson!",
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
          type: "WatchlistEntitiesJson",
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
