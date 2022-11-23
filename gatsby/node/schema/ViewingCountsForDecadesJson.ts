import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";

const ViewingCountsForDecadesJsonStat = {
  name: "ViewingCountsForDecadesJsonStat",
  fields: {
    decade: "String!",
    viewing_count: "Int!",
  },
};

const ViewingCountsForDecadesJson = {
  name: "ViewingCountsForDecadesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[ViewingCountsForDecadesJsonStat!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildViewingCountsForDecadesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(ViewingCountsForDecadesJsonStat),
    schema.buildObjectType(ViewingCountsForDecadesJson),
  ];
}
