import { CreatePagesArgs } from "gatsby";
import { createCastAndCrewMemberPages } from "./createCastAndCrewMemberPages";
import { createReviewPages } from "./createReviewPages";
import { createWatchlistPages } from "./createWatchlistPages";
import { createYearStatsPages } from "./createYearStatsPages";

export async function createPages(args: CreatePagesArgs) {
  await createReviewPages(args);
  await createWatchlistPages(args);
  await createYearStatsPages(args);
  await createCastAndCrewMemberPages(args);
}
