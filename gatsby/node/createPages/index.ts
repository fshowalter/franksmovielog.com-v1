import { CreatePagesArgs } from "gatsby";
import { createCastAndCrewMemberPages } from "./createCastAndCrewMemberPages";
import { createCollectionPages } from "./createCollectionPages";
import { createReviewPages } from "./createReviewPages";
import { createYearStatsPages } from "./createYearStatsPages";

export async function createPages(args: CreatePagesArgs) {
  await createReviewPages(args);
  await createCollectionPages(args);
  await createYearStatsPages(args);
  await createCastAndCrewMemberPages(args);
}
