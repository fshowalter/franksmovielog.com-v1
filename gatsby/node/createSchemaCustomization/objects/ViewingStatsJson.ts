import { SchemaNames } from "../schemaNames";

export const ViewingStatsJson = {
  name: SchemaNames.ViewingStatsJson,
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    movieCount: "Int!",
    newMovieCount: "Int!",
    viewingCount: "Int!",
  },
  extensions: {
    infer: false,
  },
};
