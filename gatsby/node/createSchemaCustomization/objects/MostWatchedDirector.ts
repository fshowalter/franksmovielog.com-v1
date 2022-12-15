import { SchemaNames } from "../schemaNames";
import { fieldsForMostWatchedType } from "../utils/fieldsForMostWatchedType";

export const MostWatchedDirector = {
  name: SchemaNames.MostWatchedDirector,
  interfaces: [SchemaNames.MostWatchedPerson],
  fields: fieldsForMostWatchedType("director"),
};
