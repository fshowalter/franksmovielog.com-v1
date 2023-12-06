import type { Actions, CreatePagesArgs } from "gatsby";
import path from "path";

interface EntityQueryResult {
  entity: {
    nodes: {
      id: string;
      slug: string;
    }[];
  };
}

async function createDirectorPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"],
) {
  const queryResult = await graphql<EntityQueryResult>(`
    {
      entity: allWatchlistDirectorsJson(filter: { reviewCount: { gt: 0 } }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running query for watchlist director pages.`,
    );
    return;
  }

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/directors/${node.slug}/`,
      component: path.resolve("./src/templates/director.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}

async function createPerformerPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"],
) {
  const queryResult = await graphql<EntityQueryResult>(`
    {
      entity: allWatchlistPerformersJson(filter: { reviewCount: { gt: 0 } }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(
      `Error while running query watchlist performer pages.`,
    );
    return;
  }

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/performers/${node.slug}/`,
      component: path.resolve("./src/templates/performer.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}

async function createWriterPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"],
) {
  const queryResult = await graphql<EntityQueryResult>(`
    {
      entity: allWatchlistWritersJson(filter: { reviewCount: { gt: 0 } }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(`Error while running query watchlist writer pages.`);
    return;
  }

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/writers/${node.slug}/`,
      component: path.resolve("./src/templates/writer.tsx"),
      context: {
        id: node.id,
      },
    });
  });
}

async function createCollectionPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"],
) {
  const queryResult = await graphql<EntityQueryResult>(`
    {
      entity: allWatchlistCollectionsJson(filter: { reviewCount: { gt: 0 } }) {
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

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/collections/${node.slug}/`,
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

  await createDirectorPages(graphql, reporter, createPage);
  await createPerformerPages(graphql, reporter, createPage);
  await createWriterPages(graphql, reporter, createPage);
  await createCollectionPages(graphql, reporter, createPage);
}
