import { SchemaNames } from "./schemaNames";
import type {
  GatsbyNode,
  GatsbyNodeContext,
  GatsbyResolveArgs,
  GatsbyResolveInfo,
} from "./type-definitions";
import findDefaultPosterNode from "./utils/findDefaultPosterNode";
import findReviewedMovieNode from "./utils/findReviewedMovieNode";
import resolveFieldForNode from "./utils/resolveFieldForNode";
import valueForGrade from "./utils/valueForGrade";

export interface UnderseenGemsNode extends GatsbyNode {
  imdb_id: string;
}

export default {
  name: SchemaNames.UNDERSEEN_GEMS_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    sort_title: "String!",
    release_date: "String!",
    genres: "[String!]!",
    grade: "String!",
    slug: "String!",
    gradeValue: {
      type: "Int",
      resolve: async (
        source: UnderseenGemsNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const grade = await resolveFieldForNode<string>(
          "grade",
          source,
          context,
          info,
          args
        );

        valueForGrade(grade);
      },
    },
    poster: {
      type: "File",
      resolve: async (
        source: UnderseenGemsNode,
        args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
        info: GatsbyResolveInfo
      ) => {
        const reviewedMovie = await findReviewedMovieNode(
          source.imdb_id,
          context.nodeModel
        );

        if (!reviewedMovie) {
          return await findDefaultPosterNode(context.nodeModel);
        }

        return resolveFieldForNode(
          "poster",
          reviewedMovie,
          context,
          info,
          args
        );
      },
    },
  },
  extensions: {
    infer: false,
  },
};
