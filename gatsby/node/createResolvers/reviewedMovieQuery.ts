import type { GatsbyNodeContext } from "../schema/type-definitions";

export const reviewedMovieQuery = {
  Query: {
    reviewedMovie: {
      type: "ReviewedMoviesJson!",
      args: {
        id: "String!",
      },
      resolve: (
        _source: unknown,
        args: {
          id: string;
        },
        context: GatsbyNodeContext
      ) => {
        return context.nodeModel.getNodeById({
          id: args.id,
        });
      },
    },
  },
};
