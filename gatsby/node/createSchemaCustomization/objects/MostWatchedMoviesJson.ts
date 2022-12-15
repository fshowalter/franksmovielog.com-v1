import { SchemaNames } from "../schemaNames";

export const MostWatchedMoviesJson = {
  name: SchemaNames.MostWatchedMoviesJson,
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[${SchemaNames.MostWatchedMovie}!]!`,
  },
  extensions: {
    infer: false,
  },
};
