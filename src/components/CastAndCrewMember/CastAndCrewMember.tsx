import { graphql } from "gatsby";
import { useReducer } from "react";
import { ListWithFiltersLayout } from "../ListWithFiltersLayout";
import { initState, reducer } from "./CastAndCrewMember.reducer";
import { CreditsList } from "./CreditsList";
import { Filters } from "./Filters";
import { Header } from "./Header";

export function CastAndCrewMember({
  entity,
  directorReleaseYears,
  performerReleaseYears,
  writerReleaseYears,
}: {
  entity: Queries.CastAndCrewMemberFragment;
  directorReleaseYears: readonly string[];
  performerReleaseYears: readonly string[];
  writerReleaseYears: readonly string[];
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      directorTitles: [...entity.director.titles],
      performerTitles: [...entity.performer.titles],
      writerTitles: [...entity.writer.titles],
      sort: "release-date-asc",
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={<Header entity={entity} />}
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          directorReleaseYears={directorReleaseYears}
          performerReleaseYears={performerReleaseYears}
          writerReleaseYears={writerReleaseYears}
        />
      }
      list={
        <>
          <CreditsList
            groupedItems={state.groupedDirectorTitles}
            summaryText="Director"
            titleCount={state.filteredDirectorTitles.length}
          />
          <CreditsList
            groupedItems={state.groupedPerformerTitles}
            summaryText="Performer"
            titleCount={state.filteredPerformerTitles.length}
          />
          <CreditsList
            groupedItems={state.groupedWriterTitles}
            summaryText="Writer"
            titleCount={state.filteredWriterTitles.length}
          />
        </>
      }
    />
  );
}

export const query = graphql`
  fragment CastAndCrewMemberTitle on CastAndCrewCreditsTitle {
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

  fragment CastAndCrewMember on CastAndCrewJson {
    name
    director {
      watchlistCount
      reviewCount
      titles {
        ...CastAndCrewMemberTitle
      }
    }
    performer {
      watchlistCount
      reviewCount
      titles {
        ...CastAndCrewMemberTitle
      }
    }
    writer {
      watchlistCount
      reviewCount
      titles {
        ...CastAndCrewMemberTitle
      }
    }
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
  }
`;
