import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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
          <GatsbyImage
            image={movie.backdrop.childImageSharp.gatsbyImageData}
            alt={`A still from ${movie.title} (${movie.year})`}
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
