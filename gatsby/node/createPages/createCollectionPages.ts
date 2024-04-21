import type { CreatePagesArgs } from "gatsby";
import path from "path";

interface CollectionQueryResult {
  collection: {
    nodes: {
      id: string;
      slug: string;
    }[];
  };
}

export async function createCollectionPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const queryResult = await graphql<CollectionQueryResult>(`
    {
      collection: allCollectionsJson(filter: { reviewCount: { gt: 0 } }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running query watchlist collection pages.`,
    );
    return;
  }

  queryResult.data.collection.nodes.forEach((node) => {
    createPage({
      path: `/collections/${node.slug}/`,
      component: path.resolve("./src/templates/collection.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}
