import { graphql } from "gatsby";
import { stickyHeaderScrollMarginTopStyle } from "../../styles/utils.css";
import { toSentenceArray } from "../../utils/toSentenceArray";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Spacer } from "../Spacer";
import {
  backToTopArrowStyle,
  backToTopContainerStyle,
  creditStyle,
  posterFloatStyle,
  posterStyle,
} from "./Credits.css";
import { ReviewWatchlistLinks } from "./ReviewWatchlistLinks";

interface ICreditProps extends IBoxProps {
  title: string;
  value: string | number | string[];
}

function Credit({ title, value, ...rest }: ICreditProps) {
  return (
    <Box {...rest} className={creditStyle}>
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
    <Box
      as="aside"
      id="credits"
      position="relative"
      {...rest}
      paddingX="popoutGutter"
      paddingTop={48}
      paddingBottom={32}
      backgroundColor="subtle"
      className={stickyHeaderScrollMarginTopStyle}
    >
      <Box className={posterFloatStyle}>
        <GraphqlImage
          image={movie.poster}
          alt={`A poster from ${movie.title} (${movie.year})`}
          borderRadius={8}
          transform="safariBorderRadiusFix"
          className={posterStyle}
        />
      </Box>
      <Box as="header" fontSize="creditsTitle" paddingBottom={24}>
        {movie.title}
      </Box>
      <Box as="dl" flexDirection="column" rowGap={24}>
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
      <Spacer axis="vertical" size={32} />
      <ReviewWatchlistLinks watchlist={movie.watchlist} />
      <Spacer axis="vertical" size={32} />
      <Box
        as="a"
        href="#top"
        className={backToTopContainerStyle}
        borderRadius={8}
        boxShadow="borderAll"
        display="flex"
        maxWidth="half"
        paddingY={8}
        alignItems="center"
        justifyContent="center"
        paddingX={8}
      >
        Back to Top
        <svg viewBox="0 0 24 24" className={backToTopArrowStyle}>
          <path d="M7.997 10l3.515-3.79a.672.672 0 0 1 .89-.076l.086.075L16 10 13 10.001V18h-2v-7.999L7.997 10z"></path>
        </svg>
      </Box>
    </Box>
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
          placeholder: BLURRED
        )
      }
    }
    watchlist {
      ...WatchlistLinks
    }
  }
`;
