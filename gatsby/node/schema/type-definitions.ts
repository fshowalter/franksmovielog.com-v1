import type { Node } from "gatsby";
import type { GraphQLFieldConfig, GraphQLResolveInfo } from "graphql";

export type GatsbyNode = Node;

export interface GatsbyNodeModel {
  findOne: <T>(args: object) => Promise<T | null>;
  findAll: <T>(
    args: object
  ) => Promise<{ entries: T[]; totalCount: () => Promise<number> }>;
}

export type GatsbyResolveArgs = Record<string, unknown>;

export type GatsbyResolveInfo = GraphQLResolveInfo;
export type GatsbyFieldConfig = GraphQLFieldConfig<
  GatsbyNode,
  GatsbyNodeContext,
  object
>;

export interface GatsbyNodeContext {
  nodeModel: GatsbyNodeModel;
}
