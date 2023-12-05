import { graphql } from "gatsby";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { ByReleaseYearStats } from "../Stats/DecadeDistributionStats";
import { TopMedia } from "../Stats/MediaDistributionStats";
import { MostWatchedDirectors } from "../Stats/MostWatchedDirectors";
import { MostWatchedMovies } from "../Stats/MostWatchedMovies";
import { MostWatchedPerformers } from "../Stats/MostWatchedPerformers";
import { MostWatchedWriters } from "../Stats/MostWatchedWriters";
import { StatsNavigation } from "../Stats/StatsNavigation";
import { Callouts } from "./Callouts";

export function YearStats({
  year,
  stats,
  statYears,
}: {
  year: string;
  stats: Queries.YearStatsFragment;
  statYears: readonly string[];
}): JSX.Element {
  return (
    <Layout>
      <Box as="main" display="flex" alignItems="center" flexDirection="column">
        <Box
          as="header"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flexWrap="wrap"
          paddingX="pageMargin"
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <PageTitle paddingTop={{ default: 24, desktop: 32 }}>
              {`${year} Stats`}
            </PageTitle>
            <Box as="p" color="subtle">
              {[...statYears].reverse()[1] === year
                ? "A year in progress..."
                : "A Year in Review"}
            </Box>
            <Spacer axis="vertical" size={24} />
            <StatsNavigation
              currentYear={year}
              linkFunc={(year: string) => {
                if (year === "all") {
                  return "/stats/";
                }

                return `/stats/${year}/`;
              }}
              years={statYears}
            />
          </Box>
          <Box>
            <Spacer axis="vertical" size={32} />
            <Callouts callouts={stats} />
          </Box>
        </Box>
        <Box
          paddingX={{ default: 0, tablet: "gutter", desktop: "pageMargin" }}
          paddingY={32}
          display="flex"
          flexDirection="column"
          rowGap={32}
          alignItems="stretch"
          maxWidth={960}
          width="full"
        >
          <MostWatchedMovies titles={stats.mostWatchedTitles} />
          <ByReleaseYearStats decades={stats.decadeDistribution} />
          <TopMedia topMedia={stats.mediaDistribution} />
          <MostWatchedDirectors directors={stats.mostWatchedDirectors} />
          <MostWatchedPerformers performers={stats.mostWatchedPerformers} />
          <MostWatchedWriters writers={stats.mostWatchedWriters} />
        </Box>
      </Box>
    </Layout>
  );
}

export const query = graphql`
  fragment YearStats on YearStatsJson {
    ...YearStatsCallouts
    decadeDistribution {
      ...DecadeDistribution
    }
    mediaDistribution {
      ...MediaDistribution
    }
    mostWatchedTitles {
      ...MostWatchedTitle
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
`;
