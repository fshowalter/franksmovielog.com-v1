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
    return `${(numberOfYears - 2).toString()} Years in Review`;
  }

  if (yearScope === new Date().getFullYear().toString()) {
    return "A Year in Progress...";
  }

  return "A Year in Review";
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

function MostWatchedTable({
  collection,
  watchlistType,
}: {
  collection: [Person];
  watchlistType: string;
}): JSX.Element {
  return (
    <table className={styles.table}>
      {collection.map((person, index) => {
        return (
          <tr className={styles.table_row}>
            <td className={styles.table_index_cell}>{index + 1}.&nbsp;</td>
            <td className={styles.table_fill_cell}>
              {buildPersonName(watchlistType, person)}
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
  console.log(data);
  const mostWatchedDirectors = data.mostWatchedDirectors.nodes[0].directors;
  const mostWatchedPerformers = data.mostWatchedPerformers.nodes[0].performers;
  const mostWatchedWriters = data.mostWatchedWriters.nodes[0].writers;

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
                    <Link to="/viewings/stats/">All-Time</Link>
                  </li>
                )}
                {data.year.nodes.map(({ year }) => {
                  if (year === "all" || year === pageContext.yearScope) {
                    return null;
                  }

                  return (
                    <li className={styles.year_list_item}>
                      <Link to={`/viewings/stats/${year}`}>{year}</Link>
                    </li>
                  );
                })}
              </ul>
            </p>
          </header>
        </div>
        <div className={styles.right}>
          <MostWatchedTableHeading
            mostWatchedType="Directors"
            year={pageContext.yearScope}
          />
          <MostWatchedTable
            collection={mostWatchedDirectors}
            watchlistType="directors"
          />
          <MostWatchedTableHeading
            mostWatchedType="Performers"
            year={pageContext.yearScope}
          />
          <MostWatchedTable
            collection={mostWatchedPerformers}
            watchlistType="cast"
          />
          <MostWatchedTableHeading
            mostWatchedType="Writers"
            year={pageContext.yearScope}
          />
          <MostWatchedTable
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
}

export interface PageQueryResult {
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
    mostWatchedDirectors: allMostWatchedDirectorsJson(
      filter: { year: { eq: $yearScope } }
    ) {
      nodes {
        directors {
          count
          fullName: full_name
          slug
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
        }
      }
    }
    year: allMostWatchedDirectorsJson {
      nodes {
        year
      }
    }
  }
`;
