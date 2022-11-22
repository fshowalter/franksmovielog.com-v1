import { GatsbyNode } from "gatsby";
import { SchemaNames } from "../schemaNames";
import type {
  GatsbyNodeContext,
  GatsbyNodeModel,
  GatsbyResolveArgs,
} from "../type-definitions";

import type { ReviewedMovieNode } from "../ReviewedMoviesJson";

export async function findReviewedMovieNode(
  imdbId: string | null,
  nodeModel: GatsbyNodeModel
) {
  if (!imdbId) {
    return null;
  }

  return await nodeModel.findOne<ReviewedMovieNode>({
    type: SchemaNames.REVIEWED_MOVIES_JSON,
    query: {
      filter: {
        imdb_id: {
          eq: imdbId,
        },
      },
    },
  });
}

interface NodeWithMovieImdbId extends GatsbyNode {
  imdb_id: string;
}

export default {
  type: SchemaNames.REVIEWED_MOVIES_JSON,
  resolve: async (
    source: NodeWithMovieImdbId,
    _args: GatsbyResolveArgs,
    context: GatsbyNodeContext
  ) => {
    return await findReviewedMovieNode(source.imdb_id, context.nodeModel);
  },
};
