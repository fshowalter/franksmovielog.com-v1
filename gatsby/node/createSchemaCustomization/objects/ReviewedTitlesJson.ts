import { Node } from "hast";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
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

interface IHastNode extends Node {
  children: {
    tagName: string;
  }[];
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
    venueNotes: {
      type: "String",
      resolve: (source: { venueNotes: string }) => {
        if (!source.venueNotes) {
          return null;
        }

        const mdast = remark().parse(source.venueNotes);

        const hast = toHast(mdast, {
          allowDangerousHtml: true,
        }) as IHastNode;

        hast.children[0].tagName = "span";

        return toHtml(hast);
      },
    },
    medium: "String",
    mediumNotes: {
      type: "String",
      resolve: (source: { mediumNotes: string }) => {
        if (!source.mediumNotes) {
          return null;
        }

        const mdast = remark().parse(source.mediumNotes);

        const hast = toHast(mdast, {
          allowDangerousHtml: true,
        }) as IHastNode;

        hast.children[0].tagName = "span";

        return toHtml(hast);
      },
    },
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
    genres: "[String!]!",
    poster: posterFieldResolver,
    still: stillFieldResolver,
  },
};

export const ReviewedTitleMoreCastAndCrewMember = {
  name: SchemaNames.ReviewedTitleMoreCastAndCrewMember,
  fields: {
    name: "String!",
    slug: "String!",
    creditKind: "String!",
    titles: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};

export const ReviewedTitleCastAndCrewMember = {
  name: SchemaNames.ReviewedTitleCastAndCrewMember,
  fields: {
    name: "String!",
    slug: "String!",
    creditedAs: "[String!]!",
    avatar: avatarFieldResolver,
  },
};

export const ReviewedTitleCollection = {
  name: SchemaNames.ReviewedTitleCollection,
  fields: {
    name: "String!",
    slug: "String!",
    creditedAs: "[String!]!",
    avatar: avatarFieldResolver,
  },
};

export const ReviewedTitleMoreCollection = {
  name: SchemaNames.ReviewedTitleMoreCollection,
  fields: {
    name: "String!",
    slug: "String!",
    titles: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
    avatar: avatarFieldResolver,
  },
};

export const ReviewedTitlesJson = {
  name: SchemaNames.ReviewedTitlesJson,
  interfaces: ["Node", SchemaNames.Title],
  fields: {
    sequence: "String!",
    reviewDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    reviewYear: "String!",
    originalTitle: "String",
    releaseSequence: "String!",
    runtimeMinutes: "Int!",
    directorNames: "[String!]!",
    principalCastNames: "[String!]!",
    writerNames: "[String!]!",
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
    poster: posterFieldResolver,
    still: stillFieldResolver,
    castAndCrew: `[${SchemaNames.ReviewedTitleCastAndCrewMember}!]!`,
    collections: `[${SchemaNames.ReviewedTitleCollection}!]!`,
    moreCastAndCrew: `[${SchemaNames.ReviewedTitleMoreCastAndCrewMember}!]!`,
    moreCollections: `[${SchemaNames.ReviewedTitleMoreCollection}!]!`,
    moreReviews: `[${SchemaNames.ReviewedTitleMoreTitle}!]!`,
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
              fileAbsolutePath: { regex: "//reviews/" },
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
