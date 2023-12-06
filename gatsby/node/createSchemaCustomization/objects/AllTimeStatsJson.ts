import { SchemaNames } from "../schemaNames";

export const AllTimeStatsGradeDistribution = {
  name: SchemaNames.AllTimeStatsGradeDistribution,
  fields: {
    name: "String!",
    sortValue: "Int!",
    count: "Int!",
  },
};

export const AllTimeStatsJson = {
  name: SchemaNames.AllTimeStatsJson,
  interfaces: ["Node"],
  fields: {
    viewingCount: `Int!`,
    titleCount: "Int!",
    reviewCount: "Int!",
    watchlistTitlesReviewedCount: "Int!",
    gradeDistribution: `[${SchemaNames.AllTimeStatsGradeDistribution}!]!`,
    mediaDistribution: `[${SchemaNames.StatsDistribution}!]!`,
    decadeDistribution: `[${SchemaNames.StatsDistribution}!]!`,
    mostWatchedTitles: `[${SchemaNames.MostWatchedTitle}!]!`,
    mostWatchedPerformers: `[${SchemaNames.MostWatchedPerson}!]!`,
    mostWatchedDirectors: `[${SchemaNames.MostWatchedPerson}!]!`,
    mostWatchedWriters: `[${SchemaNames.MostWatchedPerson}!]!`,
  },
};
