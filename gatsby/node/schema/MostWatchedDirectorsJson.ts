import { SchemaNames } from "./schemaNames";

const MostWatchedDirectorsJson = {
  name: SchemaNames.MOST_WATCHED_DIRECTORS_JSON,
  interfaces: [SchemaNames.MOST_WATCHED_PEOPLE, "Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_DIRECTOR}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedDirectorsJson;
