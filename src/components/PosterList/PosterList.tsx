import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import { gridStyle } from "./PosterList.css";

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
      <Box as="li" display="flex" flexDirection="column">
        <Link
          borderRadius={8}
          overflow="hidden"
          maxWidth="poster"
          to={`/reviews/${slug}/`}
          transform="safariBorderRadiusFix"
        >
          <GraphqlImage
            image={image}
            alt={`A poster from ${title} (${year})`}
          />
        </Link>
        {showTitle && (
          <Box fontSize="posterTitle">
            <Spacer axis="vertical" size={8} />
            <Link color="accent" textDecoration="none" to={`/reviews/${slug}/`}>
              {title}{" "}
              <Box
                as="span"
                fontSize="xSmall"
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
          rowGap={4}
        >
          <Spacer axis="vertical" size={4} />
          {grade && (
            <Grade grade={grade} height={12} width={60} flexBasis={16} />
          )}
          {date && <div>{date}</div>}
          <MediumAndVenue medium={medium} venue={venue} />
        </Box>
        {details && details}
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
    <Box as="ol" className={gridStyle} padding={0} {...rest}>
      {children}
    </Box>
  );
}
