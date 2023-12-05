import path from "path";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "../type-definitions";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

export interface ReviewedTitleNode extends GatsbyNode {
  imdbId: string;
  slug: string;
}

export const ReviewedTitleViewing = {
  name: SchemaNames.ReviewedTitleViewing,
  fields: {
    date: "String!",
    venue: "String",
    medium: "String",
    mediumNotes: "String",
    sequence: "Int!",
  },
};

export const ReviewedTitleMoreTitle = {
  name: SchemaNames.ReviewedTitleMoreTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    grade: "String!",
    year: "String!",
    slug: "String!",
  },
};

export const ReviewedTitleMoreEntity = {
  name: SchemaNames.ReviewedTitleMoreEntity,
  fields: {
    name: "String!",
    slug: "String!",
    titles: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
  },
};

export const ReviewedTitleMore = {
  name: SchemaNames.ReviewedTitleMore,
  fields: {
    directedBy: `[${SchemaNames.ReviewedTitleMoreEntity}!]!`,
    withPerformer: `[${SchemaNames.ReviewedTitleMoreEntity}!]!`,
    writtenBy: `[${SchemaNames.ReviewedTitleMoreEntity}!]!`,
    inCollection: `[${SchemaNames.ReviewedTitleMoreEntity}!]!`,
    reviews: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
  },
};

export const ReviewedTitlesJson = {
  name: SchemaNames.ReviewedTitlesJson,
  interfaces: ["Node"],
  fields: {
    sequence: "Int!",
    reviewDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    reviewYear: "String!",
    yearAndImdbId: "String!",
    runtimeMinutes: "Int!",
    directorNames: "[String!]!",
    principalCastNames: "[String!]!",
    countries: "[String!]!",
    genres: "[String!]!",
    grade: "String!",
    gradeValue: "Int!",
    imdbId: "String!",
    slug: "String!",
    sortTitle: "String!",
    title: "String!",
    year: "Int!",
    viewings: `[${SchemaNames.ReviewedTitleViewing}!]!`,
    more: `${SchemaNames.ReviewedTitleMore}!`,
    poster: posterFieldResolver,
    still: {
      type: "File",
      resolve: async (
        source: ReviewedTitleNode,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        return await context.nodeModel.findOne({
          type: "File",
          query: {
            filter: {
              absolutePath: {
                eq: path.resolve(`./content/assets/stills/${source.slug}.png`),
              },
            },
          },
        });
      },
    },
  },
  extensions: {
    infer: false,
  },
};
