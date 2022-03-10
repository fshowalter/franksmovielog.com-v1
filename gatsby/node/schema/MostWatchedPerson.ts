import { SchemaNames } from "./schemaNames";

const MostWatchedPerson = {
  name: SchemaNames.MOST_WATCHED_PERSON,
  fields: {
    imdb_id: "String!",
    full_name: "String!",
    slug: "String",
    viewing_count: "Int!",
    viewings: `[${SchemaNames.MOST_WATCHED_PERSON_VIEWING}!]!`,
  },
};

export default MostWatchedPerson;
