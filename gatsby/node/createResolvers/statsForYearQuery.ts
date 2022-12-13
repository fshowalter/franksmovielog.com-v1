import type { GatsbyNodeContext } from "../schema/type-definitions";

export const statsForYearQuery = {
  Query: {
    statsForYear: {
      type: "StatsForYear!",
      args: {
        year: "String!",
      },
      resolve: async (
        _source: unknown,
        args: { year: string },
        context: GatsbyNodeContext
      ) => {
        const viewingStats = await context.nodeModel.findOne({
          type: "ViewingStatsJson",
          query: {
            filter: { viewing_year: { eq: args.year } },
          },
        });

        const decadeStats = await context.nodeModel.findOne({
          type: "ViewingCountsForDecadesJson",
          query: {
            filter: { viewing_year: { eq: args.year } },
          },
        });

        const mostWatchedMedia = await context.nodeModel.findOne({
          type: "TopMediaJson",
          query: {
            filter: { viewing_year: { eq: args.year } },
          },
        });

        const movies = await context.nodeModel.findOne({
          type: "MostWatchedMoviesJson",
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const directors = await context.nodeModel.findOne({
          type: "MostWatchedDirectorsJson",
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const performers = await context.nodeModel.findOne({
          type: "MostWatchedPerformersJson",
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const writers = await context.nodeModel.findOne({
          type: "MostWatchedWritersJson",
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        return {
          viewingStats,
          decadeStats,
          mostWatchedMedia,
          movies,
          directors,
          performers,
          writers,
        };
      },
    },
  },
};
