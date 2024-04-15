import { Node } from "hast";
import toHtml from "hast-util-to-html";
import toHast from "mdast-util-to-hast";
import remark from "remark";
import { SchemaNames } from "../schemaNames";
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
    titleCount: "Int!",
    reviewCount: "Int!",
    titles: `[${SchemaNames.CollectionTitle}!]!`,
    avatar: avatarFieldResolver,
    description: {
      type: "String",
      resolve: (source: { description: string }) => {
        if (!source.description) {
          return null;
        }

        const mdast = remark().parse(source.description);

        const hast = toHast(mdast, {
          allowDangerousHtml: true,
        }) as IHastNode;

        hast.children[0].tagName = "span";

        return toHtml(hast);
      },
    },
  },
};
