import { SchemaNames } from "../schemaNames";

export const MostWatchedWritersJson = {
  name: SchemaNames.MostWatchedWritersJson,
  interfaces: [SchemaNames.MostWatchedPeople, "Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[${SchemaNames.MostWatchedWriter}!]!`,
  },
  extensions: {
    infer: false,
  },
};
