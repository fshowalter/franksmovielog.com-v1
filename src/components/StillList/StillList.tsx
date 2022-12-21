import { Box } from "../Box";
import { Link } from "../Link";
import { movieListStyle, seeAllLinkGridStyle } from "./StillList.css";
import { StillListMovie } from "./StillListMovie";

export function StillList({
  movies,
  seeAllLinkText,
  seeAllLinkTarget,
}: {
  movies: readonly Queries.StillListMovieFragment[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
}): JSX.Element | null {
  if (movies.length < 4) {
    return null;
  }

  return (
    <Box as="ul" className={movieListStyle}>
      {movies.map((movie) => {
        return <StillListMovie as="li" key={movie.imdbId} movie={movie} />;
      })}
      <Box
        as="li"
        display="block"
        textAlign="right"
        paddingX="popoutGutter"
        className={seeAllLinkGridStyle}
        paddingY={16}
        boxShadow={{ default: "borderBottom", tablet: "unset" }}
      >
        <Link to={seeAllLinkTarget}>
          All{" "}
          <Box
            as="span"
            display={{ default: "inline", tablet: "none", desktop: "inline" }}
          >
            {seeAllLinkText}
          </Box>{" "}
          &#8594;
        </Link>
      </Box>
    </Box>
  );
}
