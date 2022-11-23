import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeContext, GatsbyResolveArgs } from "../type-definitions";
import { ViewingNode } from "../ViewingsJson";
import { WatchlistEntityNode } from "../WatchlistEntitiesJson";

export default function fieldsForMostWatchedType(
  type: "director" | "writer" | "performer"
) {
  return {
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    fullName: {
      type: "String!",
      extensions: {
        proxy: {
          from: "full_name",
        },
      },
    },
    viewingCount: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "viewing_count",
        },
      },
    },
    viewings: {
      type: `[${SchemaNames.VIEWINGS_JSON}!]!`,
      resolve: async (
        source: { viewing_sequence_ids: number[] },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        const { entries } = await context.nodeModel.findAll<ViewingNode>({
          type: SchemaNames.VIEWINGS_JSON,
          query: {
            filter: {
              sequence: { in: source.viewing_sequence_ids },
            },
          },
        });

        if (!entries) {
          return [];
        }

        return entries;
      },
      extensions: {
        proxy: {
          from: "viewing_sequence_ids",
        },
      },
    },
    slug: {
      type: "String",
      resolve: async (
        source: { imdbId: string },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        const entity = await context.nodeModel.findOne<WatchlistEntityNode>({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              reviewCount: { gte: 1 },
              imdbId: { eq: source.imdbId },
              entityType: { eq: type },
            },
          },
        });

        if (!entity) {
          return null;
        }

        return entity.slug;
      },
    },
  };
}
