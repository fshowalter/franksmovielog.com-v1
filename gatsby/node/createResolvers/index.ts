import { allTimeStatsQuery } from "./allTimeStatsQuery";
import { reviewedMovieQuery } from "./reviewedMovieQuery";
import { statsForYearQuery } from "./statsForYearQuery";
import { viewingsWithReviewOrNoteQuery } from "./viewingsWithReviewOrNoteQuery";
import { watchlistEntityQuery } from "./watchlistEntityQuery";

import type { CreateResolversArgs } from "gatsby";

export function createResolvers({ createResolvers }: CreateResolversArgs) {
  [
    allTimeStatsQuery,
    statsForYearQuery,
    viewingsWithReviewOrNoteQuery,
    reviewedMovieQuery,
    watchlistEntityQuery,
  ].forEach((resolver) => void createResolvers(resolver));
}
