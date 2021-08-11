import { Link } from "gatsby";
import React from "react";
import DetailsTable from "../DetailsTable";
import Grade from "../Grade";
import {
  gradeCss,
  listItemCss,
  reviewDetailCss,
  reviewTitleCss,
  titleYearCss,
} from "./HighestRatedPersonsTable.module.scss";

interface Review {
  date: string;
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
          <li key={review.sequence} className={listItemCss}>
            <div className={reviewTitleCss}>
              <Grade className={gradeCss} gradeValue={review.gradeValue} />{" "}
              <Link to={`/reviews/${review.slug}`}>
                {review.title}{" "}
                <span className={titleYearCss}>{review.year}</span>
              </Link>{" "}
              <span className={reviewDetailCss}>on {review.date}</span>
            </div>
          </li>
        );
      });
    },
  });
}
