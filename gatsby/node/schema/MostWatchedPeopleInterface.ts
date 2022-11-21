import { SchemaNames } from "./schemaNames";

const MostWatchedPeopleInterface = {
  name: SchemaNames.MOST_WATCHED_PEOPLE,
  interfaces: ["Node"],
  fields: {
    id: "ID!",
    viewing_year: "String!",
    most_watched: `[${SchemaNames.MOST_WATCHED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default MostWatchedPeopleInterface;
