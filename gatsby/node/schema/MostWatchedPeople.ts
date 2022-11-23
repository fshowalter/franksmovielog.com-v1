import type { GatsbyGraphQLInterfaceType, NodePluginSchema } from "gatsby";

import { SchemaNames } from "./schemaNames";

export const MOST_WATCHED_PEOPLE = "MostWatchedPeople";
export const MOST_WATCHED_PERSON = "MostWatchedPerson";

const MostWatchedPerson = {
  name: MOST_WATCHED_PERSON,
  fields: {
    imdbId: "String!",
    fullName: "String!",
    slug: "String",
    viewingCount: "Int!",
    viewings: `[${SchemaNames.VIEWINGS_JSON}!]!`,
  },
};

const MostWatchedPeople = {
  name: MOST_WATCHED_PEOPLE,
  interfaces: ["Node"],
  fields: {
    id: "ID!",
    viewing_year: "String!",
    mostWatched: `[MostWatchedPerson!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default function buildMostWatchedPeopleSchema(
  schema: NodePluginSchema
): GatsbyGraphQLInterfaceType[] {
  return [
    schema.buildInterfaceType(MostWatchedPerson),
    schema.buildInterfaceType(MostWatchedPeople),
  ];
}
