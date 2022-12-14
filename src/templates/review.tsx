import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { Credits } from "../components/Credits";
import { HeadBuilder } from "../components/HeadBuilder";
import { Layout } from "../components/Layout";
import { ReviewContent } from "../components/ReviewContent";
import { ReviewHeader } from "../components/ReviewHeader";
import { RelatedMovies } from "../components/ReviewPage/RelatedMovies";
import { StructuredData } from "../components/ReviewPage/StructuredData";
import { Spacer } from "../components/Spacer";
import { Still } from "../components/Still";
import { ViewingHistory } from "../components/ViewingHistory";
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
      >
        <ReviewHeader
          movie={movie}
          paddingX="gutter"
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
        <ReviewContent review={movie} paddingX="gutter" alignItems="center" />
        <Spacer axis="vertical" size={80} />
        <ViewingHistory movie={movie} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={128} />
        <Credits movie={movie} maxWidth="proseWithGutters" />
        <Spacer axis="vertical" size={128} />
        <RelatedMovies relatedMovies={movie} />
        <Spacer axis="vertical" size={128} />
      </Box>
      <StructuredData data={movie} />
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
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 960
            placeholder: BLURRED
          )
        }
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
