import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import ViewingStats from "../../components/ViewingStats";

/**
 * Renders the all-time viewing stats template.
 */
export default function AllTimeViewingStatsTemplate({
  data,
}: {
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
        currentYear={"all"}
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

interface MostWatchedMovie {
  title: string;
  year: number;
  slug: string | null;
  viewings: {
    prettyDate: string;
    venue: string;
  }[];
  viewingCount: number;
}

interface MostWatchedPerson {
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

interface PageQueryResult {
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
    movies: MostWatchedMovie[];
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
  years: {
    nodes: {
      year: string;
    }[];
  };
}

export const pageQuery = graphql`
  query {
    overall: viewingStatsJson(viewing_year: { eq: "all" }) {
      movieCount: movie_count
      newMovieCount: new_movie_count
      viewingCount: viewing_count
    }
    decade: viewingCountsForDecadesJson(viewing_year: { eq: "all" }) {
      stats: decade_stats {
        decade
        viewingCount: viewing_count
      }
    }
    venue: viewingCountsForVenuesJson(viewing_year: { eq: "all" }) {
      stats: venue_stats {
        name
        viewingCount: viewing_count
      }
    }
    mostWatchedMovies: mostWatchedMoviesJson(viewing_year: { eq: "all" }) {
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
      viewing_year: { eq: "all" }
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
      viewing_year: { eq: "all" }
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
    mostWatchedWriters: mostWatchedWritersJson(viewing_year: { eq: "all" }) {
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
    years: allViewingStatsJson(sort: { fields: viewing_year, order: DESC }) {
      nodes {
        year: viewing_year
      }
    }
  }
`;
