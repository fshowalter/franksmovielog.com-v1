import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrewMember.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List } from "./List";

export function CastAndCrewMember({
  member,
  distinctReleaseYears,
}: {
  member: Queries.CastAndCrewMemberFragment;
  distinctReleaseYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      items: [...member.titles],
      sort: "release-date-asc",
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={<Header member={member} />}
      filters={
        <Filters
          dispatch={dispatch}
          creditedAs={member.creditedAs}
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
  fragment CastAndCrewMemberTitle on CastAndCrewMemberTitle {
    imdbId
    title
    year
    grade
    gradeValue
    slug
    sortTitle
    releaseSequence
    creditedAs
    poster {
      ...ListItemPoster
    }
  }

  fragment CastAndCrewMember on CastAndCrewJson {
    name
    reviewCount
    totalCount
    creditedAs
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
      ...CastAndCrewMemberTitle
    }
  }
`;
