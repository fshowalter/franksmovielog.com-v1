import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid";
import { PageTitle } from "../PageTitle";
import { gridAreas, gridStyle } from "./Title.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

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
      <span>
        <span>|</span>{" "}
        <Box as="a" href="#credits" color="accent" textDecoration="none">
          More...
        </Box>
      </span>
    </Box>
  );
}

export default function Title({ movie, ...rest }: IHeaderProps) {
  return (
    <Box as="header" {...rest}>
      <Grid>
        <GridArea name="title" textAlign="center">
          <PageTitle>{movie.title}</PageTitle>
        </GridArea>
        <GridArea name="originalTitle" textAlign="center">
          <OriginalTitle originalTitle={movie.originalTitle} />
        </GridArea>
        <GridArea name="details" textAlign="center">
          <Details movie={movie} />
        </GridArea>
      </Grid>
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
