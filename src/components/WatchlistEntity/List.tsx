import { Box } from "../Box";
import { Grade } from "../Grade";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList, ListItem } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import { Action, ActionType } from "./WatchlistEntity.reducer";

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, Queries.WatchlistEntityItemFragment[]>;
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
        return <WatchlistItem item={item} key={item.imdbId} />;
      }}
    </GroupedList>
  );
}

function WatchlistItem({
  item,
}: {
  item: Queries.WatchlistEntityItemFragment;
}): JSX.Element {
  return (
    <ListItem>
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
          {item.grade && <Grade grade={item.grade} height={18} />}
          <Spacer axis="vertical" size={4} />
        </Box>
      </Box>
    </ListItem>
  );
}
