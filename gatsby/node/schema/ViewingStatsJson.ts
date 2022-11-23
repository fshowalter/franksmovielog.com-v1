import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";

const ViewingStatsJson = {
  name: "ViewingStatsJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    movieCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "movie_count",
        },
      },
    },
    newMovieCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "new_movie_count",
        },
      },
    },
    viewingCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "viewing_count",
        },
      },
    },
  },
  extensions: {
    infer: false,
  },
};

export default function buildViewingStatsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(ViewingStatsJson)];
}
