/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const marked = require("marked");

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
      component: path.resolve("./src/templates/home.jsx"),
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
      component: path.resolve("./src/templates/about.jsx"),
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
        allMarkdownRemark(filter: { postType: { eq: "review" } }) {
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
      component: path.resolve("./src/templates/review.jsx"),
      context: {
        imdbId: node.frontmatter.imdb_id,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  await createHomePages(graphql, reporter, createPage);
  await createReviewPages(graphql, reporter, createPage);
  await createAboutPages(graphql, reporter, createPage);
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: "MarkdownRemark",
      interfaces: ["Node"],
      fields: {
        firstParagraphRaw: {
          type: "String",
          resolve: (source) => {
            return source.rawMarkdownBody
              ? source.rawMarkdownBody.trim().split("\n\n")[0]
              : "";
          },
        },
        firstParagraph: {
          type: "String",
          resolve: (source) => {
            return marked(
              source.rawMarkdownBody
                ? source.rawMarkdownBody.trim().split("\n\n")[0]
                : ""
            );
          },
        },
        numberOfParagraphs: {
          type: "Int",
          resolve: (source) => {
            return source.rawMarkdownBody
              ? source.rawMarkdownBody.trim().split("\n\n").length
              : 0;
          },
        },
        postType: {
          type: "String",
          resolve: (source) => {
            if (source.fileAbsolutePath.includes("/reviews/")) {
              return "review";
            }

            if (source.fileAbsolutePath.includes("/posts/")) {
              return "post";
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
