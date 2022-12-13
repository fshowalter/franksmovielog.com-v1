import { graphql } from "gatsby";
import { HeadBuilder, StatsPage } from "../components";

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
    <StatsPage
      title={`${pageContext.year} Stats`}
      tagline={
        [...data.viewing.years].reverse()[1] === pageContext.year
          ? "A year in progress..."
          : "A Year in Review"
      }
      year={pageContext.year}
      viewingCallouts={data.statsForYear.viewingStats}
      viewingsCountsByDecade={data.statsForYear.decadeStats}
      mostWatchedMovies={data.statsForYear.movies}
      mostWatchedDirectors={data.statsForYear.directors}
      mostWatchedPerformers={data.statsForYear.performers}
      mostWatchedWriters={data.statsForYear.writers}
      mostWatchedMedia={data.statsForYear.mostWatchedMedia}
      allYears={data.viewing.years}
    />
  );
}

interface IPageContext {
  year: string;
}

export const pageQuery = graphql`
  query StatsForYearTemplate($year: String!) {
    statsForYear(year: $year) {
      viewingStats {
        ...ViewingCallouts
      }
      decadeStats {
        ...ByDecade
      }
      mostWatchedMedia {
        ...TopMedia
      }
      movies {
        ...MostWatchedMovies
      }
      directors {
        ...MostWatchedDirectors
      }
      performers {
        ...MostWatchedPerformers
      }
      writers {
        ...MostWatchedWriters
      }
    }

    viewing: allViewingStatsJson {
      years: distinct(field: { viewing_year: SELECT })
    }
  }
`;
