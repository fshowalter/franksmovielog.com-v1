import path from "path";
import { GatsbyNodeContext, GatsbyResolveArgs } from "../../type-definitions";

export const stillFieldResolver = {
  type: "File",
  resolve: async (
    source: { slug: string },
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
            eq: path.resolve(`./content/assets/stills/${source.slug}.png`),
          },
        },
      },
    });
  },
};
