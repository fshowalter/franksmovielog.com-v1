import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const CollectionTitle = {
  name: SchemaNames.CollectionTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    sortTitle: "String!",
    year: "String!",
    slug: "String",
    grade: "String",
    gradeValue: "Int",
    releaseSequence: "String!",
    poster: posterFieldResolver,
  },
};

export const CollectionsJson = {
  name: SchemaNames.CollectionsJson,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.CollectionTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};
