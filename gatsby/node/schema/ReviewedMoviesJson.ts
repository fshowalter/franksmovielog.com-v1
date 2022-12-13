import type {
  CreateResolversArgs,
  GatsbyGraphQLObjectType,
  NodePluginSchema,
} from "gatsby";
import path from "path";
import { MarkdownNode } from "./MarkdownRemark";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "./type-definitions";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import sliceMoviesForBrowseMore from "./utils/sliceMoviesForBrowseMore";
import { WatchlistEntityNode } from "./WatchlistEntitiesJson";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface ReviewedMovieNode extends GatsbyNode {
  slug: string;
  imdbId: string;
}
// change to resolve browse more at schema build, not as resolver, i.e. performers.browseMore = resolver code.
const ReviewedMovieWatchlistEntity = {
  name: "ReviewedMovieWatchlistEntity",
  fields: {
    imdbId: "String!",
    name: "String!",
    slug: "String!",
    avatar: {
      type: "File!",
      resolve: async (
        source: WatchlistEntityNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        if (!source.slug) {
          return null;
        }

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
    browseMore: {
      type: `[${SchemaNames.REVIEWED_MOVIES_JSON}!]!`,
      args: {
        sourceReviewId: "String!",
      },
      resolve: async (
        source: WatchlistEntityNode,
        args: { sourceReviewId: string },
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const watchlistMovies = await resolveFieldForNode<WatchlistMovieNode[]>(
          "watchlistMovies",
          source,
          context,
          info,
          args
        );

        if (!watchlistMovies) {
          return [];
        }

        const watchlistMovieImdbIds = Array.from(watchlistMovies).map(
          (movie) => movie.imdbId
        );

        const { entries } = await context.nodeModel.findAll<ReviewedMovieNode>({
          type: SchemaNames.REVIEWED_MOVIES_JSON,
          query: {
            filter: {
              imdbId: {
                in: watchlistMovieImdbIds,
              },
            },
            sort: {
              fields: ["releaseDate"],
              order: ["ASC"],
            },
          },
        });

        return sliceMoviesForBrowseMore(
          Array.from(entries),
          args.sourceReviewId
        );
      },
    },
  },
};

const ReviewedMovieWatchlistEntities = {
  name: "ReviewedMovieWatchlistEntities",
  fields: {
    performers: `[ReviewedMovieWatchlistEntity!]!`,
    directors: `[ReviewedMovieWatchlistEntity!]!`,
    writers: `[ReviewedMovieWatchlistEntity!]!`,
    collections: `[ReviewedMovieWatchlistEntity!]!`,
  },
};

const ReviewedMoviesJson = {
  name: SchemaNames.REVIEWED_MOVIES_JSON,
  interfaces: ["Node"],
  fields: {
    imdbId: "String!",
    title: "String!",
    year: "Int!",
    slug: "String!",
    grade: "String!",
    countries: "[String!]!",
    releaseDate: "String!",
    sortTitle: "String!",
    originalTitle: "String",
    gradeValue: "Int!",
    runtimeMinutes: "Int!",
    directorNames: "[String!]!",
    principalCastNames: "[String!]!",
    review: {
      type: `${SchemaNames.MARKDOWN_REMARK}!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        return await context.nodeModel.findOne<MarkdownNode>({
          type: SchemaNames.MARKDOWN_REMARK,
          query: {
            filter: {
              frontmatter: {
                imdb_id: {
                  eq: source.imdbId,
                },
              },
            },
          },
        });
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
              fields: ["sortTitle"],
              order: ["ASC"],
            },
          },
        });

        return sliceMoviesForBrowseMore(Array.from(entries), source.id);
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
              imdbId: {
                eq: source.imdbId,
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
    still: {
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
                eq: path.resolve(`./content/assets/stills/${source.slug}.png`),
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
                imdbId: { eq: source.imdbId },
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
              imdbId: { in: watchlistMovie.performerImdbIds },
              entityType: { eq: "performer" },
            },
          },
        }));

        ({ entries: watchlist.directors } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdbId: { in: watchlistMovie.directorImdbIds },
              entityType: { eq: "director" },
            },
          },
        }));

        ({ entries: watchlist.writers } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              imdbId: { in: watchlistMovie.writerImdbIds },
              entityType: { eq: "writer" },
            },
          },
        }));

        ({ entries: watchlist.collections } = await context.nodeModel.findAll({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              name: { in: watchlistMovie.collectionNames },
              entityType: { eq: "collection" },
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
    schema.buildObjectType(ReviewedMovieWatchlistEntity),
    schema.buildObjectType(ReviewedMovieWatchlistEntities),
    schema.buildObjectType(ReviewedMoviesJson),
  ];
}

export function buildReviewedMovieQuery(
  createResolvers: CreateResolversArgs["createResolvers"]
) {
  createResolvers();
}
