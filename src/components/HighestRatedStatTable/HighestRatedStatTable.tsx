import { Link } from "gatsby";
import React from "react";
import DetailsStatTable from "../DetailsStatTable";
import {
  linkCss,
  titleYearCss,
  viaCss,
  viewingDetailCss,
} from "./HighestRatedStatTable.module.scss";

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

export interface HasReviews {
  reviews: Review[];
  averageGradeValue: number;
}

export function TableLink({
  to,
  children,
}: {
  to: string;
  children: JSX.Element | string;
}): JSX.Element {
  return (
    <Link className={linkCss} to={to}>
      {children}
    </Link>
  );
}

export function MovieTitle({ movie }: { movie: Movie }): JSX.Element {
  if (movie.slug) {
    return (
      <TableLink to={`/reviews/${movie.slug}`}>
        <>
          {movie.title} <span className={titleYearCss}>{movie.year}</span>
        </>
      </TableLink>
    );
  }

  return (
    <>
      {movie.title} <span className={titleYearCss}>{movie.year}</span>
    </>
  );
}

export function ReviewDetail({ review }: { review: Review }): JSX.Element {
  return (
    <span className={viewingDetailCss}>
      <span className={viaCss}>on</span> {review.prettyDate}
    </span>
  );
}

export function HighestRatedStatTable<T extends HasReviews>({
  heading,
  nameHeaderText,
  collection,
  nameFunc,
  detailsFunc,
}: {
  heading: string;
  collection: T[];
  nameHeaderText: string;
  nameFunc: (item: T) => JSX.Element;
  detailsFunc: (review: Review) => JSX.Element;
}): JSX.Element {
  return DetailsStatTable<T>({
    heading,
    collection,
    nameHeaderText,
    valueHeaderText: "Grade",
    nameFunc,
    valueFunc: ({ averageGradeValue }: T) => (
      <>{averageGradeValue.toFixed(2)}</>
    ),
    detailsFunc: (item: T) => {
      return item.reviews.map((review) => {
        return <li>{detailsFunc(review)}</li>;
      });
    },
  });
}
