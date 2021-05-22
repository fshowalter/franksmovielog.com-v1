import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import MostWatchedMoviesTable from "../components/MostWatchedMoviesTable";
import MostWatchedPersonsTable from "../components/MostWatchedPersonsTable";
import Seo from "../components/Seo";
import StatTableHeading from "../components/StatTableHeading";
import TableWithBarGraph from "../components/TableWithBarGraph";
import {
  containerCss,
  headingCss,
  listCss,
  pageHeaderCss,
  statPopCss,
  statPopLegendCss,
  statPopNumberCss,
  statPopsCss,
  taglineCss,
  yearListCss,
  yearListItemCss,
  yearListItemLinkCss,
} from "./viewing-stats-year.module.scss";

function buildHeading(yearScope: string): string {
  if (yearScope === "all") {
    return "All-Time Viewing Stats";
  }

  return `${yearScope} Viewing Stats`;
}

function buildSubHeading(yearScope: string, numberOfYears: number): string {
  if (yearScope === "all") {
    return `${(numberOfYears - 2).toString()} Years in Review.`;
  }

  if (yearScope === new Date().getFullYear().toString()) {
    return "A Year in Progress...";
  }

  return "A Year in Review";
}

function DecadeTable({
  collection,
}: {
  collection: DecadeGroup[];
}): JSX.Element {
  return TableWithBarGraph<DecadeGroup>({
    collection: collection,
    nameHeaderText: "Decade",
    valueHeaderText: "Viewings",
    nameFunc: (item) => item.decade,
    valueFunc: (item) => item.viewingCount,
  });
}

function VenueTable({ collection }: { collection: VenueGroup[] }): JSX.Element {
  return TableWithBarGraph<VenueGroup>({
    collection: collection,
    nameHeaderText: "Venue",
    valueHeaderText: "Viewings",
    nameFunc: (item) => item.name,
    valueFunc: (item) => item.viewingCount,
  });
}

/**
 * Renders the viewing stats year template.
 */
export default function ViewingStatsYearTemplate({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const { performers, directors, writers, movies } = data;
  let mostWatched = null;

  if (movies.mostWatched.length > 0) {
    mostWatched = (
      <>
        <StatTableHeading text="Most Watched Movies" />
        <MostWatchedMoviesTable collection={movies.mostWatched} />
      </>
    );
  }

  return (
    <Layout>
      <Seo
        pageTitle={
          pageContext.yearScope !== "all"
            ? `${pageContext.yearScope} Viewing Stats`
            : `All-Time Viewing Stats`
        }
        description={
          pageContext.yearScope
            ? `My most watched titles, performers, directors and writers in ${pageContext.yearScope}`
            : `My all-time most watched titles, performers, directors and writers.`
        }
        article={false}
        image={null}
      />
      <main className={containerCss}>
        <header className={pageHeaderCss}>
          <h2 className={headingCss}>{buildHeading(pageContext.yearScope)}</h2>
          <p className={taglineCss}>
            {buildSubHeading(pageContext.yearScope, data.year.nodes.length)}
            <ul className={yearListCss}>
              {pageContext.yearScope !== "all" && (
                <li className={yearListItemCss}>
                  <Link to="/viewings/stats/" className={yearListItemLinkCss}>
                    All-Time
                  </Link>
                </li>
              )}
              {pageContext.yearScope === "all" && (
                <li className={yearListItemCss}>All-Time</li>
              )}
              {data.year.nodes.map(({ year }) => {
                if (year === "all") {
                  return null;
                }
                if (year === pageContext.yearScope) {
                  return <li className={yearListItemCss}>{year}</li>;
                }

                return (
                  <li className={yearListItemCss}>
                    <Link
                      to={`/viewings/stats/${year}`}
                      className={yearListItemLinkCss}
                    >
                      {year}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </p>
        </header>
        <div className={listCss}>
          <div className={statPopsCss}>
            <div className={statPopCss}>
              <span className={statPopNumberCss}>{movies.viewingCount}</span>{" "}
              <span className={statPopLegendCss}>Viewings</span>
            </div>
            <div className={statPopCss}>
              <span className={statPopNumberCss}>{movies.movieCount}</span>{" "}
              <span className={statPopLegendCss}>Movies</span>
            </div>
            <div className={statPopCss}>
              <span className={statPopNumberCss}>{movies.newMovieCount}</span>{" "}
              <span className={statPopLegendCss}>New Movies</span>
            </div>
          </div>
          {mostWatched}
          <StatTableHeading text="Viewings By Release Decade" />
          <DecadeTable collection={movies.decades} />
          <StatTableHeading text="Viewings By Venue" />
          <VenueTable collection={movies.venues} />
          <StatTableHeading text="Most Watched Directors" />
          <MostWatchedPersonsTable
            collection={directors.mostWatched}
            watchlistType="directors"
          />
          <StatTableHeading text="Most Watched Performers" />
          <MostWatchedPersonsTable
            collection={performers.mostWatched}
            watchlistType="cast"
          />
          <StatTableHeading text="Most Watched Writers" />
          <MostWatchedPersonsTable
            collection={writers.mostWatched}
            watchlistType="writers"
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
  slug: string;
}

export interface Viewing {
  prettyDate: string;
  venue: string;
  movie: Movie;
}

export interface Movie {
  title: string;
  year: string;
  slug: string;
}

export interface PersonWithViewings extends Person {
  viewingCount: number;
  viewings: Viewing[];
}

export interface MovieWithViewings extends Movie {
  viewings: Viewing[];
  viewingCount: number;
}

export interface DecadeGroup {
  decade: string;
  viewingCount: number;
}

export interface VenueGroup {
  name: string;
  viewingCount: number;
}

export interface PageQueryResult {
  movies: {
    movieCount: number;
    viewingCount: number;
    newMovieCount: number;
    mostWatched: MovieWithViewings[];
    decades: DecadeGroup[];
    venues: VenueGroup[];
  };
  directors: {
    mostWatched: PersonWithViewings[];
  };
  performers: {
    mostWatched: PersonWithViewings[];
  };
  writers: {
    mostWatched: PersonWithViewings[];
  };
  year: {
    nodes: [
      {
        year: string;
      }
    ];
  };
}

export const pageQuery = graphql`
  query ($yearScope: Date) {
    movies: mostWatchedMoviesByYearJson(year: { eq: $yearScope }) {
      viewingCount: viewing_count
      movieCount: movie_count
      newMovieCount: new_movie_count
      decades {
        decade
        viewingCount: viewing_count
      }
      venues {
        name
        viewingCount: viewing_count
      }
      mostWatched: most_watched {
        title
        year
        slug
        viewings {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
        viewingCount: viewing_count
      }
    }
    directors: mostWatchedDirectorsByYearJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    performers: mostWatchedPerformersByYearJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    writers: mostWatchedWritersByYearJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    year: allMostWatchedMoviesByYearJson(sort: { fields: year, order: DESC }) {
      nodes {
        year
      }
    }
  }
`;
