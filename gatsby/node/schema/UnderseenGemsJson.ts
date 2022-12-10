import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { posterResolver } from "./resolvers/posterResolver";

const UnderseenGemsJson = {
  name: "UnderseenGemsJson",
  interfaces: ["Node"],
  fields: {
    imdbId: "String!",
    genres: "[String!]!",
    slug: "String!",
    sortTitle: "String!",
    title: "String!",
    year: "Int!",
    grade: "String!",
    gradeValue: "Int!",
    releaseDate: "String!",
    poster: posterResolver,
  },
  extensions: {
    infer: false,
  },
};

export default function buildUnderseenGemsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(UnderseenGemsJson)];
}
