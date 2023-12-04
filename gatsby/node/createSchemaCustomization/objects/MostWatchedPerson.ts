import { SchemaNames } from "../schemaNames";

export const MostWatchedPersonViewing = {
  name: SchemaNames.MostWatchedPersonViewing,
  fields: {
    sequence: "Int!",
    date: "String!",
    medium: "String",
    title: "String!",
    year: "String!",
    venue: "String",
    slug: "String",
  },
};

export const MostWatchedPerson = {
  name: SchemaNames.MostWatchedPerson,
  fields: {
    name: "String!",
    count: "Int!",
    slug: "String",
    viewings: `[${SchemaNames.MostWatchedPersonViewing}!]!`,
  },
};
