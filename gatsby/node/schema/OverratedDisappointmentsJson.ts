import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { posterResolver } from "./resolvers/posterResolver";

const OverratedDisappointmentsJson = {
  name: "OverratedDisappointmentsJson",
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

export default function buildOverratedDisappointmentsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(OverratedDisappointmentsJson)];
}
