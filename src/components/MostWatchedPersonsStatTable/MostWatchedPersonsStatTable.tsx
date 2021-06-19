import React from "react";
import {
  MostWatchedStatTable,
  MovieTitle,
  TableLink,
  ViewingDetail,
} from "../MostWatchedStatTable";

export interface PersonWithViewings {
  fullName: string;
  slug: string | null;
  viewingCount: number;
  viewings: {
    title: string;
    prettyDate: string;
    venue: string;
    year: number;
    slug: string | null;
  }[];
}

function buildPersonName(
  type: string,
  person: PersonWithViewings
): JSX.Element {
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
  collection: PersonWithViewings[];
  watchlistType: string;
}): JSX.Element {
  return MostWatchedStatTable<PersonWithViewings>({
    heading: `Most Watched ${
      watchlistType[0].toUpperCase() + watchlistType.slice(1)
    }`,
    collection,
    nameHeaderText: "Name",
    nameFunc: (person) => buildPersonName(watchlistType, person),
    detailsFunc: (viewing) => {
      return (
        <>
          <MovieTitle movie={viewing} /> <ViewingDetail viewing={viewing} />
        </>
      );
    },
  });
}
