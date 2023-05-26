import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { HeadBuilder } from "../components/HeadBuilder";
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { ReviewIndex } from "../components/ReviewIndex";
import { Spacer } from "../components/Spacer";

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

/**
 * Renders the reviews page.
 */
export default function ReviewsIndexPage({
  data,
}: {
  data: Queries.ReviewsIndexPageQuery;
}): JSX.Element {
  return (
    <ReviewIndex
      items={data.review.nodes}
      distinctGenres={data.review.genres}
      distinctReleaseYears={data.review.releaseYears}
      distinctReviewYears={data.review.reviewYears}
    >
      <PageTitle textAlign="center">Reviews</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve published{" "}
          <Box as="span" color="emphasis">
            {data.review.nodes.length.toLocaleString()}
          </Box>{" "}
          reviews.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Looking for something new?
          </Box>
          <br /> Peruse my list of{" "}
          <Link to="/reviews/underseen/">underseen gems</Link>.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Feeling contrarian?
          </Box>
          <br />
          Behold my list of{" "}
          <Link to="/reviews/overrated/">overrated disappointments</Link>.
        </p>
      </Box>
    </ReviewIndex>
  );
}

export const pageQuery = graphql`
  query ReviewsIndexPage {
    review: allReviewedMoviesJson(sort: { sortTitle: ASC }) {
      nodes {
        ...ReviewIndexItem
      }
      reviewYears: distinct(field: { reviewYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
