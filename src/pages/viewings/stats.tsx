import { graphql } from "gatsby";
import { AllTimeStats, HeadBuilder } from "../../components";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="All-Time Stats"
      description="My most-watched performers, directors, writers and other stats."
      article={false}
      image={null}
    />
  );
}

/**
 * Renders the all-time review stats template.
 */
export default function AllTimeStatsPage({
  data,
}: {
  data: Queries.AllTimeStatsPageQuery;
}): JSX.Element {
  return <AllTimeStats stats={data.allTimeStats} statYears={data.stat.years} />;
}

export const pageQuery = graphql`
  query AllTimeStatsPage {
    allTimeStats {
      ...AllTimeStats
    }

    stat: allYearStatsJson {
      years: distinct(field: { year: SELECT })
    }
  }
`;
