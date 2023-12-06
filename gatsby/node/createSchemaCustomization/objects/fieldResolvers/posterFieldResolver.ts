import path from "path";
import { GatsbyNodeContext, GatsbyResolveArgs } from "../../type-definitions";

export const posterFieldResolver = {
  type: "File!",
  resolve: async (
    source: { slug: string },
    _args: GatsbyResolveArgs,
    context: GatsbyNodeContext,
  ) => {
    let poster = null;

    if (source.slug) {
      poster = await context.nodeModel.findOne({
        type: "File",
        query: {
          filter: {
            absolutePath: {
              eq: path.resolve(`./content/assets/posters/${source.slug}.png`),
            },
          },
        },
      });
    }

    if (poster) {
      return poster;
    }

    return await context.nodeModel.findOne({
      type: "File",
      query: {
        filter: {
          absolutePath: {
            eq: path.resolve(`./content/assets/posters/default.png`),
          },
        },
      },
    });
  },
};
