export const AllTimeStats = {
  name: `AllTimeStats`,
  fields: {
    viewingStats: `ViewingStatsJson!`,
    reviewStats: `ReviewStatsJson!`,
    decadeStats: `ViewingCountsForDecadesJson!`,
    gradeDistributions: `[GradeDistributionsJson!]!`,
    mostWatchedMedia: `TopMediaJson!`,
    movies: `MostWatchedMoviesJson!`,
    directors: `MostWatchedDirectorsJson!`,
    performers: `MostWatchedPerformersJson!`,
    writers: `MostWatchedWritersJson!`,
  },
};
