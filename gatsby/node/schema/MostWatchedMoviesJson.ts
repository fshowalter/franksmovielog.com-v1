import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { posterResolver } from "./resolvers/posterResolver";
import { reviewedMovieResolver } from "./resolvers/reviewedMovieResolver";
import { SchemaNames } from "./schemaNames";

const MostWatchedMovie = {
  name: "MostWatchedMovie",
  fields: {
    viewingCount: "Int!",
    imdbId: "String!",
    title: "String!",
    year: "Int!",
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      resolve: reviewedMovieResolver(),
    },
    poster: posterResolver,
  },
};

const MostWatchedMoviesJson = {
  name: "MostWatchedMoviesJson",
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[MostWatchedMovie!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildMostWatchedMoviesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(MostWatchedMovie),
    schema.buildObjectType(MostWatchedMoviesJson),
  ];
}
