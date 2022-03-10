import type { CreatePagesArgs } from "gatsby";
import path from "path";

interface QueryResult {
  viewing: {
    nodes: {
      year: string;
    }[];
  };
}

export default async function createStatPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const queryResult = await graphql<QueryResult>(
    `
      {
        viewing: allViewingStatsJson {
          nodes {
            year: viewing_year
          }
        }
      }
    `
  );

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for viewing stats.`
    );
    return;
  }

  const years = queryResult.data.viewing.nodes.map((node) => node.year);
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
