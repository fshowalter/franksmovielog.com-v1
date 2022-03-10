import type { ReviewedMovieNode } from "../ReviewedMoviesJson";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeModel } from "../type-definitions";

export default async function findReviewedMovieNode(
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
