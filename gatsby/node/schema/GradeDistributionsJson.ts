import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";

const GradeDistributionsJson = {
  name: "GradeDistributionsJson",
  interfaces: ["Node"],
  fields: {
    grade: "String!",
    gradeValue: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "grade_value",
        },
      },
    },
    reviewCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "review_count",
        },
      },
    },
  },
  extensions: {
    infer: false,
  },
};

export default function buildGradeDistributionsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(GradeDistributionsJson)];
}
