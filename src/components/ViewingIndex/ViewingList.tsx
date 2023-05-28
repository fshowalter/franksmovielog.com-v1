import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import {
  dateFontStyle,
  dayFontStyle,
  listItemStyle,
  posterStyle,
  slugTypographyStyle,
  stickyCalendarStyle,
  titleTypographyStyle,
} from "./ViewingList.css";

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

export function ViewingListItem({
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

export function ViewingList({
  groupedItems,
}: {
  groupedItems: Map<string, Map<string, Queries.ViewingIndexItemFragment[]>>;
}): JSX.Element {
  return (
    <Box as="ol" data-testid="poster-list">
      {[...groupedItems].map(([monthAndYear, days], index) => {
        return (
          <Box
            // groupText={monthAndYear}
            key={monthAndYear}
            zIndex={index + 100}
          >
            <Box as="ol" paddingX={0}>
              {[...days].map(([dayDate, items]) => {
                const [day, date] = dayDate.split("-");
                return (
                  <Box
                    as="li"
                    key={dayDate}
                    paddingLeft={{ default: "gutter", desktop: 16 }}
                    paddingTop={16}
                    display="flex"
                    flexDirection="row"
                    columnGap={{ default: 16, tablet: 24 }}
                    backgroundColor="zebra"
                  >
                    <Box alignSelf="flex-start" className={stickyCalendarStyle}>
                      <Box boxShadow="borderAll" borderRadius={4}>
                        <Box
                          backgroundColor="canvas"
                          textAlign="center"
                          width={{ default: 40 }}
                          paddingY={{ default: 4 }}
                          textTransform="uppercase"
                          className={dayFontStyle}
                        >
                          {day}
                        </Box>
                        <Box textAlign="center" className={dateFontStyle}>
                          {date}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      as="ul"
                      display="flex"
                      flexDirection="column"
                      rowGap={16}
                      flexGrow={1}
                    >
                      {items.map((item) => {
                        return (
                          <ViewingListItem
                            key={item.sequence}
                            title={item.title}
                            year={item.year}
                            venue={item.venue}
                            medium={item.medium}
                            slug={item.slug}
                            image={item.poster}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
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
