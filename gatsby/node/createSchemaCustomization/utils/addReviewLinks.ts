import { GatsbyNodeModel } from "../type-definitions";
import { findReviewedTitleNode } from "./findReviewedTitleNode";

export default async function addReviewLinks(
  text: string,
  nodeModel: GatsbyNodeModel,
) {
  let result = text;

  const re = RegExp(/(<span data-imdb-id="(tt\d+)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  for (const match of matches) {
    const reviewedMovie = await findReviewedTitleNode(match[2], nodeModel);

    if (!reviewedMovie) {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        match[3],
      );
    } else {
      result = result.replace(
        `<span data-imdb-id="${match[2]}">${match[3]}</span>`,
        `<a href="/reviews/${reviewedMovie.slug}/">${match[3]}</a>`,
      );
    }
  }

  return result;
}
