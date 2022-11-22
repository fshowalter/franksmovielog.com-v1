import { SchemaNames } from "./schemaNames";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedDirector = {
  name: SchemaNames.MOST_WATCHED_DIRECTOR,
  interfaces: [SchemaNames.MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("director"),
};

export default MostWatchedDirector;
