import { SchemaNames } from "../schemaNames";

export const GradeDistributionsJson = {
  name: SchemaNames.GradeDistributionsJson,
  interfaces: ["Node"],
  fields: {
    grade: "String!",
    gradeValue: "Int!",
    reviewCount: "Int!",
  },
  extensions: {
    infer: false,
  },
};
