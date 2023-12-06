import { SchemaNames } from "../schemaNames";

export const WatchlistEntity = {
  name: SchemaNames.WatchlistEntity,
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    slug: "String",
    titles: `[${SchemaNames.WatchlistEntityTitle}!]!`,
    avatar: "File",
  },
};
