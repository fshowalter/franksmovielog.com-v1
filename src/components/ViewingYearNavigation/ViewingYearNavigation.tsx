import React from "react";
import YearNavigation from "../YearNavigation";

export default function ViewingYearNavigation({
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
          return "/viewings/stats/";
        }

        return `/viewings/stats/${year}/`;
      }}
      years={years}
    />
  );
}
