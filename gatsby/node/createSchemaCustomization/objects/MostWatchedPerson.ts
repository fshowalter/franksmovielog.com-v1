import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const MostWatchedPersonViewing = {
  name: SchemaNames.MostWatchedPersonViewing,
  fields: {
    sequence: "Int!",
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    medium: "String",
    title: "String!",
    year: "String!",
    venue: "String",
    slug: "String",
    poster: posterFieldResolver,
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
