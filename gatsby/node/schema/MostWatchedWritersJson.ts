import { SchemaNames } from "./schemaNames";

const MostWatchedWritersJson = {
  name: SchemaNames.MOST_WATCHED_WRITERS_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedWritersJson;
