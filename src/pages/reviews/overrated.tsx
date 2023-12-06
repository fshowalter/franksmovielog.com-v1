import { graphql } from "gatsby";
import { HeadBuilder, Overrated } from "../../components";

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
    <Overrated
      initialSort="release-date-desc"
      items={data.disappointment.nodes}
      distinctReleaseYears={data.disappointment.releaseYears}
      distinctGenres={data.disappointment.genres}
    />
  );
}

export const pageQuery = graphql`
  query OverratedDisappointmentsPage {
    disappointment: allOverratedDisappointmentsJson(
      sort: { yearAndImdbId: DESC }
    ) {
      nodes {
        ...OverratedItem
      }
      releaseYears: distinct(field: { year: SELECT })
      genres: distinct(field: { genres: SELECT })
    }
  }
`;
