import { CreatePagesArgs } from "gatsby";
import { createHomePages } from "./createHomePages";
import { createReviewPages } from "./createReviewPages";
import { createWatchlistPages } from "./createWatchlistPages";
import { createYearStatPages } from "./createYearStatPages";

export async function createPages(args: CreatePagesArgs) {
  await createHomePages(args);
  await createReviewPages(args);
  await createWatchlistPages(args);
  await createYearStatPages(args);
}
