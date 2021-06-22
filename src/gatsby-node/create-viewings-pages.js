const path = require("path");

async function createViewingStatsPages(createPage, graphql, reporter) {
  const query = await graphql(
    `
      {
        allViewingStatsJson {
          nodes {
            year: viewing_year
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

  const years = query.data.allViewingStatsJson.nodes.map((node) => node.year);
  years.forEach((year) => {
    const pagePath =
      year === "all" ? `/viewings/stats/` : `/viewings/stats/${year}/`;

    createPage({
      path: pagePath,
      component: path.resolve(
        "./src/components/ViewingStatsPage/ViewingStatsPage.tsx"
      ),
      context: {
        yearScope: year,
      },
    });
  });
}

function createViewingsIndexPage(createPage) {
  // Index page
  createPage({
    path: `/viewings/`,
    component: path.resolve(
      "./src/components/ViewingsIndexPage/ViewingsIndexPage.tsx"
    ),
  });
}

module.exports = async function createViewingsPages(
  graphql,
  reporter,
  createPage
) {
  createViewingsIndexPage(createPage);
  await createViewingStatsPages(createPage, graphql, reporter);
};
