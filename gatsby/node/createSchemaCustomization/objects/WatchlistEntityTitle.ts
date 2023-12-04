import { SchemaNames } from "../schemaNames";

export const WatchlistEntityTitle = {
  name: SchemaNames.WatchlistEntityTitle,
  fields: {
    imdbId: "String!",
    title: "String!",
    sortTitle: "String!",
    year: "String!",
    slug: "String",
    grade: "String",
    gradeValue: "Int",
    yearAndImdbId: "String!",
  },
};
