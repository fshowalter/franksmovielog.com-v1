import { SchemaNames } from "./schemaNames";

const HighestRatedPerformersJson = {
  name: SchemaNames.HIGHEST_RATED_PERFORMERS_JSON,
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: `[${SchemaNames.HIGHEST_RATED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default HighestRatedPerformersJson;
