import { SchemaNames } from "../schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "../type-definitions";
import { MarkdownNode } from "./MarkdownRemark";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";
import { stillFieldResolver } from "./fieldResolvers/stillFieldResolver";

export interface ReviewedTitleNode extends GatsbyNode {
  imdbId: string;
  slug: string;
}

export const ReviewedTitleViewing = {
  name: SchemaNames.ReviewedTitleViewing,
  fields: {
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    venue: "String",
    medium: "String",
    mediumNotes: "String",
    sequence: "Int!",
    viewingNote: {
      type: SchemaNames.MarkdownRemark,
      resolve: async (
        source: { sequence: number },
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        return await context.nodeModel.findOne({
          type: SchemaNames.MarkdownRemark,
          query: {
            filter: {
              fileAbsolutePath: {
                regex: `//viewing_notes/${source.sequence
                  .toString()
                  .padStart(4, "0")}-.*/`,
              },
            },
          },
        });
      },
    },
  },
};

export const ReviewedTitleMoreTitle = {
  name: SchemaNames.ReviewedTitleMoreTitle,
  interfaces: ["Title"],
  fields: {
    imdbId: "String!",
    title: "String!",
    grade: "String!",
    year: "String!",
    slug: "String!",
    poster: posterFieldResolver,
    still: stillFieldResolver,
  },
};

export const ReviewedTitleMoreEntity = {
  name: SchemaNames.ReviewedTitleMoreEntity,
  fields: {
    name: "String!",
    slug: "String!",
    titles: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
    avatar: avatarFieldResolver,
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
  interfaces: ["Node", "Title"],
  fields: {
    sequence: "String!",
    reviewDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    reviewYear: "String!",
    originalTitle: "String!",
    releaseSequence: "String!",
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
    year: "String!",
    viewings: `[${SchemaNames.ReviewedTitleViewing}!]!`,
    more: `${SchemaNames.ReviewedTitleMore}!`,
    poster: posterFieldResolver,
    still: stillFieldResolver,
    review: {
      type: `${SchemaNames.MarkdownRemark}!`,
      resolve: async (
        source: { imdbId: string },
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        return await context.nodeModel.findOne<MarkdownNode>({
          type: SchemaNames.MarkdownRemark,
          query: {
            filter: {
              frontmatter: {
                imdb_id: {
                  eq: source.imdbId,
                },
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
