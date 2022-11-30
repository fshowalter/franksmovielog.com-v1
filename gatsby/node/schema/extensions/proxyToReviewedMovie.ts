import { Actions } from "gatsby";
import { ReviewedMovieNode } from "../ReviewedMoviesJson";
import {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveInfo,
} from "../type-definitions";
import resolveFieldForNode from "../utils/resolveFieldForNode";

function reviewedMovieResolverPassthrough<T>(fieldName: string) {
  return async (
    source: GatsbyNode,
    args: Record<string, unknown>,
    context: GatsbyNodeContext,
    info: GatsbyResolveInfo
  ) => {
    const reviewedMovieNode = await resolveFieldForNode<ReviewedMovieNode>(
      "reviewedMovie",
      source,
      context,
      info,
      {}
    );

    if (!reviewedMovieNode) {
      return null;
    }

    return await resolveFieldForNode<T>(
      fieldName,
      reviewedMovieNode,
      context,
      info,
      args
    );
  };
}

export default function buildProxyToReviewedMovieExtension(
  createFieldExtension: Actions["createFieldExtension"]
) {
  createFieldExtension({
    name: `proxyToReviewedMovie`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }: { fieldName: string }) {
      return {
        resolve: reviewedMovieResolverPassthrough(fieldName),
      };
    },
  });
}
