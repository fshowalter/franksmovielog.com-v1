import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import {
  barCss,
  barSpaceCss,
  containerCss,
  detailsLabelCss,
  detailsRowCss,
  headerCss,
  headerRowCss,
  listCss,
  listItemImageLinkCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
  nameCss,
  nameHeaderCss,
  parentListCss,
  parentListItemCss,
  viewingsCss,
  viewingsHeaderCss,
} from "./MostWatchedPeople.module.scss";
import type { Person, Viewing } from "./StatsPage";

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

function ListItem({ viewing }: { viewing: Viewing }): JSX.Element {
  if (viewing.slug) {
    return (
      <li>
        <Link className={listItemImageLinkCss} to={`/reviews/${viewing.slug}/`}>
          {viewing.poster && (
            <GatsbyImage
              image={viewing.poster.childImageSharp.gatsbyImageData}
              alt={`A poster from ${viewing.title} (${viewing.year})`}
            />
          )}
        </Link>
        <div className={listItemSlugCss}>
          <div>{viewing.viewingDate}</div>
          <div>{viewing.venue}</div>
        </div>
      </li>
    );
  }

  return (
    <li>
      <GatsbyImage
        image={viewing.poster.childImageSharp.gatsbyImageData}
        alt="An unreviewed title."
      />
      <div className={listItemTitleCss}>
        {viewing.title}{" "}
        <span className={listItemTitleYearCss}>{viewing.year}</span>
      </div>
      <div className={listItemSlugCss}>
        <div>{viewing.viewingDate}</div>
        <div>{viewing.venue}</div>
      </div>
    </li>
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
                  <ol className={listCss}>
                    {person.viewings.map((viewing) => {
                      return (
                        <ListItem key={viewing.sequence} viewing={viewing} />
                      );
                    })}
                  </ol>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
