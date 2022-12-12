import type { GatsbyNode } from "gatsby";
import createHomePages from "./pages/createHomePages";
import { createReviewPages } from "./pages/createReviewPages";
import createStatPages from "./pages/createStatPages";
import createWatchlistPages from "./pages/createWatchlistPages";

const createPages: GatsbyNode["createPages"] = async (createPagesArgs) => {
  await createHomePages(createPagesArgs);
  await createReviewPages(createPagesArgs);
  await createWatchlistPages(createPagesArgs);
  await createStatPages(createPagesArgs);
};

export default createPages;
