import { SchemaNames } from "../schemaNames";

export const YearStatsJson = {
  name: SchemaNames.YearStatsJson,
  interfaces: ["Node"],
  fields: {
    year: "String!",
    viewingCount: `Int!`,
    titleCount: "Int!",
    newTitleCount: "Int!",
    watchlistTitlesReviewedCount: "Int!",
    mediaDistribution: `${SchemaNames.StatsDistribution}!`,
    decadeDistribution: `${SchemaNames.StatsDistribution}!`,
    mostWatchedTitles: `${SchemaNames.MostWatchedTitle}!`,
    mostWatchedPerformers: `${SchemaNames.MostWatchedPerson}!`,
    mostWatchedDirectors: `${SchemaNames.MostWatchedPerson}!`,
    mostWatchedWriters: `${SchemaNames.MostWatchedPerson}!`,
  },
};
