import React from "react";
import AverageGradeForDecadesStatTable, {
  DecadeWithAverageGrade,
} from "../AverageGradeForDecadesStatTable";
import GradeDistributionStatTable, {
  GradeDistribution,
} from "../GradeDistributionsStatTable";
import HighestRatedPersonsStatTable, {
  PersonWithReviews,
} from "../HighestRatedPersonsStatTable";
import ReviewYearNavigation from "../ReviewYearNavigation";
import StatCallouts, { Stat } from "../StatCallouts";
import {
  StatsLayout,
  StatsLayoutContent,
  StatsLayoutHeader,
} from "../StatsLayout";

export default function ReviewStats({
  headingText,
  taglineText,
  currentYear,
  years,
  stats,
  decades,
  grades,
  highestRatedDirectors,
  highestRatedPerformers,
  highestRatedWriters,
}: {
  taglineText: string;
  headingText: string;
  currentYear: string;
  years: string[];
  stats: Stat[];
  grades: GradeDistribution[];
  decades: DecadeWithAverageGrade[];
  highestRatedDirectors: PersonWithReviews[];
  highestRatedPerformers: PersonWithReviews[];
  highestRatedWriters: PersonWithReviews[];
}): JSX.Element {
  return (
    <StatsLayout>
      <StatsLayoutHeader headingText={headingText}>
        {taglineText}
        <ReviewYearNavigation currentYear={currentYear} years={years} />
      </StatsLayoutHeader>
      <StatsLayoutContent>
        <StatCallouts stats={stats} />
        <GradeDistributionStatTable collection={grades} />
        <AverageGradeForDecadesStatTable collection={decades} />
        <HighestRatedPersonsStatTable
          collection={highestRatedDirectors}
          watchlistType="directors"
        />
        <HighestRatedPersonsStatTable
          collection={highestRatedPerformers}
          watchlistType="performers"
        />
        <HighestRatedPersonsStatTable
          collection={highestRatedWriters}
          watchlistType="writers"
        />
      </StatsLayoutContent>
    </StatsLayout>
  );
}
