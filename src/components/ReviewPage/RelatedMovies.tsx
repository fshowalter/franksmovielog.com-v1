import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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

function Movie({
  movie,
}: {
  movie: Queries.RelatedMoviesFragment;
}): JSX.Element {
  return (
    <>
      <Link className={listItemImageLinkCss} to={`/reviews/${movie.slug}/`}>
        {movie.backdrop?.childImageSharp && (
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
      <Grade grade={movie.grade} className={listItemGradeCss} />
    </>
  );
}

export default function RelatedMovies({
  movies,
  children,
  className,
}: {
  movies: readonly Queries.RelatedMoviesFragment[];
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
              <Movie movie={movie} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export const query = graphql`
  fragment RelatedMovies on ReviewedMoviesJson {
    imdbId: imdb_id
    title
    grade
    slug
    year
    backdrop {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          placeholder: TRACED_SVG
          width: 248
        )
      }
    }
  }
`;
