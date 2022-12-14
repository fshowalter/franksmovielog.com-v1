import { graphql } from "gatsby";
import { Box, HeadBuilder, Link, Spacer } from "../../components";
import { PosterListWithFilters } from "../../components/PosterListWithFilters";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="Overrated Disappointments"
      description="One and two star movies with an above-average IMDb rating and vote count."
      image={null}
      article={false}
    />
  );
}

/**
 * Renders the underseen gems page.
 */
export default function OverratedDisappointmentsPage({
  data,
}: {
  data: Queries.OverratedDisappointmentsPageQuery;
}): JSX.Element {
  return (
    <PosterListWithFilters
      initialSort="release-date-desc"
      items={data.disappointment.nodes}
      distinctReleaseYears={data.disappointment.releaseYears}
      distinctGenres={data.disappointment.genres}
    >
      <Link color="accent" textDecoration="none" to="/reviews/">
        Reviews
      </Link>
      <Spacer axis="vertical" size={16} />
      <Box as="h1" fontSize="pageTitle">
        Underseen Gems
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box color="subtle">
        <Box as="q" fontWeight="semiBold">
          Sorry don&apos;t get it done, Dude.
        </Box>
        <p>
          One and two star movies with an above-average IMDb rating and vote
          count.
        </p>
      </Box>
    </PosterListWithFilters>
  );
}

export const pageQuery = graphql`
  query OverratedDisappointmentsPage {
    disappointment: allOverratedDisappointmentsJson(
      sort: { releaseDate: DESC }
    ) {
      nodes {
        imdbId
        genres
        releaseDate
        title
        year
        sortTitle
        slug
        grade
        gradeValue
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
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
