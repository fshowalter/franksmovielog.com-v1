import { Link } from "gatsby";
import React from "react";
import DetailsStatTable from "../DetailsStatTable";
import {
  titleYearCss,
  viaCss,
  viewingDetailCss,
} from "./MostWatchedMoviesTable.module.scss";

interface Viewing {
  sequence: number;
  prettyDate: string;
  venue: string;
  slug: string | null;
}

interface MovieWithViewings {
  imdbId: string;
  title: string;
  year: number;
  viewingCount: number;
  viewings: Viewing[];
}

function movieTitle(movie: MovieWithViewings): JSX.Element {
  return (
    <>
      {movie.title} <span className={titleYearCss}>{movie.year}</span>
    </>
  );
}

function ViewingDetail({ viewing }: { viewing: Viewing }): JSX.Element {
  if (viewing.slug) {
    return (
      <span className={viewingDetailCss}>
        <Link to={`/reviews/${viewing.slug}`}>
          {viewing.prettyDate} <span className={viaCss}>via</span>{" "}
          {viewing.venue}
        </Link>
      </span>
    );
  }

  return (
    <span className={viewingDetailCss}>
      {viewing.prettyDate} <span className={viaCss}>via</span> {viewing.venue}
    </span>
  );
}

export default function MostWatchedMoviesTable({
  movies,
}: {
  movies: MovieWithViewings[];
}): JSX.Element | null {
  if (movies.length === 0) {
    return null;
  }

  return DetailsStatTable<MovieWithViewings>({
    heading: "Most Watched Movies",
    collection: movies,
    leftHeaderText: "Title",
    rightHeaderText: "Viewings",
    renderKey: (movie: MovieWithViewings) => movie.imdbId,
    renderLeft: movieTitle,
    renderRight: (movie: MovieWithViewings) => movie.viewingCount,
    renderDetails: (item: MovieWithViewings) => {
      return item.viewings.map((viewing) => {
        return (
          <li key={viewing.sequence}>
            <ViewingDetail viewing={viewing} />
          </li>
        );
      });
    },
  });
}
