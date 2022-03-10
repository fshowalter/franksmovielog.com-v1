import { SchemaNames } from "./schemaNames";

const MostWatchedPerformersJson = {
  name: SchemaNames.MOST_WATCHED_PERFORMERS_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedPerformersJson;
