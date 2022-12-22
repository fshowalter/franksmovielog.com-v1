import { SchemaNames } from "../schemaNames";

export const ViewingCountForDecade = {
  name: SchemaNames.ViewingCountForDecade,
  fields: {
    decade: "String!",
    viewingCount: "Int!",
  },
};
