import type { CreatePagesArgs } from "gatsby";
import path from "path";

interface CastAndCrewQueryResult {
  entity: {
    nodes: {
      id: string;
      slug: string;
    }[];
  };
}

export async function createCastAndCrewMemberPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const queryResult = await graphql<CastAndCrewQueryResult>(`
    {
      entity: allCastAndCrewJson {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running query cast and crew member pages.`,
    );
    return;
  }

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/cast-and-crew/${node.slug}/`,
      component: path.resolve("./src/templates/castAndCrewMember.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}
