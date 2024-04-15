import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { initState, reducer } from "./Collections.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export function Collections({
  collections,
}: {
  collections: readonly Queries.CollectionsItemFragment[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      entities: collections,
      sort: "name-asc",
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          entities={state.filteredEntities}
          totalCount={state.filteredEntities.length}
          visibleCount={state.filteredEntities.length}
        />
      }
    />
  );
}

export const query = graphql`
  fragment CollectionsItem on CollectionsJson {
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
