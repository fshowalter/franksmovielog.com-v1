import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
} from "./type-definitions";
import { ViewingNode } from "./ViewingsJson";

export interface MostWatchedMovieViewingNode extends GatsbyNode {
  sequence: number;
}

const MostWatchedMovieViewing = {
  name: SchemaNames.MOST_WATCHED_MOVIE_VIEWING,
  fields: {
    date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },

    sequence: "Int!",
    viewing: {
      type: `${SchemaNames.VIEWINGS_JSON}!`,
      resolve: async (
        source: MostWatchedMovieViewingNode,
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        return await context.nodeModel.findOne<ViewingNode>({
          type: SchemaNames.WATCHLIST_MOVIES_JSON,
          query: {
            filter: {
              sequence: { eq: source.sequence },
            },
          },
        });
      },
    },
  },
};

export default MostWatchedMovieViewing;
