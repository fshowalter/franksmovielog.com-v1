import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const MostWatchedTitle = {
  name: SchemaNames.MostWatchedTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    year: "String!",
    slug: "String",
    count: "Int!",
    poster: posterFieldResolver,
  },
};
