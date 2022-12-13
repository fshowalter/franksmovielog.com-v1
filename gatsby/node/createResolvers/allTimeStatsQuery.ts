import type { GatsbyNodeContext } from "../schema/type-definitions";

export const allTimeStatsQuery = {
  Query: {
    allTimeStats: {
      type: "AllTimeStats!",
      resolve: async (
        _source: unknown,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const viewingStats = await context.nodeModel.findOne({
          type: "ViewingStatsJson",
          query: {
            filter: { viewing_year: { eq: "all" } },
          },
        });

        const reviewStats = await context.nodeModel.findOne({
          type: "ReviewStatsJson",
          query: {
            filter: { review_year: { eq: "all" } },
          },
        });

        const decadeStats = await context.nodeModel.findOne({
          type: "ViewingCountsForDecadesJson",
          query: {
            filter: { viewing_year: { eq: "all" } },
          },
        });

        const { entries: gradeDistributions } = await context.nodeModel.findAll(
          {
            type: "GradeDistributionsJson",
          }
        );

        const mostWatchedMedia = await context.nodeModel.findOne({
          type: "TopMediaJson",
          query: {
            filter: { viewing_year: { eq: "all" } },
          },
        });

        const movies = await context.nodeModel.findOne({
          type: "MostWatchedMoviesJson",
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const directors = await context.nodeModel.findOne({
          type: "MostWatchedDirectorsJson",
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const performers = await context.nodeModel.findOne({
          type: "MostWatchedPerformersJson",
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const writers = await context.nodeModel.findOne({
          type: "MostWatchedWritersJson",
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        return {
          viewingStats,
          reviewStats,
          decadeStats,
          gradeDistributions,
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
