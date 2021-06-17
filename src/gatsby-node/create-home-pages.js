const path = require("path");

module.exports = async function createHomePages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        reviews: allMarkdownRemark(
          filter: { postType: { eq: "REVIEW" } }
          sort: { fields: frontmatter___sequence, order: DESC }
        ) {
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
      `Error while running GraphQL query for home updates.`
    );
    return;
  }

  const updates = query.data.reviews.nodes;
  const perPage = 10;
  const numPages = Math.ceil(updates.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const skip = i * perPage;

    createPage({
      path: i === 0 ? `/` : `/page-${i + 1}/`,
      component: path.resolve("./src/templates/home.tsx"),
      context: {
        limit: perPage,
        skip,
        numberOfItems: updates.length,
        currentPage: i + 1,
      },
    });
  });
};
