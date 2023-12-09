import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const UnderseenGemsJson = {
  name: SchemaNames.UnderseenGemsJson,
  interfaces: ["Node"],
  fields: {
    genres: "[String!]!",
    grade: "String!",
    gradeValue: "Int!",
    imdbId: "String!",
    releaseSequence: "String!",
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
