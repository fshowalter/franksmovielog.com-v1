import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { SchemaNames } from "./schemaNames";
import posterResolver from "./utils/posterResolver";

const MostWatchedMovie = {
  name: "MostWatchedMovie",
  fields: {
    viewingCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "viewing_count",
        },
      },
    },
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    title: "String!",
    year: "Int!",
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      extensions: {
        link: {
          from: "imdbId",
          by: "imdbId",
        },
      },
    },
    poster: posterResolver,
  },
};

const MostWatchedMoviesJson = {
  name: "MostWatchedMoviesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: `[MostWatchedMovie!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildMostWatchedMoviesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(MostWatchedMovie),
    schema.buildObjectType(MostWatchedMoviesJson),
  ];
}
