import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const OverratedDisappointmentsJson = {
  name: SchemaNames.OverratedDisappointmentsJson,
  interfaces: ["Node"],
  fields: {
    genres: "[String!]!",
    grade: "String!",
    gradeValue: "Int!",
    imdbId: "String!",
    yearAndImdbId: "String!",
    slug: "String!",
    sortTitle: "String!",
    title: "String!",
    year: "String!",
    poster: posterFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
