import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import {
  barCss,
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
  tableHeaderCss,
  tableHeadingCss,
  tableIndexCellCss,
  tableRowCss,
  tableTextCellCss,
  tableTitleYearCss,
  taglineCss,
  viaCss,
  viewingDetailCss,
  viewingForMovieCss,
  yearListCss,
  yearListItemCss,
  yearListItemLinkCss,
} from "./viewing-stats-all.module.scss";

function buildSubHeading(numberOfYears: number): string {
  return `${(numberOfYears - 1).toString()} Years in Review`;
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
          <th className={tableHeaderCss}>Title</th>
          <th className={numberHeaderCss}>Viewings</th>
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
  const maxBar = collection.reduce(
    (acc, dec) => (acc = acc > dec.viewingCount ? acc : dec.viewingCount),
    0
  );

  return (
    <table className={tableCss}>
      <thead>
        <tr>
          <th className={tableHeaderCss}>Decade</th>
          <th>&nbsp;</th>
          <th className={numberHeaderCss}>Viewings</th>
        </tr>
      </thead>
      {collection.map((group) => {
        const barPercentProperty = {
          "--bar-percent": `${(group.viewingCount / maxBar) * 100}%`,
        } as React.CSSProperties;

        return (
          <tr className={tableRowCss}>
            <td className={tableTextCellCss}>{group.decade}</td>
            <td className={tableFillCellCss}>
              <div className={barCss} style={barPercentProperty}>
                &nbsp;
              </div>
            </td>
            <td className={tableCountCellCss}>{group.viewingCount}</td>
          </tr>
        );
      })}
    </table>
  );
}

function VenueTable({ collection }: { collection: VenueGroup[] }): JSX.Element {
  const maxBar = collection.reduce(
    (acc, dec) => (acc = acc > dec.viewingCount ? acc : dec.viewingCount),
    0
  );

  return (
    <table className={tableCss}>
      <thead>
        <tr>
          <th className={tableHeaderCss}>Venue</th>
          <th>&nbsp;</th>
          <th className={numberHeaderCss}>Viewings</th>
        </tr>
      </thead>
      {collection.map((group) => {
        const barPercentProperty = {
          "--bar-percent": `${(group.viewingCount / maxBar) * 100}%`,
        } as React.CSSProperties;

        return (
          <tr className={tableRowCss}>
            <td className={tableTextCellCss}>{group.name}</td>
            <td className={tableFillCellCss}>
              <div className={barCss} style={barPercentProperty}>
                &nbsp;
              </div>
            </td>
            <td className={tableCountCellCss}>{group.viewingCount}</td>
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
    <table className={tableCss}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className={tableHeaderCss}>Name</th>
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

  return (
    <Layout>
      <Seo
        pageTitle="All-Time Viewing Stats"
        description={`My most watched titles, performers, directors and writers in ${pageContext.yearScope}`}
        article={false}
        image={null}
      />
      <main className={containerCss}>
        <header className={pageHeaderCss}>
          <h2 className={headingCss}>All-Time Viewing Stats</h2>
          <p className={taglineCss}>
            {buildSubHeading(data.year.nodes.length)}
            <ul className={yearListCss}>
              <li className={yearListItemCss}>All-Time</li>
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
          </div>
          <TableHeading headingText="Most Watched Movies" />
          <MostWatchedMoviesTable collection={movies.mostWatched} />
          <TableHeading headingText="Viewings By Release Decade" />
          <DecadeTable collection={movies.decades} />
          <TableHeading headingText="Viewings By Venue" />
          <VenueTable collection={movies.venues} />
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

export interface VenueGroup {
  name: string;
  viewingCount: number;
}

export interface PageQueryResult {
  movies: {
    movieCount: number;
    viewingCount: number;
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
  query {
    movies: mostWatchedMoviesJson {
      viewingCount: viewing_count
      movieCount: movie_count
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
    directors: mostWatchedDirectorsJson {
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
    performers: mostWatchedPerformersJson {
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
    writers: mostWatchedWritersJson {
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
