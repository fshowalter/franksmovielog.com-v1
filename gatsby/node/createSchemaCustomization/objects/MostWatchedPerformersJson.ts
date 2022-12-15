import { SchemaNames } from "../schemaNames";

export const MostWatchedPerformersJson = {
  name: SchemaNames.MostWatchedPerformersJson,
  interfaces: [SchemaNames.MostWatchedPeople, "Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[${SchemaNames.MostWatchedPerformer}!]!`,
  },
  extensions: {
    infer: false,
  },
};
