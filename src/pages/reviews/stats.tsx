import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import ReviewStats from "../../components/ReviewStats";
import Seo from "../../components/Seo";

/**
 * Renders the all-time review stats template.
 */
export default function AllTimeReviewStatsTemplate({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const { performers, directors, writers, decades, gradeDistributions } = data;

  return (
    <Layout>
      <Seo
        pageTitle="All-Time Review Stats"
        description="My all-time highest rate performers, directors and writers."
        article={false}
        image={null}
      />
      <ReviewStats
        headingText="All-Time Viewing Stats"
        taglineText={`${(
          data.year.nodes.length - 1
        ).toString()} Years in Review`}
        years={data.year.nodes.map((node) => node.year)}
        stats={[]}
        grades={gradeDistributions.distributions}
        currentYear={pageContext.yearScope}
        decades={decades.decades}
        highestRatedDirectors={directors.highestRated}
        highestRatedPerformers={performers.highestRated}
        highestRatedWriters={writers.highestRated}
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
  averageGradeValue: number;
  reviews: Review[];
}

export interface Review {
  prettyDate: string;
  gradeValue: number;
  movie: Movie;
}

export interface Movie {
  title: string;
  year: string;
  slug: string;
}

export interface Decade {
  decade: string;
  averageGradeValue: number;
}

export interface GradeDistribution {
  grade: string;
  reviewCount: number;
}

export interface PageQueryResult {
  movies: {
    reviewCount: number;
  };
  decades: {
    decades: Decade[];
  };
  gradeDistributions: {
    distributions: GradeDistribution[];
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
    nodes: [
      {
        year: string;
      }
    ];
  };
}

export const pageQuery = graphql`
  query {
    gradeDistributions: gradeDistributionsJson(review_year: { eq: "all" }) {
      distributions {
        grade
        reviewCount: review_count
      }
    }
    decades: averageGradeForDecadesJson(review_year: { eq: "all" }) {
      decade: decade_stats {
        decade
        averageGradeValue: average_grade_value
      }
    }
    directors: highestRatedDirectorsJson(review_year: { eq: "all" }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    performers: highestRatedPerformersJson(review_year: { eq: "all" }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    writers: highestRatedWritersJson(review_year: { eq: "all" }) {
      highestRated: highest_rated {
        fullName: full_name
        slug
        reviewCount: review_count
        averageGradeValue: average_grade_value
        reviews {
          prettyDate: date(formatString: "ddd MMM D, YYYY")
          gradeValue: grade_value
          title
          year
          slug
        }
      }
    }
    years: allReviewStatsJson(sort: { fields: review_year, order: DESC }) {
      nodes {
        year: review_year
      }
    }
  }
`;
