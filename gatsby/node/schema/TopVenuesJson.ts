import { SchemaNames } from "./schemaNames";

const TopVenuesJson = {
  name: SchemaNames.TOP_VENUES_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[${SchemaNames.VENUE_STAT}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default TopVenuesJson;
