const path = require("path");

async function createStatPages(createPage, graphql, reporter) {
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
    const pagePath = year === "all" ? `/stats/` : `/stats/${year}/`;

    createPage({
      path: pagePath,
      component: path.resolve("./src/components/StatsPage/StatsPage.tsx"),
      context: {
        yearScope: year,
      },
    });
  });
}

module.exports = async function createViewingsPages(
  graphql,
  reporter,
  createPage
) {
  await createStatPages(createPage, graphql, reporter);
};
