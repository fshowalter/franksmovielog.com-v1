import { graphql } from "gatsby";
import { Poster, PosterList } from "../PosterList";
import {
  containerCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./MostWatchedMovies.module.scss";
import StatHeading from "./StatHeading";

function ListItemDetails({
  movie,
}: {
  movie: Queries.MostWatchedMovieFragment;
}): JSX.Element {
  if (movie.reviewedMovie?.slug) {
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
  movies: Queries.MostWatchedMoviesFragment | null;
}): JSX.Element | null {
  if (!movies) {
    return null;
  }

  const { mostWatched } = movies;

  if (mostWatched.length === 0) {
    return null;
  }

  return (
    <>
      <StatHeading>Most Watched Movies</StatHeading>
      <div className={containerCss}>
        <PosterList>
          {mostWatched.map((movie) => {
            return (
              <Poster
                key={movie.imdbId}
                slug={movie.reviewedMovie?.slug}
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

export const query = graphql`
  fragment MostWatchedMovie on MostWatchedMovie {
    imdbId
    title
    year
    reviewedMovie {
      slug
    }
    poster {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          placeholder: TRACED_SVG
        )
      }
    }
    viewingCount
  }

  fragment MostWatchedMovies on MostWatchedMoviesJson {
    mostWatched: most_watched {
      ...MostWatchedMovie
    }
  }
`;
