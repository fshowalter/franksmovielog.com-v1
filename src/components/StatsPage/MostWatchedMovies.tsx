import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import {
  headerCss,
  listCss,
  listItemImageLinkCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./MostWatchedMovies.module.scss";
import type { Movie } from "./StatsPage";

function ListItem({ movie }: { movie: Movie }): JSX.Element {
  if (movie.slug) {
    return (
      <li>
        <Link className={listItemImageLinkCss} to={`/reviews/${movie.slug}/`}>
          {movie.poster && (
            <GatsbyImage
              image={movie.poster.childImageSharp.gatsbyImageData}
              alt={`A poster from ${movie.title} (${movie.year})`}
            />
          )}
        </Link>
        <div className={listItemSlugCss}>
          <div>{movie.viewingCount.toLocaleString()} times</div>
        </div>
      </li>
    );
  }

  return (
    <li>
      <GatsbyImage
        image={movie.poster.childImageSharp.gatsbyImageData}
        alt="An unreviewed title."
      />
      <div className={listItemTitleCss}>
        {movie.title} <span className={listItemTitleYearCss}>{movie.year}</span>
      </div>
      <div className={listItemSlugCss}>
        <div>{movie.viewingCount.toLocaleString()} times</div>
      </div>
    </li>
  );
}

export default function MostWatchedMovies({
  movies,
}: {
  movies: Movie[];
}): JSX.Element | null {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className={headerCss}>Most Watched Movies</h3>
      <ol className={listCss}>
        {movies.map((movie) => {
          return <ListItem movie={movie} key={movie.imdbId} />;
        })}
      </ol>
    </div>
  );
}
