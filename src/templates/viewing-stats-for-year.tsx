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
  const {
    overall,
    mostWatchedPerformers,
    mostWatchedDirectors,
    mostWatchedWriters,
    mostWatchedMovies,
    decade,
    venue,
  } = data;

  return (
    <Layout>
      <Seo
        pageTitle="All-Time Viewing Stats"
        description="My all-time most watched titles, performers, directors and writers."
        article={false}
        image={null}
      />
      <ViewingStats
        headingText="All-Time Viewing Stats"
        taglineText={`${(
          data.years.nodes.length - 1
        ).toString()} Years in Review`}
        currentYear={pageContext.yearScope}
        years={data.years.nodes.map((node) => node.year)}
        stats={[
          {
            number: overall.viewingCount,
            text: "Viewings",
          },
          {
            number: overall.movieCount,
            text: "Movies",
          },
          {
            number: overall.newMovieCount,
            text: "New Movies",
          },
        ]}
        mostWatchedMovies={mostWatchedMovies.movies}
        decades={decade.stats}
        venues={venue.stats}
        mostWatchedDirectors={mostWatchedDirectors.directors}
        mostWatchedPerformers={mostWatchedPerformers.performers}
        mostWatchedWriters={mostWatchedWriters.writers}
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

export interface DecadeStats {
  decade: string;
  viewingCount: number;
}

export interface VenueStats {
  venue: string;
  viewingCount: number;
}

export interface PageQueryResult {
  overall: {
    movieCount: number;
    newMovieCount: number;
    viewingCount: number;
  };
  decade: {
    stats: DecadeStats[];
  };
  venue: {
    stats: VenueStats[];
  };
  mostWatchedMovies: {
    movies: Movie[];
  };
  mostWatchedDirectors: {
    directors: PersonWithViewings[];
  };
  mostWatchedPerformers: {
    performers: PersonWithViewings[];
  };
  mostWatchedWriters: {
    writers: PersonWithViewings[];
  };
  years: {
    nodes: [
      {
        year: string;
      }
    ];
  };
}

export const pageQuery = graphql`
  query ($yearScope: String) {
    overall: viewingStatsJson(viewing_year: { eq: $yearScope }) {
      movieCount: movie_count
      newMovieCount: new_movie_count
      viewingCount: viewing_count
    }
    decade: viewingCountsForDecadesJson(viewing_year: { eq: $yearScope }) {
      stats: decade_stats {
        decade
        viewingCount: viewing_count
      }
    }
    venue: viewingCountsForVenuesJson(viewing_year: { eq: $yearScope }) {
      stats: venue_stats {
        venue
        viewingCount: viewing_count
      }
    }
    mostWatchedMovies: mostWatchedMoviesJson(viewing_year: { eq: $yearScope }) {
      movies {
        title
        year
        slug
        viewings {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
        }
        viewingCount: viewing_count
      }
    }
    mostWatchedDirectors: mostWatchedDirectorsJson(
      viewing_year: { eq: $yearScope }
    ) {
      directors: most_watched {
        fullName: full_name
        slug: slug
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
    mostWatchedPerformers: mostWatchedPerformersJson(
      viewing_year: { eq: $yearScope }
    ) {
      performers: most_watched {
        fullName: full_name
        slug: slug
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
    mostWatchedWriters: mostWatchedWritersJson(
      viewing_year: { eq: $yearScope }
    ) {
      writers: most_watched {
        fullName: full_name
        slug: slug
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
    years: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      nodes {
        year: viewing_year
      }
    }
  }
`;
