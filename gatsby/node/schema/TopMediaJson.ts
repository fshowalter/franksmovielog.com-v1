import { SchemaNames } from "./schemaNames";

const TopMediaJson = {
  name: SchemaNames.TOP_MEDIA_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: `[${SchemaNames.MEDIUM_STAT}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default TopMediaJson;
