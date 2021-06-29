import { graphql } from "gatsby";
import React from "react";
import BarGraphTable from "../BarGraphTable/BarGraphTable";
import Seo from "../Seo";
import StatCallouts from "../StatCallouts";
import StatsLayout from "../StatsLayout";
import YearNavigation from "../YearNavigation";
import MostWatchedMoviesTable from "./MostWatchedMoviesTable";
import MostWatchedPersonsTable from "./MostWatchedPersonsTable";

function ViewingYearNavigation({
  currentYear,
  years,
}: {
  currentYear: string;
  years: string[];
}): JSX.Element {
  return (
    <YearNavigation
      currentYear={currentYear}
      linkFunc={(year: string) => {
        if (year === "all") {
          return "/viewings/stats/";
        }

        return `/viewings/stats/${year}/`;
      }}
      years={years}
    />
  );
}

function SubHeading({
  yearScope,
  years,
}: {
  yearScope: string;
  years: string[];
}): JSX.Element {
  let subTitle = "A Year in Review";

  if (yearScope === "all") {
    subTitle = `${(years.length - 1).toString()} Years in Review`;
  }

  if (yearScope === new Date().getFullYear().toString()) {
    subTitle = "A Year in Progress...";
  }

  return (
    <>
      {subTitle}
      <ViewingYearNavigation currentYear={yearScope} years={years} />
    </>
  );
}

function ViewingStatCallouts({
  viewingCount,
  movieCount,
  newMovieCount,
}: {
  viewingCount: number;
  movieCount: number;
  newMovieCount: number;
}): JSX.Element {
  const stats = [
    {
      number: viewingCount,
      text: "Viewings",
    },
    {
      number: movieCount,
      text: "Movies",
    },
  ];

  if (movieCount != newMovieCount) {
    stats.push({
      number: newMovieCount,
      text: "New Movies",
    });
  }

  return <StatCallouts stats={stats} />;
}

/**
 * Renders the all-time review stats template.
 */
export default function ViewingStatsPage({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const { overall, performers, directors, writers, decade, movies, venue } =
    data;
  const years = data.year.nodes.map((node) => node.year);
  const { yearScope } = pageContext;

  const pageTitle =
    yearScope === "all"
      ? "All-Time Viewing Stats"
      : `${yearScope} Viewing Stats`;

  return (
    <>
      <Seo
        pageTitle={pageTitle}
        description={`My most-watched performers, directors and writers for ${yearScope}.`}
        article={false}
        image={null}
      />
      <StatsLayout
        heading={pageTitle}
        subHeading={<SubHeading yearScope={yearScope} years={years} />}
      >
        <ViewingStatCallouts {...overall} />
        <MostWatchedMoviesTable movies={movies.mostWatched} />
        <BarGraphTable
          heading="Viewings By Release Decade"
          collection={decade.stats}
          nameHeaderText="Decade"
          valueHeaderText="Viewings"
          renderName={(item) => item.decade}
          renderValue={(item) => item.viewingCount}
        />
        <BarGraphTable
          heading="Viewings By Venue"
          collection={venue.stats}
          nameHeaderText="Venue"
          valueHeaderText="Viewings"
          renderName={(item) => item.name}
          renderValue={(item) => item.viewingCount}
        />
        <MostWatchedPersonsTable
          heading="Most Watched Directors"
          people={directors.mostWatched}
          slugPath="directors"
        />
        <MostWatchedPersonsTable
          heading="Most Watched Performers"
          people={performers.mostWatched}
          slugPath="performers"
        />
        <MostWatchedPersonsTable
          heading="Most Watched Writers"
          people={writers.mostWatched}
          slugPath="writers"
        />
      </StatsLayout>
    </>
  );
}

export interface PageContext {
  yearScope: string;
}

interface Person {
  fullName: string;
  slug: string | null;
  viewingCount: number;
  viewings: {
    sequence: number;
    prettyDate: string;
    venue: string;
    title: string;
    year: number;
    slug: string | null;
  }[];
}

interface PageQueryResult {
  overall: {
    viewingCount: number;
    movieCount: number;
    newMovieCount: number;
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
  movies: {
    mostWatched: {
      imdbId: string;
      title: string;
      year: number;
      slug: string | null;
      viewings: {
        sequence: number;
        prettyDate: string;
        venue: string;
        slug: string | null;
      }[];
      viewingCount: number;
    }[];
  };
  directors: {
    mostWatched: Person[];
  };
  performers: {
    mostWatched: Person[];
  };
  writers: {
    mostWatched: Person[];
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
      stats {
        decade
        viewingCount: viewing_count
      }
    }
    venue: viewingCountsForVenuesJson(viewing_year: { eq: $yearScope }) {
      stats {
        name
        viewingCount: viewing_count
      }
    }
    movies: mostWatchedMoviesJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        imdbId: imdb_id
        title
        year
        slug
        viewings {
          sequence
          slug
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
        }
        viewingCount: viewing_count
      }
    }
    directors: mostWatchedDirectorsJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug: slug
        viewingCount: viewing_count
        viewings {
          sequence
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          title
          year
          slug
        }
      }
    }
    performers: mostWatchedPerformersJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug: slug
        viewingCount: viewing_count
        viewings {
          sequence
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          venue
          title
          year
          slug
        }
      }
    }
    writers: mostWatchedWritersJson(viewing_year: { eq: $yearScope }) {
      mostWatched: most_watched {
        fullName: full_name
        slug: slug
        viewingCount: viewing_count
        viewings {
          sequence
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
