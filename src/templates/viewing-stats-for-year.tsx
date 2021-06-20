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
          data.year.nodes.length - 1
        ).toString()} Years in Review`}
        currentYear={pageContext.yearScope}
        years={data.year.nodes.map((node) => node.year)}
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

export interface MostWatchedPerson {
  fullName: string;
  slug: string | null;
  viewingCount: number;
  viewings: {
    prettyDate: string;
    venue: string;
    title: string;
    year: number;
    slug: string | null;
  }[];
}

export interface PageQueryResult {
  overall: {
    movieCount: number;
    newMovieCount: number;
    viewingCount: number;
  };
  decade: {
    stats: {
      decade: string;
      viewingCount: number;
    }[];
  };
  venue: {
    stats: {
      name: string;
      viewingCount: number;
    }[];
  };
  mostWatchedMovies: {
    movies: {
      title: string;
      year: number;
      slug: string | null;
      viewings: {
        prettyDate: string;
        venue: string;
      }[];
      viewingCount: number;
    }[];
  };
  mostWatchedDirectors: {
    directors: MostWatchedPerson[];
  };
  mostWatchedPerformers: {
    performers: MostWatchedPerson[];
  };
  mostWatchedWriters: {
    writers: MostWatchedPerson[];
  };
  year: {
    nodes: {
      year: string;
    }[];
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
        name
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
          title
          year
          slug
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
          title
          year
          slug
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
          title
          year
          slug
        }
      }
    }
    year: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      nodes {
        year: viewing_year
      }
    }
  }
`;
