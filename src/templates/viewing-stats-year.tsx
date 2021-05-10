import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import {
  containerCss,
  detailsLabelCss,
  detailsListCss,
  headingCss,
  listCss,
  numberHeaderCss,
  pageHeaderCss,
  personLinkCss,
  statPopCss,
  statPopLegendCss,
  statPopNumberCss,
  statPopsCss,
  tableCountCellCss,
  tableCss,
  tableFillCellCss,
  tableHeadingCss,
  tableIndexCellCss,
  tableRowCss,
  tableTitleYearCss,
  taglineCss,
  textHeaderCss,
  viaCss,
  viewingDetailCss,
  viewingForMovieCss,
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

function buildPersonName(type: string, person: Person): JSX.Element {
  if (person.slug) {
    return (
      <Link className={personLinkCss} to={`/watchlist/${type}/${person.slug}`}>
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

function buildlMovieTitle(movie: Movie): JSX.Element {
  if (movie.slug) {
    return (
      <Link className={personLinkCss} to={`/reviews/${movie.slug}`}>
        {movie.title} <span className={tableTitleYearCss}>{movie.year}</span>
      </Link>
    );
  }

  return (
    <>
      {movie.title} <span className={tableTitleYearCss}>{movie.year}</span>
    </>
  );
}

function buildViewingDetail(viewing: Viewing): JSX.Element {
  return (
    <span className={viewingDetailCss}>
      {viewing.prettyDate} <span className={viaCss}>via</span> {viewing.venue}
    </span>
  );
}

function TableHeading({ headingText }: { headingText: string }): JSX.Element {
  return <h2 className={tableHeadingCss}>{headingText}</h2>;
}

function MostWatchedMoviesTable({
  collection,
}: {
  collection: MovieWithViewings[];
}): JSX.Element {
  return (
    <table className={tableCss}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={textHeaderCss}>Title</th>
          <th className={numberHeaderCss}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((movie, index) => {
        return (
          <>
            <tr className={tableRowCss}>
              <td className={tableIndexCellCss}>{index + 1}.&nbsp;</td>
              <td className={tableFillCellCss}>{buildlMovieTitle(movie)}</td>
              <td className={tableCountCellCss}>{movie.viewingCount}</td>
            </tr>
            <tr>
              <td className={tableIndexCellCss}>&nbsp;</td>
              <td colSpan={2}>
                <details>
                  <summary className={detailsLabelCss}>Details</summary>
                  <ul className={detailsListCss}>
                    {movie.viewings.map((detail) => {
                      return <li>{buildViewingDetail(detail)}</li>;
                    })}
                  </ul>
                </details>
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
}

function DecadeTable({
  collection,
}: {
  collection: DecadeGroup[];
}): JSX.Element {
  return (
    <table className={tableCss}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={textHeaderCss}>Decade</th>
          <th className={numberHeaderCss}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((group) => {
        return (
          <tr className={tableRowCss}>
            <td className={tableIndexCellCss}>&nbsp;</td>
            <td className={tableFillCellCss}>{group.decade}</td>
            <td className={tableCountCellCss}>{group.viewingCount}</td>
          </tr>
        );
      })}
    </table>
  );
}

function CountryTable({
  collection,
}: {
  collection: CountryGroup[];
}): JSX.Element {
  return (
    <table className={tableCss}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={textHeaderCss}>Country</th>
          <th className={numberHeaderCss}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((group, index) => {
        return (
          <>
            <tr className={tableRowCss}>
              <td className={tableIndexCellCss}>{index + 1}.&nbsp;</td>
              <td className={tableFillCellCss}>{group.name}</td>
              <td className={tableCountCellCss}>{group.viewingCount}</td>
            </tr>
            <tr>
              <td className={tableIndexCellCss}>&nbsp;</td>
              <td colSpan={2}>
                <details>
                  <summary className={detailsLabelCss}>Details</summary>
                  <ul className={detailsListCss}>
                    {group.viewings.map((detail) => {
                      return (
                        <li>
                          {buildlMovieTitle(detail.movie)}{" "}
                          <div className={viewingForMovieCss}>
                            {buildViewingDetail(detail)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </td>
            </tr>
          </>
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
    <table className={tableCss}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={textHeaderCss}>Name</th>
          <th className={numberHeaderCss}>Viewing Count</th>
        </tr>
      </thead>
      {collection.map((person, index) => {
        return (
          <>
            <tr className={tableRowCss}>
              <td className={tableIndexCellCss}>{index + 1}.&nbsp;</td>
              <td className={tableFillCellCss}>
                {buildPersonName(watchlistType, person)}
              </td>
              <td className={tableCountCellCss}>{person.viewingCount}</td>
            </tr>
            <tr>
              <td className={tableIndexCellCss}>&nbsp;</td>
              <td colSpan={2}>
                <details>
                  <summary className={detailsLabelCss}>Details</summary>
                  <ul className={detailsListCss}>
                    {person.viewings.map((detail) => {
                      return (
                        <li>
                          {buildlMovieTitle(detail.movie)}{" "}
                          <div className={viewingForMovieCss}>
                            {buildViewingDetail(detail)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </td>
            </tr>
          </>
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
  let mostWatched = null;

  if (movies.mostWatched.length > 0) {
    mostWatched = (
      <>
        <TableHeading headingText="Most Watched Movies" />
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
          <TableHeading headingText="Viewings By Release Decade" />
          <DecadeTable collection={movies.decades} />
          <TableHeading headingText="Viewings By Country of Origin" />
          <CountryTable collection={movies.countries} />
          <TableHeading headingText="Most Watched Directors" />
          <MostWatchedPersonTable
            collection={directors.mostWatched}
            watchlistType="directors"
          />
          <TableHeading headingText="Most Watched Performers" />
          <MostWatchedPersonTable
            collection={performers.mostWatched}
            watchlistType="cast"
          />
          <TableHeading headingText="Most Watched Writers" />
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

export interface DecadeGroup {
  decade: string;
  viewingCount: number;
}

export interface CountryGroup {
  name: string;
  viewingCount: number;
  viewings: Viewing[];
}

export interface PageQueryResult {
  movies: {
    movieCount: number;
    viewingCount: number;
    newMovieCount: number;
    mostWatched: MovieWithViewings[];
    decades: DecadeGroup[];
    countries: CountryGroup[];
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
      countries {
        name
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
