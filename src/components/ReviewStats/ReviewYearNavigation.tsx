import React from "react";
import YearNavigation from "../YearNavigation";

export default function ReviewYearNavigation({
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
