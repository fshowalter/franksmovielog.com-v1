import { SchemaNames } from "../../schemaNames";
import type { GatsbyNodeModel } from "../../type-definitions";
import { GatsbyNodeContext } from "../../type-definitions";
import type { ReviewedMovieNode } from "../ReviewedMoviesJson";

export async function findReviewedMovieNode(
  imdbId: string | null,
  nodeModel: GatsbyNodeModel
) {
  if (!imdbId) {
    return null;
  }

  return await nodeModel.findOne<ReviewedMovieNode>({
    type: SchemaNames.ReviewedMoviesJson,
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
  context: GatsbyNodeContext
) {
  if (!source.imdbId) {
    return null;
  }

  return await findReviewedMovieNode(source.imdbId, context.nodeModel);
}

export const reviewedMovieFieldResolver = {
  type: SchemaNames.ReviewedMoviesJson,
  resolve: resolver,
};

export const nonNullReviewedMovieFieldResolver = {
  type: `${SchemaNames.ReviewedMoviesJson}!`,
  resolve: resolver,
};
