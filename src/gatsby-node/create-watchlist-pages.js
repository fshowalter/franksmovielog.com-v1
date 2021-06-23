const path = require("path");

async function createDirectorPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        directors: allWatchlistEntitiesJson(
          filter: { entity_type: { eq: "director" }, review_count: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (query.errors) {
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

  query.data.directors.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/directors/${node.slug}/`,
      component: path.resolve(
        "./src/components/WatchlistEntityPage/WatchlistEntityPage.tsx"
      ),
      context: {
        slug: node.slug,
        entityType: "director",
      },
    });
  });
}

async function createPerformerPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        performers: allWatchlistEntitiesJson(
          filter: { entity_type: { eq: "performer" }, review_count: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (query.errors) {
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

  query.data.performers.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/performers/${node.slug}/`,
      component: path.resolve(
        "./src/components/WatchlistEntityPage/WatchlistEntityPage.tsx"
      ),
      context: {
        slug: node.slug,
        entityType: "performer",
      },
    });
  });
}

async function createWriterPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        writers: allWatchlistEntitiesJson(
          filter: { entity_type: { eq: "writer" }, review_count: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (query.errors) {
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

  query.data.writers.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/writers/${node.slug}/`,
      component: path.resolve(
        "./src/components/WatchlistEntityPage/WatchlistEntityPage.tsx"
      ),
      context: {
        slug: node.slug,
        entityType: "writer",
      },
    });
  });
}

async function createCollectionPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        collections: allWatchlistEntitiesJson(
          filter: { entity_type: { eq: "collection" }, review_count: { gt: 0 } }
        ) {
          nodes {
            slug
          }
        }
      }
    `
  );

  if (query.errors) {
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

  query.data.collections.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/collections/${node.slug}/`,
      component: path.resolve(
        "./src/components/WatchlistEntityPage/WatchlistEntityPage.tsx"
      ),
      context: {
        slug: node.slug,
        entityType: "collection",
      },
    });
  });
}

function createIndexPage(createPage) {
  createPage({
    path: `/watchlist/`,
    component: path.resolve(
      "./src/components/WatchlistIndexPage/WatchlistIndexPage.tsx"
    ),
  });
}

module.exports = async function createWatchlistPages(
  graphql,
  reporter,
  createPage
) {
  createIndexPage(createPage);
  createDirectorPages(graphql, reporter, createPage);
  createPerformerPages(graphql, reporter, createPage);
  createWriterPages(graphql, reporter, createPage);
  createCollectionPages(graphql, reporter, createPage);
};
