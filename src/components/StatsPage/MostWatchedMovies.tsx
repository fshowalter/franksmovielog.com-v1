import { Poster, PosterList } from "../PosterList";
import {
  containerCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./MostWatchedMovies.module.scss";
import StatHeading from "./StatHeading";
import type { Movie } from "./StatsPage";

function ListItemDetails({ movie }: { movie: Movie }): JSX.Element {
  if (movie.reviewSlug) {
    return (
      <div className={listItemSlugCss}>
        <div>{movie.viewingCount.toLocaleString()} times</div>
      </div>
    );
  }

  return (
    <>
      <div className={listItemTitleCss}>
        {movie.title} <span className={listItemTitleYearCss}>{movie.year}</span>
      </div>
      <div className={listItemSlugCss}>
        <div>{movie.viewingCount.toLocaleString()} times</div>
      </div>
    </>
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
    <>
      <StatHeading>Most Watched Movies</StatHeading>
      <div className={containerCss}>
        <PosterList>
          {movies.map((movie) => {
            return (
              <Poster
                key={movie.imdbId}
                slug={movie.reviewSlug}
                image={movie.poster}
                title={movie.title}
                year={movie.year}
                details={<ListItemDetails movie={movie} />}
              />
            );
          })}
        </PosterList>
      </div>
    </>
  );
}
