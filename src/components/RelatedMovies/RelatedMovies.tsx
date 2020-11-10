import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { ReviewedMovie } from "../../types";
import Grade from "../Grade";
import styles from "./RelatedMovies.module.scss";

function RelatedMovie({ movie }: { movie: ReviewedMovie }): JSX.Element {
  return (
    <>
      <Link
        className={styles.list_item_image_link}
        to={`/reviews/${movie.slug}/`}
      >
        {movie.backdrop && (
          <Img
            fluid={movie.backdrop.childImageSharp.fluid}
            alt={`A still from ${movie.title} (${movie.year})`}
          />
        )}
      </Link>
      <div className={styles.list_item_title}>
        <Link to={`/reviews/${movie.slug}/`}>
          {movie.title}{" "}
          <span className={styles.list_item_title_year}>{movie.year}</span>
        </Link>
      </div>
      <Grade grade={movie.lastReviewGrade} className={styles.list_item_grade} />
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
      <ul className={styles.list}>
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
