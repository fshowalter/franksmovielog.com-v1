import type { CreateResolversArgs } from "gatsby";
import ReviewedMovieResolver from "./schema/ReviewedMovieResolver";

export default function createResolvers(
  createResolversArgs: CreateResolversArgs
) {
  const { createResolvers } = createResolversArgs;

  createResolvers(ReviewedMovieResolver);
}
