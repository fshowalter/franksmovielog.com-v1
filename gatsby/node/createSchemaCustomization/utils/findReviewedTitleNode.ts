import { ReviewedTitleNode } from "../objects/ReviewedTitlesJson";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeModel } from "../type-definitions";

export async function findReviewedTitleNode(
  imdbId: string | null,
  nodeModel: GatsbyNodeModel,
) {
  if (!imdbId) {
    return null;
  }

  return await nodeModel.findOne<ReviewedTitleNode>({
    type: SchemaNames.ReviewedTitlesJson,
    query: {
      filter: {
        imdbId: {
          eq: imdbId,
        },
      },
    },
  });
}
