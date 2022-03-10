import { SchemaNames } from "./schemaNames";

const MostWatchedMoviesJson = {
  name: SchemaNames.MOST_WATCHED_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_MOVIE}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedMoviesJson;
