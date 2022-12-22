import { CreatePagesArgs } from "gatsby";
import createHomePages from "./createHomePages";
import { createReviewPages } from "./createReviewPages";
import createStatPages from "./createStatPages";
import createWatchlistPages from "./createWatchlistPages";

export async function createPages(args: CreatePagesArgs) {
  await createHomePages(args);
  await createReviewPages(args);
  await createWatchlistPages(args);
  await createStatPages(args);
}
