import { SchemaNames } from "../../schemaNames";
import type { GatsbyNodeModel } from "../../type-definitions";
import { GatsbyNodeContext } from "../../type-definitions";
import { ReviewedTitleNode } from "../ReviewedTitlesJson";

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

async function resolver(
  source: { imdbId: string },
  _args: unknown,
  context: GatsbyNodeContext,
) {
  if (!source.imdbId) {
    return null;
  }

  return await findReviewedTitleNode(source.imdbId, context.nodeModel);
}
