import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const CastAndCrewMemberTitle = {
  name: SchemaNames.CastAndCrewMemberTitle,
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
    viewingSequence: "Int",
    creditedAs: "[String!]!",
    collectionNames: "[String!]!",
    watchlistDirectorNames: "[String!]!",
    watchlistPerformerNames: "[String!]!",
    watchlistWriterNames: "[String!]!",
    reviewDate: {
      type: "Date",
      extensions: {
        dateformat: {},
      },
    },
  },
};

export const CastAndCrewJson = {
  name: SchemaNames.CastAndCrewJson,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    slug: "String!",
    creditedAs: "[String!]!",
    reviewCount: "Int!",
    totalCount: "Int!",
    titles: `[${SchemaNames.CastAndCrewMemberTitle}!]!`,
    avatar: avatarFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
