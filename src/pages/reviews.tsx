import { graphql } from "gatsby";
import { HeadBuilder, Reviews } from "../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Reviews"
      description="A sortable and filterable list of every movie I've reviewed since 2012."
      image={null}
      article={false}
    />
  );
}

export default function ReviewsPage({
  data,
}: {
  data: Queries.ReviewsPageQuery;
}): JSX.Element {
  return (
    <Reviews
      items={data.review.nodes}
      distinctGenres={data.review.genres}
      distinctReleaseYears={data.review.releaseYears}
      distinctReviewYears={data.review.reviewYears}
    />
  );
}

export const pageQuery = graphql`
  query ReviewsPage {
    review: allReviewedTitlesJson(sort: { sortTitle: ASC }) {
      nodes {
        ...ReviewsItem
      }
      reviewYears: distinct(field: { reviewYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
