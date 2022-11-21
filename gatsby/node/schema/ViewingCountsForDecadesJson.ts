import { SchemaNames } from "./schemaNames";

const TopMediaJson = {
  name: SchemaNames.VIEWING_COUNTS_FOR_DECADES_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[${SchemaNames.DECADE_STAT}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default TopMediaJson;
