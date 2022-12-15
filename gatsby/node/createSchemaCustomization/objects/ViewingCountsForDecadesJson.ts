import { SchemaNames } from "../schemaNames";

export const ViewingCountsForDecadesJson = {
  name: SchemaNames.ViewingCountsForDecadesJson,
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    totalViewingCount: "Int!",
    stats: `[${SchemaNames.ViewingCountForDecade}!]!`,
  },
  extensions: {
    infer: false,
  },
};
