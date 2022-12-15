import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";
import { reviewedMovieFieldResolver } from "./fieldResolvers/reviewedMovieFieldResolver";

export const MostWatchedMovie = {
  name: SchemaNames.MostWatchedMovie,
  fields: {
    viewingCount: "Int!",
    imdbId: "String!",
    title: "String!",
    year: "Int!",
    reviewedMovie: reviewedMovieFieldResolver,
    poster: posterFieldResolver,
  },
};
