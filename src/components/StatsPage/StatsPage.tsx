import { Box } from "../Box";
import { Layout } from "../Layout";
import { Spacer } from "../Spacer";
import { ByDecade } from "./ByDecade";
import { Callouts } from "./Callouts";
import { GradeDistribution } from "./GradeDistribution";
import { MostWatchedDirectors } from "./MostWatchedDirectors";
import { MostWatchedMovies } from "./MostWatchedMovies";
import { MostWatchedPerformers } from "./MostWatchedPerformers";
import { MostWatchedWriters } from "./MostWatchedWriters";
import { TopMedia } from "./TopMedia";
import { YearNavigation } from "./YearNavigation";

interface IStatsLayoutProps {
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
}

/**
 * Renders the all-time review stats template.
 */
export function StatsPage({
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
}: IStatsLayoutProps): JSX.Element {
  return (
    <Layout>
      <Box as="main" paddingX="gutter">
        <Box as="header">
          <Box
            as="h1"
            paddingTop={{ default: 24, desktop: 32 }}
            fontSize="pageTitle"
          >
            {title}
          </Box>
          {tagline}
          <Spacer axis="vertical" size={24} />
          <YearNavigation
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
        <div>
          <Spacer axis="vertical" size={32} />
          <Callouts
            viewingCallouts={viewingCallouts}
            reviewCallouts={reviewCallouts ?? null}
          />
          <Spacer axis="vertical" size={32} />
          <MostWatchedMovies movies={mostWatchedMovies} />
          <ByDecade decades={viewingsCountsByDecade} />
          <Spacer axis="vertical" size={32} />
          <TopMedia topMedia={mostWatchedMedia} />
          <Spacer axis="vertical" size={32} />
          {gradeDistributions && (
            <GradeDistribution distributions={gradeDistributions} />
          )}
          <Spacer axis="vertical" size={32} />
          <MostWatchedDirectors directors={mostWatchedDirectors} />
          <Spacer axis="vertical" size={32} />
          <MostWatchedPerformers performers={mostWatchedPerformers} />
          <Spacer axis="vertical" size={32} />
          <MostWatchedWriters writers={mostWatchedWriters} />
          <Spacer axis="vertical" size={64} />
        </div>
      </Box>
    </Layout>
  );
}
