import { SchemaNames } from "./schemaNames";

const GradeDistributionsJson = {
  name: SchemaNames.GRADE_DISTRIBUTIONS_JSON,
  interfaces: ["Node"],
  fields: {
    grade: "String!",
    grade_value: "Int!",
    review_count: "Int!",
  },
  extensions: {
    infer: false,
  },
};

export default GradeDistributionsJson;
