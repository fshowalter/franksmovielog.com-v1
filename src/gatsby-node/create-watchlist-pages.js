const path = require("path");

function reducePerson(key, accumulator, currentValue) {
  currentValue[key].forEach((person) => {
    if (!accumulator[key][person.slug]) {
      accumulator[key][person.slug] = {};
      accumulator[key][person.slug].name = person.name;
      accumulator[key][person.slug].imdbId = person.imdb_id;
      accumulator[key][person.slug].imdbIds = new Set();
    }

    accumulator[key][person.slug].imdbIds.add(currentValue.imdb_id);
  });
}

module.exports = async function createWatchlistPages(
  graphql,
  reporter,
  createPage
) {
  const watchlistMoviesQuery = await graphql(
    `
      {
        movies: allWatchlistMoviesJson {
          nodes {
            imdb_id
            directors {
              name
              imdb_id
              slug
            }
            performers {
              name
              imdb_id
              slug
            }
            writers {
              name
              imdb_id
              slug
            }
            collections {
              name
              slug
            }
          }
        }
      }
    `
  );

  if (watchlistMoviesQuery.errors) {
    reporter.panicOnBuild(
      `Error while running watchlistMoviesQuery query for createWatchlistPages.`
    );
    return;
  }

  const pages = watchlistMoviesQuery.data.movies.nodes.reduce(
    (accumulator, currentValue) => {
      reducePerson("directors", accumulator, currentValue);
      reducePerson("performers", accumulator, currentValue);
      reducePerson("writers", accumulator, currentValue);

      currentValue.collections.forEach((collection) => {
        if (!accumulator.collections[collection.slug]) {
          accumulator.collections[collection.slug] = {};
          accumulator.collections[collection.slug].name = collection.name;
          accumulator.collections[collection.slug].imdbIds = new Set();
        }

        accumulator.collections[collection.slug].imdbIds.add(
          currentValue.imdb_id
        );
      });
      return accumulator;
    },
    {
      directors: {},
      performers: {},
      writers: {},
      collections: {},
    }
  );

  const reviewsQuery = await graphql(
    `
      {
        reviews: allReviewedMoviesJson {
          nodes {
            imdb_id
          }
        }
      }
    `
  );

  if (reviewsQuery.errors) {
    reporter.panicOnBuild(
      `Error while running reviewsQuery query for createWatchlistPages.`
    );
    return;
  }

  const reviewImdbIds = new Set(
    reviewsQuery.data.reviews.nodes.map((node) => node.imdb_id)
  );

  const component = path.resolve("./src/templates/watchlist-entity.tsx");

  // Create director pages
  Object.keys(pages.directors).forEach((slug) => {
    const director = pages.directors[slug];

    if (
      ![...director.imdbIds].some((imdbId) => {
        return reviewImdbIds.has(imdbId);
      })
    ) {
      return;
    }

    const avatarPath = path.resolve(`./content/assets/avatars/${slug}.png`);

    createPage({
      path: `/watchlist/directors/${slug}/`,
      component,
      context: {
        avatarPath,
        entityType: "DIRECTOR",
        imdbId: director.imdbId,
        imdbIds: [...director.imdbIds],
        name: director.name,
      },
    });
  });

  // Create performer pages
  Object.keys(pages.performers).forEach((slug) => {
    const performer = pages.performers[slug];

    if (
      ![...performer.imdbIds].some((imdbId) => {
        return reviewImdbIds.has(imdbId);
      })
    ) {
      return;
    }

    const avatarPath = path.resolve(`./content/assets/avatars/${slug}.png`);

    createPage({
      path: `/watchlist/cast/${slug}/`,
      component,
      context: {
        avatarPath,
        entityType: "PERFORMER",
        imdbId: performer.imdbId,
        imdbIds: [...performer.imdbIds],
        name: performer.name,
      },
    });
  });

  // Create writer pages
  Object.keys(pages.writers).forEach((slug) => {
    const writer = pages.writers[slug];

    if (
      ![...writer.imdbIds].some((imdbId) => {
        return reviewImdbIds.has(imdbId);
      })
    ) {
      return;
    }

    const avatarPath = path.resolve(`./content/assets/avatars/${slug}.png`);

    createPage({
      path: `/watchlist/writers/${slug}/`,
      component,
      context: {
        avatarPath,
        entityType: "WRITER",
        imdbId: writer.imdbId,
        imdbIds: [...writer.imdbIds],
        name: writer.name,
      },
    });
  });

  // Create collection pages
  Object.keys(pages.collections).forEach((slug) => {
    const collection = pages.collections[slug];

    if (
      ![...collection.imdbIds].some((imdbId) => {
        return reviewImdbIds.has(imdbId);
      })
    ) {
      return;
    }

    const avatarPath = path.resolve(`./content/assets/avatars/${slug}.png`);

    createPage({
      path: `/watchlist/collections/${slug}/`,
      component,
      context: {
        avatarPath,
        entityType: "COLLECTION",
        imdbId: collection.imdbId,
        imdbIds: [...collection.imdbIds],
        name: collection.name,
      },
    });
  });
};
