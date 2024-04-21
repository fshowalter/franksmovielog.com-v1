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
      <Box
        as="header"
        fontSize="large"
        paddingBottom={24}
        className={titleStyle}
        display="flex"
        alignItems="baseline"
        justifyContent="center"
        columnGap={8}
      >
        {review.title}{" "}
        <Box as="span" fontSize="small" color="subtle" fontWeight="light">
          ({review.year})
        </Box>
      </Box>
      <Box className={posterFloatStyle}>
        <GraphqlImage
          image={review.poster}
          alt={`A poster from ${review.title} (${review.year})`}
          borderRadius={8}
          transform="safariBorderRadiusFix"
          className={posterStyle}
        />
      </Box>

      <Box as="dl" flexDirection="column" rowGap={24}>
        {review.originalTitle && (
          <Credit title="Original Title" creditValue={review.originalTitle} />
        )}
        <Credit title="Financing" creditValue={toSentence(review.countries)} />
        <Credit
          title="Running Time"
          creditValue={`${review.runtimeMinutes} min`}
        />
        <Credit
          title="Directed by"
          creditValue={review.directorNames.map((name) => (
            <Box key={name}>{name}</Box>
          ))}
        />
        <Credit
          title="Written by"
          creditValue={review.writerNames.map((name) => (
            <Box key={name}>{name}</Box>
          ))}
        />
        <Credit
          title="Starring"
          creditValue={toSentence(review.principalCastNames)}
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
  creditValue: React.ReactNode;
}

function Credit({ title, creditValue, ...rest }: ICreditProps) {
  return (
    <Box {...rest} className={creditStyle}>
      <Box as="dt" fontWeight="bold" color="subtle">
        {title}
      </Box>
      <Box as="dd" color="subtle">
        {creditValue}
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
    writerNames
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
