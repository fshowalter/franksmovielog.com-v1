import { Box } from "../Box";
import { ListItemPoster } from "../ListItemPoster";
import { ListItemTitle } from "../ListItemTitle";
import { GroupedList, ListItem } from "../ListWithFiltersLayout";
import { Spacer } from "../Spacer";
import { subListItemBoxShadowStyle } from "./List.css";
import { Action, ActionType } from "./Viewings.reducer";

export function List({
  groupedItems,
  visibleCount,
  totalCount,
  dispatch,
}: {
  groupedItems: Map<string, Map<string, Queries.ViewingsItemFragment[]>>;
  visibleCount: number;
  totalCount: number;
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
      {(dateGroup) => {
        const [dayAndDate, items] = dateGroup;
        return (
          <DateListItem
            items={items}
            key={dayAndDate}
            dayAndDate={dayAndDate}
          />
        );
      }}
    </GroupedList>
  );
}

function DateListItem({
  dayAndDate,
  items,
}: {
  dayAndDate: string;
  items: Queries.ViewingsItemFragment[];
}): JSX.Element {
  const [day, date] = dayAndDate.split("-");

  return (
    <ListItem paddingBottom={0}>
      <Box alignSelf="flex-start">
        <Box boxShadow="borderAll" borderRadius={4}>
          <Box
            backgroundColor="canvas"
            textAlign="center"
            width={48}
            paddingY={8}
            textTransform="uppercase"
            fontSize="small"
          >
            {day}
          </Box>
          <Box textAlign="center" fontSize="large">
            {date}
          </Box>
        </Box>
      </Box>
      <Box
        as="ul"
        display="flex"
        flexDirection="column"
        rowGap={16}
        flexGrow={1}
      >
        {items.map((item) => {
          return <SubListItem item={item} key={item.sequence} />;
        })}
      </Box>
    </ListItem>
  );
}

export function SubListItem({
  item,
}: {
  item: Queries.ViewingsItemFragment;
}): JSX.Element {
  return (
    <ListItem
      alignItems="flex-start"
      boxShadow="borderBottom"
      paddingTop={0}
      className={subListItemBoxShadowStyle}
      backgroundColor="unset"
    >
      <ListItemPoster
        slug={item.slug}
        image={item.poster}
        title={item.title}
        year={item.year}
        flexShrink={0}
        boxShadow="borderAll"
      />
      <Box flexGrow={1}>
        <Box>
          <ListItemTitle title={item.title} year={item.year} slug={item.slug} />
          <Spacer axis="vertical" size={{ default: 4, tablet: 8 }} />
        </Box>
        <Box
          color="subtle"
          display="flex"
          flexDirection="column"
          fontSize="small"
          fontWeight="light"
          letterSpacing={0.5}
        >
          <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
          <Box>
            <MediumAndVenue medium={item.medium} venue={item.venue} />
          </Box>
        </Box>
        <Spacer axis="vertical" size={{ default: 8, tablet: 16 }} />
      </Box>
    </ListItem>
  );
}

function MediumAndVenue({
  medium,
  venue,
}: {
  medium?: string | null;
  venue?: string | null;
}): JSX.Element | null {
  if (medium && venue) {
    return (
      <>
        <div>
          {medium} at {venue}
        </div>
      </>
    );
  }

  if (medium) {
    return (
      <>
        <div>{medium}</div>
      </>
    );
  }

  if (venue) {
    return (
      <>
        <div>{venue}</div>
      </>
    );
  }

  return null;
}
