import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";
import { initState, reducer } from "./WatchlistEntities.reducer";

export function WatchlistEntities({
  entities,
  title,
  tagline,
  entityType,
}: {
  entities: readonly Queries.WatchlistEntitiesItemFragment[];
  title: string;
  tagline: string;
  entityType: string;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities,
      sort: "name-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header title={title} tagline={tagline} />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          entityType={entityType}
          entities={state.filteredEntities}
          totalCount={state.filteredEntities.length}
          visibleCount={state.filteredEntities.length}
        />
      }
    />
  );
}

export const query = graphql`
  fragment WatchlistEntitiesItem on WatchlistEntity {
    name
    slug
    titleCount
    reviewCount
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 48
          height: 48
          placeholder: NONE
        )
      }
    }
  }
`;
