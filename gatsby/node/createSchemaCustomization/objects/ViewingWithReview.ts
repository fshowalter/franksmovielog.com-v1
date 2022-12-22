import { SchemaNames } from "../schemaNames";
import { nonNullReviewedMovieFieldResolver } from "./fieldResolvers/reviewedMovieFieldResolver";
import { commonViewingFields } from "./ViewingsJson";

export const ViewingWithReview = {
  name: SchemaNames.ViewingWithReview,
  interfaces: ["Node"],
  fields: {
    ...commonViewingFields,
    reviewedMovie: nonNullReviewedMovieFieldResolver,
    slug: {
      type: "String!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "slug",
        },
      },
    },
    grade: {
      type: "String!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "grade",
        },
      },
    },
    principalCastNames: {
      type: "[String!]!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "principalCastNames",
        },
      },
    },
    directorNames: {
      type: "[String!]!",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "directorNames",
        },
      },
    },
    still: {
      type: "File",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "still",
        },
      },
    },
  },
};
