import { SchemaNames } from "./schemaNames";

const ViewingStatsJson = {
  name: SchemaNames.VIEWING_STATS_JSON,
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    movie_count: "Int!",
    new_movie_count: "Int!",
    viewing_count: "Int!",
  },
  extensions: {
    infer: false,
  },
};

export default ViewingStatsJson;
