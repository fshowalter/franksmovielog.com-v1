import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ViewingStats from "../components/ViewingStats";

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
      <ViewingStats
        headingText="All-Time Viewing Stats"
        taglineText={`${(
          data.year.nodes.length - 1
        ).toString()} Years in Review`}
        currentYear={pageContext.yearScope}
        years={data.year.nodes.map((node) => node.year)}
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
        mostWatchedMovies={movies.mostWatched}
        decades={movies.decades}
        venues={movies.venues}
        mostWatchedDirectors={directors.mostWatched}
        mostWatchedPerformers={performers.mostWatched}
        mostWatchedWriters={writers.mostWatched}
      />
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
