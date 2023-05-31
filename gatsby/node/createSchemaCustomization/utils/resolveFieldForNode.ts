import { isObjectType } from "graphql";
import type { GatsbyNode, GatsbyResolveInfo } from "../type-definitions";

export async function resolveFieldForNode<T>({
  fieldName,
  source,
  context,
  info,
  args = {},
}: {
  fieldName: string;
  source: GatsbyNode | null;
  context: unknown;
  info: GatsbyResolveInfo;
  args?: Record<string, unknown>;
}): Promise<T | null> {
  if (!source) {
    return null;
  }

  const type = info.schema.getType(source.internal.type);

  if (!isObjectType(type)) {
    return null;
  }

  const resolver = type.getFields()[fieldName].resolve;

  if (!resolver) {
    return null;
  }

  return (await resolver(source, args, context, {
    ...info,
    fieldName,
  })) as T;
}
