import { SchemaNames } from "./schemaNames";

const MostWatchedPersonInterface = {
  name: SchemaNames.MOST_WATCHED_PERSON,
  fields: {
    imdb_id: "String!",
    full_name: "String!",
    slug: "String",
    viewing_count: "Int!",
    viewings: `[${SchemaNames.VIEWINGS_JSON}!]!`,
  },
};

export default MostWatchedPersonInterface;
