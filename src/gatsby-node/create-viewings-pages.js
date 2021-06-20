const path = require("path");

module.exports = async function createViewingsPages(
  graphql,
  reporter,
  createPage
) {
  createPage({
    path: `/viewings/`,
    component: path.resolve(
      "./src/components/ViewingsIndexPage/ViewingsIndexPage.tsx"
    ),
  });

  const query = await graphql(
    `
      {
        allViewingsJson {
          viewingYears: distinct(field: viewing_year)
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

  const years = query.data.allViewingsJson.viewingYears;
  years.forEach((year) => {
    createPage({
      path: `/viewings/stats/${year}/`,
      component: path.resolve("./src/templates/viewing-stats-for-year.tsx"),
      context: {
        yearScope: year,
      },
    });
  });
};
