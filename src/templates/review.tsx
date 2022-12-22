import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { Credits } from "../components/Credits";
import { HeadBuilder } from "../components/HeadBuilder";
import { Layout } from "../components/Layout";
import { RelatedMovies } from "../components/RelatedMovies";
import { ReviewContent } from "../components/ReviewContent";
import { ReviewHeader } from "../components/ReviewHeader";
import { ReviewStructuredData } from "../components/ReviewStructuredData/";
import { Spacer } from "../components/Spacer";
import { Still } from "../components/Still";
import { ViewingHistory } from "../components/ViewingHistory";
import { stickyHeaderScrollMarginTopStyle } from "../styles/utils.css";
import { stillMarginStyle } from "./review.css";

export function Head({
  data,
}: {
  data: Queries.ReviewTemplateQuery;
}): JSX.Element {
  const movie = data.movie;

  return (
    <HeadBuilder
      pageTitle={`${movie.title} (${movie.year})`}
      description={`${movie.gradeStars} ${movie.review.excerpt ?? ""}`}
      image={movie.seoImage?.childImageSharp?.resize?.src}
      article
    />
  );
}

export default function ReviewTemplate({
  data,
}: {
  data: Queries.ReviewTemplateQuery;
}): JSX.Element {
  const movie = data.movie;

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
        <ReviewHeader
          movie={movie}
          paddingX="pageMargin"
          textAlign="center"
          paddingY={{ default: 24, desktop: 32 }}
        />
        <Still
          image={movie.still}
          title={movie.title}
          year={movie.year}
          className={stillMarginStyle}
        />
        <Spacer axis="vertical" size={{ default: 24, tablet: 32 }} />
        <ReviewContent
          review={movie}
          paddingX="pageMargin"
          alignItems="center"
        />
        <Spacer axis="vertical" size={80} />
        <ViewingHistory movie={movie} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={128} />
        <Credits movie={movie} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={128} />
        <RelatedMovies
          relatedMovies={movie}
          maxWidth={{ default: "popout", tablet: "full" }}
          width="full"
        />
        <Spacer axis="vertical" size={{ default: 128, tablet: 0 }} />
      </Box>
      <ReviewStructuredData data={movie} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ReviewTemplate($id: String!) {
    movie: reviewedMovie(id: $id) {
      title
      year
      gradeStars
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
  }
`;
