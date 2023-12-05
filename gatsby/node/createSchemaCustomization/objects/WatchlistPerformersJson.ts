import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";

export const WatchlistPerformersJson = {
  name: SchemaNames.WatchlistPerformersJson,
  interfaces: ["Node", SchemaNames.WatchlistEntity],
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.WatchlistEntityTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};
