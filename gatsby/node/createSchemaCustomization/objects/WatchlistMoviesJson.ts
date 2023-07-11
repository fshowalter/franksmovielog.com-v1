import { SchemaNames } from "../schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "../type-definitions";
import { posterFieldResolver } from "./fieldResolvers/posterFieldResolver";
import { reviewedMovieFieldResolver } from "./fieldResolvers/reviewedMovieFieldResolver";
import type { ReviewedMovieNode } from "./ReviewedMoviesJson";
import type { WatchlistEntityNode } from "./WatchlistEntitiesJson";

export interface WatchlistMovieNode extends GatsbyNode {
  imdbId: string;
  performerImdbIds: string[];
  directorImdbIds: string[];
  writerImdbIds: string[];
  collectionNames: string[];
  reviewedMovie: ReviewedMovieNode | null;
}

export const WatchlistMoviesJson = {
  name: SchemaNames.WatchlistMoviesJson,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "Int!",
    imdbId: "String!",
    sortTitle: "String!",
    releaseDate: "String!",
    collectionNames: "[String!]!",
    directorImdbIds: "[String!]!",
    performerImdbIds: "[String!]!",
    writerImdbIds: "[String!]!",
    directorNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdbId: { in: source.directorImdbIds },
                entityType: { eq: "director" },
              },
            },
            type: SchemaNames.WatchlistEntitiesJson,
          });

        return Array.from(entries.map((node) => node.name));
      },
    },
    performerNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdbId: { in: source.performerImdbIds },
                entityType: { eq: "performer" },
              },
            },
            type: SchemaNames.WatchlistEntitiesJson,
          });

        return Array.from(entries.map((node) => node.name));
      },
    },
    writerNames: {
      type: "[String!]!",
      resolve: async (
        source: WatchlistMovieNode,
        _args: unknown,
        context: GatsbyNodeContext,
      ) => {
        const { entries } =
          await context.nodeModel.findAll<WatchlistEntityNode>({
            query: {
              filter: {
                imdbId: { in: source.writerImdbIds },
                entityType: { eq: "writer" },
              },
            },
            type: SchemaNames.WatchlistEntitiesJson,
          });

        return Array.from(entries.map((node) => node.name));
      },
    },
    reviewedMovie: reviewedMovieFieldResolver,
    grade: {
      type: "String",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "grade",
        },
      },
    },
    gradeValue: {
      type: "Int",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "gradeValue",
        },
      },
    },
    slug: {
      type: "String",
      extensions: {
        proxyToReviewedMovie: {
          fieldName: "slug",
        },
      },
    },
    poster: posterFieldResolver,
  },
  extensions: {
    infer: false,
  },
};
