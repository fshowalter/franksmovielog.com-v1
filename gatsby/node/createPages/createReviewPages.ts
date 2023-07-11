import type { CreatePagesArgs } from "gatsby";
import path from "path";

const query = `#graphql
{
  reviews: allReviewedMoviesJson {
    nodes {
      id
      slug
    }
  }
}
`;

interface QueryResult {
  reviews: {
    nodes: {
      id: string;
      slug: string;
    }[];
  };
}

export async function createReviewPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const queryResult = await graphql<QueryResult>(query);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for review pages.`,
    );
    return;
  }

  // Review pages
  queryResult.data.reviews.nodes.forEach((node) => {
    createPage({
      path: `/reviews/${node.slug}/`,
      component: path.resolve("./src/templates/review.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}
