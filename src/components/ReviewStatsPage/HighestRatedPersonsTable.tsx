import { Link } from "gatsby";
import React from "react";
import DetailsTable from "../DetailsTable";
import Grade from "../Grade";
import {
  titleYearCss,
  viaCss,
  viewingDetailCss,
} from "./HighestRatedPersonsTable.module.scss";

interface Review {
  prettyDate: string;
  gradeValue: number;
  title: string;
  year: number;
  slug: string;
  sequence: number;
}

function MovieTitle({ review }: { review: Review }): JSX.Element {
  return (
    <Link to={`/reviews/${review.slug}`}>
      <>
        {review.title} <span className={titleYearCss}>{review.year}</span>
      </>
    </Link>
  );
}

function ReviewDetail({ review }: { review: Review }): JSX.Element {
  return (
    <span className={viewingDetailCss}>
      <span className={viaCss}>on</span> {review.prettyDate}
    </span>
  );
}

interface Review {
  prettyDate: string;
  gradeValue: number;
  title: string;
  year: number;
  slug: string;
  sequence: number;
}

interface PersonWithReviews {
  fullName: string;
  slug: string | null;
  reviews: Review[];
  averageGradeValue: number;
}

function buildPersonName(
  person: PersonWithReviews,
  slugPath: string
): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/${slugPath}/${person.slug}/`}>
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

export default function HighestRatedPersonsTable({
  heading,
  people,
  slugPath,
}: {
  heading: string;
  people: PersonWithReviews[];
  slugPath: string;
}): JSX.Element {
  return DetailsTable<PersonWithReviews>({
    heading,
    collection: people,
    leftHeaderText: "Name",
    rightHeaderText: "Grade",
    renderKey: (person) => person.fullName,
    renderLeft: (person) => buildPersonName(person, slugPath),
    renderRight: ({ averageGradeValue }: PersonWithReviews) =>
      averageGradeValue.toFixed(2),
    renderDetails: (item: PersonWithReviews) => {
      return item.reviews.map((review) => {
        return (
          <li key={review.sequence}>
            <>
              <Grade gradeValue={review.gradeValue} />{" "}
              <MovieTitle review={review} /> <ReviewDetail review={review} />
            </>
          </li>
        );
      });
    },
  });
}
