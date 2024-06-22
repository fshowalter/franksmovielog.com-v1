import { SchemaNames } from "../schemaNames";
import type { GatsbyNode } from "../type-definitions";
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

    poster: posterFieldResolver,
  },
};
