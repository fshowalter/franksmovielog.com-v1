import { graphql } from "gatsby";
import { HeadBuilder, Review } from "../components";

export function Head({
  data,
}: {
  data: Queries.ReviewTemplateQuery;
}): JSX.Element {
  const review = data.review;

  return (
    <HeadBuilder
      pageTitle={`${review.title} (${review.year})`}
      description={`${review.gradeStars} ${review.review.excerpt ?? ""}`}
      image={review.seoImage?.childImageSharp?.resize?.src}
      article
    />
  );
}

export default function ReviewTemplate({
  data,
}: {
  data: Queries.ReviewTemplateQuery;
}): JSX.Element {
  return <Review review={data.review} />;
}

export const pageQuery = graphql`
  query ReviewTemplate($id: String!) {
    review: reviewedMovie(id: $id) {
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
