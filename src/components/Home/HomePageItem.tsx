import { graphql } from "gatsby";
import { toSentenceArray } from "../../utils/toSentenceArray";
import { Box, IBoxProps } from "../Box";
import { DateIcon } from "../DateIcon";
import { Grade } from "../Grade";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { Still } from "../Still";
import {
  dateLetterSpacingStyle,
  excerptContinueReadingLinkStyle,
  gridAreas,
  gridStyle,
  stillBorderStyle,
} from "./HomePageItem.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

interface IItemProps extends IBoxProps {
  item: Queries.HomePageItemFragment;
  counterValue: number;
  eagerLoadImage: boolean;
}

export function HomePageItem({
  item,
  counterValue,
  eagerLoadImage,
}: IItemProps) {
  return (
    <Box as="li" value={counterValue} display="flex" backgroundColor="zebra">
      <Grid as="article" paddingX="pageMargin">
        <GridArea name="still" maxWidth="prose">
          <Link rel="canonical" to={`/reviews/${item.slug}/`}>
            <Still
              title={item.title}
              year={item.year}
              image={item.still}
              loading={eagerLoadImage ? "eager" : "lazy"}
              className={stillBorderStyle}
            />
          </Link>
        </GridArea>
        <GridArea
          name="excerpt"
          display="flex"
          rowGap={24}
          flexDirection="column"
        >
          <Box as="h2" fontWeight="bold" fontSize="large">
            <Link
              to={`/reviews/${item.slug}/`}
              rel="canonical"
              color="default"
              display="inline-block"
            >
              {item.title}{" "}
              <Box
                as="span"
                color="subtle"
                display="inline-block"
                fontSize="default"
                fontWeight="light"
                lineHeight={1}
              >
                {item.year}
              </Box>
            </Link>
          </Box>
          <Grade grade={item.grade} height={32} />
          <Box
            as="p"
            fontSize="default"
            fontWeight="normal"
            color="subtle"
            letterSpacing={0.25}
            lineHeight="default"
          >
            Directed by {toSentenceArray(item.directorNames)}. Starring{" "}
            {toSentenceArray(item.principalCastNames)}.
          </Box>
          <RenderedMarkdown
            text={item.review.excerptHtml}
            className={excerptContinueReadingLinkStyle}
          />
        </GridArea>
        <GridArea name="date">
          <Box
            display="flex"
            fontWeight="light"
            whiteSpace="nowrap"
            color="subtle"
            fontSize="small"
            alignItems="center"
            textTransform="uppercase"
            className={dateLetterSpacingStyle}
          >
            <Box display={{ default: "block", desktop: "none" }}>
              <DateIcon />{" "}
            </Box>
            <Box lineHeight={32}>{item.date}</Box>
          </Box>
        </GridArea>
      </Grid>
    </Box>
  );
}

export const query = graphql`
  fragment HomePageItem on ReviewedTitlesJson {
    imdbId
    sequence
    title
    year
    date: reviewDate(formatString: "DD MMM YYYY")
    slug
    grade
    principalCastNames
    directorNames
    review {
      excerptHtml
    }
    still {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 512
          placeholder: BLURRED
        )
      }
    }
  }
`;
