import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { reviewedTitleQuery } from "./reviewedTitleQuery";
import { watchlistCollectionQuery } from "./watchlistCollectionQuery";
import { watchlistDirectorQuery } from "./watchlistDirectorQuery";
import { watchlistPerformerQuery } from "./watchlistPerformerQuery";
import { watchlistWriterQuery } from "./watchlistWriterQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    reviewedTitleQuery,
    watchlistDirectorQuery,
    watchlistCollectionQuery,
    watchlistPerformerQuery,
    watchlistWriterQuery,
    allTimeStatsQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
