import path from "path";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "../type-definitions";
import { sliceMoviesForBrowseMore } from "../utils/sliceMoviesForBrowseMore";
import { MarkdownNode } from "./MarkdownRemark";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface ReviewedMovieNode extends GatsbyNode {
  slug: string;
  imdbId: string;
  grade: string;
}

export const ReviewedMoviesJson = {
  name: SchemaNames.ReviewedMoviesJson,
  interfaces: ["Node"],
  fields: {
    imdbId: "String!",
    title: "String!",
    year: "Int!",
    slug: "String!",
    grade: "String!",
    countries: "[String!]!",
    genres: "[String!]!",
    releaseDate: "String!",
    sortTitle: "String!",
    originalTitle: "String",
    gradeValue: "Int!",
    runtimeMinutes: "Int!",
    directorNames: "[String!]!",
    principalCastNames: "[String!]!",
    reviewDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    reviewYear: "Int!",
    review: {
      type: `${SchemaNames.MarkdownRemark}!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        return await context.nodeModel.findOne<MarkdownNode>({
          type: SchemaNames.MarkdownRemark,
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
    gradeStars: {
      type: `String!`,
      resolve: (source: ReviewedMovieNode) => {
        const gradeMap: Record<string, string> = {
          A: "★★★★★",
          B: "★★★★☆",
          C: "★★★☆☆",
          D: "★★☆☆☆",
          F: "★☆☆☆☆",
        };

        if (source.grade && source.grade[0] in gradeMap) {
          return gradeMap[source.grade[0]];
        }

        return "";
      },
    },
    browseMore: {
      type: `[${SchemaNames.ReviewedMoviesJson}!]!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll<ReviewedMovieNode>({
          type: SchemaNames.ReviewedMoviesJson,
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
      type: `[${SchemaNames.ViewingsJson}!]!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.ViewingsJson,
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
      type: `${SchemaNames.ReviewedMovieWatchlistEntities}!`,
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
            type: SchemaNames.WatchlistMoviesJson,
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
          type: SchemaNames.WatchlistEntitiesJson,
          query: {
            filter: {
              imdbId: { in: watchlistMovie.performerImdbIds },
              entityType: { eq: "performer" },
            },
          },
        }));

        ({ entries: watchlist.directors } = await context.nodeModel.findAll({
          type: SchemaNames.WatchlistEntitiesJson,
          query: {
            filter: {
              imdbId: { in: watchlistMovie.directorImdbIds },
              entityType: { eq: "director" },
            },
          },
        }));

        ({ entries: watchlist.writers } = await context.nodeModel.findAll({
          type: SchemaNames.WatchlistEntitiesJson,
          query: {
            filter: {
              imdbId: { in: watchlistMovie.writerImdbIds },
              entityType: { eq: "writer" },
            },
          },
        }));

        ({ entries: watchlist.collections } = await context.nodeModel.findAll({
          type: SchemaNames.WatchlistEntitiesJson,
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
