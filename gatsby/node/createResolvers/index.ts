import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { reviewedMovieQuery } from "./reviewedMovieQuery";
import { statsForYearQuery } from "./statsForYearQuery";
import { viewingsWithReviewsQuery } from "./viewingsWithReviewsQuery";
import { watchlistEntityQuery } from "./watchlistEntityQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    allTimeStatsQuery,
    statsForYearQuery,
    viewingsWithReviewsQuery,
    reviewedMovieQuery,
    watchlistEntityQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
