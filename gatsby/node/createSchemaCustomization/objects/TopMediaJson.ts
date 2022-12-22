import { SchemaNames } from "../schemaNames";

export const TopMediaJson = {
  name: SchemaNames.TopMediaJson,
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    totalViewingCount: "Int!",
    stats: `[${SchemaNames.TopMedium}!]!`,
  },
  extensions: {
    infer: false,
  },
};
