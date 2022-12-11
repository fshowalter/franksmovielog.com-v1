import { isObjectType } from "graphql";
import type { GatsbyNode, GatsbyResolveInfo } from "../type-definitions";

export default async function resolveFieldForNode<T>(
  fieldName: string,
  nodeItem: GatsbyNode | null,
  context: unknown,
  info: GatsbyResolveInfo,
  args: Record<string, unknown>
): Promise<T | null> {
  if (!nodeItem) {
    return null;
  }

  const type = info.schema.getType(nodeItem.internal.type);

  if (!isObjectType(type)) {
    return null;
  }

  const resolver = type.getFields()[fieldName].resolve;

  if (!resolver) {
    return null;
  }

  return (await resolver(nodeItem, args, context, {
    ...info,
    fieldName,
  })) as T;
}
