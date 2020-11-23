import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styles from "./viewing-stats.module.scss";

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

  return "A Year in Review.";
}

function buildPersonName(type: string, person: Person): JSX.Element {
  if (person.slug) {
    return (
      <Link
        className={styles.person_link}
        to={`/watchlist/${type}/${person.slug}`}
      >
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

function buildlMovieTitle(movie: Movie): JSX.Element {
  if (movie.slug) {
    return (
      <Link className={styles.person_link} to={`/reviews/${movie.slug}`}>
        {movie.title}{" "}
        <span className={styles.table_title_year}>{movie.year}</span>
      </Link>
    );
  }

  return (
    <>
      {movie.title}{" "}
      <span className={styles.table_title_year}>{movie.year}</span>
    </>
  );
}

function buildViewingDetail(viewing: Viewing): JSX.Element {
  return (
    <span className={styles.viewing_detail}>
      {viewing.prettyDate} <span className={styles.via}>via</span>{" "}
      {viewing.venue}.
    </span>
  );
}

function MostWatchedTableHeading({
  mostWatchedType,
}: {
  mostWatchedType: string;
}): JSX.Element {
  return (
    <h2 className={styles.table_heading}>Most Watched {mostWatchedType}</h2>
  );
}

function MostWatchedMoviesTable({
  collection,
}: {
  collection: MovieWithViewings[];
}): JSX.Element {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={styles.text_header}>Title</th>
          <th className={styles.number_header}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((movie, index) => {
        return (
          <tr className={styles.table_row}>
            <td className={styles.table_index_cell}>{index + 1}.&nbsp;</td>
            <td className={styles.table_fill_cell}>
              {buildlMovieTitle(movie)}
              <details>
                <summary className={styles.details_label}>Details</summary>
                <ul className={styles.details_list}>
                  {movie.viewings.map((detail) => {
                    return <li>{buildViewingDetail(detail)}</li>;
                  })}
                </ul>
              </details>
            </td>
            <td className={styles.table_count_cell}>{movie.viewingCount}</td>
          </tr>
        );
      })}
    </table>
  );
}

function MostWatchedPersonTable({
  collection,
  watchlistType,
}: {
  collection: PersonWithViewings[];
  watchlistType: string;
}): JSX.Element {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={styles.text_header}>Name</th>
          <th className={styles.number_header}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((person, index) => {
        return (
          <tr className={styles.table_row}>
            <td className={styles.table_index_cell}>{index + 1}.&nbsp;</td>
            <td className={styles.table_fill_cell}>
              {buildPersonName(watchlistType, person)}
              <details>
                <summary className={styles.details_label}>Details</summary>
                <ul className={styles.details_list}>
                  {person.viewings.map((detail) => {
                    return (
                      <li>
                        {buildlMovieTitle(detail.movie)}{" "}
                        <div className={styles.viewing_for_movie}>
                          {buildViewingDetail(detail)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </td>
            <td className={styles.table_count_cell}>{person.viewingCount}</td>
          </tr>
        );
      })}
    </table>
  );
}

/**
 * Renders the viewing stats template.
 */
export default function ViewingStatsTemplate({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const { performers, directors, writers, movies } = data;

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
      <main className={styles.container}>
        <header className={styles.page_header}>
          <h2 className={styles.heading}>
            {buildHeading(pageContext.yearScope)}
          </h2>
          <p className={styles.tagline}>
            {buildSubHeading(pageContext.yearScope, data.year.nodes.length)}
            <ul className={styles.year_list}>
              {pageContext.yearScope !== "all" && (
                <li className={styles.year_list_item}>
                  <Link
                    to="/viewings/stats/"
                    className={styles.year_list_item_link}
                  >
                    All-Time
                  </Link>
                </li>
              )}
              {pageContext.yearScope === "all" && (
                <li className={styles.year_list_item}>All-Time</li>
              )}
              {data.year.nodes.map(({ year }) => {
                if (year === "all") {
                  return null;
                }
                if (year === pageContext.yearScope) {
                  return <li className={styles.year_list_item}>{year}</li>;
                }

                return (
                  <li className={styles.year_list_item}>
                    <Link
                      to={`/viewings/stats/${year}`}
                      className={styles.year_list_item_link}
                    >
                      {year}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </p>
        </header>
        <div className={styles.list}>
          <MostWatchedTableHeading mostWatchedType="Movies" />
          <MostWatchedMoviesTable collection={movies.mostWatched} />
          <MostWatchedTableHeading mostWatchedType="Directors" />
          <MostWatchedPersonTable
            collection={directors.mostWatched}
            watchlistType="directors"
          />
          <MostWatchedTableHeading mostWatchedType="Performers" />
          <MostWatchedPersonTable
            collection={performers.mostWatched}
            watchlistType="cast"
          />
          <MostWatchedTableHeading mostWatchedType="Writers" />
          <MostWatchedPersonTable
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

export interface PageQueryResult {
  movies: {
    mostWatched: MovieWithViewings[];
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
  query($yearScope: String) {
    movies: mostWatchedMoviesJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        title
        year
        slug
        viewings {
          prettyDate: date(formatString: "dddd MMM D, YYYY")
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
    directors: mostWatchedDirectorsJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "dddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    performers: mostWatchedPerformersJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "dddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    writers: mostWatchedWritersJson(year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug
        viewingCount: viewing_count
        viewings {
          prettyDate: date(formatString: "dddd MMM D, YYYY")
          venue
          movie {
            title
            year
            slug
          }
        }
      }
    }
    year: allMostWatchedMoviesJson(sort: { fields: year, order: DESC }) {
      nodes {
        year
      }
    }
  }
`;
