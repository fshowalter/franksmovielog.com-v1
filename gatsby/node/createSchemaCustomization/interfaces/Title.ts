import { SchemaNames } from "../schemaNames";

export const Title = {
  name: SchemaNames.Title,
  fields: {
    imdbId: "String!",
    title: "String!",
    year: "String!",
    grade: "String",
    slug: "String",
    still: "File",
    poster: "File!",
  },
};
