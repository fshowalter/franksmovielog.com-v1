import { SchemaNames } from "../schemaNames";

export const MostWatchedPerson = {
  name: SchemaNames.MostWatchedPerson,
  fields: {
    imdbId: "String!",
    fullName: "String!",
    slug: "String",
    viewingCount: "Int!",
    viewings: `[${SchemaNames.ViewingsJson}!]!`,
  },
};
