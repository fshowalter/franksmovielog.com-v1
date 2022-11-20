import { graphql, Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import HeadBuilder from "../HeadBuilder";
import Layout from "../Layout";
import PageTitle from "../PageTitle";
import ByReleaseYear from "./ByReleaseYear";
import Callouts from "./Callouts";
import GradeDistribution from "./GradeDistribution";
import MostWatchedMovies from "./MostWatchedMovies";
import MostWatchedPeople from "./MostWatchedPeople";
import {
  containerCss,
  contentCss,
  headerCss,
  headingCss,
  taglineCss,
} from "./StatsPage.module.scss";
import TopMedia from "./TopMedia";
import YearNavigation from "./YearNavigation";

function DirectorName({ person }: { person: Person }): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/directors/${person.slug}/`}>{person.fullName}</Link>
    );
  }

  return <>{person.fullName}</>;
}

function WriterName({ person }: { person: Person }): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/writers/${person.slug}/`}>{person.fullName}</Link>
    );
  }

  return <>{person.fullName}</>;
}

function PerformerName({ person }: { person: Person }): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/performers/${person.slug}/`}>
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

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

/**
 * Renders the all-time review stats template.
 */
export default function StatsPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const {
    viewingStats,
    reviewStats,
    performers,
    directors,
    writers,
    decade,
    gradeDistribution,
    movies,
    medium,
    viewing,
  } = data;
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
              years={viewing.years.sort().reverse()}
            />
          </div>
        </header>
        <div className={contentCss}>
          {" "}
          <Callouts
            viewingCount={viewingStats.viewingCount}
            movieCount={viewingStats.movieCount}
            newMovieCount={viewingStats.newMovieCount}
            reviewCount={reviewStats?.reviewCount}
            watchlistTitlesReviewed={reviewStats?.watchlistTitlesReviewed}
          />
          <MostWatchedMovies movies={movies.mostWatched} />
          <ByReleaseYear decades={decade.stats} />
          <TopMedia stats={medium.stats} />
          {gradeDistribution && (
            <GradeDistribution distributions={gradeDistribution.nodes} />
          )}
          <MostWatchedPeople
            people={directors.mostWatched}
            header="Most Watched Directors"
            nameRenderer={DirectorName}
          />
          <MostWatchedPeople
            people={performers.mostWatched}
            header="Most Watched Performers"
            nameRenderer={PerformerName}
          />
          <MostWatchedPeople
            people={writers.mostWatched}
            header="Most Watched Writers"
            nameRenderer={WriterName}
          />
        </div>
      </main>
    </Layout>
  );
}

export interface PageContext {
  yearScope: string;
}

export interface Person {
  fullName: string;
  slug: string | null;
  viewingCount: number;
  viewings: Viewing[];
}

export interface Viewing {
  sequence: number;
  viewingDate: string;
  venue: string | null;
  medium: string | null;
  title: string;
  year: number;
  reviewSlug: string | null;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageQueryResult {
  viewingStats: {
    viewingCount: number;
    movieCount: number;
    newMovieCount: number;
  };
  reviewStats: {
    reviewCount: number;
    watchlistTitlesReviewed: number;
  } | null;
  decade: {
    stats: DecadeStat[];
  };
  medium: {
    stats: MediumStat[];
  };
  gradeDistribution: {
    nodes: GradeDistribution[];
  } | null;
  movies: {
    mostWatched: Movie[];
  };
  directors: {
    mostWatched: Person[];
  };
  performers: {
    mostWatched: Person[];
  };
  writers: {
    mostWatched: Person[];
  };
  viewing: {
    years: string[];
  };
}

export interface Movie {
  imdbId: string;
  title: string;
  year: number;
  reviewSlug: string | null;
  viewingCount: number;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export interface MediumStat {
  name: string;
  viewingCount: number;
}

export interface GradeDistribution {
  grade: string;
  reviewCount: number;
}

export interface DecadeStat {
  decade: string;
  viewingCount: number;
}

export const pageQuery = graphql`
  query ($yearScope: String!, $isYear: Boolean!) {
    viewingStats: viewingStatsJson(viewing_year: { eq: $yearScope }) {
      movieCount: movie_count
      newMovieCount: new_movie_count
      viewingCount: viewing_count
    }
    reviewStats: reviewStatsJson(review_year: { eq: $yearScope }) {
      reviewCount: reviews_created
      watchlistTitlesReviewed: watchlist_titles_reviewed
    }
    decade: viewingCountsForDecadesJson(viewing_year: { eq: $yearScope }) {
      stats {
        decade
        viewingCount: viewing_count
      }
    }
    gradeDistribution: allGradeDistributionsJson @skip(if: $isYear) {
      nodes {
        grade
        reviewCount: review_count
      }
    }
    medium: topMediaJson(viewing_year: { eq: $yearScope }) {
      stats {
        name
        viewingCount: viewing_count
      }
    }
    movies: mostWatchedMoviesJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        imdbId: imdb_id
        title
        year
        reviewSlug: review_slug
        poster {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [JPG, AVIF]
              quality: 80
              width: 200
              placeholder: TRACED_SVG
            )
          }
        }
        viewingCount: viewing_count
      }
    }
    directors: mostWatchedDirectorsJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          sequence
          viewingDate: date(formatString: "ddd MMM D, YYYY")
          venue
          medium
          title
          year
          reviewSlug: review_slug
          poster {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [JPG, AVIF]
                quality: 80
                width: 200
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
    performers: mostWatchedPerformersJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug: slug
        viewingCount: viewing_count
        viewings {
          sequence
          viewingDate: date(formatString: "ddd MMM D, YYYY")
          venue
          medium
          title
          year
          reviewSlug: review_slug
          poster {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [JPG, AVIF]
                quality: 80
                width: 200
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
    writers: mostWatchedWritersJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug: slug
        viewingCount: viewing_count
        viewings {
          sequence
          viewingDate: date(formatString: "ddd MMM D, YYYY")
          venue
          medium
          title
          year
          reviewSlug: review_slug
          poster {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                formats: [JPG, AVIF]
                quality: 80
                width: 200
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
    viewing: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      years: distinct(field: viewing_year)
    }
  }
`;
