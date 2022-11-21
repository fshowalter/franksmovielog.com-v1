import { SchemaNames } from "./schemaNames";

const DecadeStat = {
  name: SchemaNames.DECADE_STAT,
  fields: {
    decade: "String!",
    viewing_count: "Int!",
  },
};

export default DecadeStat;
