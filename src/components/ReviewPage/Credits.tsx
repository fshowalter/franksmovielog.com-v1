import { graphql } from "gatsby";
import toSentenceArray from "../../utils/to-sentence-array";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { gridAreaComponent, gridComponent } from "../Grid";
import {
  backToTopArrowStyle,
  backToTopContainerStyle,
  backToTopInnerStyle,
  gridAreas,
  gridStyle,
  posterStyle,
} from "./Credits.css";
import { WatchlistLinks } from "./WatchlistLinks";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

interface ICreditProps extends IBoxProps {
  title: string;
  value: string | number | string[];
}

function Credit({ title, value, ...rest }: ICreditProps) {
  return (
    <Box {...rest}>
      <Box as="dt" fontWeight="bold" color="subtle">
        {title}
      </Box>
      <Box as="dd" color="subtle">
        {value}
      </Box>
    </Box>
  );
}

interface ICreditsProps extends IBoxProps {
  movie: Queries.CreditsFragment;
}

export function Credits({ movie, ...rest }: ICreditsProps): JSX.Element {
  return (
    <Grid
      as="aside"
      id="credits"
      position="relative"
      {...rest}
      paddingX="gutter"
      paddingY={32}
      backgroundColor="subtle"
    >
      <GridArea name="poster">
        <GraphqlImage
          image={movie.poster}
          alt={`A poster from ${movie.title} (${movie.year})`}
          className={posterStyle}
        />
      </GridArea>
      <GridArea name="meta">
        <Box as="header" fontSize={25} lineHeight={32} paddingBottom={24}>
          {movie.title}
        </Box>
        <Box as="dl" display="flex" flexDirection="column" rowGap={24}>
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
        </Box>
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
          width: 248
          placeholder: TRACED_SVG
        )
      }
    }
    watchlist {
      ...WatchlistLinks
    }
  }
`;
