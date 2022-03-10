import path from "path";
import type { MarkdownNode } from "./MarkdownRemark";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import sliceMoviesForBrowseMore from "./utils/sliceMoviesForBrowseMore";
import type { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface ReviewedMovieNode extends GatsbyNode {
  slug: string;
  imdb_id: string;
}

async function resolveMostRecentReview(
  source: ReviewedMovieNode,
  context: GatsbyNodeContext,
  info: GatsbyResolveInfo,
  args: GatsbyResolveArgs
) {
  const reviews = await resolveFieldForNode<MarkdownNode[]>(
    "reviews",
    source,
    context,
    info,
    args
  );

  if (!reviews) {
    return null;
  }

  return Array.from(reviews)[0];
}

const ReviewedMoviesJson = {
  name: SchemaNames.REVIEWED_MOVIES_JSON,
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
      type: `[${SchemaNames.MARKDOWN_REMARK}!]!`,
      resolve: async (
        source: ReviewedMovieNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll({
          type: SchemaNames.MARKDOWN_REMARK,
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
    lastReviewDate: {
      type: "Date",
      extensions: {
        dateformat: {},
      },
      resolve: async (
        source: ReviewedMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const mostRecentReview = await resolveMostRecentReview(
          source,
          context,
          info,
          args
        );

        if (!mostRecentReview) {
          return null;
        }

        return mostRecentReview.frontmatter.date;
      },
    },
    lastReviewGrade: {
      type: "String",
      resolve: async (
        source: ReviewedMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const mostRecentReview = await resolveMostRecentReview(
          source,
          context,
          info,
          args
        );

        if (!mostRecentReview) {
          return null;
        }

        return mostRecentReview.frontmatter.grade;
      },
    },
    lastReviewGradeValue: {
      type: "Int",
      resolve: async (
        source: ReviewedMovieNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const mostRecentReview = await resolveMostRecentReview(
          source,
          context,
          info,
          args
        );

        if (!mostRecentReview) {
          return null;
        }

        return resolveFieldForNode(
          "gradeValue",
          mostRecentReview,
          context,
          info,
          args
        );
      },
    },
    browseMore: {
      type: `[${SchemaNames.REVIEWED_MOVIES_JSON}]`,
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

        return sliceMoviesForBrowseMore(Array.from(entries), source.imdb_id);
      },
    },
    olderViewings: {
      type: `[${SchemaNames.VIEWINGS_JSON}]`,
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
      type: SchemaNames.REVIEWED_MOVIES_WATCHLIST_ENTITIES,
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
              name: { in: watchlistMovie.collection_names },
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

export default ReviewedMoviesJson;
