import React from "react";
import { Poster, PosterList } from "../PosterList";
import {
  barCss,
  barSpaceCss,
  containerCss,
  detailsLabelCss,
  detailsRowCss,
  headerCss,
  headerRowCss,
  nameCss,
  nameHeaderCss,
  parentListCss,
  parentListItemCss,
  viewingsCss,
  viewingsHeaderCss,
} from "./MostWatchedPeople.module.scss";
import type { Person } from "./StatsPage";

function BarGraph({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className={barCss} style={barPercentProperty}>
      &nbsp;
    </div>
  );
}

export default function MostWatchedPeople({
  people,
  header,
  nameRenderer,
}: {
  header: string;
  people: Person[];
  nameRenderer: ({ person }: { person: Person }) => JSX.Element;
}): JSX.Element {
  const maxBar = people.reduce((acc, person) => {
    const value = person.viewingCount;
    return acc > value ? acc : value;
  }, 0);

  return (
    <section className={containerCss}>
      <h3 className={headerCss}>{header}</h3>
      <header className={headerRowCss}>
        <span className={nameHeaderCss}>Name</span>
        <span className={viewingsHeaderCss}>Viewings</span>
      </header>
      <ol className={parentListCss}>
        {people.map((person) => {
          return (
            <li key={person.fullName} className={parentListItemCss}>
              <span className={nameCss}>{nameRenderer({ person })}</span>
              <span className={barSpaceCss}>
                <BarGraph value={person.viewingCount} maxValue={maxBar} />
              </span>
              <span className={viewingsCss}>{person.viewingCount}</span>
              <div className={detailsRowCss}>
                <details>
                  <summary className={detailsLabelCss}>Details</summary>
                  <PosterList>
                    {person.viewings.map((viewing) => {
                      return (
                        <Poster
                          key={viewing.sequence}
                          image={viewing.poster}
                          title={viewing.title}
                          slug={viewing.slug}
                          year={viewing.year}
                          date={viewing.viewingDate}
                          venue={viewing.venue}
                          showTitle={false}
                        />
                      );
                    })}
                  </PosterList>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
