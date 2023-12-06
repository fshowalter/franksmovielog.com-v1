import { SchemaNames } from "../schemaNames";

export const WatchlistProgressDetail = {
  name: SchemaNames.WatchlistProgressDetail,
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    slug: "String",
  },
};

export const WatchlistProgressJson = {
  name: SchemaNames.WatchlistProgressJson,
  interfaces: ["Node"],
  fields: {
    reviewed: `Int!`,
    total: "Int!",
    directorTotal: "Int!",
    directorReviewed: "Int!",
    directorDetails: `[${SchemaNames.WatchlistProgressDetail}!]!`,
    performerTotal: "Int!",
    performerReviewed: "Int!",
    performerDetails: `[${SchemaNames.WatchlistProgressDetail}!]!`,
    writerTotal: "Int!",
    writerReviewed: "Int!",
    writerDetails: `[${SchemaNames.WatchlistProgressDetail}!]!`,
    collectionTotal: "Int!",
    collectionReviewed: "Int!",
    collectionDetails: `[${SchemaNames.WatchlistProgressDetail}!]!`,
  },
};
