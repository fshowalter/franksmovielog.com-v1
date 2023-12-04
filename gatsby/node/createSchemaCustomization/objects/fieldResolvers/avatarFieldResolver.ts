import path from "path";
import { GatsbyNodeContext, GatsbyResolveArgs } from "../../type-definitions";

export const avatarFieldResolver = {
  type: "File",
  resolve: async (
    source: { slug: string | null },
    _args: GatsbyResolveArgs,
    context: GatsbyNodeContext,
  ) => {
    if (!source.slug) {
      return null;
    }

    return await context.nodeModel.findOne({
      type: "File",
      query: {
        filter: {
          absolutePath: {
            eq: path.resolve(`./content/assets/avatars/${source.slug}.png`),
          },
        },
      },
    });
  },
};
