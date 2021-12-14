const path = require("path");

function createReviewsIndexPage(createPage) {
  // Index page
  createPage({
    path: `/reviews/`,
    component: path.resolve(
      "./src/components/ReviewsIndexPage/ReviewsIndexPage.tsx"
    ),
  });
}

function createUnderseenGemsPage(createPage) {
  // Index page
  createPage({
    path: `/reviews/underseen/`,
    component: path.resolve(
      "./src/components/UnderseenGemsPage/UnderseenGemsPage.tsx"
    ),
  });
}

async function createIndividualReviewPages(createPage, graphql, reporter) {
  const query = await graphql(
    `
      {
        reviews: allReviewedMoviesJson {
          nodes {
            imdb_id
            slug
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for review pages.`
    );
    return;
  }

  // Review pages
  query.data.reviews.nodes.forEach((node) => {
    createPage({
      path: `/reviews/${node.slug}/`,
      component: path.resolve("./src/components/ReviewPage/ReviewPage.tsx"),
      context: {
        imdbId: node.imdb_id,
      },
    });
  });
}

module.exports = async function createReviewPages(
  graphql,
  reporter,
  createPage
) {
  createReviewsIndexPage(createPage);
  createUnderseenGemsPage(createPage);
  await createIndividualReviewPages(createPage, graphql, reporter);
};
