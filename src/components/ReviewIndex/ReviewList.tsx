import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { Spacer } from "../Spacer";
import { Sort } from "./ReviewIndex.reducer";
import { posterStyle, stickyHeaderStyle } from "./ReviewList.css";

function groupForItem(
  item: Queries.ReviewIndexItemFragment,
  sortValue: Sort
): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return item.year.toString();
    }
    case "review-date-asc":
    case "review-date-desc": {
      return `${item.reviewMonth} ${item.reviewYear}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return item.grade;
    }
    case "title-asc":
    case "title-desc": {
      const letter = item.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return item.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

function groupItems({
  items,
  sortValue,
}: {
  items: Queries.ReviewIndexItemFragment[];
  sortValue: Sort;
}): Map<string, Queries.ReviewIndexItemFragment[]> {
  const groupedItems = new Map<string, Queries.ReviewIndexItemFragment[]>();

  items.map((item) => {
    const group = groupForItem(item, sortValue);
    let groupValue = groupedItems.get(group);

    if (!groupValue) {
      groupValue = [];
      groupedItems.set(group, groupValue);
    }
    groupValue.push(item);
  });

  return groupedItems;
}

interface IImageProps extends IBoxProps {
  slug: string;
  image: IGraphqlImage;
  title: string;
  year: number;
}

function Image({ slug, image, title, year, ...rest }: IImageProps) {
  return (
    <Link
      className={posterStyle}
      overflow="hidden"
      to={`/reviews/${slug}/`}
      transform="safariBorderRadiusFix"
      boxShadow="borderAll"
      borderRadius={8}
      maxWidth={64}
      minWidth={64}
      {...rest}
    >
      <GraphqlImage image={image} alt={`A poster from ${title} (${year})`} />
    </Link>
  );
}

function Title({
  title,
  year,
  slug,
}: {
  title: string;
  year: number;
  slug: string;
}) {
  const yearBox = (
    <Box as="span" fontSize="xSmall" color="subtle" fontWeight="light">
      {year}
    </Box>
  );

  return (
    <Link to={`/reviews/${slug}/`} fontSize="default" display="block">
      {title}&#8239;&#8239;{yearBox}
    </Link>
  );
}

function ReviewListItem({
  slug,
  image,
  title,
  year,
  grade,
}: {
  slug: string;
  image: IGraphqlImage;
  title: string;
  year: number;
  grade: string;
}): JSX.Element {
  return (
    <Box
      as="li"
      flexDirection="row"
      columnGap={{ default: 16, tablet: 24 }}
      backgroundColor="zebra"
      paddingX={{ default: "gutter", tablet: 0 }}
      paddingY={8}
      alignItems="flex-start"
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
        <Box>
          <Title title={title} year={year} slug={slug} />
          <Spacer axis="vertical" size={4} />
          <Grade grade={grade} height={18} />
          <Spacer axis="vertical" size={4} />
        </Box>
      </Box>
    </Box>
  );
}

interface ReviewListProps extends IBoxProps {
  items: Queries.ReviewIndexItemFragment[];
  sortValue: Sort;
}

export function ReviewList({
  items,
  sortValue,
  ...rest
}: ReviewListProps): JSX.Element {
  const groupedItems = groupItems({
    items: items,
    sortValue: sortValue,
  });

  return (
    <Box as="ol" {...rest}>
      {[...groupedItems].map(([group, items], index) => {
        return (
          <Box as="li" key={group} display="block">
            <Box
              fontSize="medium"
              style={{ zIndex: index + 100 }}
              paddingTop={{ default: 0, desktop: 16 }}
              backgroundColor="default"
              className={stickyHeaderStyle}
            >
              <Box
                backgroundColor="canvas"
                paddingY={8}
                paddingX={{ default: "gutter", desktop: 24 }}
              >
                {group}
              </Box>
            </Box>
            <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
            <Box
              as="ol"
              paddingX={{
                default: 0,
                tablet: "gutter",
                desktop: 0,
              }}
            >
              {items.map((item) => {
                return (
                  <ReviewListItem
                    key={item.imdbId}
                    title={item.title}
                    year={item.year}
                    grade={item.grade}
                    slug={item.slug}
                    image={item.poster}
                  />
                );
              })}
            </Box>
            <Spacer axis="vertical" size={{ default: 0, tablet: 16 }} />
          </Box>
        );
      })}
    </Box>
  );
}

export const query = graphql`
  fragment ReviewListItemPoster on File {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
        formats: [JPG, AVIF]
        quality: 80
        width: 64
        placeholder: NONE
      )
    }
  }
`;
