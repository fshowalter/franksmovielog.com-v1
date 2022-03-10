import { SchemaNames } from "./schemaNames";

const VenueStat = {
  name: SchemaNames.VENUE_STAT,
  fields: {
    name: "String!",
    viewing_count: "Int!",
  },
};

export default VenueStat;
