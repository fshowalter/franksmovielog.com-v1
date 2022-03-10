import { SchemaNames } from "./schemaNames";

const HighestRatedPerson = {
  name: SchemaNames.HIGHEST_RATED_PERSON,
  fields: {
    imdb_id: "String!",
    full_name: "String!",
    slug: "String",
    average_grade_value: "Float!",
    review_count: "Int!",
    reviews: `[${SchemaNames.HIGHEST_RATED_PERSON_REVIEW}!]!`,
  },
};

export default HighestRatedPerson;
