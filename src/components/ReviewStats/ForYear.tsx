import { graphql } from "gatsby";
import React from "react";
import Seo from "../Seo";
import StatCallouts from "../StatCallouts";
import StatsLayout from "../StatsLayout";
import AverageGradeForDecadeTable from "./AverageGradeForDecadeTable";
import GradeDistributionTable from "./GradeDistributionTable";
import HighestRatedPersonsTable from "./HighestRatedPersonsTable";
import ReviewYearNavigation from "./ReviewYearNavigation";

function hrefForDirector(slug: string) {
  return `/watchlist/directors/${slug}/`;
}

function hrefForPerformer(slug: string) {
  return `/watchlist/performers/${slug}/`;
}

function hrefForWriter(slug: string) {
  return `/watchlist/writers/${slug}/`;
}

function buildSubHeading(yearScope: string): string {
  if (yearScope === new Date().getFullYear().toString()) {
    return "A Year in Progress...";
  }

  return "A Year in Review";
}

/**
 * Renders the all-time review stats template.
 */
export default function ForYearReviewStats({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const { overall, performers, directors, writers, decade, gradeDistribution } =
    data;
  const years = data.year.nodes.map((node) => node.year);
  const { yearScope } = pageContext;

  return (
    <>
      <Seo
        pageTitle={`${yearScope} Review Stats`}
        description={`My highest rate performers, directors and writers for ${yearScope}.`}
        article={false}
        image={null}
      />
      <StatsLayout
        heading="All-Time Viewing Stats"
        subHeading={
          <>
            {buildSubHeading(yearScope)}
            <ReviewYearNavigation currentYear={yearScope} years={years} />
          </>
        }
      >
        <StatCallouts
          stats={[
            {
              number: overall.reviewCount,
              text: "Reviews",
            },
            {
              number: Math.round(overall.averageWordsPerReview),
              text: "Average Words Per Review",
            },
          ]}
        />
        <GradeDistributionTable distributionStats={gradeDistribution.stats} />
        <AverageGradeForDecadeTable decadeStats={decade.stats} />
        <HighestRatedPersonsTable
          heading="Highest Rated Directors"
          people={directors.highestRated}
          renderHref={hrefForDirector}
        />
        <HighestRatedPersonsTable
          heading="Highest Rated Performers"
          people={performers.highestRated}
          renderHref={hrefForPerformer}
        />
        <HighestRatedPersonsTable
          heading="Highest Rated Writers"
          people={writers.highestRated}
          renderHref={hrefForWriter}
        />
      </StatsLayout>
    </>
  );
}

export interface PageContext {
  yearScope: string;
}

export interface Person {
  fullName: string;
  slug: string | null;
  averageGradeValue: number;
  reviews: {
    sequence: number;
    prettyDate: string;
    gradeValue: number;
    title: string;
    year: number;
    slug: string;
  }[];
}

export interface PageQueryResult {
  overall: {
    averageWordsPerReview: number;
    reviewCount: number;
  };
  decade: {
    stats: {
      decade: string;
      averageGradeValue: number;
    }[];
  };
  gradeDistribution: {
    stats: {
      grade: string;
      reviewCount: number;
    }[];
  };
  directors: {
    highestRated: Person[];
  };
  performers: {
    highestRated: Person[];
  };
  writers: {
    highestRated: Person[];
  };
  year: {
    nodes: {
      year: string;
    }[];
  };
}

export const pageQuery = graphql`
  query ($yearScope: String) {
    overall: reviewStatsJson(review_year: { eq: $yearScope }) {
      averageWordsPerReview: average_words_per_review
      reviewCount: total_review_count
    }
    gradeDistribution: gradeDistributionsJson(review_year: { eq: $yearScope }) {
      stats: distributions {
        grade
        reviewCount: review_count
      }
    }
    decade: averageGradeForDecadesJson(review_year: { eq: $yearScope }) {
      stats: decade_stats {
        decade
        averageGradeValue: average_grade_value
      }
    }
    directors: highestRatedDirectorsJson(review_year: { eq: $yearScope }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          sequence
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    performers: highestRatedPerformersJson(review_year: { eq: $yearScope }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          sequence
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    writers: highestRatedWritersJson(review_year: { eq: $yearScope }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          sequence
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    year: allReviewStatsJson(sort: { fields: review_year, order: DESC }) {
      nodes {
        year: review_year
      }
    }
  }
`;
