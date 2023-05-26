import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import {
  listItemStyle,
  posterStyle,
  slugTypographyStyle,
  titleTypographyStyle,
} from "./CalendarPosterList.css";

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

export function CalendarPoster({
  slug,
  image,
  title,
  year,
  venue,
  medium,
}: {
  slug?: string | null;
  image: IGraphqlImage;
  title: string;
  year: number;
  venue?: string | null;
  medium?: string | null;
}): JSX.Element {
  return (
    <Box
      as="li"
      flexDirection="row"
      columnGap={{ default: 16, tablet: 24 }}
      alignItems="flex-start"
      display="flex"
      paddingRight="gutter"
      boxShadow="borderBottom"
      paddingBottom={16}
      className={listItemStyle}
    >
      <Image
        slug={slug}
        image={image}
        title={title}
        year={year}
        flexShrink={0}
        boxShadow="borderAll"
      />
      <Box flexGrow={1}>
        <Box>
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
          <Spacer axis="vertical" size={{ default: 4, tablet: 0 }} />
          <Box>
            <MediumAndVenue medium={medium} venue={venue} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function CalendarPosterList({
  children,
  ...rest
}: IBoxProps): JSX.Element {
  return (
    <Box as="ol" paddingX={0} {...rest}>
      {children}
    </Box>
  );
}

export const query = graphql`
  fragment CalendarPoster on File {
    childImageSharp {
      gatsbyImageData(
        layout: CONSTRAINED
        formats: [JPG, AVIF]
        quality: 80
        width: 80
        placeholder: NONE
      )
    }
  }
`;
