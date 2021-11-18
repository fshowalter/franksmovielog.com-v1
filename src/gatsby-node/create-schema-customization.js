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

async function addReviewLinks(text, nodeModel) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  for (const match of matches) {
    const reviewedMovie = await nodeModel.findOne({
      type: REVIEWED_MOVIES_JSON,
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
  }

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
    viewing_year: "Int!",
    sequence: "Int!",
    venue: "String!",
    sort_title: "String!",
    slug: "String",
    grade: "String",
    genres: "[String!]!",
    poster: {
      type: "File",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return await context.nodeModel.findOne({
            type: "File",
            query: {
              filter: {
                absolutePath: {
                  eq: path.resolve(`./content/assets/posters/default.png`),
                },
              },
            },
          });
        }

        return resolveFieldForNode("poster", reviewedMovie, context, info);
      },
    },
    gradeValue: {
      type: "Int",
      resolve: async (source, args, context, info) => {
        const grade = await resolveFieldForNode("grade", source, context, info);

        if (!grade) {
          return null;
        }

        switch (grade) {
          case "A+": {
            return 13;
          }
          case "A": {
            return 12;
          }
          case "A-": {
            return 11;
          }
          case "B+": {
            return 10;
          }
          case "B": {
            return 9;
          }
          case "B-": {
            return 8;
          }
          case "C+": {
            return 7;
          }
          case "C": {
            return 6;
          }
          case "C-": {
            return 5;
          }
          case "D+": {
            return 4;
          }
          case "D": {
            return 3;
          }
          case "D-": {
            return 2;
          }
          default: {
            return 1;
          }
        }
      },
    },
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
        const { entries } = await context.nodeModel.findAll({
          query: {
            filter: {
              imdb_id: { in: source.director_imdb_ids },
              entity_type: { eq: "director" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
        });

        return entries.map((node) => node.name);
      },
    },
    performerNames: {
      type: "[String!]!",
      resolve: async (source, args, context) => {
        const { entries } = await context.nodeModel.findAll({
          query: {
            filter: {
              imdb_id: { in: source.performer_imdb_ids },
              entity_type: { eq: "performer" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
        });

        return entries.map((node) => node.name);
      },
    },
    writerNames: {
      type: "[String!]!",
      resolve: async (source, args, context) => {
        const { entries } = await context.nodeModel.findAll({
          query: {
            filter: {
              imdb_id: { in: source.writer_imdb_ids },
              entity_type: { eq: "writer" },
            },
          },
          type: WATCHLIST_ENTITIES_JSON,
        });

        return entries.map((node) => node.name);
      },
    },
    lastReviewGrade: {
      type: "String",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
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
    lastReviewGradeValue: {
      type: "Int",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return null;
        }

        return resolveFieldForNode(
          "lastReviewGradeValue",
          reviewedMovie,
          context,
          info
        );
      },
    },
    reviewedMovieSlug: {
      type: "String",
      resolve: async (source, args, context) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return null;
        }

        return reviewedMovie.slug;
      },
    },
    poster: {
      type: "File",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return await context.nodeModel.findOne({
            type: "File",
            query: {
              filter: {
                absolutePath: {
                  eq: path.resolve(`./content/assets/posters/default.png`),
                },
              },
            },
          });
        }

        return resolveFieldForNode("poster", reviewedMovie, context, info);
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

        return await context.nodeModel.findOne({
          type: REVIEWED_MOVIES_JSON,
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
    gradeValue: {
      type: "Int",
      resolve: async (source, args, context, info) => {
        const frontMatter = await resolveFieldForNode(
          "frontmatter",
          source,
          context,
          info
        );

        const grade = frontMatter.grade;

        if (!grade) {
          return null;
        }

        switch (grade) {
          case "A+": {
            return 13;
          }
          case "A": {
            return 12;
          }
          case "A-": {
            return 11;
          }
          case "B+": {
            return 10;
          }
          case "B": {
            return 9;
          }
          case "B-": {
            return 8;
          }
          case "C+": {
            return 7;
          }
          case "C": {
            return 6;
          }
          case "C-": {
            return 5;
          }
          case "D+": {
            return 4;
          }
          case "D": {
            return 3;
          }
          case "D-": {
            return 2;
          }
          default: {
            return 1;
          }
        }
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
    original_title: "String",
    countries: "[String!]!",
    reviews: {
      type: `[${MARKDOWN_REMARK}!]!`,
      resolve: async (source, args, context) => {
        const { entries } = await context.nodeModel.findAll({
          type: MARKDOWN_REMARK,
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

        return entries;
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
        return Array.from(reviews)[0].frontmatter.grade;
      },
    },
    lastReviewGradeValue: {
      type: "Int",
      resolve: async (source, args, context, info) => {
        const reviews = await resolveFieldForNode(
          "reviews",
          source,
          context,
          info
        );
        return resolveFieldForNode(
          "gradeValue",
          Array.from(reviews)[0],
          context,
          info
        );
      },
    },
    browseMore: {
      type: `[${REVIEWED_MOVIES_JSON}]`,
      resolve: async (source, args, context) => {
        const { entries } = await context.nodeModel.findAll({
          type: REVIEWED_MOVIES_JSON,
          query: {
            sort: {
              fields: ["sort_title"],
              order: ["ASC"],
            },
          },
        });
        return sliceReviewedMoviesForTitle(Array.from(entries), source.imdb_id);
      },
    },
    olderViewings: {
      type: `[${VIEWINGS_JSON}]`,
      resolve: async (source, args, context) => {
        const { entries } = await context.nodeModel.findAll({
          type: VIEWINGS_JSON,
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

        return entries;
      },
    },
    backdrop: {
      type: "File",
      resolve: async (source, args, context) => {
        return await context.nodeModel.findOne({
          type: "File",
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
      resolve: async (source, args, context) => {
        return await context.nodeModel.findOne({
          type: "File",
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

        const watchlistTitle = await context.nodeModel.findOne({
          type: WATCHLIST_MOVIES_JSON,
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
        });

        if (!watchlistTitle) {
          return watchlist;
        }

        ({ entries: watchlist.performers } = await context.nodeModel.findAll({
          type: WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.performer_imdb_ids },
              entity_type: { eq: "performer" },
            },
          },
        }));

        ({ entries: watchlist.directors } = await context.nodeModel.findAll({
          type: WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.director_imdb_ids },
              entity_type: { eq: "director" },
            },
          },
        }));

        ({ entries: watchlist.writers } = await context.nodeModel.findAll({
          type: WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistTitle.writer_imdb_ids },
              entity_type: { eq: "writer" },
            },
          },
        }));

        ({ entries: watchlist.collections } = await context.nodeModel.findAll({
          type: WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              name: { in: watchlistTitle.collection_names },
              entity_type: { eq: "collection" },
            },
          },
        }));

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
      resolve: async (source, args, context) => {
        return await context.nodeModel.findOne({
          type: "File",
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
    watchlistMovies: {
      type: `[${WATCHLIST_MOVIES_JSON}]`,
      resolve: async (source, args, context) => {
        if (source.entity_type == "collection") {
          const { entries } = await context.nodeModel.findAll({
            type: WATCHLIST_MOVIES_JSON,
            query: {
              filter: {
                collection_names: { in: [source.name] },
              },
            },
          });
          return entries;
        }

        const { entries } = await context.nodeModel.findAll({
          type: WATCHLIST_MOVIES_JSON,
          query: {
            filter: {
              [`${source.entity_type}_imdb_ids`]: { in: [source.imdb_id] },
            },
          },
        });

        return entries;
      },
    },
    browseMore: {
      type: `[${REVIEWED_MOVIES_JSON}]`,
      args: {
        movieImdbId: "String!",
      },
      resolve: async (source, args, context, info) => {
        const watchlistMovies = await resolveFieldForNode(
          "watchlistMovies",
          source,
          context,
          info
        );

        // console.log(watchlistMovies);

        const watchlistMovieImdbIds = Array.from(watchlistMovies).map(
          (movie) => movie.imdb_id
        );

        const { entries } = await context.nodeModel.findAll({
          type: REVIEWED_MOVIES_JSON,
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

        return sliceReviewedMoviesForTitle(
          Array.from(entries),
          args.movieImdbId
        );
      },
    },
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

const TopVenuesJson = {
  name: "TopVenuesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    total_viewing_count: "Int!",
    stats: "[VenueStat!]!",
  },
  extensions: {
    infer: false,
  },
};

const MostWatchedMovieViewing = {
  name: "MostWatchedMovieViewing",
  fields: {
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    venue: "String!",
    sequence: "Int!",
    slug: "String",
  },
};

const MostWatchedMovie = {
  name: "MostWatchedMovie",
  fields: {
    viewing_count: "Int!",
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    viewings: "[MostWatchedMovieViewing!]!",
    slug: {
      type: "String",
      resolve: async (source, args, context) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return null;
        }

        return reviewedMovie.slug;
      },
    },
    poster: {
      type: "File",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return await context.nodeModel.findOne({
            type: "File",
            query: {
              filter: {
                absolutePath: {
                  eq: path.resolve(`./content/assets/posters/default.png`),
                },
              },
            },
          });
        }

        return resolveFieldForNode("poster", reviewedMovie, context, info);
      },
    },
  },
};

const MostWatchedMoviesJson = {
  name: "MostWatchedMoviesJson",
  interfaces: ["Node"],
  fields: {
    viewing_year: "String!",
    most_watched: "[MostWatchedMovie!]!",
  },
  extensions: {
    infer: false,
  },
};

const MostWatchedPersonViewing = {
  name: "MostWatchedPersonViewing",
  fields: {
    sequence: "Int!",
    imdb_id: "String!",
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
    poster: {
      type: "File",
      resolve: async (source, args, context, info) => {
        const reviewedMovie = await context.nodeModel.findOne({
          query: {
            filter: {
              imdb_id: { eq: source.imdb_id },
            },
          },
          type: REVIEWED_MOVIES_JSON,
        });

        if (!reviewedMovie) {
          return await context.nodeModel.findOne({
            type: "File",
            query: {
              filter: {
                absolutePath: {
                  eq: path.resolve(`./content/assets/posters/default.png`),
                },
              },
            },
          });
        }

        return resolveFieldForNode("poster", reviewedMovie, context, info);
      },
    },
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
    schema.buildObjectType(TopVenuesJson),
    schema.buildObjectType(MostWatchedMovieViewing),
    schema.buildObjectType(MostWatchedMovie),
    schema.buildObjectType(MostWatchedMoviesJson),
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
