import { graphql } from "gatsby";
import HeadBuilder from "../HeadBuilder";
import Layout from "../Layout";
import PageTitle from "../PageTitle";
import ByDecade from "./ByDecade";
import Callouts from "./Callouts";
import GradeDistribution from "./GradeDistribution";
import MostWatchedDirectors from "./MostWatchedDirectors";
import MostWatchedMovies from "./MostWatchedMovies";
import MostWatchedPerformers from "./MostWatchedPerformers";
import MostWatchedWriters from "./MostWatchedWriters";
import {
  containerCss,
  contentCss,
  headerCss,
  headingCss,
  taglineCss,
} from "./StatsPage.module.scss";
import TopMedia from "./TopMedia";
import YearNavigation from "./YearNavigation";

function SubHeading({
  yearScope,
  years,
}: {
  yearScope: string;
  years: string[];
}): JSX.Element {
  let subTitle = "A Year in Review";

  if (yearScope === "all") {
    subTitle = `${(years.length - 1).toString()} Years in Review`;
  }

  if (yearScope === years[1]) {
    subTitle = "A Year in Progress...";
  }

  return (
    <>
      {subTitle}
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
    </>
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
      <main className={containerCss}>
        <header className={headerCss}>
          <PageTitle className={headingCss}>{pageTitle}</PageTitle>
          <div className={taglineCss}>
            <SubHeading
              yearScope={yearScope}
              years={[...viewing.years].sort().reverse()}
            />
          </div>
        </header>
        <div className={contentCss}>
          {" "}
          <Callouts
            viewingCallouts={viewingCallouts}
            reviewCallouts={reviewCallouts}
          />
          <MostWatchedMovies movies={movies} />
          <ByDecade decades={decades} />
          <TopMedia topMedia={topMedia} />
          <GradeDistribution distributions={gradeDistribution?.nodes} />
          <MostWatchedDirectors directors={directors} />
          <MostWatchedPerformers performers={performers} />
          <MostWatchedWriters writers={writers} />
        </div>
      </main>
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
    movies: mostWatchedMoviesJson(viewing_year: { eq: $yearScope }) {
      ...MostWatchedMovies
    }
    directors: mostWatchedDirectorsJson(viewing_year: { eq: $yearScope }) {
      ...MostWatchedDirectors
    }
    performers: mostWatchedPerformersJson(viewing_year: { eq: $yearScope }) {
      ...MostWatchedPerformers
    }
    writers: mostWatchedWritersJson(viewing_year: { eq: $yearScope }) {
      ...MostWatchedWriters
    }
    viewing: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      years: distinct(field: viewing_year)
    }
  }
`;
