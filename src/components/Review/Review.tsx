import { graphql } from "gatsby";
import { stickyHeaderScrollMarginTopStyle } from "../../styles/utils.css";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { Still } from "../Still";
import { Content } from "./Content";
import { Credits } from "./Credits";
import { Header } from "./Header";
import { RelatedMovies } from "./RelatedMovies";
import { stillMarginStyle } from "./Review.css";
import { StructuredData } from "./StructuredData";
import { ViewingHistory } from "./ViewingHistory";

export function Review({
  review,
}: {
  review: Queries.ReviewFragment;
}): JSX.Element {
  return (
    <Layout>
      <Box
        as="main"
        id="top"
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={stickyHeaderScrollMarginTopStyle}
      >
        <Header
          review={review}
          paddingX="pageMargin"
          textAlign="center"
          paddingY={{ default: 24, desktop: 32 }}
        />
        <Still
          image={review.still}
          title={review.title}
          year={review.year}
          className={stillMarginStyle}
        />
        <Spacer axis="vertical" size={{ default: 24, tablet: 32 }} />
        <Content review={review} paddingX="pageMargin" alignItems="center" />
        <Spacer axis="vertical" size={80} />
        <ViewingHistory review={review} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={128} />
        <Credits review={review} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={128} />
        <RelatedMovies
          review={review}
          maxWidth={{ default: "popout", tablet: "full" }}
          width="full"
        />
        <Spacer axis="vertical" size={{ default: 128, tablet: 0 }} />
      </Box>
      <StructuredData review={review} />
    </Layout>
  );
}

export const query = graphql`
  fragment Review on ReviewedTitlesJson {
    title
    year
    review {
      excerpt
    }
    seoImage: still {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
    still {
      ...StillSplash
    }
    ...ReviewContent
    ...ReviewHeader
    ...ViewingHistory
    ...Credits
    ...RelatedMovies
    ...StructuredData
  }
`;
