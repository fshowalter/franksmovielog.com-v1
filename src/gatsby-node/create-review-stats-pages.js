const path = require("path");

module.exports = async function createReviewStatsPages(
  graphql,
  reporter,
  createPage
) {
  const query = await graphql(
    `
      {
        allReviewStatsJson {
          nodes {
            review_year
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for viewing stats.`
    );
    return;
  }

  const years = query.data.allReviewStatsJson.nodes.map((node) => node.year);
  years.forEach((year) => {
    createPage({
      path: `/reviews/stats/${year}/`,
      component: path.resolve("./src/templates/review-stats.tsx"),
      context: {
        yearScope: year,
      },
    });
  });

  createPage({
    path: `/reviews/stats/`,
    component: path.resolve("./src/templates/review-stats.tsx"),
    context: {
      yearScope: "all",
    },
  });
};
