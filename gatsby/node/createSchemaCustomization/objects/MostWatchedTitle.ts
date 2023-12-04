import { SchemaNames } from "../schemaNames";

export const MostWatchedTitle = {
  name: SchemaNames.MostWatchedTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    year: "String!",
    slug: "String",
    count: "Int!",
  },
};
