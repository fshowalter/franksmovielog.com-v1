import { graphql } from "gatsby";
import { HeadBuilder, Stats } from "../components";

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
  return (
    <Stats
      title="All-Time Stats"
      tagline={`${(data.viewing.years.length - 1).toString()} Years in Review`}
      year="all"
      viewingCallouts={data.allTimeStats.viewingStats}
      reviewCallouts={data.allTimeStats.reviewStats}
      gradeDistributions={data.allTimeStats.gradeDistributions}
      viewingsCountsByDecade={data.allTimeStats.decadeStats}
      mostWatchedMovies={data.allTimeStats.movies}
      mostWatchedDirectors={data.allTimeStats.directors}
      mostWatchedPerformers={data.allTimeStats.performers}
      mostWatchedWriters={data.allTimeStats.writers}
      mostWatchedMedia={data.allTimeStats.mostWatchedMedia}
      allYears={data.viewing.years}
    />
  );
}

export const pageQuery = graphql`
  query AllTimeStatsJson {
    allTimeStats {
      ...AllTimeViewingCallouts
      ...ReviewCallouts
      decadeDistribution {
        ...DecadeDistribution
      }
      gradeDistribution {
        ...GradeDistribution
      }
      medidDistribution {
        ...MediaDistribution
      }
      mostWatchedTitles {
        ...MostWatchedMovie
      }
      mostWatchedDirectors {
        ...MostWatchedPerson
      }
      mostWatchedWriters {
        ...MostWatchedPerson
      }
      mostWatchedPerformers {
        ...MostWatchedPerson
      }
    }

    viewing: allYearStatsJson {
      years: distinct(field: { year: SELECT })
    }
  }
`;
