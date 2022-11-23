import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import path from "path";
import { SchemaNames } from "./schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "./type-definitions";
import sliceMoviesForBrowseMore from "./utils/sliceMoviesForBrowseMore";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface ReviewedMovieNode extends GatsbyNode {
  slug: string;
  imdbId: string;
}

const ReviewedMovieWatchlistEntities = {
  name: "ReviewedMovieWatchlistEntities",
  fields: {
    performers: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}!]!`,
    directors: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}!]!`,
    writers: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}!]!`,
    collections: `[${SchemaNames.WATCHLIST_ENTITIES_JSON}!]!`,
  },
};

const ReviewedMoviesJson = {
  name: SchemaNames.REVIEWED_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "Int!",
    slug: "String!",
    grade: "String!",
    countries: "[String!]!",
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    releaseDate: {
      type: "String!",
      extensions: {
        proxy: {
          from: "release_date",
        },
      },
    },
    sortTitle: {
      type: "String!",
      extensions: {
        proxy: {
          from: "sort_title",
        },
      },
    },
    originalTitle: {
      type: "String",
      extensions: {
        proxy: {
          from: "original_title",
        },
      },
    },
    gradeValue: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "grade_value",
        },
      },
    },
    runtimeMinutes: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "runtime_minutes",
        },
      },
    },
    directorNames: {
      type: "[String!]!",
      extensions: {
        proxy: {
          from: "director_names",
        },
      },
    },
    principalCastNames: {
      type: "[String!]!",
      extensions: {
        proxy: {
          from: "principal_cast_names",
        },
      },
    },
    review: {
      type: `${SchemaNames.MARKDOWN_REMARK}!`,
      extensions: {
        link: {
          from: "imdb_id",
          by: "frontmatter.imdb_id",
        },
      },
    },
    browseMore: {
      type: `[${SchemaNames.REVIEWED_MOVIES_JSON}!]!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll<ReviewedMovieNode>({
          type: SchemaNames.REVIEWED_MOVIES_JSON,
          query: {
            sort: {
              fields: ["sort_title"],
              order: ["ASC"],
            },
          },
        });

        if (!entries) {
          return [];
        }

        return sliceMoviesForBrowseMore(Array.from(entries), source.imdbId);
      },
    },
    viewings: {
      type: `[${SchemaNames.VIEWINGS_JSON}!]!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.VIEWINGS_JSON,
          query: {
            filter: {
              imdb_id: {
                eq: source.imdb_id,
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
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
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
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
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
      type: `ReviewedMovieWatchlistEntities!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const watchlist = {
          performers: [],
          directors: [],
          collections: [],
          writers: [],
        };

        const watchlistMovie =
          await context.nodeModel.findOne<WatchlistMovieNode>({
            type: SchemaNames.WATCHLIST_MOVIES_JSON,
            query: {
              filter: {
                imdb_id: { eq: source.imdb_id },
              },
            },
          });

        if (!watchlistMovie) {
          return watchlist;
        }

        ({ entries: watchlist.performers } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistMovie.performer_imdb_ids },
              entity_type: { eq: "performer" },
            },
          },
        }));

        ({ entries: watchlist.directors } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistMovie.director_imdb_ids },
              entity_type: { eq: "director" },
            },
          },
        }));

        ({ entries: watchlist.writers } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdb_id: { in: watchlistMovie.writer_imdb_ids },
              entity_type: { eq: "writer" },
            },
          },
        }));

        ({ entries: watchlist.collections } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              name: { in: watchlistMovie.collectionNames },
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

export default function buildReviewedMoviesJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ReviewedMoviesJson),
  ];
}
