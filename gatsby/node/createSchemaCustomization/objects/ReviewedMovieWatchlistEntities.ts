import { SchemaNames } from "../schemaNames";

export const ReviewedMovieWatchlistEntities = {
  name: SchemaNames.ReviewedMovieWatchlistEntities,
  fields: {
    performers: `[${SchemaNames.ReviewedMovieWatchlistEntity}!]!`,
    directors: `[${SchemaNames.ReviewedMovieWatchlistEntity}!]!`,
    writers: `[${SchemaNames.ReviewedMovieWatchlistEntity}!]!`,
    collections: `[${SchemaNames.ReviewedMovieWatchlistEntity}!]!`,
  },
};
