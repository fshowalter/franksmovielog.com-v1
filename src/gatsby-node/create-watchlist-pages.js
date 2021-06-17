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
            imdbId: imdb_id
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running query watchlist directors.`);
    return;
  }

  query.data.directors.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/directors/${node.slug}/`,
      component: path.resolve("./src/templates/watchlist/director.tsx"),
      context: {
        imdbId: node.imdbId,
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
            imdbId: imdb_id
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running query watchlist performers.`);
    return;
  }

  query.data.performers.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/performers/${node.slug}/`,
      component: path.resolve("./src/templates/watchlist/performer.tsx"),
      context: {
        imdbId: node.imdbId,
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
            imdbId: imdb_id
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running query watchlist writers.`);
    return;
  }

  query.data.writers.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/writers/${node.slug}/`,
      component: path.resolve("./src/templates/watchlist/writer.tsx"),
      context: {
        imdbId: node.imdbId,
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
            name
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running query watchlist collections.`);
    return;
  }

  query.data.collections.nodes.forEach((node) => {
    createPage({
      path: `/watchlist/collections/${node.slug}/`,
      component: path.resolve("./src/templates/watchlist/collection.tsx"),
      context: {
        name: node.name,
      },
    });
  });
}

module.exports = async function createWatchlistPages(
  graphql,
  reporter,
  createPage
) {
  createDirectorPages(graphql, reporter, createPage);
  createPerformerPages(graphql, reporter, createPage);
  createWriterPages(graphql, reporter, createPage);
  createCollectionPages(graphql, reporter, createPage);
};
