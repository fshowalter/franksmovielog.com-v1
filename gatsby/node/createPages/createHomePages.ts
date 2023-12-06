import type { CreatePagesArgs } from "gatsby";
import path from "path";

const query = `#graphql
{
  reviewedTitles: allReviewedTitlesJson {
    nodes {
      id
    }
  }
}
`;

interface QueryResult {
  reviewedTitles: {
    nodes: {
      id: string;
    }[];
  };
}

export async function createHomePages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;
  const queryResult = await graphql<QueryResult>(query);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for home updates: ${JSON.stringify(
        queryResult.errors,
      )}`,
    );
    return;
  }

  const reviews = queryResult.data.reviewedTitles.nodes;
  const perPage = 10;
  const numPages = Math.ceil(reviews.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const skip = i * perPage;

    createPage({
      path: i === 0 ? `/` : `/page-${i + 1}/`,
      component: path.resolve("./src/templates/home.tsx"),
      context: {
        limit: perPage,
        skip,
        numberOfItems: reviews.length,
        currentPage: i + 1,
      },
    });
  });
}
