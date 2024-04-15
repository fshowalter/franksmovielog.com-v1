import { toSentence } from "../../utils";
import { Box } from "../Box";
import { Grade } from "../Grade";
import { ListItem } from "../ListItem";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import { Action, ActionType } from "./Watchlist.reducer";

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, Queries.WatchlistTitleFragment[]>;
  dispatch: React.Dispatch<Action>;
  totalCount: number;
  visibleCount: number;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(item) => {
        return <WatchlistTitle item={item} key={item.imdbId} />;
      }}
    </GroupedList>
  );
}

function WatchlistTitle({
  item,
}: {
  item: Queries.WatchlistTitleFragment;
}): JSX.Element {
  return (
    <ListItem alignItems="center">
      <ListItemPoster
        slug={item.slug}
        image={item.poster}
        title={item.title}
        year={item.year}
        flexShrink={0}
      />
      <Box
        flexGrow={1}
        width={{ tablet: "full" }}
        paddingRight={{ default: "gutter", desktop: 16 }}
      >
        <Box>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <Spacer axis="vertical" size={4} />
          {item.grade && <Grade grade={item.grade} height={16} />}
          <Spacer axis="vertical" size={8} />
          <Slug movie={item} />
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
    </ListItem>
  );
}

function Slug({
  movie,
}: {
  movie: Queries.WatchlistTitleFragment;
}): JSX.Element {
  const credits = [
    ...formatPeopleNames(movie.directorNames, "directed"),
    ...formatPeopleNames(movie.performerNames, "performed"),
    ...formatPeopleNames(movie.writerNames, [
      "has a writing credit",
      "have writing credits",
    ]),
    ...formatCollectionNames(movie.collectionNames),
  ];

  return (
    <Box color="subtle" fontWeight="light" fontSize="small" letterSpacing={0.5}>
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
