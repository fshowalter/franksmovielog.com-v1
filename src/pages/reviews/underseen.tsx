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
      pageTitle="Underseen Gems"
      description="Four and five star movies with a below average number of votes on the IMDb."
      image={null}
      article={false}
    />
  );
}

/**
 * Renders the underseen gems page.
 */
export default function UnderseenGemsPage({
  data,
}: {
  data: Queries.UnderseenGemsPageQuery;
}): JSX.Element {
  return (
    <PosterListWithFilters
      items={data.underseen.nodes}
      distinctReleaseYears={data.underseen.releaseYears}
      distinctGenres={data.underseen.genres}
      initialSort="release-date-desc"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Link to="/reviews/">Reviews</Link>
        <PageTitle>
          Underseen Gems
          <Spacer axis="vertical" size={8} />
        </PageTitle>
        <Box color="subtle">
          <Box as="q" display="block" textAlign="center" color="subtle">
            My God, it&apos;s full of stars!
          </Box>
          <Spacer axis="vertical" size={32} />
        </Box>
      </Box>
      <Box color="subtle">
        <p>
          Four and five star movies with a below average number of IMDb votes.
        </p>
      </Box>
    </PosterListWithFilters>
  );
}

export const pageQuery = graphql`
  query UnderseenGemsPage {
    underseen: allUnderseenGemsJson(sort: { releaseDate: DESC }) {
      nodes {
        releaseDate
        title
        year
        sortTitle
        slug
        grade
        gradeValue
        imdbId
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
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
