import { graphql } from "gatsby";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import {
  DecadeDistribution,
  MediaDistribution,
  MostWatchedMovies,
} from "../Stats";
import { MostWatchedDirectors } from "../Stats/MostWatchedDirectors";
import { MostWatchedPerformers } from "../Stats/MostWatchedPerformers";
import { MostWatchedWriters } from "../Stats/MostWatchedWriters";
import { StatsNavigation } from "../Stats/StatsNavigation";
import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";

export function AllTimeStats({
  stats,
  statYears,
}: {
  stats: Queries.AllTimeStatsFragment;
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
              All-Time Stats
            </PageTitle>
            <Box as="p" color="subtle">
              {`${(statYears.length - 1).toString()} Years in Review`}
            </Box>
            <Spacer axis="vertical" size={24} />
            <StatsNavigation
              currentYear={"all"}
              linkFunc={(year: string) => {
                return `/viewings/stats/${year}/`;
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
          <DecadeDistribution distributions={stats.decadeDistribution} />
          <MediaDistribution distributions={stats.mediaDistribution} />
          <GradeDistribution distributions={stats.gradeDistribution} />
          <MostWatchedDirectors directors={stats.mostWatchedDirectors} />
          <MostWatchedPerformers performers={stats.mostWatchedPerformers} />
          <MostWatchedWriters writers={stats.mostWatchedWriters} />
        </Box>
      </Box>
    </Layout>
  );
}

export const query = graphql`
  fragment AllTimeStats on AllTimeStatsJson {
    ...AllTimeStatsCallouts
    decadeDistribution {
      ...DecadeDistribution
    }
    gradeDistribution {
      ...GradeDistribution
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
