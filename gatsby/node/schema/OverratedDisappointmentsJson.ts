import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { SchemaNames } from "./schemaNames";

const OverratedDisappointmentsJson = {
  name: "OverratedDisappointmentsJson",
  interfaces: ["Node"],
  fields: {
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    genres: "[String!]!",
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}!`,
      extensions: {
        link: {
          from: "imdbId",
          by: "imdbId",
        },
      },
    },
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
