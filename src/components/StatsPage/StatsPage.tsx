import { graphql, Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Layout from "../Layout";
import Seo from "../Seo";
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
import TopVenues from "./TopVenues";
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

  if (yearScope === new Date().getFullYear().toString()) {
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
    grade,
    movies,
    venue,
    viewing,
  } = data;
  const { yearScope } = pageContext;

  const pageTitle =
    yearScope === "all" ? "All-Time Stats" : `${yearScope} Stats`;

  return (
    <>
      <Seo
        pageTitle={pageTitle}
        description={`My most-watched performers, directors and writers for ${yearScope}.`}
        article={false}
        image={null}
      />
      <Layout>
        <main className={containerCss}>
          <header className={headerCss}>
            <h2 className={headingCss}>{pageTitle}</h2>
            <div className={taglineCss}>
              <SubHeading yearScope={yearScope} years={viewing.years} />
            </div>
          </header>
          <div className={contentCss}>
            {" "}
            <Callouts
              viewingCount={viewingStats.viewingCount}
              movieCount={viewingStats.movieCount}
              newMovieCount={viewingStats.newMovieCount}
              reviewCount={reviewStats?.reviewCount}
            />
            <MostWatchedMovies movies={movies.mostWatched} />
            <ByReleaseYear decades={decade.stats} />
            <TopVenues venues={venue.stats} />
            {grade && <GradeDistribution distributions={grade.distributions} />}
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
    </>
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
  venue: string;
  title: string;
  year: number;
  slug: string | null;
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
  };
  decade: {
    stats: DecadeStat[];
  };
  venue: {
    stats: VenueStat[];
  };
  grade: {
    distributions: GradeDistribution[];
  };
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
  slug: string | null;
  viewingCount: number;
  poster: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export interface VenueStat {
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
  query ($yearScope: String) {
    viewingStats: viewingStatsJson(viewing_year: { eq: $yearScope }) {
      movieCount: movie_count
      newMovieCount: new_movie_count
      viewingCount: viewing_count
    }
    reviewStats: reviewStatsJson(review_year: { eq: $yearScope }) {
      reviewCount: total_review_count
    }
    decade: viewingCountsForDecadesJson(viewing_year: { eq: $yearScope }) {
      stats {
        decade
        viewingCount: viewing_count
      }
    }
    grade: gradeDistributionsJson(review_year: { eq: $yearScope }) {
      distributions {
        grade
        reviewCount: review_count
      }
    }
    venue: topVenuesJson(viewing_year: { eq: $yearScope }) {
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
        slug
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
          title
          year
          slug
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
          title
          year
          slug
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
          title
          year
          slug
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
