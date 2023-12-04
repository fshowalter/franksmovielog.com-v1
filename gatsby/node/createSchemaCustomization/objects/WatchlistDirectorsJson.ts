import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";

export const WatchlistDirectorsJson = {
  name: SchemaNames.WatchlistDirectorsJson,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.WatchlistEntityTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};
