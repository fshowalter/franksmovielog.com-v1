import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { RelatedMovie } from "./RelatedMovie";
import { gridAreas, gridStyle, movieListStyle } from "./RelatedMovies.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

function SectionHeading({
  leadText,
  boldText,
  linkTarget,
}: {
  leadText: string;
  boldText: string;
  linkTarget: string;
}) {
  return (
    <Box as="header" display="block" paddingY={8}>
      <Box
        as="h3"
        fontWeight="normal"
        fontSize="relatedMoviesHeader"
        color="muted"
      >
        {leadText}{" "}
        <Link
          to={linkTarget}
          color="accent"
          textDecoration="none"
          display="inline-flex"
          columnGap=".5ch"
        >
          {boldText}
        </Link>
      </Box>
      {/* <Link to={linkTarget} color="accent" fontSize={18} textDecoration="none">
        See All &raquo;
      </Link> */}
    </Box>
  );
}
function MovieList({
  movies,
}: {
  movies: readonly Queries.RelatedMovieFragment[];
}): JSX.Element | null {
  if (movies.length < 4) {
    return null;
  }

  return (
    <Box as="ul" className={movieListStyle}>
      {movies.map((movie) => {
        return <RelatedMovie as="li" key={movie.imdbId} movie={movie} />;
      })}
    </Box>
  );
}

function Directors({
  directors,
}: {
  directors: Queries.RelatedMoviesFragment["watchlist"]["directors"];
}) {
  return (
    <>
      {directors
        .filter((director) => director.browseMore.length === 4)
        .map((director) => {
          return (
            <Grid as="nav" key={director.slug}>
              <GridArea name="heading" boxShadow="borderBottom">
                <SectionHeading
                  leadText="More directed by"
                  boldText={director.name}
                  linkTarget={`/watchlist/directors/${director.slug}/`}
                />
              </GridArea>
              <GridArea name="list">
                <MovieList movies={director.browseMore} />
              </GridArea>
            </Grid>
          );
        })}
    </>
  );
}

function Writers({
  writers,
}: {
  writers: Queries.RelatedMoviesFragment["watchlist"]["writers"];
}) {
  return (
    <>
      {writers
        .filter((writer) => writer.browseMore.length === 4)
        .map((writer) => {
          return (
            <Grid as="nav" key={writer.slug}>
              <SectionHeading
                leadText="More written by"
                boldText={writer.name}
                linkTarget={`/watchlist/writers/${writer.slug}/`}
              />
              <GridArea name="list">
                <MovieList movies={writer.browseMore} />
              </GridArea>
            </Grid>
          );
        })}
    </>
  );
}

function Performers({
  performers,
}: {
  performers: Queries.RelatedMoviesFragment["watchlist"]["performers"];
}) {
  return (
    <>
      {performers
        .filter((performer) => performer.browseMore.length === 4)
        .map((performer) => {
          return (
            <Grid as="nav" key={performer.slug}>
              <GridArea name="heading" boxShadow="borderBottom">
                <SectionHeading
                  leadText="More with"
                  boldText={performer.name}
                  linkTarget={`/watchlist/performers/${performer.slug}/`}
                />
              </GridArea>
              <GridArea name="list">
                <MovieList movies={performer.browseMore} />
              </GridArea>
            </Grid>
          );
        })}
    </>
  );
}

function Collections({
  collections,
}: {
  collections: Queries.RelatedMoviesFragment["watchlist"]["collections"];
}) {
  return (
    <>
      {collections
        .filter((collection) => collection.browseMore.length === 4)
        .map((collection) => {
          return (
            <Grid as="nav" key={collection.name}>
              <GridArea name="heading" boxShadow="borderBottom">
                <SectionHeading
                  leadText="More"
                  boldText={collection.name}
                  linkTarget={`/watchlist/collections/${collection.slug}/`}
                />
              </GridArea>
              <GridArea name="list">
                <MovieList movies={collection.browseMore} />
              </GridArea>
            </Grid>
          );
        })}
    </>
  );
}

function Reviews({
  reviews,
}: {
  reviews: Queries.RelatedMoviesFragment["browseMore"];
}) {
  return (
    <Grid as="nav">
      <GridArea name="heading" boxShadow="borderBottom">
        <SectionHeading
          leadText="More"
          boldText="Reviews"
          linkTarget={`/reviews/`}
        />
      </GridArea>
      <GridArea name="list">
        <MovieList movies={reviews} />
      </GridArea>
    </Grid>
  );
}

interface IRelatedMoviesProps extends IBoxProps {
  relatedMovies: Queries.RelatedMoviesFragment;
}

export function RelatedMovies({ relatedMovies, ...rest }: IRelatedMoviesProps) {
  return (
    <Box {...rest} display="flex" flexDirection="column" rowGap={48}>
      <Collections collections={relatedMovies.watchlist.collections} />
      <Performers performers={relatedMovies.watchlist.performers} />
      <Directors directors={relatedMovies.watchlist.directors} />
      <Writers writers={relatedMovies.watchlist.writers} />
      <Reviews reviews={relatedMovies.browseMore} />
    </Box>
  );
}

export const query = graphql`
  fragment RelatedMovies on ReviewedMoviesJson {
    browseMore {
      ...RelatedMovie
    }
    watchlist {
      performers {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovie
        }
      }
      directors {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovie
        }
      }
      writers {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovie
        }
      }

      collections {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovie
        }
      }
    }
  }
`;
