import { Node } from "hast";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "../type-definitions";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

interface ViewingNode extends GatsbyNode {
  imdbId: string;
  sequence: number;
  mediumNotes: string | null;
  viewingDate: string;
}

interface IHastNode extends Node {
  children: {
    tagName: string;
  }[];
}

export const ViewingsJson = {
  name: SchemaNames.ViewingsJson,
  interfaces: ["Node"],
  fields: {
    genres: "[String!]!",
    medium: "String",
    sequence: "Int!",
    sortTitle: "String!",
    title: "String!",
    venue: "String",
    viewingYear: "String!",
    year: "String!",
    releaseSequence: "String!",
    viewingDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
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
    viewingNote: {
      type: SchemaNames.MarkdownRemark,
      resolve: async (
        source: ViewingNode,
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
    poster: posterFieldResolver,
  },
};
