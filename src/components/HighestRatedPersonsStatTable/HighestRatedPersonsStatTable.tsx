import React from "react";
import Grade from "../Grade";
import {
  HighestRatedStatTable,
  MovieTitle,
  Review,
  ReviewDetail,
  TableLink,
} from "../HighestRatedStatTable";

export interface PersonWithReviews {
  fullName: string;
  slug: string | null;
  reviews: Review[];
  averageGradeValue: number;
}

function buildPersonName(type: string, person: PersonWithReviews): JSX.Element {
  if (person.slug) {
    return (
      <TableLink to={`/watchlist/${type}/${person.slug}/`}>
        {person.fullName}
      </TableLink>
    );
  }

  return <>{person.fullName}</>;
}

export default function MostWatchedPersonsStatTable({
  collection,
  watchlistType,
}: {
  collection: PersonWithReviews[];
  watchlistType: string;
}): JSX.Element {
  return HighestRatedStatTable<PersonWithReviews>({
    heading: `Highest Rated ${
      watchlistType[0].toUpperCase() + watchlistType.slice(1)
    }`,
    collection,
    nameHeaderText: "Name",
    nameFunc: (person) => buildPersonName(watchlistType, person),
    detailsFunc: (review) => {
      return (
        <>
          <Grade gradeValue={review.gradeValue} />{" "}
          <MovieTitle review={review} /> <ReviewDetail review={review} />
        </>
      );
    },
  });
}
