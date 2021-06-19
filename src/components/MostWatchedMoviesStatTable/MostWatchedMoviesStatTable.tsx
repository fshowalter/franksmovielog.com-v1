import React from "react";
import {
  MostWatchedStatTable,
  MovieTitle,
  ViewingDetail,
} from "../MostWatchedStatTable";

export interface MovieWithViewings {
  title: string;
  year: number;
  slug: string | null;
  viewingCount: number;
  viewings: {
    prettyDate: string;
    venue: string;
  }[];
}

export default function MostWatchedMoviesStatTable({
  collection,
}: {
  collection: MovieWithViewings[];
}): JSX.Element | null {
  if (collection.length === 0) {
    return null;
  }

  return MostWatchedStatTable<MovieWithViewings>({
    heading: "Most Watched Movies",
    collection,
    nameHeaderText: "Title",
    nameFunc: (movie: MovieWithViewings) => <MovieTitle movie={movie} />,
    detailsFunc: (viewing) => {
      return <ViewingDetail viewing={viewing} />;
    },
  });
}
