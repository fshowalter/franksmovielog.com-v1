import { SchemaNames } from "./schemaNames";

const MediumStat = {
  name: SchemaNames.MEDIUM_STAT,
  fields: {
    name: "String!",
    viewing_count: "Int!",
  },
};

export default MediumStat;
