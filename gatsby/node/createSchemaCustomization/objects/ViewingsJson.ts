import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const ViewingsJson = {
  name: SchemaNames.ViewingsJson,
  interfaces: ["Node"],
  fields: {
    genres: "[String!]!",
    medium: "String",
    sequence: "Int!",
    sortTitle: "String!",
    title: "String!",
    venue: "String",
    viewingYear: "String!",
    year: "String!",
    releaseSequence: "String!",
    viewingDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },

    poster: posterFieldResolver,
  },
};
