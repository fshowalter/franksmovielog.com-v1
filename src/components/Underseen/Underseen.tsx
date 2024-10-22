import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { Sort, initState, reducer } from "./Underseen.reducer";

export function Underseen({
  items,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
}: {
  items: readonly Queries.UnderseenItemFragment[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...items],
      sort: initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedItems={state.groupedItems}
          visibleCount={state.showCount}
          totalCount={state.filteredItems.length}
        />
      }
    />
  );
}

export const query = graphql`
  fragment UnderseenItem on UnderseenGemsJson {
    releaseSequence
    title
    year
    sortTitle
    slug
    grade
    gradeValue
    imdbId
    genres
    poster {
      ...ListItemPoster
    }
  }
`;
