import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import MostWatchedMoviesStatTable from "../components/MostWatchedMoviesStatTable";
import MostWatchedPersonsStatTable from "../components/MostWatchedPersonsStatTable";
import Seo from "../components/Seo";
import StatCallouts from "../components/StatCallouts";
import ViewingsByDecadeBarGraphStatTable from "../components/ViewingsByDecadeStatTable";
import ViewingsByVenueBarGraphStatTable from "../components/ViewingsByVenueStatTable";
import ViewingYearNavigation from "../components/ViewingYearNavigation";
import {
  containerCss,
  contentCss,
  headingCss,
  pageHeaderCss,
  taglineCss,
} from "./viewing-stats-year.module.scss";

function buildSubHeading(yearScope: string): string {
  if (yearScope === new Date().getFullYear().toString()) {
    return "A Year in Progress...";
  }

  return "A Year in Review";
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
      <MostWatchedMoviesStatTable collection={movies.mostWatched} />
    );
  }

  return (
    <Layout>
      <Seo
        pageTitle={`${pageContext.yearScope} Viewing Stats`}
        description={`My most watched titles, performers, directors and writers in ${pageContext.yearScope}`}
        article={false}
        image={null}
      />
      <main className={containerCss}>
        <header className={pageHeaderCss}>
          <h2
            className={headingCss}
          >{`${pageContext.yearScope} Viewing Stats`}</h2>
          <p className={taglineCss}>
            {buildSubHeading(pageContext.yearScope)}
            <ViewingYearNavigation
              currentYear={pageContext.yearScope}
              years={data.year.nodes.map((node) => node.year)}
            />
          </p>
        </header>
        <div className={contentCss}>
          <StatCallouts
            stats={[
              {
                number: movies.viewingCount,
                text: "Viewings",
              },
              {
                number: movies.movieCount,
                text: "Movies",
              },
              {
                number: movies.newMovieCount,
                text: "New Movies",
              },
            ]}
          />
          {mostWatched}
          <ViewingsByDecadeBarGraphStatTable collection={movies.decades} />
          <ViewingsByVenueBarGraphStatTable collection={movies.venues} />
          <MostWatchedPersonsStatTable
            collection={directors.mostWatched}
            watchlistType="directors"
          />
          <MostWatchedPersonsStatTable
            collection={performers.mostWatched}
            watchlistType="performers"
          />
          <MostWatchedPersonsStatTable
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
