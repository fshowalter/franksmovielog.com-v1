import React from "react";
import {
  MostWatchedStatTable,
  Movie,
  MovieTitle,
  Viewing,
  ViewingDetail,
} from "../MostWatchedStatTable";

export interface MovieWithViewings extends Movie {
  viewings: Viewing[];
  viewingCount: number;
}

export default function MostWatchedMoviesStatTable({
  collection,
}: {
  collection: MovieWithViewings[];
}): JSX.Element {
  return MostWatchedStatTable<MovieWithViewings>({
    heading: "Most Watched Movies",
    collection: collection,
    nameHeaderText: "Title",
    nameFunc: (movie: MovieWithViewings) => <MovieTitle movie={movie} />,
    detailsFunc: (viewing) => {
      return <ViewingDetail viewing={viewing} />;
    },
  });
}
