import { MarkdownNode } from "./MarkdownRemark";
import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
} from "./type-definitions";
import { WatchlistMovieNode } from "./WatchlistMoviesJson";

export interface ReviewStatsNode extends GatsbyNode {
  review_year: string;
}

const ReviewStatsJson = {
  name: SchemaNames.REVIEW_STATS_JSON,
  interfaces: ["Node"],
  fields: {
    review_year: "String!",
    reviews_created: "Int!",
    watchlistTitlesReviewed: {
      type: "Int!",
      resolve: async (
        source: ReviewStatsNode,
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

        const imdb_ids = Array.from(entries).map((review) => {
          return review.frontmatter.imdb_id;
        });

        const { totalCount } =
          await context.nodeModel.findAll<WatchlistMovieNode>({
            type: SchemaNames.WATCHLIST_MOVIES_JSON,
            query: {
              filter: {
                imdb_id: { in: imdb_ids },
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

export default ReviewStatsJson;
