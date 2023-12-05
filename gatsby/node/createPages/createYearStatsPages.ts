import type { CreatePagesArgs } from "gatsby";
import path from "path";

interface QueryResult {
  yearStats: {
    nodes: {
      year: string;
    }[];
  };
}

export async function createYearStatsPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const queryResult = await graphql<QueryResult>(`
    {
      yearStats: allYearStatsJson {
        nodes {
          year
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for viewing stats.`,
    );
    return;
  }

  const years = queryResult.data.yearStats.nodes.map((node) => node.year);
  years.forEach((year) => {
    createPage({
      path: `/stats/${year}/`,
      component: path.resolve("./src/templates/yearStats.tsx"),
      context: {
        year: year,
      },
    });
  });
}
