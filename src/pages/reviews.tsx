import { graphql } from "gatsby";
import { Box, HeadBuilder, Link, Spacer } from "../components";
import { PosterListWithFiltersView } from "../components/PosterListWithFiltersView";

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
    <PosterListWithFiltersView
      items={data.viewing.nodes}
      distinctGenres={data.viewing.genres}
      distinctGrades={data.viewing.grades}
      distinctMedia={data.viewing.media}
      distinctReleaseYears={data.viewing.releaseYears}
      distinctViewingYears={data.viewing.viewingYears}
      initialSort="viewing-date-desc"
    >
      <Box as="h1" fontSize="pageTitle">
        Reviews
      </Box>
      <Spacer axis="vertical" size={24} />
      <Box color="subtle">
        <Box as="q" fontWeight="semiBold">
          We have such sights to show you.
        </Box>
        <Spacer axis="vertical" size={16} />
        <p>
          I&apos;ve watched{" "}
          <Box as="span" color="emphasis">
            {data.viewing.nodes.length.toLocaleString()}
          </Box>{" "}
          movies since 2012 and published{" "}
          <Box as="span" color="emphasis">
            {data.reviews?.totalCount.toLocaleString()}
          </Box>{" "}
          reviews since 2020.
        </p>
        <Spacer axis="vertical" size={16} />
        <p>
          <Box as="span" fontWeight="semiBold">
            Looking for something new?
          </Box>
          <br /> Peruse my list of{" "}
          <Link color="accent" textDecoration="none" to="/reviews/underseen/">
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
          <Link color="accent" textDecoration="none" to="/reviews/overrated/">
            overrated disappointments
          </Link>
          .
        </p>
      </Box>
    </PosterListWithFiltersView>
  );
}

export const pageQuery = graphql`
  query ReviewsIndexPage {
    reviews: reviewStatsJson(review_year: { eq: "all" }) {
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
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [JPG, AVIF]
              quality: 80
              width: 200
              placeholder: BLURRED
            )
          }
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
