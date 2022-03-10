import { SchemaNames } from "./schemaNames";

const MostWatchedDirectorsJson = {
  name: SchemaNames.MOST_WATCHED_DIRECTORS_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedDirectorsJson;
