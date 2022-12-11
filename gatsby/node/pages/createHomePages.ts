import type { CreatePagesArgs } from "gatsby";
import path from "path";

const query = `#graphql
{
  viewings: viewingsWithReviews {
    id
  }
}
`;

interface QueryResult {
  viewings: {
    id: string;
  }[];
}

export default async function createHomePages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;
  const queryResult = await graphql<QueryResult>(query);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for home updates: ${JSON.stringify(
        queryResult.errors
      )}`
    );
    return;
  }

  const updates = queryResult.data.viewings;
  const perPage = 10;
  const numPages = Math.ceil(updates.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const skip = i * perPage;

    createPage({
      path: i === 0 ? `/` : `/page-${i + 1}/`,
      component: path.resolve("./src/components/HomePage/HomePage.tsx"),
      context: {
        limit: perPage,
        skip,
        numberOfItems: updates.length,
        currentPage: i + 1,
      },
    });
  });
}
