import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const allTimeStatsQuery = {
  Query: {
    allTimeStats: {
      type: `${SchemaNames.AllTimeStats}!`,
      resolve: async (
        _source: unknown,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const viewingStats = await context.nodeModel.findOne({
          type: SchemaNames.ViewingStatsJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const reviewStats = await context.nodeModel.findOne({
          type: SchemaNames.ReviewStatsJson,
          query: {
            filter: { reviewYear: { eq: "all" } },
          },
        });

        const decadeStats = await context.nodeModel.findOne({
          type: SchemaNames.ViewingCountsForDecadesJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const { entries: gradeDistributions } = await context.nodeModel.findAll(
          {
            type: SchemaNames.GradeDistributionsJson,
            query: {
              sort: { fields: ["gradeValue"], order: [`desc`] },
            },
          }
        );

        const mostWatchedMedia = await context.nodeModel.findOne({
          type: SchemaNames.TopMediaJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const movies = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedMoviesJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const directors = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedDirectorsJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const performers = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedPerformersJson,
          query: {
            filter: { viewingYear: { eq: "all" } },
          },
        });

        const writers = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedWritersJson,
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
