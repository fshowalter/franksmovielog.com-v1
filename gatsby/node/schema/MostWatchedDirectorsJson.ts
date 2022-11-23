import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { MOST_WATCHED_PEOPLE, MOST_WATCHED_PERSON } from "./MostWatchedPeople";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedDirector = {
  name: "MostWatchedDirector",
  interfaces: [MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("director"),
};

const MostWatchedDirectorsJson = {
  name: "MostWatchedDirectorsJson",
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

export default function buildMostWatchedDirectorsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(MostWatchedDirector),
    schema.buildObjectType(MostWatchedDirectorsJson),
  ];
}
