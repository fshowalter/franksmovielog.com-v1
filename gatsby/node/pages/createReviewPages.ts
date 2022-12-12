import type { Actions, CreatePagesArgs } from "gatsby";
import path from "path";

function createUnderseenGemsPage(createPage: Actions["createPage"]) {
  // Index page
  createPage({
    context: null,
    path: `/reviews/underseen/`,
    component: path.resolve(
      "./src/components/UnderseenGemsPage/UnderseenGemsPage.tsx"
    ),
  });
}

function createOverratedDisappointmentsPage(createPage: Actions["createPage"]) {
  // Index page
  createPage({
    context: null,
    path: `/reviews/overrated/`,
    component: path.resolve(
      "./src/components/OverratedDisappointmentsPage/OverratedDisappointmentsPage.tsx"
    ),
  });
}

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

async function createIndividualReviewPages(
  createPage: Actions["createPage"],
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"]
) {
  const queryResult = await graphql<QueryResult>(query);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for review pages.`
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

export default async function createReviewPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  createUnderseenGemsPage(createPage);
  // createOverratedDisappointmentsPage(createPage);
  await createIndividualReviewPages(createPage, graphql, reporter);
}
