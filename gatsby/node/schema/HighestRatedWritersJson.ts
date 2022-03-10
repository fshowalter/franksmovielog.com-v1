import { SchemaNames } from "./schemaNames";

const HighestRatedWritersJson = {
  name: SchemaNames.HIGHEST_RATED_WRITERS_JSON,
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: `[${SchemaNames.HIGHEST_RATED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default HighestRatedWritersJson;
