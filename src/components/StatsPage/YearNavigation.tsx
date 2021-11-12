import { Link } from "gatsby";
import React from "react";
import {
  allTimeCss,
  listCss,
  listItemCss,
  listItemLinkCss,
} from "./YearNavigation.module.scss";

function AllTimeLink({
  currentYear,
  linkFunc,
}: {
  currentYear: string;
  linkFunc: (year: string) => string;
}): JSX.Element {
  if (!currentYear || currentYear === "all") {
    return <></>;
  }

  return (
    <li className={allTimeCss}>
      <Link to={linkFunc("all")} className={listItemLinkCss}>
        All-Time
      </Link>
    </li>
  );
}

function YearLink({
  year,
  currentYear,
  linkFunc,
}: {
  year: string;
  currentYear: string;
  linkFunc: (y: string) => string;
}): JSX.Element | null {
  if (year === "all") {
    return null;
  }

  if (year === currentYear) {
    return <li className={listItemCss}>{year}</li>;
  }

  return (
    <li className={listItemCss}>
      <Link to={linkFunc(year)} className={listItemLinkCss}>
        {year}
      </Link>
    </li>
  );
}

export default function YearNavigation({
  currentYear,
  years,
  linkFunc,
}: {
  currentYear: string;
  years: string[];
  linkFunc: (year: string) => string;
}): JSX.Element {
  return (
    <ul className={listCss}>
      <AllTimeLink currentYear={currentYear} linkFunc={linkFunc} />
      {years.map((year) => {
        return (
          <YearLink
            key={year}
            year={year}
            currentYear={currentYear}
            linkFunc={linkFunc}
          />
        );
      })}
    </ul>
  );
}
