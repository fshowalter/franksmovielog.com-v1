import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { MOST_WATCHED_PEOPLE, MOST_WATCHED_PERSON } from "./MostWatchedPeople";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedPerformer = {
  name: "MostWatchedPerformer",
  interfaces: [MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("performer"),
};

const MostWatchedPerformersJson = {
  name: "MostWatchedPerformersJson",
  interfaces: [MOST_WATCHED_PEOPLE, "Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[MostWatchedPerformer!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildMostWatchedPerformersJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(MostWatchedPerformer),
    schema.buildObjectType(MostWatchedPerformersJson),
  ];
}
