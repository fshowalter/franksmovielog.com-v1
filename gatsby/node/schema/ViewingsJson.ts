import type { Actions, NodePluginSchema } from "gatsby";
import { Node } from "hast";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
import { MarkdownNode } from "./MarkdownRemark";
import { posterResolver } from "./resolvers/posterResolver";
import {
  findReviewedMovieNode,
  reviewedMovieResolver,
} from "./resolvers/reviewedMovieResolver";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "./type-definitions";
import resolveFieldForNode from "./utils/resolveFieldForNode";

export interface ViewingNode extends GatsbyNode {
  imdbId: string;
  sequence: number;
  mediumNotes: string | null;
}

interface IHastNode extends Node {
  children: {
    tagName: string;
  }[];
}

const commonFields = {
  imdbId: "String!",
  title: "String!",
  year: "Int!",
  sequence: "Int!",
  venue: "String",
  medium: "String",
  genres: "[String!]!",
  releaseDate: "String!",
  viewingDate: {
    type: "Date!",
    extensions: {
      dateformat: {},
    },
  },
  viewingYear: "Int!",
  mediumNotes: {
    type: "String",
    resolve: (source: ViewingNode) => {
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
  sortTitle: "String!",
  viewingNote: {
    type: SchemaNames.MARKDOWN_REMARK,
    resolve: async (
      source: ViewingNode,
      _args: unknown,
      context: GatsbyNodeContext
    ) => {
      return await context.nodeModel.findOne({
        type: SchemaNames.MARKDOWN_REMARK,
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
  excerpt: {
    type: "String",
    resolve: async (
      source: ViewingNode,
      args: { includeCssClass: true },
      context: GatsbyNodeContext,
      info: GatsbyResolveInfo
    ) => {
      const reviewedMovieNode = await findReviewedMovieNode(
        source.imdbId,
        context.nodeModel
      );

      if (!reviewedMovieNode) {
        return null;
      }

      const { totalCount } = await context.nodeModel.findAll<ViewingNode>({
        type: SchemaNames.VIEWINGS_JSON,
        query: {
          filter: {
            imdbId: {
              eq: source.imdbId,
            },
          },
        },
      });

      if ((await totalCount()) > 1) {
        const viewingNoteNode = await resolveFieldForNode<MarkdownNode>(
          "viewingNote",
          source,
          context,
          info,
          args
        );

        if (viewingNoteNode) {
          return resolveFieldForNode<string>(
            "html",
            viewingNoteNode,
            context,
            info,
            args
          );
        }
      }

      const reviewNode = await resolveFieldForNode<MarkdownNode>(
        "review",
        reviewedMovieNode,
        context,
        info,
        args
      );

      if (!reviewNode) {
        return null;
      }

      return await resolveFieldForNode<string>(
        "excerptHtml",
        reviewNode,
        context,
        info,
        args
      );
    },
  },
  poster: posterResolver,
};

const ViewingsJson = {
  name: SchemaNames.VIEWINGS_JSON,
  interfaces: ["Node"],
  fields: {
    ...commonFields,
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      resolve: reviewedMovieResolver(),
    },
    slug: {
      type: "String",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "slug",
        },
      },
    },
    grade: {
      type: "String",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "grade",
        },
      },
    },
    gradeValue: {
      type: "Int",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "gradeValue",
        },
      },
    },
    principalCastNames: {
      type: "[String!]",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "principalCastNames",
        },
      },
    },
    directorNames: {
      type: "[String!]",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "directorNames",
        },
      },
    },
  },
  extensions: {
    infer: false,
  },
};

const ViewingWithReview = {
  name: `ViewingWithReview`,
  interfaces: ["Node"],
  fields: {
    ...commonFields,
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}!`,
      resolve: reviewedMovieResolver(),
    },
    slug: {
      type: "String!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "slug",
        },
      },
    },
    grade: {
      type: "String!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "grade",
        },
      },
    },
    principalCastNames: {
      type: "[String!]!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "principalCastNames",
        },
      },
    },
    directorNames: {
      type: "[String!]!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "directorNames",
        },
      },
    },
    still: {
      type: "File",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "still",
        },
      },
    },
  },
};

export function buildViewingsJsonSchema(
  schema: NodePluginSchema,
  createTypes: Actions["createTypes"]
) {
  createTypes([
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(ViewingWithReview),
  ]);
}
