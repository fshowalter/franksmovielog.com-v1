import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";

interface IHeaderProps extends IBoxProps {
  movie: Queries.ReviewTitleFragment;
}

function OriginalTitle({ originalTitle }: { originalTitle: string | null }) {
  if (!originalTitle) {
    return null;
  }

  return <Box color="muted">({originalTitle})</Box>;
}

function Details({ movie }: { movie: Queries.ReviewTitleFragment }) {
  return (
    <Box color="muted">
      {movie.year} <span>|</span>{" "}
      {movie.countries.reduce<JSX.Element | null>((acc, country) => {
        if (acc === null) {
          return <>{country}</>;
        }

        return (
          <>
            {acc}
            <span>&ndash;</span>
            {country}
          </>
        );
      }, null)}{" "}
      <span>|</span> {movie.runtimeMinutes}
      &#x02009;min{" "}
      <Box as="span">
        <span>|</span>{" "}
        <Box as="a" href="#credits" color="accent" textDecoration="none">
          More...
        </Box>
      </Box>
    </Box>
  );
}

export function Title({ movie, ...rest }: IHeaderProps) {
  return (
    <Box
      as="header"
      {...rest}
      display="flex"
      flexDirection="column"
      rowGap={16}
    >
      <Box textAlign="inherit">
        <Box as="h1" fontSize="pageTitle">
          {movie.title}
        </Box>
        <OriginalTitle originalTitle={movie.originalTitle} />
      </Box>
      <Details movie={movie} />
    </Box>
  );
}

export const query = graphql`
  fragment ReviewTitle on ReviewedMoviesJson {
    title
    year
    originalTitle
    countries
    runtimeMinutes
  }
`;
