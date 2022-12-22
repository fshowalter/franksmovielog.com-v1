import { SchemaNames } from "../schemaNames";

export const TopVenuesJson = {
  name: SchemaNames.TopVenueJson,
  interfaces: ["Node"],
  fields: {
    viewingYear: "String!",
    totalViewingCount: "Int!",
    stats: `[${SchemaNames.TopVenue}!]!`,
  },
  extensions: {
    infer: false,
  },
};
