import { SchemaNames } from "./schemaNames";

const HighestRatedDirectorsJson = {
  name: SchemaNames.HIGHEST_RATED_DIRECTORS_JSON,
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: `[${SchemaNames.HIGHEST_RATED_PERSON}!]!`,
  },
  extensions: {
    infer: false,
  },
};

export default HighestRatedDirectorsJson;
