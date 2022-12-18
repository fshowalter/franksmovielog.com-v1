import { graphql } from "gatsby";
import { Box } from "../components/Box";
import { HeadBuilder } from "../components/HeadBuilder";
import { Link } from "../components/Link";
import { PosterListWithFilters } from "../components/PosterListWithFilters";
import { Spacer } from "../components/Spacer";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Reviews"
      description="A sortable and filterable list of every movie I've watched and reviewed since 2012."
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
    <PosterListWithFilters
      items={data.viewing.nodes}
      distinctGenres={data.viewing.genres}
      distinctGrades={data.viewing.grades}
      distinctMedia={data.viewing.media}
      distinctReleaseYears={data.viewing.releaseYears}
      distinctViewingYears={data.viewing.viewingYears}
      initialSort="viewing-date-desc"
    >
      <Box as="h1" fontSize="pageTitle" textAlign="center">
        Reviews
      </Box>
      <Box as="q" display="block" textAlign="center" color="subtle">
        We have such sights to show you.
      </Box>
      <Spacer axis="vertical" size={16} />

      <Box color="subtle">
        <Spacer axis="vertical" size={16} />
        <p>
          Since 2012, I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {data.viewing.nodes.length.toLocaleString()}
          </Box>{" "}
          movies and published{" "}
          <Box as="span" color="emphasis">
            {data.reviews?.totalCount.toLocaleString()}
          </Box>{" "}
          reviews.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Looking for something new?
          </Box>
          <br /> Peruse my list of{" "}
          <Link textDecoration="none" color="accent" to="/reviews/underseen/">
            underseen gems
          </Link>
          .
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Feeling contrarian?
          </Box>
          <br />
          Behold my list of{" "}
          <Link textDecoration="none" color="accent" to="/reviews/overrated/">
            overrated disappointments
          </Link>
          .
        </p>
      </Box>
    </PosterListWithFilters>
  );
}

export const pageQuery = graphql`
  query ReviewsIndexPage {
    reviews: reviewStatsJson(reviewYear: { eq: "all" }) {
      totalCount: reviewsCreated
    }
    viewing: allViewingsJson(sort: { sequence: DESC }) {
      nodes {
        sequence
        viewingYear
        viewingDate(formatString: "ddd MMM D, YYYY")
        releaseDate
        title
        medium
        venue
        year
        sortTitle
        slug
        grade
        gradeValue
        genres
        poster {
          ...PosterListPoster
        }
      }
      media: distinct(field: { medium: SELECT })
      viewingYears: distinct(field: { viewingYear: SELECT })
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
      grades: distinct(field: { genres: SELECT })
    }
  }
`;
