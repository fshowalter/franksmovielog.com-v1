const path = require("path");

const VIEWINGS_JSON = "ViewingsJson";
const WATCHLIST_ENTITIES_JSON = "WatchlistEntitiesJson";
const WATCHLIST_MOVIES_JSON = "WatchlistMoviesJson";
const REVIEWED_MOVIES_JSON = "ReviewedMoviesJson";
const MARKDOWN_REMARK = "MarkdownRemark";
const REVIEWED_MOVIES_WATCHLIST_ENTITIES = `ReviewedMoviesWatchlistEntities`;

async function resolveFieldForNode(fieldName, nodeItem, context, info, args) {
  if (!nodeItem) {
    return null;
  }

  const type = info.schema.getType(nodeItem.internal.type);

  const resolver = type.getFields()[fieldName].resolve;

  return resolver(nodeItem, args, context, { ...info, fieldName });
}

function sliceReviewedMoviesForTitle(movies, titleImdbId) {
  const windowSize = 5;
  const arraySize = movies.length;

  if (windowSize > arraySize) {
    return [];
  }

  const movieIsNotTitle = (movie) => {
    return movie.imdb_id !== titleImdbId;
  };

  if (arraySize === windowSize) {
    return movies.filter(movieIsNotTitle);
  }

  const titleIndex = movies.findIndex((movie) => movie.imdb_id === titleImdbId);

  if (titleIndex + 3 <= arraySize && titleIndex - 2 >= 0) {
    return movies.slice(titleIndex - 2, titleIndex + 3).filter(movieIsNotTitle);
  }

  return [...movies.slice(-2), ...movies, ...movies.slice(0, 3)]
    .slice(titleIndex, titleIndex + 5)
    .filter(movieIsNotTitle);
}

function addReviewLinks(text, nodeModel) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  matches.forEach(async (match) => {
    const reviewedMovie = await nodeModel.runQuery({
      type: REVIEWED_MOVIES_JSON,
      firstOnly: true,
      query: {
        filter: {
          imdb_id: {
            eq: match[2],
          },
        },
      },
    });

    if (!reviewedMovie) {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        match[3]
      );
    } else {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        `<a href="/reviews/${reviewedMovie.slug}/">${match[3]}</a>`
      );
    }
  });

  return result;
}

const ViewingsJson = {
  name: VIEWINGS_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    release_date: "String!",
    viewing_date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    viewing_year: "String!",
    sequence: "Int!",
    venue: "String!",
    sort_title: "String!",
    slug: "String",
  },
  extensions: {
    infer: false,
  },
};

const WatchlistMoviesJson = {
  name: WATCHLIST_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    sort_title: "String!",
    release_date: "String!",
    director_imdb_ids: "[String!]!",
    performer_imdb_ids: "[String!]!",
    writer_imdb_ids: "[String!]!",
    collection_names: "[String!]!",
    directorNames: {
      type: "[String!]!",
      resolve: async (source, args, context) => {
        const nodes = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { in: source.director_imdb_ids },
              entity_type: { eq: "director" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
        });

        return nodes.map((node) => node.name);
      },
    },
    performerNames: {
      type: "[String!]!",
      resolve: async (source, args, context) => {
        const nodes = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { in: source.performer_imdb_ids },
              entity_type: { eq: "performer" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
        });

        return nodes.map((node) => node.name);
      },
    },
    writerNames: {
      type: "[String!]!",
      resolve: async (source, args, context) => {
        const nodes = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { in: source.writer_imdb_ids },
              entity_type: { eq: "writer" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
        });

        return nodes.map((node) => node.name);
      },
    },
    lastReviewGrade: {
      type: "String",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
          firstOnly: true,
        });

        if (!reviewedMovie) {
          return null;
        }

        return resolveFieldForNode(
          "lastReviewGrade",
          reviewedMovie,
          context,
          info
        );
      },
    },
    reviewedMovieSlug: {
      type: "String",
      resolve: async (source, args, context) => {
        const reviewedMovie = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
          firstOnly: true,
        });

        if (!reviewedMovie) {
          return null;
        }

        return reviewedMovie.slug;
      },
    },
    backdrop: {
      type: "File",
      resolve: async (source, args, context) => {
        const reviewedMovie = await context.nodeModel.runQuery({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
          firstOnly: true,
        });

        if (!reviewedMovie) {
          return null;
        }

        return reviewedMovie.backdrop;
      },
    },
  },
  extensions: {
    infer: false,
  },
};

const MarkdownRemark = {
  name: MARKDOWN_REMARK,
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
    reviewedMovie: {
      type: REVIEWED_MOVIES_JSON,
      resolve: async (source, args, context, info) => {
        const postType = await resolveFieldForNode(
          "postType",
          source,
          context,
          info
        );

        if (postType !== "REVIEW") {
          return;
        }

        return context.nodeModel.runQuery({
          type: REVIEWED_MOVIES_JSON,
          firstOnly: true,
          query: {
            filter: {
              imdb_id: {
                eq: source.frontmatter.imdb_id,
              },
            },
          },
        });
      },
    },
    linkedExcerpt: {
      type: "String",
      async resolve(source, args, context, info) {
        const rawMarkdownBody = await resolveFieldForNode(
          "rawMarkdownBody",
          source,
          context,
          info,
          { format: "HTML", pruneLength: 20000, truncate: false }
        );

        if (!rawMarkdownBody) {
          return null;
        }

        const hasExcerptBreak = rawMarkdownBody.includes("<!-- end -->");

        let excerpt = await resolveFieldForNode(
          "excerpt",
          source,
          context,
          info,
          { format: "HTML", pruneLength: 20000, truncate: false }
        );

        if (hasExcerptBreak) {
          excerpt = excerpt.replace(/\n+$/, "");
          excerpt = excerpt.replace(
            /<\/p>$/,
            ` <a class="globalExcerptLinkCss" href="/reviews/${source.frontmatter.slug}/">Continue reading...</a></p>`
          );
        }

        return addReviewLinks(excerpt, context.nodeModel);
      },
    },
    linkedHtml: {
      type: "String",
      async resolve(source, args, context, info) {
        const html = await resolveFieldForNode("html", source, context, info);

        return addReviewLinks(html, context.nodeModel);
      },
    },
  },
};

const ReviewedMoviesJson = {
  name: REVIEWED_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    release_date: "String!",
    sort_title: "String!",
    slug: "String",
    runtime_minutes: "Int!",
    director_names: "[String!]!",
    principal_cast_names: "[String!]!",
    aka_titles: "[String!]!",
    countries: "[String!]!",
    reviews: {
      type: `[${MARKDOWN_REMARK}!]!`,
      resolve: (source, args, context) => {
        return context.nodeModel.runQuery({
          type: MARKDOWN_REMARK,
          firstOnly: false,
          query: {
            filter: {
              postType: {
                eq: "REVIEW",
              },
              frontmatter: {
                imdb_id: { eq: source.imdb_id },
              },
            },
            sort: {
              fields: ["frontmatter.sequence"],
              order: ["DESC"],
            },
          },
        });
      },
    },
    lastReviewGrade: {
      type: "String",
      resolve: async (source, args, context, info) => {
        const reviews = await resolveFieldForNode(
          "reviews",
          source,
          context,
          info
        );
        return reviews[0].frontmatter.grade;
      },
    },
    lastReviewGradeValue: {
      type: "Int",
      resolve: async (source, args, context, info) => {
        const grade = await resolveFieldForNode(
          "lastReviewGrade",
          source,
          context,
          info
        );

        if (!grade) {
          return null;
        }

        switch (grade) {
          case "A+": {
            return 12;
          }
          case "A": {
            return 11;
          }
          case "A-": {
            return 10;
          }
          case "B+": {
            return 9;
          }
          case "B": {
            return 8;
          }
          case "B-": {
            return 7;
          }
          case "C+": {
            return 6;
          }
          case "C": {
            return 5;
          }
          case "C-": {
            return 4;
          }
          case "D+": {
            return 3;
          }
          case "D": {
            return 2;
          }
          case "D-": {
            return 1;
          }
          default: {
            return 0;
          }
        }
      },
    },
    browseMore: {
      type: `[${REVIEWED_MOVIES_JSON}]`,
      resolve: async (source, args, context) => {
        const reviewedMoviesByTitle = await context.nodeModel.runQuery({
          type: REVIEWED_MOVIES_JSON,
          firstOnly: false,
          query: {
            sort: {
              fields: ["sort_title"],
              order: ["ASC"],
            },
          },
        });
        return sliceReviewedMoviesForTitle(
          reviewedMoviesByTitle,
          source.imdb_id
        );
      },
    },
    olderViewings: {
      type: `[${VIEWINGS_JSON}]`,
      resolve: (source, args, context) => {
        return context.nodeModel.runQuery({
          type: VIEWINGS_JSON,
          firstOnly: false,
          query: {
            filter: {
              imdb_id: {
                eq: source.imdb_id,
              },
              sequence: {
                lt: 836,
              },
            },
            sort: {
              fields: ["sequence"],
              order: ["DESC"],
            },
          },
        });
      },
    },
    backdrop: {
      type: "File",
      resolve: (source, args, context) => {
        return context.nodeModel.runQuery({
          type: "File",
          firstOnly: true,
          query: {
            filter: {
              absolutePath: {
                eq: path.resolve(
                  `./content/assets/backdrops/${source.slug}.png`
                ),
              },
            },
          },
        });
      },
    },
    poster: {
      type: "File",
      resolve: (source, args, context) => {
        return context.nodeModel.runQuery({
          type: "File",
          firstOnly: true,
          query: {
            filter: {
              absolutePath: {
                eq: path.resolve(`./content/assets/posters/${source.slug}.png`),
              },
            },
          },
        });
      },
    },
    watchlist: {
      type: REVIEWED_MOVIES_WATCHLIST_ENTITIES,
      async resolve(source, args, context) {
        const watchlist = {
          performers: [],
          directors: [],
          collections: [],
          writers: [],
        };

        const watchlistTitle = await context.nodeModel.runQuery({
          type: WATCHLIST_MOVIES_JSON,
          firstOnly: true,
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
        });

        if (!watchlistTitle) {
          return watchlist;
        }

        watchlist.performers = await context.nodeModel.runQuery({
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.performer_imdb_ids },
              entity_type: { eq: "performer" },
            },
          },
        });

        watchlist.directors = await context.nodeModel.runQuery({
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.director_imdb_ids },
              entity_type: { eq: "director" },
            },
          },
        });

        watchlist.writers = await context.nodeModel.runQuery({
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.writer_imdb_ids },
              entity_type: { eq: "writer" },
            },
          },
        });

        watchlist.collections = await context.nodeModel.runQuery({
          type: WATCHLIST_ENTITIES_JSON,
          firstOnly: false,
          query: {
            filter: {
              name: { in: watchlistTitle.collection_names },
              entity_type: { eq: "collection" },
            },
          },
        });

        return watchlist;
      },
    },
  },
  extensions: {
    infer: false,
  },
};

const WatchlistEntitiesJson = {
  name: WATCHLIST_ENTITIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String",
    name: "String!",
    slug: "String!",
    title_count: "Int!",
    review_count: "Int!",
    entity_type: "String!",
    avatar: {
      type: "File",
      resolve: (source, args, context) => {
        return context.nodeModel.runQuery({
          type: "File",
          firstOnly: true,
          query: {
            filter: {
              absolutePath: {
                eq: path.resolve(`./content/assets/avatars/${source.slug}.png`),
              },
            },
          },
        });
      },
    },
    browseMore: {
      type: `[${REVIEWED_MOVIES_JSON}]`,
      args: {
        movieImdbId: "String!",
      },
      resolve: async (source, args, context) => {
        let watchlistMovies;

        if (source.entity_type == "collection") {
          watchlistMovies = await context.nodeModel.runQuery({
            type: WATCHLIST_MOVIES_JSON,
            firstOnly: false,
            query: {
              filter: {
                collection_names: { in: [source.name] },
              },
            },
          });
        } else {
          watchlistMovies = await context.nodeModel.runQuery({
            type: WATCHLIST_MOVIES_JSON,
            firstOnly: false,
            query: {
              filter: {
                [`${source.entity_type}_imdb_ids`]: { in: [source.imdb_id] },
              },
            },
          });
        }

        const watchlistMovieImdbIds = watchlistMovies.map(
          (movie) => movie.imdb_id
        );

        const reviewedMovies = await context.nodeModel.runQuery({
          type: REVIEWED_MOVIES_JSON,
          firstOnly: false,
          query: {
            filter: {
              imdb_id: {
                in: watchlistMovieImdbIds,
              },
            },
            sort: {
              fields: ["release_date"],
              order: ["ASC"],
            },
          },
        });

        return sliceReviewedMoviesForTitle(reviewedMovies, args.movieImdbId);
      },
    },
  },
  extensions: {
    infer: false,
  },
};

const ReviewedMovieWatchlistEntities = {
  name: REVIEWED_MOVIES_WATCHLIST_ENTITIES,
  fields: {
    performers: `[${WATCHLIST_ENTITIES_JSON}]`,
    directors: `[${WATCHLIST_ENTITIES_JSON}]`,
    writers: `[${WATCHLIST_ENTITIES_JSON}]`,
    collections: `[${WATCHLIST_ENTITIES_JSON}]`,
  },
};

const VenueStat = {
  name: "VenueStat",
  fields: {
    name: "String!",
    viewing_count: "Int!",
  },
};

const ViewingCountsForVenuesJson = {
  name: "ViewingCountsForVenuesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    venue_stats: "[VenueStat!]!",
  },
  extensions: {
    infer: false,
  },
};

const MostWatchedPersonViewing = {
  name: "MostWatchedPersonViewing",
  fields: {
    venue: "String!",
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    title: "String!",
    year: "Int!",
    slug: "String",
  },
};

const MostWatchedPerson = {
  name: "MostWatchedPerson",
  fields: {
    imdb_id: "String!",
    full_name: "String!",
    slug: "String",
    viewing_count: "Int!",
    viewings: "[MostWatchedPersonViewing!]!",
  },
};

const MostWatchedDirectorsJson = {
  name: "MostWatchedDirectorsJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: "[MostWatchedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

const MostWatchedPerformersJson = {
  name: "MostWatchedPerformersJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: "[MostWatchedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

const MostWatchedWritersJson = {
  name: "MostWatchedWritersJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: "[MostWatchedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

const HighestRatedPersonReview = {
  name: "HighestRatedPersonReview",
  fields: {
    sequence: "Int!",
    grade_value: "Float!",
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    title: "String!",
    year: "Int!",
    slug: "String",
  },
};

const HighestRatedPerson = {
  name: "HighestRatedPerson",
  fields: {
    imdb_id: "String!",
    full_name: "String!",
    slug: "String",
    average_grade_value: "Float!",
    review_count: "Int!",
    reviews: "[HighestRatedPersonReview!]!",
  },
};

const HighestRatedDirectorsJson = {
  name: "HighestRatedDirectorsJson",
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: "[HighestRatedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

const HighestRatedPerformersJson = {
  name: "HighestRatedPerformersJson",
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: "[HighestRatedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

const HighestRatedWritersJson = {
  name: "HighestRatedWritersJson",
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    highest_rated: "[HighestRatedPerson!]!",
  },
  extensions: {
    infer: false,
  },
};

module.exports = function createSchemaCustomization({ actions, schema }) {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ViewingsJson),
    schema.buildObjectType(WatchlistMoviesJson),
    schema.buildObjectType(MarkdownRemark),
    schema.buildObjectType(ReviewedMoviesJson),
    schema.buildObjectType(WatchlistEntitiesJson),
    schema.buildObjectType(VenueStat),
    schema.buildObjectType(ViewingCountsForVenuesJson),
    schema.buildObjectType(MostWatchedPersonViewing),
    schema.buildObjectType(MostWatchedPerson),
    schema.buildObjectType(MostWatchedDirectorsJson),
    schema.buildObjectType(MostWatchedPerformersJson),
    schema.buildObjectType(MostWatchedWritersJson),
    schema.buildObjectType(HighestRatedPersonReview),
    schema.buildObjectType(HighestRatedPerson),
    schema.buildObjectType(HighestRatedDirectorsJson),
    schema.buildObjectType(HighestRatedPerformersJson),
    schema.buildObjectType(HighestRatedWritersJson),
  ];

  createTypes(typeDefs);
};
