import { SchemaNames } from "../schemaNames";
import { fieldsForMostWatchedType } from "../utils/fieldsForMostWatchedType";

export const MostWatchedWriter = {
  name: SchemaNames.MostWatchedWriter,
  interfaces: [SchemaNames.MostWatchedPerson],
  fields: fieldsForMostWatchedType("writer"),
};
