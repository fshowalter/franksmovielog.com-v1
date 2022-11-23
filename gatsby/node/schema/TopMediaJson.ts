import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";

const TopMediaJsonStat = {
  name: "TopMediaJsonStat",
  fields: {
    name: "String!",
    viewing_count: "Int!",
  },
};

const TopMediaJson = {
  name: "TopMediaJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[TopMediaJsonStat!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildTopMediaJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(TopMediaJsonStat),
    schema.buildObjectType(TopMediaJson),
  ];
}
