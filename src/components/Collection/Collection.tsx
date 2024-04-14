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
  entity: Queries.CollectionFragment;
  entityType: EntityType;
  distinctReleaseYears: readonly string[];
  tagline: string;
  breadcrumb: string;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...entity.titles],
      sort: "release-date-asc",
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={
        <Header
          entity={entity}
          entityType={entityType}
          tagline={tagline}
          breadcrumb={breadcrumb}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
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
  fragment CollectionTitle on CollectionTitles {
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
      ...WatchlistEntityTitle
    }
  }
`;
