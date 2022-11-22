import { SchemaNames } from "./schemaNames";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedPerformer = {
  name: SchemaNames.MOST_WATCHED_PERFORMER,
  interfaces: [SchemaNames.MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("performer"),
};

export default MostWatchedPerformer;
