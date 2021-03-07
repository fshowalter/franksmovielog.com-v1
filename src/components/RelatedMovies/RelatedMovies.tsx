import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { ReviewedMovie } from "../../types";
import Grade from "../Grade";
import {
  listCss,
  listItemGradeCss,
  listItemImageLinkCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./RelatedMovies.module.scss";

function RelatedMovie({ movie }: { movie: ReviewedMovie }): JSX.Element {
  return (
    <>
      <Link className={listItemImageLinkCss} to={`/reviews/${movie.slug}/`}>
        {movie.backdrop && (
          <Img
            fluid={movie.backdrop.childImageSharp.fluid}
            alt={`A still from ${movie.title} (${movie.year})`}
            fadeIn={false}
          />
        )}
      </Link>
      <div className={listItemTitleCss}>
        <Link to={`/reviews/${movie.slug}/`}>
          {movie.title}{" "}
          <span className={listItemTitleYearCss}>{movie.year}</span>
        </Link>
      </div>
      <Grade grade={movie.lastReviewGrade} className={listItemGradeCss} />
    </>
  );
}

export default function RelatedMovies({
  movies,
  children,
}: {
  movies: ReviewedMovie[];
  children: React.ReactNode;
}): JSX.Element | null {
  if (!movies || movies.length < 4) {
    return null;
  }

  return (
    <div>
      {children}
      <ul className={listCss}>
        {movies.map((movie) => {
          return (
            <li>
              <RelatedMovie movie={movie} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
