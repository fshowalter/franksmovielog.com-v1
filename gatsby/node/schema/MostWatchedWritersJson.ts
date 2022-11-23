import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { MOST_WATCHED_PEOPLE, MOST_WATCHED_PERSON } from "./MostWatchedPeople";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedWriter = {
  name: "MostWatchedWriter",
  interfaces: [MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("writer"),
};

const MostWatchedWritersJson = {
  name: "MostWatchedWritersJson",
  interfaces: [MOST_WATCHED_PEOPLE, "Node"],
  fields: {
    viewing_year: "String!",
    mostWatched: {
      type: `[MostWatchedDirector!]!`,
      extensions: {
        proxy: {
          from: "most_watched",
        },
      },
    },
  },
  extensions: {
    infer: false,
  },
};

export default function buildMostWatchedWritersJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(MostWatchedWriter),
    schema.buildObjectType(MostWatchedWritersJson),
  ];
}
