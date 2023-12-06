import { graphql } from "gatsby";
import { useReducer } from "react";

import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Viewings.reducer";

export function Viewings({
  items,
  distinctGenres,
  distinctMedia,
  distinctVenues,
  distinctReleaseYears,
  distinctViewingYears,
}: {
  items: readonly Queries.ViewingsItemFragment[];
  distinctGenres: readonly string[];
  distinctMedia: readonly string[];
  distinctVenues: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctViewingYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...items],
      sort: "viewing-date-desc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header viewingCount={items.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          distinctGenres={distinctGenres}
          distinctMedia={distinctMedia}
          distinctVenues={distinctVenues}
          distinctReleaseYears={distinctReleaseYears}
          distinctViewingYears={distinctViewingYears}
          sortValue={state.sortValue}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedItems={state.groupedItems}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
        />
      }
    />
  );
}

export const query = graphql`
  fragment ViewingsItem on ViewingsJson {
    sequence
    viewingYear
    viewingMonth: viewingDate(formatString: "MMM")
    viewingDay: viewingDate(formatString: "ddd")
    viewingDate(formatString: "D")
    yearAndImdbId
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
