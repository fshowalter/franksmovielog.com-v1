import { graphql } from "gatsby";
import { useReducer } from "react";
import Select from "react-select";
import { Box } from "../Box";
import { DebouncedInput } from "../DebouncedInput";
import { LabelText } from "../LabelText";
import { SelectField, SelectOptions } from "../SelectField";
import { YearInput } from "../YearInput";
import { ViewingList } from "./ViewingList";

import {
  backgroundColors,
  borderColors,
  foregroundColors,
} from "../../styles/colors.css";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import type { Sort } from "./ViewingIndex.reducer";
import { ActionType, initState, reducer } from "./ViewingIndex.reducer";

function groupItems({
  items,
}: {
  items: Queries.ViewingIndexItemFragment[];
  sortValue: Sort;
}): Map<string, Map<string, Queries.ViewingIndexItemFragment[]>> {
  const shortMonthToLong: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  const groupedItems = new Map<
    string,
    Map<string, Queries.ViewingIndexItemFragment[]>
  >();

  items.map((item) => {
    const monthYearGroup = `${shortMonthToLong[item.viewingMonth]} ${
      item.viewingYear
    }`;

    let groupValue = groupedItems.get(monthYearGroup);

    if (!groupValue) {
      groupValue = new Map<string, IViewing[]>();
      groupedItems.set(monthYearGroup, groupValue);
    }

    const dayGroup = `${item.viewingDay}-${item.viewingDate}`;

    let dayGroupValue = groupValue.get(dayGroup);

    if (!dayGroupValue) {
      dayGroupValue = [];
      groupValue.set(dayGroup, dayGroupValue);
    }

    dayGroupValue.push(item);
  });

  return groupedItems;
}

export function ViewingIndex({
  items,
  children,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
  distinctGenres,
  initialSort,
}: {
  items: readonly Queries.ViewingIndexItemFragment[];
  children: React.ReactNode;
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctViewingYears: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctGenres: readonly string[];
  initialSort: Sort;
}): JSX.Element {
  const is = initState({
    items: [...items],
    sort: initialSort,
  });

  const [state, dispatch] = useReducer(reducer, is);

  const groupedItems = groupItems({
    items: state.filteredItems.slice(0, state.showCount),
    sortValue: state.sortValue,
  });

  const filters = (
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
        years={distinctReleaseYears}
        onYearChange={(values) =>
          dispatch({ type: ActionType.FILTER_RELEASE_YEAR, values })
        }
      />
      <YearInput
        label="Viewing Year"
        years={distinctViewingYears}
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
        <SelectOptions options={distinctMedia} />
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
        <SelectOptions options={distinctVenues} />
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
          options={distinctGenres.map((genre) => {
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

  return (
    <ListWithFiltersLayout
      filters={filters}
      header={children}
      list={<ViewingList groupedItems={groupedItems} />}
      visibleItems={state.showCount}
      totalItems={state.filteredItems.length}
      onMoreClick={() => {
        dispatch({ type: ActionType.SHOW_MORE });
      }}
    />
  );
}

export const query = graphql`
  fragment ViewingIndexItem on ViewingsJson {
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
      ...CalendarPoster
    }
  }
`;
