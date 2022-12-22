import { SchemaNames } from "../schemaNames";

export const MostWatchedDirectorsJson = {
  name: SchemaNames.MostWatchedDirectorsJson,
  interfaces: [SchemaNames.MostWatchedPeople, "Node"],
  fields: {
    viewingYear: "String!",
    mostWatched: `[${SchemaNames.MostWatchedDirector}!]!`,
  },
  extensions: {
    infer: false,
  },
};
