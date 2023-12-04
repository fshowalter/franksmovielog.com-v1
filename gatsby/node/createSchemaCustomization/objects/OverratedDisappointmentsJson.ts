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
    releaseDate: "String!",
    slug: "String!",
    sortTitle: "String!",
    title: "String!",
    year: "Int!",
    poster: posterFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
