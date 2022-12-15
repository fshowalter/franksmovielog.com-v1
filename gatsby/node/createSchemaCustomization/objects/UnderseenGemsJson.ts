import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const UnderseenGemsJson = {
  name: SchemaNames.UnderseenGemsJson,
  interfaces: ["Node"],
  fields: {
    imdbId: "String!",
    genres: "[String!]!",
    slug: "String!",
    sortTitle: "String!",
    title: "String!",
    year: "Int!",
    grade: "String!",
    gradeValue: "Int!",
    releaseDate: "String!",
    poster: posterFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
