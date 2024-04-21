import { Box } from "../Box";
import { Grade } from "../Grade";
import { ListItem } from "../ListItem";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import { Action, ActionType } from "./Collection.reducer";

export function List({
  groupedItems,
  dispatch,
  totalCount,
  visibleCount,
}: {
  groupedItems: Map<string, Queries.CollectionTitleFragment[]>;
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
  item: Queries.CollectionTitleFragment;
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
          {item.grade && <Grade grade={item.grade} height={18} />}
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
    </ListItem>
  );
}
