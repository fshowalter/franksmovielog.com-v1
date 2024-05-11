import { toSentence } from "../../utils";
import { Box } from "../Box";

export function WatchlistTitleSlug({
  directorNames,
  performerNames,
  writerNames,
  collectionNames,
}: {
  directorNames: readonly string[];
  performerNames: readonly string[];
  writerNames: readonly string[];
  collectionNames: readonly string[];
}): JSX.Element {
  const credits = [
    ...formatPeopleNames(directorNames, "directed"),
    ...formatPeopleNames(performerNames, "performed"),
    ...formatPeopleNames(writerNames, [
      "has a writing credit",
      "have writing credits",
    ]),
    ...formatCollectionNames(collectionNames),
  ];

  return (
    <Box
      color="subtle"
      fontWeight="light"
      fontSize="small"
      letterSpacing={0.5}
      lineHeight={16}
    >
      Because {toSentence(credits)}.
    </Box>
  );
}

function formatPeopleNames(
  names: readonly string[],
  suffix: string | string[],
): string[] {
  if (names.length === 0) {
    return [];
  }

  let append;

  if (Array.isArray(suffix)) {
    append = names.length > 1 ? suffix[1] : suffix[0];
  } else {
    append = suffix;
  }

  return [`${toSentence(names)} ${append}`];
}

function formatCollectionNames(names: readonly string[]): string | string[] {
  if (names.length === 0) {
    return "";
  }

  const suffix = names.length > 1 ? "collections" : "collection";

  return [`it's in the ${toSentence(names)} ${suffix}`];
}
