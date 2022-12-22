import { SchemaNames } from "../schemaNames";

export const WatchlistEntityTypeEnum = {
  name: SchemaNames.WatchlistEntityType,
  values: {
    director: { value: `director` },
    writer: { value: `writer` },
    performer: { value: `performer` },
    collection: { value: `collection` },
  },
};
