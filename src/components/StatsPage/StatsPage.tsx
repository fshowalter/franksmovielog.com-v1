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
      <Box as="main">
        <Box
          as="header"
          display="flex"
          flexDirection={{ default: "column", desktop: "row" }}
          justifyContent="space-between"
          flexWrap="wrap"
          paddingX="gutter"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems={{ default: "center", desktop: "flex-start" }}
          >
            <Box
              as="h1"
              paddingTop={{ default: 24, desktop: 32 }}
              fontSize="pageTitle"
            >
              {title}
            </Box>
            <Box as="p" color="subtle">
              {tagline}
            </Box>
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
          <Box>
            <Spacer axis="vertical" size={32} />
            <Callouts
              viewingCallouts={viewingCallouts}
              reviewCallouts={reviewCallouts ?? null}
            />
          </Box>
        </Box>
        <Box
          paddingX={{ default: 0, tablet: "popoutGutter", desktop: "gutter" }}
        >
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
        </Box>
      </Box>
    </Layout>
  );
}
