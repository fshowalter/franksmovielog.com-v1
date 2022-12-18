import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { reviewedMovieQuery } from "./reviewedMovieQuery";
import { statsForYearQuery } from "./statsForYearQuery";
import { viewingsWithReviewQuery } from "./viewingsWithReviewQuery";
import { watchlistEntityQuery } from "./watchlistEntityQuery";
import { watchlistProgressQuery } from "./watchlistProgressQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    allTimeStatsQuery,
    statsForYearQuery,
    viewingsWithReviewQuery,
    reviewedMovieQuery,
    watchlistEntityQuery,
    watchlistProgressQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
