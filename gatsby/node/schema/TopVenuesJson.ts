import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";

const TopVenuesJsonStat = {
  name: "TopVenuesJsonStat",
  fields: {
    name: "String!",
    viewing_count: "Int!",
  },
};

const TopVenuesJson = {
  name: "TopVenuesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[TopVenuesJsonStat!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildTopVenuesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(TopVenuesJsonStat),
    schema.buildObjectType(TopVenuesJson),
  ];
}
