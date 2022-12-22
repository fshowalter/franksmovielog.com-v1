import { SchemaNames } from "../schemaNames";

export const TopVenue = {
  name: SchemaNames.TopVenue,
  fields: {
    name: "String!",
    viewingCount: "Int!",
  },
};
