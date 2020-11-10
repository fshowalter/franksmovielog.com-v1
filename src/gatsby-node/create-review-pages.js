const path = require("path");

module.exports = async function createReviewPages(
  graphql,
  reporter,
  createPage
) {
  const query = await graphql(
    `
      {
        allMarkdownRemark(filter: { postType: { eq: "REVIEW" } }) {
          nodes {
            frontmatter {
              imdb_id
              slug
            }
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
  query.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: `/reviews/${node.frontmatter.slug}/`,
      component: path.resolve("./src/templates/review.tsx"),
      context: {
        imdbId: node.frontmatter.imdb_id,
      },
    });
  });
};
