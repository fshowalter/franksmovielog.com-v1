import type { Node } from "gatsby";
import type { GraphQLResolveInfo } from "graphql";

export type GatsbyNode = Node;

export interface GatsbyNodeModel {
  findOne: <T>(args: object) => Promise<T>;
  findAll: <T>(
    args: object
  ) => Promise<{ entries: T[]; totalCount: () => Promise<number> }>;
}

export interface GatsbyResolveArgs {
  [key: string]: unknown;
}

export type GatsbyResolveInfo = GraphQLResolveInfo;

export interface GatsbyNodeContext {
  nodeModel: GatsbyNodeModel;
}
