import { graphql } from "gatsby";
import { Box } from "../../components/Box";
import { HeadBuilder } from "../../components/HeadBuilder";
import { Link } from "../../components/Link";
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
      <Link to="/reviews/">Reviews</Link>
      <Spacer axis="vertical" size={16} />
      <Box as="h1" fontSize="pageTitle">
        Underseen Gems
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box color="subtle">
        <Box as="q" fontWeight="semiBold">
          My God, it&apos;s full of stars!
        </Box>
        <Spacer axis="vertical" size={16} />
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
