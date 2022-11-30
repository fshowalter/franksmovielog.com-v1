import { Element } from "hast";
import toHtml from "hast-util-to-html";
import { MarkdownNode } from "../MarkdownRemark";
import type { GatsbyNodeContext, GatsbyResolveInfo } from "../type-definitions";
import removeFootnotes from "../utils/removeFootnotes";
import resolveFieldForNode from "../utils/resolveFieldForNode";

export default function excerptHtmlResolver() {
  return async (
    source: MarkdownNode,
    args: Record<string, unknown>,
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

    return excerpt;
  };
}
