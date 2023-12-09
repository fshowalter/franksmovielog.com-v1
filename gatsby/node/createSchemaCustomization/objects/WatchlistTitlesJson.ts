import { SchemaNames } from "../schemaNames";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const WatchlistTitlesJson = {
  name: SchemaNames.WatchlistTitlesJson,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "String!",
    imdbId: "String!",
    sortTitle: "String!",
    releaseSequence: "String!",
    collectionNames: "[String!]!",
    directorNames: "[String!]!",
    performerNames: "[String!]!",
    writerNames: "[String!]!",
    slug: "String",
    grade: "String",
    gradeValue: "Int",
    poster: posterFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
