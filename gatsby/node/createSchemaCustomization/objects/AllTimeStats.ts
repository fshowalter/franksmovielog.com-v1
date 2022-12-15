import { SchemaNames } from "../schemaNames";

export const AllTimeStats = {
  name: SchemaNames.AllTimeStats,
  fields: {
    viewingStats: `${SchemaNames.ViewingStatsJson}!`,
    reviewStats: `${SchemaNames.ReviewStatsJson}!`,
    decadeStats: `${SchemaNames.ViewingCountsForDecadesJson}!`,
    gradeDistributions: `[${SchemaNames.GradeDistributionsJson}!]!`,
    mostWatchedMedia: `${SchemaNames.TopMediaJson}!`,
    movies: `${SchemaNames.MostWatchedMoviesJson}!`,
    directors: `${SchemaNames.MostWatchedDirectorsJson}!`,
    performers: `${SchemaNames.MostWatchedPerformersJson}!`,
    writers: `${SchemaNames.MostWatchedWritersJson}!`,
  },
};
