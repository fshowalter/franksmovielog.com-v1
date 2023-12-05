import { Box } from "../Box";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { ByReleaseYearStats } from "./DecadeDistributionStats";
import { GradeDistributionStats } from "./GradeDistributionStats";
import { TopMedia } from "./MediaDistributionStats";
import { MostWatchedDirectors } from "./MostWatchedDirectors";
import { MostWatchedMovies } from "./MostWatchedMovies";
import { MostWatchedPerformers } from "./MostWatchedPerformers";
import { MostWatchedWriters } from "./MostWatchedWriters";
import { StatsCallouts } from "./StatsCallouts";
import { StatsNavigation } from "./StatsNavigation";

export function Stats({
  title,
  tagline,
  year,
  viewingCallouts,
  reviewCallouts,
  mostWatchedPerformers,
  mostWatchedDirectors,
  mostWatchedWriters,
  viewingsCountsByDecade,
  mostWatchedMovies,
  mostWatchedMedia,
  gradeDistributions,
  allYears,
}: {
  year: string;
  viewingCallouts: Queries.ViewingCalloutsFragment;
  reviewCallouts?: Queries.ReviewCalloutsFragment;
  mostWatchedPerformers: Queries.MostWatchedPerformersFragment;
  mostWatchedDirectors: Queries.MostWatchedDirectorsFragment;
  mostWatchedWriters: Queries.MostWatchedWritersFragment;
  viewingsCountsByDecade: Queries.ByDecadeFragment;
  mostWatchedMovies: Queries.MostWatchedMoviesFragment;
  mostWatchedMedia: Queries.TopMediaFragment;
  gradeDistributions?: readonly Queries.GradeDistributionFragment[];
  allYears: readonly string[];
  title: string;
  tagline: string;
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
              {title}
            </PageTitle>
            <Box as="p" color="subtle">
              {tagline}
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
              years={allYears}
            />
          </Box>
          <Box>
            <Spacer axis="vertical" size={32} />
            <StatsCallouts
              viewingCallouts={viewingCallouts}
              reviewCallouts={reviewCallouts ?? null}
            />
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
          <MostWatchedMovies movies={mostWatchedMovies} />
          <ByReleaseYearStats decades={viewingsCountsByDecade} />
          <TopMedia topMedia={mostWatchedMedia} />
          {gradeDistributions && (
            <GradeDistributionStats distributions={gradeDistributions} />
          )}
          <MostWatchedDirectors directors={mostWatchedDirectors} />
          <MostWatchedPerformers performers={mostWatchedPerformers} />
          <MostWatchedWriters writers={mostWatchedWriters} />
        </Box>
      </Box>
    </Layout>
  );
}
