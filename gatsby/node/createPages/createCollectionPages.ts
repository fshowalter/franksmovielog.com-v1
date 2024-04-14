import type { Actions, CreatePagesArgs } from "gatsby";
import path from "path";

interface CollectionQueryResult {
  collection: {
    nodes: {
      id: string;
      slug: string;
    }[];
  };
}

async function createCollectionPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"],
) {
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

export async function createWatchlistPages({
  graphql,
  reporter,
  actions,
}: CreatePagesArgs) {
  const { createPage } = actions;

  await createCollectionPages(graphql, reporter, createPage);
}
