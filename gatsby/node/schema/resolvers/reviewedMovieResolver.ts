import type { ReviewedMovieNode } from "../ReviewedMoviesJson";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeModel } from "../type-definitions";
import { GatsbyNode, GatsbyNodeContext } from "../type-definitions";

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
        imdbId: {
          eq: imdbId,
        },
      },
    },
  });
}

interface SourceNode extends GatsbyNode {
  imdbId: string;
}

export function reviewedMovieResolver() {
  return async (
    source: SourceNode,
    _args: Record<string, unknown>,
    context: GatsbyNodeContext
  ) => {
    return findReviewedMovieNode(source.imdbId, context.nodeModel);
  };
}
