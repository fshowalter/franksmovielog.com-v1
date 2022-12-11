import { graphql } from "gatsby";
import { Box, IBoxProps } from "../Box";
import { HeadBuilder } from "../HeadBuilder";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
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

interface ISubHeadingProps extends IBoxProps {
  yearScope: string;
  years: string[];
}

function SubHeading({
  yearScope,
  years,
  ...rest
}: ISubHeadingProps): JSX.Element {
  let subTitle = "A Year in Review";

  if (yearScope === "all") {
    subTitle = `${(years.length - 1).toString()} Years in Review`;
  }

  if (yearScope === years[1]) {
    subTitle = "A Year in Progress...";
  }

  return (
    <Box {...rest}>
      {subTitle}
      <Spacer axis="vertical" size={24} />
      <YearNavigation
        currentYear={yearScope}
        linkFunc={(year: string) => {
          if (year === "all") {
            return "/stats/";
          }

          return `/stats/${year}/`;
        }}
        years={years}
      />
    </Box>
  );
}

export function Head({
  pageContext,
}: {
  pageContext: PageContext;
}): JSX.Element {
  const { yearScope } = pageContext;
  let pageTitle = `${yearScope} Stats`;
  let description = `My most-watched performers, directors, writers and other stats for ${yearScope}.`;

  if (yearScope === "all") {
    pageTitle = "All-Time Stats";
    description = `My most-watched performers, directors, writers and other stats.`;
  }

  return (
    <HeadBuilder
      pageTitle={pageTitle}
      description={description}
      article={false}
      image={null}
    />
  );
}

type AllStatsPageQuery = Omit<Queries.StatsPageQuery, "gradeDistribution">;

/**
 * Renders the all-time review stats template.
 */
export default function StatsPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: Queries.StatsPageQuery | AllStatsPageQuery;
}): JSX.Element {
  const {
    viewingCallouts,
    reviewCallouts,
    performers,
    directors,
    writers,
    decades,
    movies,
    topMedia,
    viewing,
  } = data;

  let gradeDistribution;

  if ("gradeDistribution" in data) {
    ({ gradeDistribution } = data);
  }

  const { yearScope } = pageContext;

  const pageTitle =
    yearScope === "all" ? "All-Time Stats" : `${yearScope} Stats`;

  return (
    <Layout>
      <Box as="main" paddingX="gutter">
        <Box as="header">
          <PageTitle textAlign="left" paddingBottom={0}>
            {pageTitle}
          </PageTitle>
          <SubHeading
            yearScope={yearScope}
            years={[...viewing.years].sort().reverse()}
            color="subtle"
          />
        </Box>
        <div>
          <Spacer axis="vertical" size={32} />
          <Callouts
            viewingCallouts={viewingCallouts}
            reviewCallouts={reviewCallouts}
          />
          <Spacer axis="vertical" size={32} />
          <MostWatchedMovies movies={movies} />
          <ByDecade decades={decades} />
          <Spacer axis="vertical" size={32} />
          <TopMedia topMedia={topMedia} />
          <Spacer axis="vertical" size={32} />
          <GradeDistribution distributions={gradeDistribution?.nodes} />
          <Spacer axis="vertical" size={32} />
          <MostWatchedDirectors directors={directors} />
          <Spacer axis="vertical" size={32} />
          <MostWatchedPerformers performers={performers} />
          <Spacer axis="vertical" size={32} />
          <MostWatchedWriters writers={writers} />
          <Spacer axis="vertical" size={64} />
        </div>
      </Box>
    </Layout>
  );
}

export interface PageContext {
  yearScope: string;
}

export const pageQuery = graphql`
  query StatsPage($yearScope: String!, $isYear: Boolean!) {
    viewingCallouts: viewingStatsJson(viewing_year: { eq: $yearScope }) {
      ...ViewingCallouts
    }
    reviewCallouts: reviewStatsJson(review_year: { eq: $yearScope }) {
      ...ReviewCallouts
    }
    decades: viewingCountsForDecadesJson(viewing_year: { eq: $yearScope }) {
      ...ByDecade
    }
    gradeDistribution: allGradeDistributionsJson @skip(if: $isYear) {
      nodes {
        ...GradeDistribution
      }
    }
    topMedia: topMediaJson(viewing_year: { eq: $yearScope }) {
      ...TopMedia
    }
    movies: mostWatchedMoviesJson(viewingYear: { eq: $yearScope }) {
      ...MostWatchedMovies
    }
    directors: mostWatchedDirectorsJson(viewingYear: { eq: $yearScope }) {
      ...MostWatchedDirectors
    }
    performers: mostWatchedPerformersJson(viewingYear: { eq: $yearScope }) {
      ...MostWatchedPerformers
    }
    writers: mostWatchedWritersJson(viewingYear: { eq: $yearScope }) {
      ...MostWatchedWriters
    }
    viewing: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      years: distinct(field: viewing_year)
    }
  }
`;
