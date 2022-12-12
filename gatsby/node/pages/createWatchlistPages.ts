import type { Actions, CreatePagesArgs } from "gatsby";
import path from "path";

interface EntityQueryResult {
  entity: {
    nodes: {
      slug: string;
    }[];
  };
}

async function createDirectorPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"]
) {
  const queryResult = await graphql<EntityQueryResult>(
    `
      {
        entity: allWatchlistEntitiesJson(
          filter: { entityType: { eq: "director" }, reviewCount: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(`Error while running query watchlist directors.`);
    return;
  }

  createPage({
    path: `/watchlist/directors/`,
    component: path.resolve(
      "./src/components/WatchlistEntityIndexPage/WatchlistEntityIndexPage.tsx"
    ),
    context: {
      entityType: "director",
    },
  });

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/directors/${node.slug}/`,
      component: path.resolve("./src/templates/watchlistEntity.tsx"),
      context: {
        slug: node.slug,
        entityType: "director",
      },
    });
  });
}

async function createPerformerPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"]
) {
  const queryResult = await graphql<EntityQueryResult>(
    `
      {
        entity: allWatchlistEntitiesJson(
          filter: { entityType: { eq: "performer" }, reviewCount: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(`Error while running query watchlist performers.`);
    return;
  }

  createPage({
    path: `/watchlist/performers/`,
    component: path.resolve(
      "./src/components/WatchlistEntityIndexPage/WatchlistEntityIndexPage.tsx"
    ),
    context: {
      entityType: "performer",
    },
  });

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/performers/${node.slug}/`,
      component: path.resolve("./src/templates/watchlistEntity.tsx"),
      context: {
        slug: node.slug,
        entityType: "performer",
      },
    });
  });
}

async function createWriterPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"]
) {
  const queryResult = await graphql<EntityQueryResult>(
    `
      #graphql
      {
        entity: allWatchlistEntitiesJson(
          filter: { entityType: { eq: "writer" }, reviewCount: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(`Error while running query watchlist writers.`);
    return;
  }

  createPage({
    path: `/watchlist/writers/`,
    component: path.resolve(
      "./src/components/WatchlistEntityIndexPage/WatchlistEntityIndexPage.tsx"
    ),
    context: {
      entityType: "writer",
    },
  });

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/writers/${node.slug}/`,
      component: path.resolve("./src/templates/watchlistEntity.tsx"),
      context: {
        slug: node.slug,
        entityType: "writer",
      },
    });
  });
}

async function createCollectionPages(
  graphql: CreatePagesArgs["graphql"],
  reporter: CreatePagesArgs["reporter"],
  createPage: Actions["createPage"]
) {
  const queryResult = await graphql<EntityQueryResult>(
    `
      {
        entity: allWatchlistEntitiesJson(
          filter: { entityType: { eq: "collection" }, reviewCount: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (!queryResult.data || queryResult.errors) {
    reporter.panicOnBuild(`Error while running query watchlist collections.`);
    return;
  }

  createPage({
    path: `/watchlist/collections/`,
    component: path.resolve(
      "./src/components/WatchlistEntityIndexPage/WatchlistEntityIndexPage.tsx"
    ),
    context: {
      entityType: "collection",
    },
  });

  queryResult.data.entity.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/collections/${node.slug}/`,
      component: path.resolve("./src/templates/watchlistEntity.tsx"),
      context: {
        slug: node.slug,
        entityType: "collection",
      },
    });
  });
}

export default async function createWatchlistPages({
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
