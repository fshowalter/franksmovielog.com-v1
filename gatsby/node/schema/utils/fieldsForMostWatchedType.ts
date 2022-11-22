import { SchemaNames } from "../schemaNames";
import type { GatsbyNodeContext, GatsbyResolveArgs } from "../type-definitions";
import { ViewingNode } from "../ViewingsJson";
import { WatchlistEntityNode } from "../WatchlistEntitiesJson";

interface MostWatchedPersonNode {
  imdb_id: string;
  viewing_sequence_ids: number[];
}

export default function fieldsForMostWatchedType(
  type: "director" | "writer" | "performer"
) {
  return {
    imdb_id: "String!",
    full_name: "String!",
    viewing_count: "Int!",
    viewing_sequence_ids: `[Int!]!`,
    viewings: {
      type: `[${SchemaNames.VIEWINGS_JSON}!]!`,
      resolve: async (
        source: MostWatchedPersonNode,
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
    },
    slug: {
      type: "String",
      resolve: async (
        source: MostWatchedPersonNode,
        _args: GatsbyResolveArgs,
        context: GatsbyNodeContext
      ) => {
        const entity = await context.nodeModel.findOne<WatchlistEntityNode>({
          type: SchemaNames.WATCHLIST_ENTITIES_JSON,
          query: {
            filter: {
              reviewCount: { gte: 1 },
              imdb_id: { eq: source.imdb_id },
              entity_type: { eq: type },
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
