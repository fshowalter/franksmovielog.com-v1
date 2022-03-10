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

export interface ViewingNode extends GatsbyNode {
  imdb_id: string;
}

export default {
  name: SchemaNames.VIEWINGS_JSON,
  interfaces: ["Node"],
  fields: {
    imdb_id: "String!",
    title: "String!",
    year: "Int!",
    release_date: "String!",
    viewing_date: {
      type: "Date!",
      extensions: {
        dateformat: {},
      },
    },
    viewing_year: "Int!",
    sequence: "Int!",
    venue: "String!",
    sort_title: "String!",
    slug: "String",
    grade: "String",
    genres: "[String!]!",
    poster: {
      type: "File",
      resolve: async (
        source: ViewingNode,
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
    gradeValue: {
      type: "Int",
      resolve: async (
        source: ViewingNode,
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

        return valueForGrade(grade);
      },
    },
  },
  extensions: {
    infer: false,
  },
};
