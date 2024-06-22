import { SchemaNames } from "../schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "../type-definitions";
import { resolveFieldForNode } from "../utils/resolveFieldForNode";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

interface ViewingNode extends GatsbyNode {
  imdbId: string;
  sequence: number;
  mediumNotes: string | null;
  viewingDate: string;
}

interface MarkdownNode extends GatsbyNode {
  frontmatter: FrontMatter;
}

interface FrontMatter {
  mediumNotes: string;
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
      resolve: async (
        source: ViewingNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo,
      ) => {
        const viewingMarkdownNode =
          await context.nodeModel.findOne<MarkdownNode>({
            type: SchemaNames.MarkdownRemark,
            query: {
              filter: {
                fileAbsolutePath: {
                  regex: `//viewings/${source.sequence
                    .toString()
                    .padStart(4, "0")}-.*/`,
                },
              },
            },
          });

        if (!viewingMarkdownNode) {
          return null;
        }

        const frontMatter = await resolveFieldForNode<FrontMatter>({
          fieldName: "frontmatter",
          source: viewingMarkdownNode,
          context,
          info,
          args,
        });

        return frontMatter ? frontMatter.mediumNotes : null;
      },
    },
    poster: posterFieldResolver,
  },
};
