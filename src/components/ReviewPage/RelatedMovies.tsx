import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Grade from "../Grade";
import {
  listCss,
  listItemCss,
  listItemGradeCss,
  listItemImageLinkCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./RelatedMovies.module.scss";

interface Movie {
  slug: string;
  backdrop: null | {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  title: string;
  year: number;
  lastReviewGrade: string;
  imdbId: string;
}

function RelatedMovie({ movie }: { movie: Movie }): JSX.Element {
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
  className,
}: {
  movies: Movie[];
  children: React.ReactNode;
  className: string;
}): JSX.Element | null {
  if (!movies || movies.length < 4) {
    return null;
  }

  return (
    <nav className={className}>
      {children}
      <ul className={listCss}>
        {movies.map((movie) => {
          return (
            <li key={movie.imdbId} className={listItemCss}>
              <RelatedMovie movie={movie} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
