import { SchemaNames } from "./schemaNames";

const MostWatchedMovieViewing = {
  name: SchemaNames.MOST_WATCHED_MOVIE_VIEWING,
  fields: {
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    venue: "String!",
    sequence: "Int!",
    slug: "String",
  },
};

export default MostWatchedMovieViewing;
