import { SchemaNames } from "./schemaNames";

const ReviewedMovieWatchlistEntities = {
  name: SchemaNames.REVIEWED_MOVIES_WATCHLIST_ENTITIES,
  fields: {
    performers: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}]`,
    directors: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}]`,
    writers: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}]`,
    collections: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}]`,
  },
};

export default ReviewedMovieWatchlistEntities;
