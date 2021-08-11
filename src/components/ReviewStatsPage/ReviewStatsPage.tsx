import { graphql } from "gatsby";
import React from "react";
import BarGraphTable from "../BarGraphTable";
import Seo from "../Seo";
import StatCallouts from "../StatCallouts";
import StatsLayout from "../StatsLayout";
import YearNavigation from "../YearNavigation";
import HighestRatedPersonsTable from "./HighestRatedPersonsTable";

function ReviewYearNavigation({
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
          return "/reviews/stats/";
        }

        return `/reviews/stats/${year}/`;
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
      <ReviewYearNavigation currentYear={yearScope} years={years} />
    </>
  );
}

/**
 * Renders the all-time review stats template.
 */
export default function ReviewStatsPage({
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
  const pageTitle =
    yearScope === "all" ? "All-Time Review Stats" : `${yearScope} Review Stats`;

  return (
    <>
      <Seo
        pageTitle={pageTitle}
        description={`My highest-rated performers, directors and writers for ${yearScope}.`}
        article={false}
        image={null}
      />
      <StatsLayout
        heading={pageTitle}
        subHeading={<SubHeading yearScope={yearScope} years={years} />}
      >
        <StatCallouts
          stats={[
            {
              number: overall.reviewCount,
              text: "Reviews",
            },
            {
              number: Math.round(overall.averageWordsPerReview),
              text: "Words/Review",
            },
          ]}
        />
        <BarGraphTable
          heading="Grade Distribution"
          collection={gradeDistribution.stats}
          nameHeaderText="Grade"
          valueHeaderText="Reviews"
          renderName={(item) => item.grade}
          renderValue={(item) => item.reviewCount}
        />
        <BarGraphTable
          heading="Average Grades For Release Decade"
          collection={decade.stats}
          nameHeaderText="Decade"
          valueHeaderText="Grade"
          renderName={(item) => item.decade}
          renderValue={(item) =>
            item.averageGradeValue.toFixed(2) as unknown as number
          }
        />
        <HighestRatedPersonsTable
          heading="Highest Rated Directors"
          people={directors.highestRated}
          slugPath="directors"
        />
        <HighestRatedPersonsTable
          heading="Highest Rated Performers"
          people={performers.highestRated}
          slugPath="performers"
        />
        <HighestRatedPersonsTable
          heading="Highest Rated Writers"
          people={writers.highestRated}
          slugPath="writers"
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
    date: string;
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
      stats {
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
          date
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
          date
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
          date
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
