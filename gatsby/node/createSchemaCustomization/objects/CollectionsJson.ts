import { Node } from "hast";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
import { SchemaNames } from "../schemaNames";
import { GatsbyNodeContext, GatsbyResolveArgs } from "../type-definitions";
import addReviewLinks from "../utils/addReviewLinks";
import { avatarFieldResolver } from "./fieldResolvers/avatarFieldResolver";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";

interface IHastNode extends Node {
  children: {
    tagName: string;
  }[];
}

export const CollectionTitle = {
  name: SchemaNames.CollectionTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    sortTitle: "String!",
    year: "String!",
    slug: "String",
    grade: "String",
    gradeValue: "Int",
    releaseSequence: "String!",
    poster: posterFieldResolver,
  },
};

export const CollectionsJson = {
  name: SchemaNames.CollectionsJson,
  interfaces: ["Node"],
  fields: {
    name: "String!",
    slug: "String!",
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.CollectionTitle}!]!`,
    avatar: avatarFieldResolver,
    description: {
      type: "String",
      resolve: (
        source: { description: string },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
      ) => {
        if (!source.description) {
          return null;
        }

        const mdast = remark().parse(source.description);

        const hast = toHast(mdast, {
          allowDangerousHtml: true,
        }) as IHastNode;

        hast.children[0].tagName = "span";

        const html = toHtml(hast, {
          allowDangerousHtml: true,
        });

        return addReviewLinks(html, context.nodeModel);
      },
    },
  },
  extensions: {
    infer: false,
  },
};
