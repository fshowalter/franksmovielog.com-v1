import React from "react";
import {
  MostWatchedTable,
  Movie,
  MovieTitle,
  Viewing,
  ViewingDetail,
} from "../MostWatchedTable";

export interface MovieWithViewings extends Movie {
  viewings: Viewing[];
  viewingCount: number;
}

export default function MostWatchedMoviesTable({
  collection,
}: {
  collection: MovieWithViewings[];
}): JSX.Element {
  return MostWatchedTable<MovieWithViewings>({
    collection: collection,
    nameHeaderText: "Title",
    nameFunc: (movie: MovieWithViewings) => <MovieTitle movie={movie} />,
    detailsFunc: (viewing) => {
      return <ViewingDetail viewing={viewing} />;
    },
  });
}
