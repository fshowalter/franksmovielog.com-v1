import { SchemaNames } from "../schemaNames";
import { fieldsForMostWatchedType } from "../utils/fieldsForMostWatchedType";

export const MostWatchedPerformer = {
  name: SchemaNames.MostWatchedPerformer,
  interfaces: [SchemaNames.MostWatchedPerson],
  fields: fieldsForMostWatchedType("performer"),
};
