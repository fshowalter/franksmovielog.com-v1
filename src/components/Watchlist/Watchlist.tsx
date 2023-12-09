import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Watchlist.reducer";

export function Watchlist({
  items,
  distinctDirectors,
  distinctPerformers,
  distinctWriters,
  distinctCollections,
  distinctReleaseYears,
}: {
  items: readonly Queries.WatchlistTitleFragment[];
  distinctDirectors: readonly string[];
  distinctPerformers: readonly string[];
  distinctWriters: readonly string[];
  distinctCollections: readonly string[];
  distinctReleaseYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...items],
      sort: "release-date-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header titleCount={items.length} />}
      filters={
        <Filters
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          dispatch={dispatch}
          distinctDirectors={distinctDirectors}
          distinctPerformers={distinctPerformers}
          distinctWriters={distinctWriters}
          distinctCollections={distinctCollections}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
          dispatch={dispatch}
        />
      }
    />
  );
}

export const query = graphql`
  fragment WatchlistTitle on WatchlistTitlesJson {
    imdbId
    title
    year
    releaseSequence
    sortTitle
    slug
    grade
    gradeValue
    directorNames
    performerNames
    writerNames
    collectionNames
    poster {
      ...ListItemPoster
    }
  }
`;
