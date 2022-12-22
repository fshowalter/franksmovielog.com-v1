import { graphql } from "gatsby";
import { Box } from "../Box";
import { Poster, PosterList } from "../PosterList";
import { Spacer } from "../Spacer";
import { StatHeading } from "../StatHeading/StatHeading";

function ListItemDetails({
  movie,
}: {
  movie: Queries.MostWatchedMovieFragment;
}): JSX.Element {
  return (
    <Box
      fontSize="default"
      color="subtle"
      display="flex"
      justifyContent={{ default: "flex-start", tablet: "center" }}
    >
      <div>{movie.viewingCount.toLocaleString()} times</div>
    </Box>
  );
}

export function MostWatchedMovies({
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
      <Box>
        <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
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
                showTitle={!movie.reviewedMovie?.slug}
              />
            );
          })}
        </PosterList>
        <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
      </Box>
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
      ...PosterListPoster
    }
    viewingCount
  }

  fragment MostWatchedMovies on MostWatchedMoviesJson {
    mostWatched {
      ...MostWatchedMovie
    }
  }
`;
