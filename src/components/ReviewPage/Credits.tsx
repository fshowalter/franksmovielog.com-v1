import { graphql } from "gatsby";
import toSentenceArray from "../../utils/to-sentence-array";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Spacer } from "../Spacer";
import {
  backToTopArrowStyle,
  backToTopContainerStyle,
  backToTopInnerStyle,
  gridAreas,
  gridStyle,
  posterStyle,
} from "./Credits.css";
import WatchlistLinks from "./WatchlistLinks";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

function Credit({
  title,
  value,
}: {
  title: string;
  value: string | number | string[];
}) {
  return (
    <>
      <Box as="dt" fontWeight="bold">
        {title}
      </Box>
      <Box as="dd">
        {value}
        <Spacer axis="vertical" size={24} />
      </Box>
    </>
  );
}

interface ICreditsProps extends IBoxProps {
  movie: Queries.CreditsFragment;
}

export default function Credits({
  movie,
  ...rest
}: ICreditsProps): JSX.Element {
  return (
    <Grid
      as="aside"
      id="credits"
      backgroundColor="subtle"
      position="relative"
      {...rest}
    >
      <GridArea name="poster">
        <GraphqlImage
          image={movie.poster}
          alt={`A poster from ${movie.title} (${movie.year})`}
          className={posterStyle}
        />
      </GridArea>
      <GridArea name="meta">
        <Box as="header" fontSize="large">
          {movie.title}
        </Box>
        <dl>
          <Credit title="Year" value={movie.year} />
          {movie.originalTitle && (
            <Credit title="Original Title" value={movie.originalTitle} />
          )}
          <Credit title="Financing" value={toSentenceArray(movie.countries)} />
          <Credit title="Running Time" value={`${movie.runtimeMinutes} min`} />
          <Credit
            title="Directed by"
            value={toSentenceArray(movie.directorNames)}
          />
          <Credit
            title="Starring"
            value={toSentenceArray(movie.principalCastNames)}
          />
        </dl>
      </GridArea>
      <GridArea name="watchlistLinks">
        <WatchlistLinks watchlist={movie.watchlist} />
      </GridArea>
      <GridArea name="backToTop">
        <a href="#top" className={backToTopContainerStyle}>
          <div className={backToTopInnerStyle}>
            <svg viewBox="0 0 24 24" className={backToTopArrowStyle}>
              <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
            </svg>
          </div>
        </a>
      </GridArea>
    </Grid>
  );
}

export const query = graphql`
  fragment Credits on ReviewedMoviesJson {
    title
    year
    originalTitle
    countries
    runtimeMinutes
    directorNames
    principalCastNames
    poster {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 224
          placeholder: TRACED_SVG
        )
      }
    }
    watchlist {
      ...WatchlistLinks
    }
  }
`;
