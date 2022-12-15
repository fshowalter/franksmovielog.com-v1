import { SchemaNames } from "../schemaNames";

export const StatsForYear = {
  name: SchemaNames.StatsForYear,
  fields: {
    viewingStats: `${SchemaNames.ViewingStatsJson}!`,
    decadeStats: `${SchemaNames.ViewingCountsForDecadesJson}!`,
    mostWatchedMedia: `${SchemaNames.TopMediaJson}!`,
    movies: `${SchemaNames.MostWatchedMoviesJson}!`,
    directors: `${SchemaNames.MostWatchedDirectorsJson}!`,
    performers: `${SchemaNames.MostWatchedPerformersJson}!`,
    writers: `${SchemaNames.MostWatchedWritersJson}!`,
  },
};
