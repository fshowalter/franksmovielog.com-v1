import { ReviewedMovieNode } from "../objects/ReviewedMoviesJson";
import {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "../type-definitions";
import { resolveFieldForNode } from "../utils/resolveFieldForNode";

export const proxyToReviewedMovieExtension = {
  name: `proxyToReviewedMovie`,
  args: {
    fieldName: `String!`,
  },
  extend({ fieldName }: { fieldName: string }) {
    return {
      resolve: async (
        source: GatsbyNode,
        args: Record<string, unknown>,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovieNode = await resolveFieldForNode<ReviewedMovieNode>({
          fieldName: "reviewedMovie",
          source,
          context,
          info,
        });

        if (!reviewedMovieNode) {
          return null;
        }

        return await resolveFieldForNode({
          fieldName,
          source: reviewedMovieNode,
          context,
          info,
          args,
        });
      },
    };
  },
};
