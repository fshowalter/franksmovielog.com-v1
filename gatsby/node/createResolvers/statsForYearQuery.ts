import { SchemaNames } from "../createSchemaCustomization/schemaNames";
import type { GatsbyNodeContext } from "../createSchemaCustomization/type-definitions";

export const statsForYearQuery = {
  Query: {
    statsForYear: {
      type: `${SchemaNames.StatsForYear}!`,
      args: {
        year: "String!",
      },
      resolve: async (
        _source: unknown,
        args: { year: string },
        context: GatsbyNodeContext
      ) => {
        const viewingStats = await context.nodeModel.findOne({
          type: SchemaNames.ViewingStatsJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const decadeStats = await context.nodeModel.findOne({
          type: SchemaNames.ViewingCountsForDecadesJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const mostWatchedMedia = await context.nodeModel.findOne({
          type: SchemaNames.TopMediaJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const movies = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedMoviesJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const directors = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedDirectorsJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const performers = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedPerformersJson,
          query: {
            filter: { viewingYear: { eq: args.year } },
          },
        });

        const writers = await context.nodeModel.findOne({
          type: SchemaNames.MostWatchedWritersJson,
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
