import { SchemaNames } from "./schemaNames";
import fieldsForMostWatchedType from "./utils/fieldsForMostWatchedType";

const MostWatchedWriter = {
  name: SchemaNames.MOST_WATCHED_WRITER,
  interfaces: [SchemaNames.MOST_WATCHED_PERSON],
  fields: fieldsForMostWatchedType("writer"),
};

export default MostWatchedWriter;
