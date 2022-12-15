import { SchemaNames } from "../schemaNames";

export const MostWatchedPeople = {
  name: SchemaNames.MostWatchedPeople,
  interfaces: ["Node"],
  fields: {
    id: "ID!",
    viewingYear: "String!",
    mostWatched: `[${SchemaNames.MostWatchedPerson}!]!`,
  },
  extensions: {
    infer: false,
  },
};
