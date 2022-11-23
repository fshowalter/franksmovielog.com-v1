import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { Element } from "hast";
import toHtml from "hast-util-to-html";
import { Parent } from "unist";
import visit from "unist-util-visit";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyNodeModel,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import findReviewedMovieNode from "./utils/findReviewedMovieNode";
import resolveFieldForNode from "./utils/resolveFieldForNode";

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

function removeFootnotes(element: Element) {
  visit(
    element,
    "element",
    function (
      element: Element,
      index: number | null,
      parent: Parent | undefined
    ) {
      if (
        parent &&
        index &&
        element.tagName === "div" &&
        element.properties &&
        element.properties.className &&
        typeof element.properties.className === "string" &&
        element.properties.className.includes("footnotes")
      ) {
        parent.children.splice(index, 1);
        return [visit.SKIP, index];
      }

      if (
        parent &&
        index &&
        element.tagName === "sup" &&
        element.properties &&
        element.properties.id &&
        typeof element.properties.id === "string" &&
        element.properties.id.startsWith("fnref-")
      ) {
        parent.children.splice(index, 1);
        return [visit.SKIP, index];
      }
    }
  );

  return element;
}

const MarkdownRemark = {
  name: SchemaNames.MARKDOWN_REMARK,
  interfaces: ["Node"],
  fields: {
    linkedExcerpt: {
      type: "String",
      args: {
        includeCssClass: {
          type: "Boolean",
          defaultValue: true,
        },
      },
      resolve: async (
        source: MarkdownNode,
        args: { includeCssClass: true },
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const rawMarkdownBody = await resolveFieldForNode<string>(
          "rawMarkdownBody",
          source,
          context,
          info,
          { format: "HTML", pruneLength: 20000, truncate: false }
        );

        if (!rawMarkdownBody) {
          return null;
        }

        const hasExcerptBreak = rawMarkdownBody.includes("<!-- end -->");

        const excerptAst = await resolveFieldForNode<Element>(
          "excerptAst",
          source,
          context,
          info,
          { pruneLength: 20000, truncate: false }
        );

        if (!excerptAst) {
          return null;
        }

        removeFootnotes(excerptAst);

        let excerpt = toHtml(excerptAst, {
          allowDangerousHtml: true,
        });

        if (hasExcerptBreak) {
          excerpt = excerpt.replace(/\n+$/, "");
          excerpt = excerpt.replace(
            /<\/p>$/,
            ` <a ${
              args.includeCssClass ? 'class="globalExcerptLinkCss"' : ""
            } href="/reviews/${
              source.frontmatter.slug
            }/">Continue reading...</a></p>`
          );
        }

        return addReviewLinks(excerpt, context.nodeModel);
      },
    },
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

export default function buildMarkdownRemarkSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(MarkdownRemark)];
}
