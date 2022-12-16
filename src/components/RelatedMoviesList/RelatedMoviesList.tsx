import { Box } from "../Box";
import { Link } from "../Link";
import { RelatedMovie } from "../RelatedMovie/RelatedMovie";
import { movieListStyle, seeAllLinkGridStyle } from "./RelatedMoviesList.css";

export function RelatedMoviesList({
  movies,
  seeAllLinkText,
  seeAllLinkTarget,
}: {
  movies: readonly Queries.RelatedMovieFragment[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
}): JSX.Element | null {
  if (movies.length < 4) {
    return null;
  }

  return (
    <Box as="ul" className={movieListStyle}>
      {movies.map((movie) => {
        return <RelatedMovie as="li" key={movie.imdbId} movie={movie} />;
      })}
      <Box
        as="li"
        display="block"
        textAlign="right"
        paddingX="popoutGutter"
        className={seeAllLinkGridStyle}
        paddingY={{ default: 8, tablet: 16 }}
        boxShadow={{ default: "borderBottom", tablet: "unset" }}
      >
        <Link
          textDecoration="none"
          color="accent"
          to={seeAllLinkTarget}
          fontSize="small"
          letterSpacing={1}
        >
          All {seeAllLinkText} &#8594;
        </Link>
      </Box>
    </Box>
  );
}
