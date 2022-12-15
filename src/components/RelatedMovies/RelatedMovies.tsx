import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { RelatedMovie } from "../RelatedMovie";
import { ReviewSubHeading } from "../ReviewSubHeading";
import {
  avatarStyle,
  movieListStyle,
  seeAllLinkGridStyle,
} from "./RelatedMovies.css";

function SectionHeading({
  leadText,
  boldText,
  linkTarget,
  avatar,
}: {
  leadText: string;
  boldText: string;
  linkTarget: string;
  avatar?: IGraphqlImage;
}) {
  return (
    <ReviewSubHeading
      paddingX="popoutGutter"
      textAlign="center"
      boxShadow={{ default: "borderBottom", tablet: "unset" }}
      display="flex"
      justifyContent="center"
      paddingY={8}
    >
      {avatar && (
        <GraphqlImage
          image={avatar}
          alt={`More ${boldText} reviews`}
          className={avatarStyle}
        />
      )}
      <span>
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
      </span>
    </ReviewSubHeading>
  );
}
function MovieList({
  movies,
  slug,
}: {
  movies: readonly Queries.RelatedMovieFragment[];
  slug: string;
}): JSX.Element | null {
  if (movies.length < 4) {
    return null;
  }

  return (
    <Box
      as="ul"
      className={movieListStyle}
      boxShadow={{ default: "unset", tablet: "borderAll" }}
      borderRadius={8}
    >
      {movies.map((movie) => {
        return <RelatedMovie as="li" key={movie.imdbId} movie={movie} />;
      })}
      <Box
        as="li"
        display="block"
        textAlign="center"
        className={seeAllLinkGridStyle}
        paddingY={{ default: 16, tablet: 24, desktop: 32 }}
        boxShadow={{ default: "borderBottom", tablet: "unset" }}
      >
        <Link
          textDecoration="none"
          color="accent"
          to={slug}
          fontSize="relatedMovieTitle"
        >
          See all &#8594;
        </Link>
      </Box>
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
            <Box as="nav" key={director.slug}>
              <SectionHeading
                avatar={director.avatar}
                leadText="More directed by"
                boldText={director.name}
                linkTarget={`/watchlist/directors/${director.slug}/`}
              />
              <MovieList
                movies={director.browseMore}
                slug={`/watchlist/directors/${director.slug}/`}
              />
            </Box>
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
            <Box as="nav" key={writer.slug}>
              <SectionHeading
                leadText="More written by"
                boldText={writer.name}
                linkTarget={`/watchlist/writers/${writer.slug}/`}
              />
              <MovieList
                movies={writer.browseMore}
                slug={`/watchlist/writers/${writer.slug}/`}
              />
            </Box>
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
            <Box as="nav" key={performer.slug}>
              <SectionHeading
                avatar={performer.avatar}
                leadText="More with"
                boldText={performer.name}
                linkTarget={`/watchlist/performers/${performer.slug}/`}
              />
              <MovieList
                movies={performer.browseMore}
                slug={`/watchlist/performers/${performer.slug}/`}
              />
            </Box>
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
            <Box as="nav" key={collection.name}>
              <SectionHeading
                avatar={collection.avatar}
                leadText="More"
                boldText={collection.name}
                linkTarget={`/watchlist/collections/${collection.slug}/`}
              />
              <MovieList
                movies={collection.browseMore}
                slug={`/watchlist/collections/${collection.slug}/`}
              />
            </Box>
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
    <Box as="nav">
      <SectionHeading
        leadText="More"
        boldText="Reviews"
        linkTarget={`/reviews/`}
      />
      <MovieList movies={reviews} slug="/reviews/" />
    </Box>
  );
}

interface IRelatedMoviesProps extends IBoxProps {
  relatedMovies: Queries.RelatedMoviesFragment;
}

export function RelatedMovies({ relatedMovies, ...rest }: IRelatedMoviesProps) {
  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      rowGap={48}
      alignItems="center"
    >
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
        avatar {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              formats: [JPG, AVIF]
              quality: 80
              width: 40
              height: 40
              placeholder: TRACED_SVG
            )
          }
        }
        browseMore(sourceReviewId: $id) {
          ...RelatedMovie
        }
      }
      directors {
        name
        slug
        avatar {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              formats: [JPG, AVIF]
              quality: 80
              width: 40
              height: 40
              placeholder: TRACED_SVG
            )
          }
        }
        browseMore(sourceReviewId: $id) {
          ...RelatedMovie
        }
      }
      writers {
        name
        slug
        avatar {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              formats: [JPG, AVIF]
              quality: 80
              width: 40
              height: 40
              placeholder: TRACED_SVG
            )
          }
        }
        browseMore(sourceReviewId: $id) {
          ...RelatedMovie
        }
      }

      collections {
        name
        slug
        avatar {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              formats: [JPG, AVIF]
              quality: 80
              width: 40
              height: 40
              placeholder: TRACED_SVG
            )
          }
        }
        browseMore(sourceReviewId: $id) {
          ...RelatedMovie
        }
      }
    }
  }
`;
