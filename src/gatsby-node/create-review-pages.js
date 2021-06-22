const path = require("path");

async function createReviewStatsPages(createPage, graphql, reporter) {
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
      component: path.resolve("./src/templates/review-stats-for-year.tsx"),
      context: {
        yearScope: year,
      },
    });
  });
}

function createReviewsIndexPage(createPage) {
  // Index page
  createPage({
    path: `/reviews/`,
    component: path.resolve(
      "./src/components/ReviewsIndexPage/ReviewsIndexPage.tsx"
    ),
  });
}

function createReviewStatsIndexPage(createPage) {
  // Index page
  createPage({
    path: `/reviews/stats/`,
    component: path.resolve("./src/components/ReviewStats/AllTime.tsx"),
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
  await createIndividualReviewPages(createPage, graphql, reporter);
  createReviewStatsIndexPage(createPage);
  await createReviewStatsPages(createPage, graphql, reporter);
};
