import { CreatePagesArgs } from "gatsby";
import { createHomePages } from "./createHomePages";
import { createReviewPages } from "./createReviewPages";
import { createWatchlistPages } from "./createWatchlistPages";
import { createYearStatsPages } from "./createYearStatsPages";

export async function createPages(args: CreatePagesArgs) {
  await createHomePages(args);
  await createReviewPages(args);
  await createWatchlistPages(args);
  await createYearStatsPages(args);
}
