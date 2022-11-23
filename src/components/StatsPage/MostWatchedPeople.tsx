import { graphql } from "gatsby";
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
  people: Queries.MostWatchedPeopleFragment | null;
  nameRenderer: ({
    person,
  }: {
    person: Queries.MostWatchedPersonFragment;
  }) => JSX.Element;
}): JSX.Element | null {
  if (!people) {
    return null;
  }

  const maxBar = people.mostWatched.reduce((acc, person) => {
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
        {people.mostWatched.map((person) => {
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
                          slug={viewing.reviewedMovie?.slug}
                          year={viewing.year}
                          date={viewing.viewingDate}
                          venue={viewing.venue}
                          medium={viewing.medium}
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

export const query = graphql`
  fragment MostWatchedPerson on MostWatchedPerson {
    fullName
    slug
    viewingCount
    viewings {
      sequence
      viewingDate(formatString: "ddd MMM D, YYYY")
      venue
      medium
      title
      year
      reviewedMovie {
        slug
      }
      poster {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [JPG, AVIF]
            quality: 80
            width: 200
            placeholder: TRACED_SVG
          )
        }
      }
    }
  }

  fragment MostWatchedPeople on MostWatchedPeople {
    mostWatched {
      ...MostWatchedPerson
    }
  }
`;
