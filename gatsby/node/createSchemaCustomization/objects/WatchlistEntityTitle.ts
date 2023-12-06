import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const WatchlistEntityTitle = {
  name: SchemaNames.WatchlistEntityTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    sortTitle: "String!",
    year: "String!",
    slug: "String",
    grade: "String",
    gradeValue: "Int",
    yearAndImdbId: "String!",
    poster: posterFieldResolver,
  },
};
