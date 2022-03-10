import { SchemaNames } from "./schemaNames";

const HighestRatedPersonReview = {
  name: SchemaNames.HIGHEST_RATED_PERSON_REVIEW,
  fields: {
    sequence: "Int!",
    grade_value: "Float!",
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    title: "String!",
    year: "Int!",
    slug: "String",
  },
};

export default HighestRatedPersonReview;
