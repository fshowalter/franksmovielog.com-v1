import { Box } from "../Box";
import { ListItem } from "../ListItem";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import SvgIcon from "../SvgIcon";
import { WatchlistTitleSlug } from "../WatchlistTitleSlug";
import { iconStyle } from "./List.css";
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
          <Spacer axis="vertical" size={8} />
          <WatchlistTitleSlug
            directorNames={item.directorNames}
            performerNames={item.performerNames}
            writerNames={item.writerNames}
            collectionNames={item.collectionNames}
          />
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
      <Box paddingRight={{ default: "gutter", desktop: 16 }}>
        {item.viewed && (
          <SvgIcon className={iconStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </SvgIcon>
        )}
      </Box>
    </ListItem>
  );
}
