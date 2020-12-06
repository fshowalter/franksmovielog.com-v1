const path = require("path");

module.exports = async function createReviewPages(
  graphql,
  reporter,
  createPage
) {
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

  // Create review pages
  query.data.reviews.nodes.forEach((node) => {
    createPage({
      path: `/reviews/${node.slug}/`,
      component: path.resolve("./src/templates/review.tsx"),
      context: {
        imdbId: node.imdb_id,
      },
    });
  });
};
