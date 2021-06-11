import React from "react";
import MostWatchedMoviesStatTable, {
  MovieWithViewings,
} from "../MostWatchedMoviesStatTable";
import MostWatchedPersonsStatTable, {
  PersonWithViewings,
} from "../MostWatchedPersonsStatTable";
import StatCallouts, { Stat } from "../StatCallouts";
import {
  StatsLayout,
  StatsLayoutContent,
  StatsLayoutHeader,
} from "../StatsLayout";
import ViewingsByDecadeStatTable, {
  DecadeWithViewings,
} from "../ViewingsByDecadeStatTable";
import ViewingsByVenueStatTable, {
  VenueWithViewings,
} from "../ViewingsByVenueStatTable";
import ViewingYearNavigation from "../ViewingYearNavigation";

export default function ViewingStats({
  headingText,
  taglineText,
  currentYear,
  years,
  stats,
  mostWatchedMovies,
  decades,
  venues,
  mostWatchedDirectors,
  mostWatchedPerformers,
  mostWatchedWriters,
}: {
  taglineText: string;
  headingText: string;
  currentYear: string;
  years: string[];
  stats: Stat[];
  mostWatchedMovies: MovieWithViewings[];
  decades: DecadeWithViewings[];
  venues: VenueWithViewings[];
  mostWatchedDirectors: PersonWithViewings[];
  mostWatchedPerformers: PersonWithViewings[];
  mostWatchedWriters: PersonWithViewings[];
}): JSX.Element {
  return (
    <StatsLayout>
      <StatsLayoutHeader headingText={headingText}>
        {taglineText}
        <ViewingYearNavigation currentYear={currentYear} years={years} />
      </StatsLayoutHeader>
      <StatsLayoutContent>
        <StatCallouts stats={stats} />
        <MostWatchedMoviesStatTable collection={mostWatchedMovies} />
        <ViewingsByDecadeStatTable collection={decades} />
        <ViewingsByVenueStatTable collection={venues} />
        <MostWatchedPersonsStatTable
          collection={mostWatchedDirectors}
          watchlistType="directors"
        />
        <MostWatchedPersonsStatTable
          collection={mostWatchedPerformers}
          watchlistType="performers"
        />
        <MostWatchedPersonsStatTable
          collection={mostWatchedWriters}
          watchlistType="writers"
        />
      </StatsLayoutContent>
    </StatsLayout>
  );
}
