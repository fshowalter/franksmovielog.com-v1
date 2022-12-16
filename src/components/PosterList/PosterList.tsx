import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import {
  gradeStyle,
  gridStyle,
  posterBackgroundColorStyle,
} from "./PosterList.css";

function MediumAndVenue({
  medium,
  venue,
}: {
  medium?: string | null;
  venue?: string | null;
}): JSX.Element | null {
  if (medium && venue) {
    return (
      <>
        <div>
          {medium} at {venue}
        </div>
      </>
    );
  }

  if (medium) {
    return (
      <>
        <div>{medium}</div>
      </>
    );
  }

  if (venue) {
    return (
      <>
        <div>{venue}</div>
      </>
    );
  }

  return null;
}

export function Poster({
  slug,
  image,
  title,
  year,
  grade,
  date,
  venue,
  medium,
  details,
  showTitle = true,
}: {
  slug?: string | null;
  image: IGraphqlImage;
  title: string;
  year: number;
  grade?: string | null;
  date?: string;
  venue?: string | null;
  medium?: string | null;
  showTitle?: boolean;
  details?: React.ReactNode;
}): JSX.Element {
  if (slug) {
    return (
      <Box
        as="li"
        display="flex"
        flexDirection={{ default: "row", tablet: "column" }}
        columnGap={24}
        backgroundColor={{ default: "zebra", tablet: "zebraOff" }}
        paddingX={{ default: "popoutGutter", tablet: 0 }}
        paddingY={{ default: 16, tablet: 0 }}
      >
        <Link
          borderRadius={8}
          overflow="hidden"
          maxWidth={{ default: 48, tablet: "poster" }}
          to={`/reviews/${slug}/`}
          transform="safariBorderRadiusFix"
        >
          <GraphqlImage
            image={image}
            alt={`A poster from ${title} (${year})`}
            className={posterBackgroundColorStyle}
          />
        </Link>
        <Box flexGrow={1}>
          {showTitle && (
            <Box fontSize="posterTitle">
              <Spacer axis="vertical" size={{ default: 0, tablet: 8 }} />
              <Link
                color="accent"
                textDecoration="none"
                to={`/reviews/${slug}/`}
              >
                {title}{" "}
                <Box
                  as="span"
                  fontSize="posterYear"
                  color="subtle"
                  fontWeight="light"
                >
                  {year}
                </Box>
              </Link>
            </Box>
          )}
          <Box
            color="subtle"
            display="flex"
            flexDirection="column"
            fontSize="posterSlug"
            fontWeight="light"
            // rowGap={{ default: 0, tablet: 4 }}
            letterSpacing={0.5}
            lineHeight={16}
          >
            {grade && (
              <Box
                height={{ default: 16, tablet: 24 }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Grade
                  grade={grade}
                  height={14}
                  width={60}
                  className={gradeStyle}
                />
              </Box>
            )}
            <Box>
              <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
              {date && <Box>{date}</Box>}
              <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
              <MediumAndVenue medium={medium} venue={venue} />
            </Box>
          </Box>
          {details && details}
        </Box>
      </Box>
    );
  }

  return (
    <Box as="li" display="flex" flexDirection="column">
      <Box
        borderRadius={8}
        overflow="hidden"
        maxWidth="poster"
        transform="safariBorderRadiusFix"
      >
        <GraphqlImage image={image} alt="An unreviewed title." />
      </Box>
      <Spacer axis="vertical" size={8} />
      <Box fontSize="posterTitle">
        {title}{" "}
        <Box as="span" fontSize="xSmall" color="subtle" fontWeight="light">
          {year}
        </Box>
      </Box>
      <Spacer axis="vertical" size={8} />
      <Box
        color="subtle"
        display="flex"
        flexDirection="column"
        fontSize="posterSlug"
        fontWeight="light"
        rowGap={4}
      >
        {date && <div>{date}</div>}
        <MediumAndVenue medium={medium} venue={venue} />
      </Box>
      {details && details}
    </Box>
  );
}

export function PosterList({ children, ...rest }: IBoxProps): JSX.Element {
  return (
    <Box as="ol" className={gridStyle} paddingX={0} {...rest}>
      {children}
    </Box>
  );
}

export const query = graphql`
  fragment PosterListPoster on File {
    childImageSharp {
      gatsbyImageData(
        layout: CONSTRAINED
        formats: [JPG, AVIF]
        quality: 80
        width: 200
        placeholder: NONE
      )
    }
  }
`;
