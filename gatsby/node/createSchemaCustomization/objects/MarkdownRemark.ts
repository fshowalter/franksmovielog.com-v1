import { Element } from "hast";
import toHtml from "hast-util-to-html";
import { SchemaNames } from "../schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyNodeModel,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "../type-definitions";
import { resolveFieldForNode } from "../utils/resolveFieldForNode";
import { excerptHtmlFieldResolver } from "./fieldResolvers/excerptHtmlFieldResolver";
import { findReviewedMovieNode } from "./fieldResolvers/reviewedMovieFieldResolver";

export interface MarkdownNode extends GatsbyNode {
  fileAbsolutePath: string;
  frontmatter: FrontMatter;
}

interface FrontMatter {
  imdb_id: string;
  sequence: number;
  slug: string;
  venue_notes: string;
  grade: string;
  date: string;
}

async function addReviewLinks(text: string, nodeModel: GatsbyNodeModel) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  for (const match of matches) {
    const reviewedMovie = await findReviewedMovieNode(match[2], nodeModel);

    if (!reviewedMovie) {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        match[3]
      );
    } else {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        `<a href="/reviews/${reviewedMovie.slug}/">${match[3]}</a>`
      );
    }
  }

  return result;
}

export const MarkdownRemark = {
  name: SchemaNames.MarkdownRemark,
  interfaces: ["Node"],
  fields: {
    html: {
      type: "String!",
      extensions: {
        linkReviewedMovies: {},
      },
    },
    excerptHtml: excerptHtmlFieldResolver,
    linkedHtml: {
      type: "String",
      resolve: async (
        source: MarkdownNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const frontMatter = await resolveFieldForNode<FrontMatter>(
          "frontmatter",
          source,
          context,
          info,
          args
        );

        if (!frontMatter) {
          return null;
        }

        const htmlAst = await resolveFieldForNode<Element>(
          "htmlAst",
          source,
          context,
          info,
          args
        );

        if (!htmlAst) {
          return null;
        }

        const html = toHtml(htmlAst, {
          allowDangerousHtml: true,
        });

        return addReviewLinks(html, context.nodeModel);
      },
    },
  },
};
