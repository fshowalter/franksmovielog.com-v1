import { graphql } from "gatsby";
import React from "react";
import ReviewsPage from "../components/ReviewsPage";
import Seo from "../components/Seo";

export default function ReviewsPageShell({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  return (
    <>
      <Seo
        pageTitle="All Reviews"
        description="A sortable and filterable list of all movie reviews on this site."
        image={null}
        article={false}
      />
      <ReviewsPage data={data} />
    </>
  );
}

interface PageQueryResult {
  reviews: {
    nodes: ReviewedMovie[];
  };
}

type ReviewedMovie = {
  releaseDate: string;
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  slug: string;
  imdbId: string;
  title: string;
  year: number;
  sortTitle: string;
};

export const query = graphql`
  query {
    reviews: allReviewedMoviesJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        releaseDate: release_date
        imdbId: imdb_id
        title
        year
        lastReviewGrade
        lastReviewGradeValue
        sortTitle: sort_title
        slug
      }
    }
  }
`;
