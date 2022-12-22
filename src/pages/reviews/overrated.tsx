import { graphql } from "gatsby";
import { Box } from "../../components/Box";
import { HeadBuilder } from "../../components/HeadBuilder";
import { Link } from "../../components/Link";
import { PageTitle } from "../../components/PageTitle";
import { PosterListWithFilters } from "../../components/PosterListWithFilters";
import { Spacer } from "../../components/Spacer";

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
      <Box display="flex" flexDirection="column" alignItems="center">
        <Link to="/reviews/">Reviews</Link>
        <PageTitle textAlign="center">
          Overrated Disappointments
          <Spacer axis="vertical" size={8} />
        </PageTitle>
        <Box color="subtle">
          <Box as="q" display="block" textAlign="center" color="subtle">
            My God, it&apos;s full of stars!
          </Box>
          <Spacer axis="vertical" size={32} />
        </Box>
        <Box color="subtle">
          <p>
            One and two star movies with an above-average IMDb rating and vote
            count.
          </p>
        </Box>
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
