/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

async function createHomePages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___sequence], order: DESC }
        ) {
          nodes {
            frontmatter {
              sequence
              imdb_id
              slug
            }
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for home updates.`
    );
    return;
  }

  const updates = query.data.allMarkdownRemark.nodes;
  const perPage = 20;
  const numPages = Math.ceil(updates.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const skip = i * perPage;
    const imdbIds = updates
      .slice(skip, skip * perPage || perPage)
      .filter((update) => update.frontmatter.imdb_id)
      .map((update) => update.frontmatter.imdb_id);

    createPage({
      path: i === 0 ? `/` : `/page-${i + 1}/`,
      component: path.resolve("./src/templates/home.tsx"),
      context: {
        limit: perPage,
        skip,
        numberOfItems: updates.length,
        currentPage: i + 1,
        imdbIds,
      },
    });
  });
}

async function createAboutPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { postType: { eq: "post" } }
          sort: { fields: [frontmatter___sequence], order: DESC }
        ) {
          nodes {
            frontmatter {
              sequence
            }
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for home updates.`
    );
    return;
  }

  const updates = query.data.allMarkdownRemark.nodes;
  const perPage = 20;
  const numPages = Math.ceil(updates.length / perPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const skip = i * perPage;

    createPage({
      path: i === 0 ? `/about/` : `/about/page-${i + 1}/`,
      component: path.resolve("./src/templates/about.tsx"),
      context: {
        limit: perPage,
        skip,
        numberOfItems: updates.length,
        currentPage: i + 1,
      },
    });
  });
}

async function createReviewPages(graphql, reporter, createPage) {
  const query = await graphql(
    `
      {
        allMarkdownRemark(filter: { postType: { eq: "REVIEW" } }) {
          nodes {
            frontmatter {
              imdb_id
              slug
            }
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for review pages.`
    );
    return;
  }

  // Create review pages
  query.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: `/reviews/${node.frontmatter.slug}/`,
      component: path.resolve("./src/templates/review.tsx"),
      context: {
        imdbId: node.frontmatter.imdb_id,
      },
    });
  });
}

async function createWatchlistPages(graphql, reporter, createPage) {
  const reviewsQuery = await graphql(
    `
      {
        allMarkdownRemark(filter: { postType: { eq: "REVIEW" } }) {
          nodes {
            frontmatter {
              imdb_id
            }
          }
        }
      }
    `
  );

  const watchlistTitlesQuery = await graphql(
    `
      {
        allWatchlistTitlesJson {
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

  if (watchlistTitlesQuery.errors || reviewsQuery.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for createWatchlistPages.`
    );
    return;
  }

  const reviewIds = new Set(
    reviewsQuery.data.allMarkdownRemark.nodes.map((review) => {
      return review.frontmatter.imdb_id;
    })
  );

  const reducePerson = (key, accumulator, currentValue) => {
    currentValue[key].forEach((person) => {
      if (!accumulator[key][person.slug]) {
        accumulator[key][person.slug] = {};
        accumulator[key][person.slug].name = person.name;
        accumulator[key][person.slug].imdbId = person.imdb_id;
        accumulator[key][person.slug].imdbIds = new Set();
      }

      accumulator[key][person.slug].imdbIds.add(currentValue.imdb_id);
    });
  };

  const pages = watchlistTitlesQuery.data.allWatchlistTitlesJson.nodes.reduce(
    (accumulator, currentValue) => {
      if (!reviewIds.has(currentValue.imdb_id)) {
        return accumulator;
      }

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

  // Create director pages
  Object.keys(pages.directors).forEach((slug) => {
    const director = pages.directors[slug];

    createPage({
      path: `/watchlist/directors/${slug}/`,
      component: path.resolve("./src/templates/watchlist-entity.tsx"),
      context: {
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

    createPage({
      path: `/watchlist/cast/${slug}/`,
      component: path.resolve("./src/templates/watchlist-entity.tsx"),
      context: {
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

    createPage({
      path: `/watchlist/writers/${slug}/`,
      component: path.resolve("./src/templates/watchlist-entity.tsx"),
      context: {
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

    createPage({
      path: `/watchlist/directors/${slug}/`,
      component: path.resolve("./src/templates/watchlist-entity.tsx"),
      context: {
        entityType: "COLLECTION",
        imdbId: collection.imdbId,
        imdbIds: [...collection.imdbIds],
        name: collection.name,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  await createHomePages(graphql, reporter, createPage);
  await createReviewPages(graphql, reporter, createPage);
  await createAboutPages(graphql, reporter, createPage);
  await createWatchlistPages(graphql, reporter, createPage);
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: "MarkdownRemark",
      interfaces: ["Node"],
      fields: {
        postType: {
          type: "String",
          resolve: (source) => {
            if (source.fileAbsolutePath.includes("/reviews/")) {
              return "REVIEW";
            }

            if (source.fileAbsolutePath.includes("/posts/")) {
              return "POST";
            }

            return null;
          },
        },
        backdrop: {
          type: "File",
          resolve: (source, args, context) => {
            if (!source || !source.frontmatter || !source.frontmatter.slug) {
              return null;
            }

            const imagePath = source.frontmatter.slug.endsWith("/")
              ? source.frontmatter.slug.slice(
                  0,
                  source.frontmatter.slug.length - 1
                )
              : source.frontmatter.slug;

            const backdropPath = path.resolve(
              `./content/assets/backdrops/${imagePath}.png`
            );

            if (!backdropPath) {
              return null;
            }

            return context.nodeModel
              .getAllNodes({ type: "File" })
              .find((node) => node.absolutePath === backdropPath);
          },
        },
        poster: {
          type: "File",
          resolve: (source, args, context) => {
            if (!source || !source.frontmatter || !source.frontmatter.slug) {
              return null;
            }

            const imagePath = source.frontmatter.slug.endsWith("/")
              ? source.frontmatter.slug.slice(
                  0,
                  source.frontmatter.slug.length - 1
                )
              : source.frontmatter.slug;

            const posterPath = path.resolve(
              `./content/assets/posters/${imagePath}.jpg`
            );

            if (!posterPath) {
              return null;
            }

            return context.nodeModel
              .getAllNodes({ type: "File" })
              .find((node) => node.absolutePath === posterPath);
          },
        },
        linkedHtml: {
          type: "String",
          async resolve(source, args, context, info) {
            const type = info.schema.getType("MarkdownRemark");
            // const parentNode = context.nodeModel.getNodeById({
            //   id: source.parent,
            // });
            const resolver = type.getFields().html.resolve;
            const fieldName = "html";
            let result = await resolver(source, args, context, {
              fieldName,
            });
            const re = RegExp('(<span data-imdb-id="(.*)">)(.*)(</span>)');
            const matches = [...result.matchAll(re)];
            // console.log(matches);

            matches.forEach((match) => {
              const review = context.nodeModel
                .getAllNodes({
                  type: `MarkdownRemark`,
                })
                .find(
                  (reviewNode) => reviewNode.frontmatter.imdb_id === match[2]
                );

              if (!review) {
                result = result.replace(
                  `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
                  match[3]
                );
              }

              result = result.replace(
                `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
                `<a href="/reviews/${review.frontmatter.slug}/">${match[3]}</a>`
              );
            });

            return result;
          },
        },
      },
    }),
  ];

  createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ actions, stage, plugins, getConfig }) => {
  // override config only during
  // production JS & CSS build
  if (stage === "build-javascript") {
    // get current webpack config
    const config = getConfig();
    // our new cssnano options
    // are still based on default preset
    const options = {
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            calc: false,
            // reduceTransforms: false,
            // minifySelectors: false,
          },
        ],
      },
    };
    // find CSS minimizer
    const minifyCssIndex = config.optimization.minimizer.findIndex(
      (minimizer) =>
        minimizer.constructor.name === "OptimizeCssAssetsWebpackPlugin"
    );
    // if found, overwrite existing CSS minimizer with the new one
    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] = plugins.minifyCss(
        options
      );
    }
    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }
};
