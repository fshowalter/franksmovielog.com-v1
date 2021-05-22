import { Link } from "gatsby";
import React from "react";
import DetailsStatTable from "../DetailsStatTable";
import {
  linkCss,
  titleYearCss,
  viaCss,
  viewingDetailCss,
} from "./MostWatchedStatTable.module.scss";

export interface Viewing {
  prettyDate: string;
  venue: string;
  movie: Movie;
}

export interface Movie {
  title: string;
  year: string;
  slug: string;
}

export interface HasViewings {
  viewings: Viewing[];
  viewingCount: number;
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

export function ViewingDetail({ viewing }: { viewing: Viewing }): JSX.Element {
  return (
    <span className={viewingDetailCss}>
      {viewing.prettyDate} <span className={viaCss}>via</span> {viewing.venue}
    </span>
  );
}

export function MostWatchedStatTable<T extends HasViewings>({
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
  detailsFunc: (viewing: Viewing) => JSX.Element;
}): JSX.Element {
  return DetailsStatTable<T>({
    heading: heading,
    collection: collection,
    nameHeaderText: nameHeaderText,
    valueHeaderText: "Viewings",
    nameFunc: nameFunc,
    valueFunc: (item: T) => item.viewingCount,
    detailsFunc: (item: T) => {
      return item.viewings.map((viewing) => {
        return <li>{detailsFunc(viewing)}</li>;
      });
    },
  });
}
