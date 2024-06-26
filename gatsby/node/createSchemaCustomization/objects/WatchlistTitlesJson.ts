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
    poster: posterFieldResolver,
    viewed: "Boolean!",
  },
  extensions: {
    infer: false,
  },
};
