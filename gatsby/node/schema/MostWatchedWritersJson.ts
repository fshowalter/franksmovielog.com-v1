import { SchemaNames } from "./schemaNames";

const MostWatchedWritersJson = {
  name: SchemaNames.MOST_WATCHED_WRITERS_JSON,
  interfaces: [SchemaNames.MOST_WATCHED_PEOPLE, "Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedWritersJson;
