import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { castAndCrewMemberQuery } from "./castAndCrewMemberQuery";
import { collectionQuery } from "./collectionQuery";
import { reviewedTitleQuery } from "./reviewedTitleQuery";
import { watchlistProgressQuery } from "./watchlistProgressQuery";
import { yearStatsQuery } from "./yearStatsQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    reviewedTitleQuery,
    collectionQuery,
    allTimeStatsQuery,
    watchlistProgressQuery,
    yearStatsQuery,
    castAndCrewMemberQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
