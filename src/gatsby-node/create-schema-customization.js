const path = require("path");

function getReviews(nodeModel) {
  return nodeModel
    .getAllNodes(
      {
        type: `MarkdownRemark`,
      },
      { connectionType: "MarkdownRemark" }
    )
    .filter((node) => {
      return node.fileAbsolutePath.includes("/reviews/");
    });
}

function getReviewedMovies(nodeModel) {
  return nodeModel.getAllNodes({
    type: `ReviewedMoviesJson`,
  });
}

function getReviewedMoviesByReleaseDate(nodeModel) {
  return getReviewedMovies(nodeModel).sort((a, b) => {
    if (a.release_date > b.release_date) {
      return 1;
    }

    if (a.release_date < b.release_date) {
      return -1;
    }

    return 0;
  });
}

function getReviewedMoviesBySequence(nodeModel) {
  return getReviewedMovies(nodeModel).sort((a, b) => {
    if (a.sequence > b.sequence) {
      return 1;
    }

    if (a.sequence < b.sequence) {
      return -1;
    }

    return 0;
  });
}

function getWatchlistMovies(nodeModel) {
  return nodeModel.getAllNodes({
    type: `WatchlistMoviesJson`,
  });
}

function findWatchlistTitleForImdbId(nodeModel, imdbId) {
  return getWatchlistMovies(nodeModel).find(
    (movie) => movie.imdb_id === imdbId
  );
}

function closestLimit(totalSize, index) {
  if (index < 0) {
    return 0;
  }

  if (index >= totalSize) {
    return totalSize - 1;
  }

  return index;
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

  const arrayClosestLimit = (index) => {
    return closestLimit(arraySize, index);
  };

  const center = arrayClosestLimit(titleIndex);

  let lower = arrayClosestLimit(Math.ceil(center - windowSize / 2));
  let upper = arrayClosestLimit(Math.floor(center + windowSize / 2));

  while (upper - lower + 1 < windowSize) {
    lower = arrayClosestLimit(lower - 1);
    upper = arrayClosestLimit(upper + 1);
  }

  if (upper - lower + 1 === windowSize) {
    return movies.slice(lower, upper + 1).filter(movieIsNotTitle);
  }

  return movies.slice(lower + 1, upper + 1).filter(movieIsNotTitle);
}

async function getResolvedValueForType(type, fieldName, source, args, context) {
  const resolver = type.getFields()[fieldName].resolve;

  return resolver(source, args, context, {
    fieldName,
  });
}

function assetPathForSlug(slug, assetType) {
  if (!slug) {
    return null;
  }

  const fileName = slug.endsWith("/") ? slug.slice(0, slug.length - 1) : slug;

  return path.resolve(`./content/assets/${assetType}s/${fileName}.png`);
}

function findFileNodeByAbsolutePath(nodeModel, absolutePath) {
  if (!absolutePath) {
    return null;
  }

  return nodeModel
    .getAllNodes({ type: "File" }, { connectionType: "File" })
    .find((node) => node.absolutePath === absolutePath);
}

function getAvatar(nodeModel, slug) {
  if (!slug) {
    return "";
  }

  const assetPath = assetPathForSlug(slug, "avatar");

  return findFileNodeByAbsolutePath(nodeModel, assetPath);
}

function itemsForWatchlistTitle(nodeModel, watchlistTitle, itemType) {
  const items = [];

  watchlistTitle[`${itemType}s`].forEach((titleItem) => {
    const watchlistItem = {
      name: titleItem.name,
      slug: titleItem.slug,
      avatar: getAvatar(nodeModel, titleItem.slug),
      reviewedMovies: [],
    };

    items.push(watchlistItem);

    const watchlistMoviesWithItem = getWatchlistMovies(nodeModel).filter(
      (title) => {
        return title[`${itemType}s`].some((item) => {
          return item.slug === titleItem.slug;
        });
      }
    );

    if (!watchlistMoviesWithItem) {
      return;
    }

    watchlistItem.reviewedMovies = sliceReviewedMoviesForTitle(
      getReviewedMoviesByReleaseDate(nodeModel).filter((reviewedMovie) => {
        return watchlistMoviesWithItem.some((watchlistMovie) => {
          return reviewedMovie.imdb_id === watchlistMovie.imdb_id;
        });
      }),
      watchlistTitle.imdb_id
    );
  });

  return items;
}

function addReviewLinks(text, reviewedMovieNodes) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  matches.forEach((match) => {
    const reviewedMovie = reviewedMovieNodes.find(
      (movieNode) => movieNode.imdb_id === match[2]
    );

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

const reviewedMovie = {
  type: "ReviewedMoviesJson",
  resolve: (source, args, context) => {
    return getReviewedMovies(context.nodeModel).find((movie) => {
      return movie.imdb_id === source.imdb_id;
    });
  },
};

const viewingsJson = {
  name: "ViewingsJson",
  interfaces: ["Node"],
  fields: {
    reviewedMovie,
  },
};

const watchlistMoviesJson = {
  name: "WatchlistMoviesJson",
  interfaces: ["Node"],
  fields: {
    reviewedMovie,
  },
};

const markdownRemark = {
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
    reviewedMovie: {
      type: "ReviewedMoviesJson",
      resolve: (source, args, context) => {
        if (!source || !source.frontmatter) {
          return null;
        }

        return getReviewedMovies(context.nodeModel).find((movie) => {
          return movie.imdb_id === source.frontmatter.imdb_id;
        });
      },
    },
    linkedExcerpt: {
      type: "String",
      async resolve(source, args, context, info) {
        const rawMarkdownBody = await getResolvedValueForType(
          info.schema.getType("MarkdownRemark"),
          "rawMarkdownBody",
          source,
          { format: "HTML", pruneLength: 20000, truncate: false },
          context
        );

        const hasExcerptBreak = rawMarkdownBody.includes("<!-- end -->");

        let excerpt = await getResolvedValueForType(
          info.schema.getType("MarkdownRemark"),
          "excerpt",
          source,
          { format: "HTML", pruneLength: 20000, truncate: false },
          context
        );

        if (hasExcerptBreak) {
          excerpt = excerpt.replace(/\n+$/, "");
          excerpt = excerpt.replace(
            /<\/p>$/,
            ` <a class="global__excerpt_link" href="/reviews/${source.frontmatter.slug}/">Continue reading...</a></p>`
          );
        }

        return addReviewLinks(excerpt, getReviewedMovies(context.nodeModel));
      },
    },
    linkedHtml: {
      type: "String",
      async resolve(source, args, context, info) {
        const html = await getResolvedValueForType(
          info.schema.getType("MarkdownRemark"),
          "html",
          source,
          args,
          context
        );

        return addReviewLinks(html, getReviewedMovies(context.nodeModel));
      },
    },
  },
};

const reviewedMoviesJson = {
  name: "ReviewedMoviesJson",
  interfaces: ["Node"],
  fields: {
    reviews: {
      type: "[MarkdownRemark]",
      resolve: (source, args, context) => {
        return getReviews(context.nodeModel).filter((review) => {
          return source.imdb_id === review.frontmatter.imdb_id;
        });
      },
    },
    browseMore: {
      type: "[ReviewedMoviesJson]",
      resolve: (source, args, context) => {
        return sliceReviewedMoviesForTitle(
          getReviewedMoviesBySequence(context.nodeModel),
          source.imdb_id
        );
      },
    },
    olderViewings: {
      type: "[ViewingsJson]",
      resolve: (source, args, context) => {
        return context.nodeModel
          .getAllNodes({
            type: `ViewingsJson`,
          })
          .filter((viewing) => {
            return source.imdb_id === viewing.imdb_id && viewing.sequence < 836;
          })
          .sort((a, b) => {
            return b.sequence - a.sequence;
          });
      },
    },
    backdrop: {
      type: "File",
      resolve: (source, args, context) => {
        if (!source) {
          return null;
        }

        const assetPath = assetPathForSlug(source.slug, "backdrop");
        return findFileNodeByAbsolutePath(context.nodeModel, assetPath);
      },
    },
    poster: {
      type: "File",
      resolve: (source, args, context) => {
        if (!source) {
          return null;
        }

        const assetPath = assetPathForSlug(source.slug, "poster");
        return findFileNodeByAbsolutePath(context.nodeModel, assetPath);
      },
    },
    watchlist: {
      type: "Watchlist",
      async resolve(source, args, context) {
        const watchlist = {
          performers: [],
          directors: [],
          collections: [],
          writers: [],
        };

        const watchlistTitle = findWatchlistTitleForImdbId(
          context.nodeModel,
          source.imdb_id
        );

        if (!watchlistTitle) {
          return watchlist;
        }

        watchlist.performers = itemsForWatchlistTitle(
          context.nodeModel,
          watchlistTitle,
          "performer"
        );

        watchlist.directors = itemsForWatchlistTitle(
          context.nodeModel,
          watchlistTitle,
          "director"
        );

        watchlist.writers = itemsForWatchlistTitle(
          context.nodeModel,
          watchlistTitle,
          "writer"
        );

        watchlist.collections = itemsForWatchlistTitle(
          context.nodeModel,
          watchlistTitle,
          "collection"
        );

        return watchlist;
      },
    },
  },
};

const watchlistEntitiesJson = {
  name: `WatchlistEntitiesJson`,
  interfaces: ["Node"],
  fields: {
    avatar: {
      type: "File",
      resolve: (source, args, context) => {
        if (!source) {
          return null;
        }

        return getAvatar(context.nodeModel, source.slug);
      },
    },
  },
};

module.exports = function createSchemaCustomization({ actions, schema }) {
  const { createTypes } = actions;
  const typeDefs = [
    `
      type WatchlistEntry {
        name: String!
        slug: String
        reviewedMovies: [ReviewedMoviesJson]
        avatar: File
      }
      type Watchlist {
        performers: [WatchlistEntry]
        directors: [WatchlistEntry]
        writers: [WatchlistEntry]
        collections: [WatchlistEntry]
      }
      type MostWatchedDirectorsJson implements Node {
        most_watched: [MostWatchedDirectorsJsonMost_watched]
      }
      type MostWatchedPerformersJson implements Node {
        most_watched: [MostWatchedPerformersJsonMost_watched]
      }
      type MostWatchedWritersJson implements Node {
        most_watched: [MostWatchedWritersJsonMost_watched]
      }
      type MostWatchedDirectorsByYearJson implements Node {
        most_watched: [MostWatchedDirectorsByYearJsonMost_watched]
      }
      type MostWatchedPerformersByYearJson implements Node {
        most_watched: [MostWatchedPerformersByYearJsonMost_watched]
      }
      type MostWatchedWritersByYearJson implements Node {
        most_watched: [MostWatchedWritersByYearJsonMost_watched]
      }
      type MostWatchedDirectorsJsonMost_watched {
        slug: String
      }
      type MostWatchedPerformersJsonMost_watched {
        slug: String
      }
      type MostWatchedWritersJsonMost_watched {
        slug: String
      }
      type MostWatchedDirectorsByYearJsonMost_watched {
        slug: String
      }
      type MostWatchedPerformersByYearJsonMost_watched {
        slug: String
      }
      type MostWatchedWritersByYearJsonMost_watched {
        slug: String
      }
    `,
    schema.buildObjectType(viewingsJson),
    schema.buildObjectType(watchlistMoviesJson),
    schema.buildObjectType(markdownRemark),
    schema.buildObjectType(reviewedMoviesJson),
    schema.buildObjectType(watchlistEntitiesJson),
  ];

  createTypes(typeDefs);
};
