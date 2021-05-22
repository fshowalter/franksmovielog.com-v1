import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import MostWatchedMoviesStatTable from "../components/MostWatchedMoviesStatTable";
import MostWatchedPersonsStatTable from "../components/MostWatchedPersonsStatTable";
import Seo from "../components/Seo";
import StatCallouts from "../components/StatCallouts";
import ViewingsByDecadeStatTable from "../components/ViewingsByDecadeStatTable";
import ViewingsByVenueStatTable from "../components/ViewingsByVenueStatTable";
import ViewingYearNavigation from "../components/ViewingYearNavigation";
import {
  containerCss,
  contentCss,
  headingCss,
  pageHeaderCss,
  taglineCss,
} from "./viewing-stats-all.module.scss";

/**
 * Renders the all-time viewing stats template.
 */
export default function AllTimeViewingStatsTemplate({
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
        description={`My all-time most watched titles, performers, directors and writers.`}
        article={false}
        image={null}
      />
      <main className={containerCss}>
        <header className={pageHeaderCss}>
          <h2 className={headingCss}>All-Time Viewing Stats</h2>
          <p className={taglineCss}>
            {`${(data.year.nodes.length - 1).toString()} Years in Review`}
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
            ]}
          />
          <MostWatchedMoviesStatTable collection={movies.mostWatched} />
          <ViewingsByDecadeStatTable collection={movies.decades} />
          <ViewingsByVenueStatTable collection={movies.venues} />
          <MostWatchedPersonsStatTable
            collection={directors.mostWatched}
            watchlistType="directors"
          />
          <MostWatchedPersonsStatTable
            collection={performers.mostWatched}
            watchlistType="cast"
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
