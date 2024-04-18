import { graphql } from "gatsby";
import { stickyHeaderScrollMarginTopStyle } from "../../styles/utils.css";
import { toSentence } from "../../utils";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Spacer } from "../Spacer";
import { Chips } from "./Chips";
import {
  backToTopArrowStyle,
  backToTopContainerStyle,
  creditStyle,
  posterFloatStyle,
  posterStyle,
  titleStyle,
} from "./Credits.css";

interface ICreditsProps extends IBoxProps {
  review: Queries.CreditsFragment;
}

export function Credits({ review, ...rest }: ICreditsProps): JSX.Element {
  return (
    <Box
      as="aside"
      id="credits"
      position="relative"
      {...rest}
      paddingX="gutter"
      paddingTop={{ default: 32, tablet: 48 }}
      paddingBottom={32}
      backgroundColor="subtle"
      className={stickyHeaderScrollMarginTopStyle}
    >
      <Box className={posterFloatStyle}>
        <GraphqlImage
          image={review.poster}
          alt={`A poster from ${review.title} (${review.year})`}
          borderRadius={8}
          transform="safariBorderRadiusFix"
          className={posterStyle}
        />
      </Box>
      <Box
        as="header"
        fontSize="large"
        paddingBottom={24}
        className={titleStyle}
      >
        {review.title}
      </Box>
      <Box as="dl" flexDirection="column" rowGap={24}>
        <Credit title="Year" value={review.year} />
        {review.originalTitle != review.title && (
          <Credit title="Original Title" value={review.originalTitle} />
        )}
        <Credit title="Financing" value={toSentence(review.countries)} />
        <Credit title="Running Time" value={`${review.runtimeMinutes} min`} />
        <Credit title="Directed by" value={toSentence(review.directorNames)} />
        <Credit
          title="Starring"
          value={toSentence(review.principalCastNames)}
        />
      </Box>
      <Spacer axis="vertical" size={32} />
      <Chips chips={review.more} />
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

export const query = graphql`
  fragment Credits on ReviewedTitlesJson {
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
    more {
      ...ReviewChips
    }
  }
`;
