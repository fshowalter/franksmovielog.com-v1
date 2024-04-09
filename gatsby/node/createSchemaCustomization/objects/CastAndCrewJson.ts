import { SchemaNames } from "../schemaNames";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export const CastAndCrewCreditsTitle = {
  name: SchemaNames.CastAndCrewCreditsTitle,
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
    reviewDate: {
      type: "Date",
      extensions: {
        dateformat: {},
      },
    },
  },
};

export const CastAndCrewCredits = {
  name: SchemaNames.CastAndCrewCredits,
  fields: {
    titles: `[${SchemaNames.CastAndCrewCreditsTitle}!]!`,
    reviewCount: "Int!",
    watchlistCount: "Int!",
  },
};

export const CastAndCrewJson = {
  name: SchemaNames.CastAndCrewJson,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    slug: "String!",
    director: `${SchemaNames.CastAndCrewCredits}!`,
    performer: `${SchemaNames.CastAndCrewCredits}!`,
    writer: `${SchemaNames.CastAndCrewCredits}!`,
    avatar: avatarFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
