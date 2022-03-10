import { Element } from "hast";
import { selectAll } from "hast-util-select";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
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
import valueForGrade from "./utils/valueForGrade";

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

function fixFootnoteRefs(element: Element, sequence: number) {
  const sups = selectAll("sup[id^=fnref]", element);
  for (const sup of sups) {
    sup.properties.id = sup.properties.id.replace(
      "fnref-",
      `fnref:${sequence}-`
    );
  }

  const supAnchors = selectAll("a[href^=#fn-]", element);
  for (const supAnchor of supAnchors) {
    supAnchor.properties.href = supAnchor.properties.href.replace(
      "#fn-",
      `#fn:${sequence}-`
    );
  }

  const listItems = selectAll("li[id^=fn-]", element);
  for (const listItem of listItems) {
    listItem.properties.id = listItem.properties.id.replace(
      "fn-",
      `fn:${sequence}-`
    );
  }

  const returnAnchors = selectAll("a[href^=#fnref-]", element);
  for (const returnAnchor of returnAnchors) {
    returnAnchor.properties.href = returnAnchor.properties.href.replace(
      "#fnref-",
      `#fnref:${sequence}-`
    );
  }

  return element;
}

function addVenueNotesFootnote(
  element: Element,
  sequence: number,
  venueNotes: string
) {
  if (!venueNotes) {
    return element;
  }

  const mdast = remark().parse(venueNotes);

  const footNoteItemHast = toHast(mdast, {
    allowDangerousHtml: true,
  }) as Element;

  if (footNoteItemHast && footNoteItemHast.children) {
    const firstChild = footNoteItemHast.children[0] as Element;
    footNoteItemHast.children = firstChild.children;
  }

  const venueFootnote: Element[] = [
    {
      type: "element",
      tagName: "li",
      properties: { id: `fn:${sequence}-v` },
      children: [
        { type: "text", value: "\n" },
        footNoteItemHast,
        {
          type: "element",
          tagName: "a",
          properties: {
            href: `#fnref:${sequence}-v`,
            className: ["footnote-backref"],
          },
          children: [
            {
              type: "text",
              value: "↩",
            },
          ],
        },
        { type: "text", value: "\n" },
      ],
    },
  ];

  const lastElement = element.children[element.children.length - 1] as Element;
  let footNotesListElement: Element;

  if (
    lastElement &&
    lastElement.properties &&
    lastElement.properties.className &&
    lastElement.properties.className === typeof "string" &&
    lastElement.properties.className.includes("footnotes")
  ) {
    footNotesListElement = lastElement.children[3] as Element;
  } else {
    element.children.push({
      type: "element",
      tagName: "div",
      proprties: {
        className: ["footnotes"],
      },
      children: [
        { type: "text", value: "\n" },
        { type: "element", tagName: "hr", properties: {}, children: [] },
        { type: "text", value: "\n" },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: [{ type: "text", value: "\n" }],
        },
        { type: "text", value: "\n" },
      ],
    });

    footNotesListElement = (
      element.children[element.children.length - 1] as Element
    ).children[3] as Element;
  }

  footNotesListElement.children.push(...venueFootnote);

  return element;
}

function fixFootnotes(element: Element, sequence: number, venueNotes: string) {
  fixFootnoteRefs(element, sequence);
  addVenueNotesFootnote(element, sequence, venueNotes);
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
        element.properties.className === typeof "string" &&
        element.properties.className.includes("footnotes")
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
    postType: {
      type: "String",
      resolve: (source: MarkdownNode) => {
        if (source.fileAbsolutePath.includes("/reviews/")) {
          return "REVIEW";
        }

        return null;
      },
    },
    reviewedMovie: {
      type: SchemaNames.REVIEWED_MOVIES_JSON,
      resolve: async (
        source: MarkdownNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const postType = await resolveFieldForNode<string>(
          "postType",
          source,
          context,
          info,
          args
        );

        if (postType !== "REVIEW") {
          return;
        }

        return await findReviewedMovieNode(
          source.frontmatter.imdb_id,
          context.nodeModel
        );
      },
    },
    linkedExcerpt: {
      type: "String",
      resolve: async (
        source: MarkdownNode,
        _args: unknown,
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
            ` <a class="globalExcerptLinkCss" href="/reviews/${source.frontmatter.slug}/">Continue reading...</a></p>`
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

        fixFootnotes(htmlAst, frontMatter.sequence, frontMatter.venue_notes);

        const html = toHtml(htmlAst, {
          allowDangerousHtml: true,
        });

        return addReviewLinks(html, context.nodeModel);
      },
    },
    gradeValue: {
      type: "Int",
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

        return valueForGrade(frontMatter.grade);
      },
    },
  },
};

export default MarkdownRemark;
