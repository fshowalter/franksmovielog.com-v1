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
        {movie.title} ({movie.year})
      </Link>
    );
  }

  return (
    <>
      {movie.title} ({movie.year})
    </>
  );
}

function buildYearSuffix(yearScope: string): JSX.Element | null {
  if (yearScope === "all") {
    return null;
  }

  return <> in {yearScope}</>;
}

function MostWatchedTableHeading({
  year,
  mostWatchedType,
}: {
  year: string;
  mostWatchedType: string;
}): JSX.Element {
  return (
    <h2 className={styles.table_heading}>
      Most Watched {mostWatchedType}
      {buildYearSuffix(year)}
    </h2>
  );
}

function MostWatchedMoviesTable({
  collection,
}: {
  collection: [MovieWithCount];
}): JSX.Element {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={styles.name_header}>Name</th>
          <th className={styles.count_header}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((movie, index) => {
        return (
          <tr className={styles.table_row}>
            <td className={styles.table_index_cell}>{index + 1}.&nbsp;</td>
            <td className={styles.table_fill_cell}>
              {buildlMovieTitle(movie)}
            </td>
            <td className={styles.table_count_cell}>{movie.count}</td>
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
  collection: [Person];
  watchlistType: string;
}): JSX.Element {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={styles.name_header}>Name</th>
          <th className={styles.count_header}>Viewing Count</th>
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
                  {person.details.map((detail) => {
                    return <li>{buildlMovieTitle(detail)}</li>;
                  })}
                </ul>
              </details>
            </td>
            <td className={styles.table_count_cell}>{person.count}</td>
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
  const mostWatchedDirectors = data.mostWatchedDirectors.nodes[0].directors;
  const mostWatchedPerformers = data.mostWatchedPerformers.nodes[0].performers;
  const mostWatchedWriters = data.mostWatchedWriters.nodes[0].writers;
  const mostWatchedMovies = data.mostWatchedMovies.nodes[0].movies;

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
        <div className={styles.left}>
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
                  <li className={styles.year_list_item}>
                    <span className={styles.year_list_item_text}>All-Time</span>
                  </li>
                )}
                {data.year.nodes.map(({ year }) => {
                  if (year === "all") {
                    return null;
                  }
                  if (year === pageContext.yearScope) {
                    return (
                      <li className={styles.year_list_item}>
                        <span className={styles.year_list_item_text}>
                          {year}
                        </span>
                      </li>
                    );
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
        </div>
        <div className={styles.right}>
          <MostWatchedTableHeading
            mostWatchedType="Movies"
            year={pageContext.yearScope}
          />
          <MostWatchedMoviesTable collection={mostWatchedMovies} />
          <MostWatchedTableHeading
            mostWatchedType="Directors"
            year={pageContext.yearScope}
          />
          <MostWatchedPersonTable
            collection={mostWatchedDirectors}
            watchlistType="directors"
          />
          <MostWatchedTableHeading
            mostWatchedType="Performers"
            year={pageContext.yearScope}
          />
          <MostWatchedPersonTable
            collection={mostWatchedPerformers}
            watchlistType="cast"
          />
          <MostWatchedTableHeading
            mostWatchedType="Writers"
            year={pageContext.yearScope}
          />
          <MostWatchedPersonTable
            collection={mostWatchedWriters}
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
  count: number;
  fullName: string;
  slug: string;
  details: Movie[];
}

export interface Movie {
  title: string;
  year: string;
  slug: string;
}

export interface MovieWithCount extends Movie {
  count: number;
}

export interface PageQueryResult {
  mostWatchedMovies: {
    nodes: [
      {
        movies: [MovieWithCount];
      }
    ];
  };
  mostWatchedDirectors: {
    nodes: [
      {
        directors: [Person];
      }
    ];
  };
  mostWatchedPerformers: {
    nodes: [
      {
        performers: [Person];
      }
    ];
  };
  mostWatchedWriters: {
    nodes: [
      {
        writers: [Person];
      }
    ];
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
    mostWatchedMovies: allMostWatchedMoviesJson(
      filter: { year: { eq: $yearScope } }
    ) {
      nodes {
        movies {
          count
          title
          year
          slug
        }
      }
    }
    mostWatchedDirectors: allMostWatchedDirectorsJson(
      filter: { year: { eq: $yearScope } }
    ) {
      nodes {
        directors {
          count
          fullName: full_name
          slug
          details {
            title
            year
            slug
          }
        }
      }
    }
    mostWatchedPerformers: allMostWatchedPerformersJson(
      filter: { year: { eq: $yearScope } }
    ) {
      nodes {
        performers {
          count
          fullName: full_name
          slug
          details {
            title
            year
            slug
          }
        }
      }
    }
    mostWatchedWriters: allMostWatchedWritersJson(
      filter: { year: { eq: $yearScope } }
    ) {
      nodes {
        writers {
          count
          fullName: full_name
          slug
          details {
            title
            year
            slug
          }
        }
      }
    }
    year: allMostWatchedMoviesJson {
      nodes {
        year
      }
    }
  }
`;
