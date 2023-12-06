import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";

export const WatchlistCollectionsJson = {
  name: SchemaNames.WatchlistCollectionsJson,
  interfaces: ["Node", SchemaNames.WatchlistEntity],
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.WatchlistEntityTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};
