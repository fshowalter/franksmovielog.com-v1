import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import {
  gridStyle,
  posterStyle,
  showTitleOnMobileOnlyStyle,
  slugTypographyStyle,
  titleTypographyStyle,
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
        <Spacer axis="vertical" size={8} />
        <div>{venue}</div>
      </>
    );
  }

  return null;
}

interface IImageProps extends IBoxProps {
  slug: string | null | undefined;
  image: IGraphqlImage;
  title: string;
  year: number;
}

function Image({ slug, image, title, year, ...rest }: IImageProps) {
  if (slug) {
    return (
      <Link
        className={posterStyle}
        overflow="hidden"
        to={`/reviews/${slug}/`}
        transform="safariBorderRadiusFix"
        {...rest}
      >
        <GraphqlImage image={image} alt={`A poster from ${title} (${year})`} />
      </Link>
    );
  }

  return (
    <GraphqlImage
      image={image}
      alt="An unreviewed title."
      className={posterStyle}
      overflow="hidden"
      transform="safariBorderRadiusFix"
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
    <Box as="span" fontSize="xSmall" color="subtle" fontWeight="light">
      {year}
    </Box>
  );

  if (slug)
    return (
      <Link
        to={`/reviews/${slug}/`}
        className={titleTypographyStyle}
        display="block"
      >
        {title}&#8239;&#8239;{yearBox}
      </Link>
    );

  return (
    <Box className={titleTypographyStyle}>
      {title}&#8239;&#8239;{yearBox}
    </Box>
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
      paddingX={{ default: "gutter", tablet: 0 }}
      paddingY={{ default: 16, tablet: 0 }}
      alignItems={{ default: "center", tablet: "flex-start" }}
      display="flex"
    >
      <Image
        slug={slug}
        image={image}
        title={title}
        year={year}
        flexShrink={0}
      />
      <Box flexGrow={1} width={{ tablet: "full" }}>
        <Box className={!showTitle ? showTitleOnMobileOnlyStyle : undefined}>
          <Spacer axis="vertical" size={{ default: 0, tablet: 4 }} />
          <Title title={title} year={year} slug={slug} />
          <Spacer axis="vertical" size={{ default: 4, tablet: 8 }} />
        </Box>
        <Box
          color="subtle"
          display="flex"
          flexDirection="column"
          className={slugTypographyStyle}
          fontWeight="light"
          letterSpacing={0.5}
        >
          {grade && (
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Grade grade={grade} height={16} />
              <Spacer axis="vertical" size={8} />
            </Box>
          )}
          <Box>
            {date && <Box>{date}</Box>}
            <Spacer axis="vertical" size={8} />
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
