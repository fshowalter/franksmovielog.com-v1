import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrew.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export function CastAndCrew({
  entities,
}: {
  entities: readonly Queries.CastAndCrewItemFragment[];
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
      header={
        <Header title="Cast and Crew" tagline="Round up the usual suspects." />
      }
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
  fragment CastAndCrewItem on CastAndCrewJson {
    name
    slug
    director {
      reviewCount
      watchlistCount
    }
    performer {
      watchlistCount
      reviewCount
    }
    writer {
      watchlistCount
      reviewCount
    }
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
