import type { GatsbyGraphQLObjectType, NodePluginSchema } from "gatsby";
import { SchemaNames } from "./schemaNames";
import type { GatsbyNode, GatsbyNodeContext } from "./type-definitions";
import posterResolver from "./utils/posterResolver";

export interface ViewingNode extends GatsbyNode {
  imdbId: string;
  sequence: number;
}

const ViewingsJson = {
  name: SchemaNames.VIEWINGS_JSON,
  interfaces: ["Node"],
  fields: {
    title: "String!",
    year: "Int!",
    sequence: "Int!",
    venue: "String",
    medium: "String",
    imdbId: {
      type: "String!",
      extensions: {
        proxy: {
          from: "imdb_id",
        },
      },
    },
    releaseDate: {
      type: "String!",
      extensions: {
        proxy: {
          from: "release_date",
        },
      },
    },
    viewingDate: {
      type: "Date!",
      extensions: {
        dateformat: {},
        proxy: {
          from: "viewing_date",
        },
      },
    },
    viewingYear: {
      type: "Int!",
      extensions: {
        proxy: {
          from: "viewing_year",
        },
      },
    },
    mediumNotes: {
      type: "String",
      extensions: {
        proxy: {
          from: "medium_notes",
        },
      },
    },
    sortTitle: {
      type: "String!",
      extensions: {
        proxy: {
          from: "sort_title",
        },
      },
    },
    genres: "[String!]!",
    reviewedMovie: {
      type: `${SchemaNames.REVIEWED_MOVIES_JSON}`,
      extensions: {
        link: {
          from: "imdb_id",
          by: "imdbId",
        },
      },
    },
    viewingNotes: {
      type: SchemaNames.MARKDOWN_REMARK,
      resolve: async (
        source: ViewingNode,
        _args: unknown,
        context: GatsbyNodeContext
      ) => {
        return await context.nodeModel.findOne({
          type: SchemaNames.MARKDOWN_REMARK,
          query: {
            filter: {
              fileAbsolutePath: {
                regex: `//viewing_notes/${source.sequence
                  .toString()
                  .padStart(4, "0")}-.*/`,
              },
            },
          },
        });
      },
    },
    poster: posterResolver,
  },
  extensions: {
    infer: false,
  },
};

export default function buildViewingsJsonSchema(
  schema: NodePluginSchema
): GatsbyGraphQLObjectType[] {
  return [schema.buildObjectType(ViewingsJson)];
}
