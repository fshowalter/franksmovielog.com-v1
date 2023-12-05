import { graphql } from "gatsby";
import { HeadBuilder, YearStats } from "../components";

export function Head({
  pageContext,
}: {
  pageContext: IPageContext;
}): JSX.Element {
  return (
    <HeadBuilder
      pageTitle={`${pageContext.year} Stats`}
      description={`My most-watched performers, directors, writers and other stats for ${pageContext.year}.`}
      article={false}
      image={null}
    />
  );
}

/**
 * Renders the all-time review stats template.
 */
export default function StatsForYearTemplate({
  pageContext,
  data,
}: {
  pageContext: IPageContext;
  data: Queries.StatsForYearTemplateQuery;
}): JSX.Element {
  return (
    <YearStats
      year={pageContext.year}
      stats={data.yearStats}
      statYears={data.stat.years}
    />
  );
}

interface IPageContext {
  year: string;
}

export const pageQuery = graphql`
  query StatsForYearTemplate($year: String!) {
    yearStats(year: $year) {
      ...YearStats
    }

    stat: allYearStatsJson {
      years: distinct(field: { year: SELECT })
    }
  }
`;
