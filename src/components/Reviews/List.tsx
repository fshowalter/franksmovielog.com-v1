import { Box } from "../Box";
import { Grade } from "../Grade";
import { ListItem } from "../ListItem";
import { ListItemGenres } from "../ListItemGenres";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import { Action, ActionType } from "./Reviews.reducer";

export function List({
  groupedItems,
  totalCount,
  visibleCount,
  dispatch,
}: {
  groupedItems: Map<string, Queries.ReviewsItemFragment[]>;
  totalCount: number;
  visibleCount: number;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <GroupedList
      data-testid="poster-list"
      groupedItems={groupedItems}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: ActionType.SHOW_MORE })}
    >
      {(item) => <ReviewListItem item={item} key={item.imdbId} />}
    </GroupedList>
  );
}

function ReviewListItem({
  item,
}: {
  item: Queries.ReviewsItemFragment;
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
          <Box __paddingBottom={1} __paddingTop={1}>
            <Grade grade={item.grade} height={18} />
          </Box>
          <Spacer axis="vertical" size={8} />
          <ListItemGenres genres={item.genres} />
          <Spacer axis="vertical" size={8} />
        </Box>
      </Box>
    </ListItem>
  );
}
