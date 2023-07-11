import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeContext, GatsbyResolveArgs } from "../type-definitions";
import { MarkdownNode } from "./MarkdownRemark";
import { WatchlistMovieNode } from "./WatchlistMoviesJson";

export const ReviewStatsJson = {
  name: SchemaNames.ReviewStatsJson,
  interfaces: ["Node"],
  fields: {
    reviewYear: "String!",
    reviewsCreated: "Int!",
    watchlistTitlesReviewed: {
      type: "Int!",
      resolve: async (
        source: { reviewYear: string },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
      ) => {
        let entries;

        if (source.reviewYear === "all") {
          ({ entries } = await context.nodeModel.findAll<MarkdownNode>({
            type: SchemaNames.MarkdownRemark,
            query: {
              filter: {
                frontmatter: {
                  imdb_id: {
                    ne: null,
                  },
                },
              },
            },
          }));
        } else {
          ({ entries } = await context.nodeModel.findAll<MarkdownNode>({
            type: SchemaNames.MarkdownRemark,
            query: {
              filter: {
                frontmatter: {
                  date: {
                    gte: `${source.reviewYear}-01-01`,
                    lte: `${source.reviewYear}-12-31`,
                  },
                },
              },
            },
          }));
        }

        const imdbIds = Array.from(entries).map((review) => {
          return review.frontmatter.imdb_id;
        });

        const { totalCount } =
          await context.nodeModel.findAll<WatchlistMovieNode>({
            type: SchemaNames.WatchlistMoviesJson,
            query: {
              filter: {
                imdbId: { in: imdbIds },
              },
            },
          });

        return totalCount();
      },
    },
  },
  extensions: {
    infer: false,
  },
};
