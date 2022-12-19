import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import {
  defaultGridStyle,
  gradeStyle,
  gridStyle,
  showTitleOnMobileOnlyStyle,
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

function Image({
  slug,
  image,
  title,
  year,
}: {
  slug: string | null | undefined;
  image: IGraphqlImage;
  title: string;
  year: number;
}) {
  if (slug) {
    return (
      <Link
        borderRadius={{ default: 0, tablet: 8 }}
        overflow="hidden"
        maxWidth={{ default: 48, tablet: "poster" }}
        to={`/reviews/${slug}/`}
        transform="safariBorderRadiusFix"
      >
        <GraphqlImage image={image} alt={`A poster from ${title} (${year})`} />
      </Link>
    );
  }

  return (
    <GraphqlImage
      image={image}
      alt="An unreviewed title."
      maxWidth={{ default: 48, tablet: "poster" }}
      borderRadius={{ default: 0, tablet: 8 }}
      overflow="hidden"
    />
  );
}

function Title({
  title,
  year,
  slug,
}: {
  title: string;
  year: number;
  slug: string | null | undefined;
}) {
  const yearBox = (
    <Box as="span" fontSize="posterYear" color="subtle" fontWeight="light">
      {year}
    </Box>
  );

  if (slug)
    return (
      <Link color="accent" textDecoration="none" to={`/reviews/${slug}/`}>
        {title}&nbsp;{yearBox}
      </Link>
    );

  return (
    <>
      {title}&nbsp;{yearBox}
    </>
  );
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
  return (
    <Box
      as="li"
      flexDirection={{ default: "row", tablet: "column" }}
      columnGap={24}
      backgroundColor={{ default: "zebra", tablet: "zebraOff" }}
      paddingX={{ default: "popoutGutter", tablet: 0 }}
      paddingY={{ default: 16, tablet: 0 }}
      alignItems={{ default: "center" }}
      className={defaultGridStyle}
    >
      <Image slug={slug} image={image} title={title} year={year} />
      <Box flexGrow={1}>
        <Box
          fontSize="posterTitle"
          className={!showTitle ? showTitleOnMobileOnlyStyle : undefined}
        >
          <Spacer axis="vertical" size={{ default: 0, tablet: 4 }} />
          <Title title={title} year={year} slug={slug} />
          <Spacer axis="vertical" size={{ default: 0, tablet: 4 }} />
        </Box>
        <Box
          color="subtle"
          display="flex"
          flexDirection="column"
          fontSize="posterSlug"
          fontWeight="light"
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
            <Spacer axis="vertical" size={4} />
            {date && <Box>{date}</Box>}
            <Spacer axis="vertical" size={4} />
            <MediumAndVenue medium={medium} venue={venue} />
          </Box>
        </Box>
        {details && details}
      </Box>
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
