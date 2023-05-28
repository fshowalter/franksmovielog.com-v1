import { graphql } from "gatsby";
import { useReducer } from "react";
import Select from "react-select";
import { Box } from "../components/Box";
import { DebouncedInput } from "../components/DebouncedInput";
import { HeadBuilder } from "../components/HeadBuilder";
import { LabelText } from "../components/LabelText";
import { PageTitle } from "../components/PageTitle";
import { SelectField, SelectOptions } from "../components/SelectField";
import { Spacer } from "../components/Spacer";
import { YearInput } from "../components/YearInput";

import { ListItemPoster } from "../components/ListItemPoster";
import { ListItemTitle } from "../components/ListItemTitle";
import {
  GroupedCalendarListItem,
  GroupedList,
  ListWithFiltersLayout,
} from "../components/ListWithFiltersLayout";
import { GroupedCalendarSubListItem } from "../components/ListWithFiltersLayout/ListWithFiltersLayout";
import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../styles/colors.css";
import {
  Action,
  ActionType,
  Sort,
  State,
  initState,
  reducer,
} from "./viewings.reducer";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Viewing Log"
      description="A sortable and filterable list of every movie I've watched since 2012."
      image={null}
      article={false}
    />
  );
}

function Header({ data }: { data: Queries.ViewingsPageQuery }): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">Viewing Log</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {data.viewing.nodes.length.toLocaleString()}
          </Box>{" "}
          movies.
        </p>
      </Box>
    </>
  );
}

function Filters({
  dispatch,
  data,
  state,
}: {
  dispatch: React.Dispatch<Action>;
  data: Queries.ViewingsPageQuery;
  state: State;
}): JSX.Element {
  return (
    <>
      <DebouncedInput
        label="Title"
        placeholder="Enter all or part of a title"
        onInputChange={(value) =>
          dispatch({ type: ActionType.FILTER_TITLE, value })
        }
      />
      <YearInput
        label="Release Year"
        years={data.viewing.releaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <YearInput
        label="Viewing Year"
        years={data.viewing.viewingYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_VIEWING_YEAR, values })
        }
      />
      <SelectField
        label="Medium"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_MEDIUM,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={data.viewing.media} />
      </SelectField>
      <SelectField
        label="Venue"
        onChange={(e) =>
          dispatch({
            type: ActionType.FILTER_VENUE,
            value: e.target.value,
          })
        }
      >
        <SelectOptions options={data.viewing.venues} />
      </SelectField>
      <Box display="flex" flexDirection="column" textAlign="left">
        <LabelText text="Genres" as="label" htmlFor="genres" />
        <Select
          inputId="genres"
          theme={(theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
              ...theme.colors,
              neutral0: backgroundColors.subtle,
              neutral20: borderColors.default,
              neutral50: foregroundColors.subtle,
              danger: foregroundColors.accent,
              primary25: backgroundColors.stripe,
            },
          })}
          classNamePrefix="reactSelect"
          isSearchable={false}
          onChange={(e) =>
            dispatch({
              type: ActionType.FILTER_GENRES,
              values: e.map((selection) => selection.value),
            })
          }
          isMulti={true}
          options={data.viewing.genres.map((genre) => {
            return { value: genre, label: genre };
          })}
        />
      </Box>
      <SelectField
        value={state.sortValue}
        label="Order By"
        onChange={(e) =>
          dispatch({
            type: ActionType.SORT,
            value: e.target.value as Sort,
          })
        }
      >
        <option value="viewing-date-desc">Viewing Date (Newest First)</option>
        <option value="viewing-date-asc">Viewing Date (Oldest First)</option>
      </SelectField>
    </>
  );
}

function List({ state }: { state: State }) {
  return (
    <GroupedList data-testid="poster-list" items={state.groupedItems}>
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
  items: Queries.ViewingsPageItemFragment[];
}): JSX.Element {
  const [day, date] = dayAndDate.split("-");

  return (
    <GroupedCalendarListItem day={day} date={date} items={items}>
      {(item) => {
        return <SubListItem item={item} key={item.sequence} />;
      }}
    </GroupedCalendarListItem>
  );
}

export function SubListItem({
  item,
}: {
  item: Queries.ViewingsPageItemFragment;
}): JSX.Element {
  return (
    <GroupedCalendarSubListItem>
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
      </Box>
    </GroupedCalendarSubListItem>
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

/**
 * Renders the viewings page.
 */
export default function ViewingsPage({
  data,
}: {
  data: Queries.ViewingsPageQuery;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...data.viewing.nodes],
      sort: "viewing-date-desc",
    },
    initState
  );

  return (
    <ListWithFiltersLayout
      header={<Header data={data} />}
      filters={<Filters data={data} state={state} dispatch={dispatch} />}
      list={<List state={state} />}
      visibleItems={state.showCount}
      totalItems={state.filteredItems.length}
      onMoreClick={() => {
        dispatch({ type: ActionType.SHOW_MORE });
      }}
    />
  );
}

export const query = graphql`
  fragment ViewingsPageItem on ViewingsJson {
    sequence
    viewingYear
    viewingMonth: viewingDate(formatString: "MMM")
    viewingDay: viewingDate(formatString: "ddd")
    viewingDate(formatString: "D")
    releaseDate
    title
    medium
    venue
    year
    sortTitle
    slug
    genres
    poster {
      ...ListItemPoster
    }
  }
`;

export const pageQuery = graphql`
  query ViewingsPage {
    viewing: allViewingsJson(sort: { sequence: DESC }) {
      nodes {
        ...ViewingsPageItem
      }
      media: distinct(field: { medium: SELECT })
      venues: distinct(field: { venue: SELECT })
      viewingYears: distinct(field: { viewingYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
