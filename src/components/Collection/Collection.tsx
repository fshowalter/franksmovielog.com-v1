import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { initState, reducer } from "./Collection.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export function Collection({
  collection,
  distinctReleaseYears,
}: {
  collection: Queries.CollectionFragment;
  distinctReleaseYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...collection.titles],
      sort: "release-date-asc",
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={<Header collection={collection} />}
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
          showHideReviewd={collection.reviewCount != collection.titles.length}
        />
      }
      list={
        <List
          dispatch={dispatch}
          totalCount={state.filteredItems.length}
          visibleCount={state.showCount}
          groupedItems={state.groupedItems}
        />
      }
    />
  );
}

export const query = graphql`
  fragment CollectionTitle on CollectionTitle {
    imdbId
    title
    year
    grade
    gradeValue
    slug
    sortTitle
    releaseSequence
    poster {
      ...ListItemPoster
    }
  }

  fragment Collection on CollectionsJson {
    name
    reviewCount
    description
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          height: 200
          placeholder: BLURRED
        )
      }
    }
    titles {
      ...CollectionTitle
    }
  }
`;
