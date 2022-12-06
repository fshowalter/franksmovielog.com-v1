import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import Grade from "../Grade";
import { GraphqlImage } from "../GraphqlImage";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import {
  gradeStyle,
  gridAreas,
  gridStyle,
  listItemGridAreas,
  listItemGridStyle,
  movieListStyle,
  stillStyle,
} from "./RelatedMovies.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

const ListItemGridArea = gridAreaComponent(listItemGridAreas);

const ListItemGrid = gridComponent(listItemGridStyle);

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
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      lineHeight={2}
    >
      <Box as="h3" fontWeight="normal" fontSize="normal">
        {leadText}{" "}
        <Link to={linkTarget} color="accent" textDecoration="none">
          {boldText}
        </Link>
      </Box>
      <Link to={linkTarget} color="accent" textDecoration="none">
        See All &raquo;
      </Link>
    </Box>
  );
}

function ListItem({ movie }: { movie: Queries.RelatedMovieDetailsFragment }) {
  return (
    <ListItemGrid as="li" key={movie.imdbId}>
      <ListItemGridArea name="still">
        <Link to={`/reviews/${movie.slug}/`} className={stillStyle}>
          <GraphqlImage
            image={movie.backdrop}
            alt={`A still from ${movie.title} (${movie.year})`}
          />
        </Link>
      </ListItemGridArea>
      <ListItemGridArea name="title">
        <Link
          to={`/reviews/${movie.slug}/`}
          fontSize="medium"
          textDecoration="none"
          color="default"
          lineHeight={24}
          display="block"
        >
          {movie.title}{" "}
          <Box
            as="span"
            fontSize="small"
            fontWeight="light"
            color="muted"
            lineHeight={1}
          >
            {movie.year}
          </Box>
        </Link>
      </ListItemGridArea>
      <ListItemGridArea name="grade">
        <Grade grade={movie.grade} width={96} className={gradeStyle} />
      </ListItemGridArea>
    </ListItemGrid>
  );
}

function MovieList({
  movies,
}: {
  movies: readonly Queries.RelatedMovieDetailsFragment[];
}): JSX.Element | null {
  if (!movies || movies.length < 4) {
    return null;
  }

  return (
    <Box as="ul" className={movieListStyle}>
      {movies.map((movie) => {
        return <ListItem key={movie.imdbId} movie={movie} />;
      })}
    </Box>
  );
}

interface IRelatedMoviesProps extends IBoxProps {
  relatedMovies: Queries.RelatedMoviesFragment;
}

export default function RelatedMovies({
  relatedMovies,
  ...rest
}: IRelatedMoviesProps) {
  console.log(relatedMovies);
  return (
    <Box {...rest} display="flex" flexDirection="column" rowGap={64}>
      {relatedMovies.watchlist.collections.map((collection) => (
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
      ))}
      {relatedMovies.watchlist.performers.map((performer) => (
        <Box as="nav" key={performer.slug}>
          <SectionHeading
            leadText="More with"
            boldText={performer.name}
            linkTarget={`/watchlist/performers/${performer.slug}/`}
          />
          <MovieList movies={performer.browseMore} />
        </Box>
      ))}
      {relatedMovies.watchlist.directors.map((director) => (
        <Box as="nav" key={director.slug}>
          <SectionHeading
            leadText="More directed by"
            boldText={director.name}
            linkTarget={`/watchlist/directors/${director.slug}/`}
          />
          <MovieList movies={director.browseMore} />
        </Box>
      ))}
      {relatedMovies.watchlist.writers.map((writer) => (
        <Box as="nav" key={writer.slug}>
          <SectionHeading
            leadText="More written by"
            boldText={writer.name}
            linkTarget={`/watchlist/writers/${writer.slug}/`}
          />
          <MovieList movies={writer.browseMore} />
        </Box>
      ))}
      <Grid as="nav">
        <GridArea name="heading" boxShadow="borderBottom">
          <SectionHeading
            leadText="More"
            boldText="Reviews"
            linkTarget={`/reviews/`}
          />
        </GridArea>
        <GridArea name="list">
          <MovieList movies={relatedMovies.browseMore} />
        </GridArea>
      </Grid>
    </Box>
  );
}

export const query = graphql`
  fragment RelatedMovieDetails on ReviewedMoviesJson {
    imdbId
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

  fragment RelatedMovies on ReviewedMoviesJson {
    browseMore {
      ...RelatedMovieDetails
    }
    watchlist {
      performers {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovieDetails
        }
      }
      directors {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovieDetails
        }
      }
      writers {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovieDetails
        }
      }

      collections {
        name
        slug
        browseMore(movieImdbId: $imdbId) {
          ...RelatedMovieDetails
        }
      }
    }
  }
`;
