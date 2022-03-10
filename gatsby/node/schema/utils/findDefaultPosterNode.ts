import path from "path";
import { GatsbyNodeModel } from "../type-definitions";

export default async function (nodeModel: GatsbyNodeModel) {
  return await nodeModel.findOne({
    type: "File",
    query: {
      filter: {
        absolutePath: {
          eq: path.resolve(`./content/assets/posters/default.png`),
        },
      },
    },
  });
}
