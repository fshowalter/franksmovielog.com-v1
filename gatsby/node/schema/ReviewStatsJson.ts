import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { MarkdownNode } from "./MarkdownRemark";
import { SchemaNames } from "./schemaNames";
import type { GatsbyNodeContext, GatsbyResolveArgs } from "./type-definitions";
import { WatchlistMovieNode } from "./WatchlistMoviesJson";

const ReviewStatsJson = {
  name: "ReviewStatsJson",
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    reviewsCreated: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "reviews_created",
        },
      },
    },
    watchlistTitlesReviewed: {
      type: "Int!",
      resolve: async (
        source: { review_year: string },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        let entries;

        if (source.review_year === "all") {
          ({ entries } = await context.nodeModel.findAll<MarkdownNode>({
            type: SchemaNames.MARKDOWN_REMARK,
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
            type: SchemaNames.MARKDOWN_REMARK,
            query: {
              filter: {
                frontmatter: {
                  date: {
                    gte: `${source.review_year}-01-01`,
                    lte: `${source.review_year}-12-31`,
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
            type: SchemaNames.WATCHLIST_MOVIES_JSON,
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

export default function buildReviewStatsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(ReviewStatsJson)];
}
