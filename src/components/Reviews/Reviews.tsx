import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./Reviews.reducer";

export function Reviews({
  items,
  distinctGenres,
  distinctReleaseYears,
  distinctReviewYears,
}: {
  items: readonly Queries.ReviewsItemFragment[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  distinctReviewYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...items],
      sort: "title-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header reviewCount={items.length} />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
          distinctReviewYears={distinctReviewYears}
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
  fragment ReviewsItem on ReviewedTitlesJson {
    year
    imdbId
    reviewDate(formatString: "YYYY-MM-DD")
    yearAndImdbId
    reviewYear
    reviewMonth: reviewDate(formatString: "MMMM")
    title
    year
    sortTitle
    slug
    grade
    gradeValue
    genres
    poster {
      ...ListItemPoster
    }
  }
`;
