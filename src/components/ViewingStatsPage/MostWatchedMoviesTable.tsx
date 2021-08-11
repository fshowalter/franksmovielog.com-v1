import { Link } from "gatsby";
import React from "react";
import DetailsTable from "../DetailsTable";
import {
  listItemCss,
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
  slug: string | null;
  viewings: Viewing[];
}

function movieTitle(movie: MovieWithViewings): JSX.Element {
  const title = (
    <>
      {movie.title} <span className={titleYearCss}>{movie.year}</span>
    </>
  );

  if (movie.slug) {
    return <Link to={`/reviews/${movie.slug}`}>{title}</Link>;
  }

  return title;
}

function ViewingDetail({ viewing }: { viewing: Viewing }): JSX.Element {
  if (viewing.slug) {
    return (
      <span className={viewingDetailCss}>
        <Link to={`/reviews/${viewing.slug}`}>
          {viewing.prettyDate} via {viewing.venue}
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

  return DetailsTable<MovieWithViewings>({
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
          <li key={viewing.sequence} className={listItemCss}>
            <ViewingDetail viewing={viewing} />
          </li>
        );
      });
    },
  });
}
