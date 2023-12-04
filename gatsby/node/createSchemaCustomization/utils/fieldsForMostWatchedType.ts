import { ViewingNode } from "../objects/ViewingsJson";
import { WatchlistEntityNode } from "../objects/WatchlistDirectorsJson";
import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeContext, GatsbyResolveArgs } from "../type-definitions";

export function fieldsForMostWatchedType(
  type: "director" | "writer" | "performer",
) {
  return {
    imdbId: "String!",
    fullName: "String!",
    viewingCount: "Int!",
    viewings: {
      type: `[${SchemaNames.ViewingsJson}!]!`,
      resolve: async (
        source: { viewing_sequence_ids: number[] },
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext,
      ) => {
        const { entries } = await context.nodeModel.findAll<ViewingNode>({
          type: SchemaNames.ViewingsJson,
          query: {
            filter: {
              sequence: { in: source.viewing_sequence_ids },
            },
          },
        });

        return Array.from(entries);
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
        context: GatsbyNodeContext,
      ) => {
        const entity = await context.nodeModel.findOne<WatchlistEntityNode>({
          type: SchemaNames.WatchlistEntitiesJson,
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
