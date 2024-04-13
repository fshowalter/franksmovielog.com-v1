import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { castAndCrewMemberQuery } from "./castAndCrewMemberQuery";
import { reviewedTitleQuery } from "./reviewedTitleQuery";
import { watchlistCollectionQuery } from "./watchlistCollectionQuery";
import { watchlistDirectorQuery } from "./watchlistDirectorQuery";
import { watchlistPerformerQuery } from "./watchlistPerformerQuery";
import { watchlistProgressQuery } from "./watchlistProgressQuery";
import { watchlistWriterQuery } from "./watchlistWriterQuery";
import { yearStatsQuery } from "./yearStatsQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    reviewedTitleQuery,
    watchlistDirectorQuery,
    watchlistCollectionQuery,
    watchlistPerformerQuery,
    watchlistWriterQuery,
    allTimeStatsQuery,
    watchlistProgressQuery,
    yearStatsQuery,
    castAndCrewMemberQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
