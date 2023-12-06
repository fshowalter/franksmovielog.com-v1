import { graphql } from "gatsby";
import { HeadBuilder, Underseen } from "../../components";

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
export default function UnderseenPage({
  data,
}: {
  data: Queries.UnderseenPageQuery;
}): JSX.Element {
  return (
    <Underseen
      initialSort="release-date-desc"
      items={data.underseen.nodes}
      distinctReleaseYears={data.underseen.releaseYears}
      distinctGenres={data.underseen.genres}
    />
  );
}

export const pageQuery = graphql`
  query UnderseenPage {
    underseen: allUnderseenGemsJson(sort: { yearAndImdbId: DESC }) {
      nodes {
        ...UnderseenItem
      }
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
