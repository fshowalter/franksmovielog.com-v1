import { Link } from "gatsby";
import React from "react";
import DetailsTable from "../DetailsTable";
import {
  titleYearCss,
  viaCss,
  viewingDetailCss,
} from "./MostWatchedPersonsTable.module.scss";

interface Viewing {
  sequence: number;
  title: string;
  prettyDate: string;
  venue: string;
  year: number;
  slug: string | null;
}

interface PersonWithViewings {
  fullName: string;
  slug: string | null;
  viewingCount: number;
  viewings: Viewing[];
}

function buildPersonName(
  person: PersonWithViewings,
  slugPath: string
): JSX.Element {
  if (person.slug) {
    return (
      <Link to={`/watchlist/${slugPath}/${person.slug}/`}>
        {person.fullName}
      </Link>
    );
  }

  return <>{person.fullName}</>;
}

function ViewingDetail({ viewing }: { viewing: Viewing }): JSX.Element {
  const viewingSlug = (
    <>
      {viewing.prettyDate} <span className={viaCss}>via</span> {viewing.venue}
    </>
  );

  if (viewing.slug) {
    return (
      <span className={viewingDetailCss}>
        <Link to={`/reviews/${viewing.slug}#${viewing.sequence}`}>
          {viewingSlug}
        </Link>
      </span>
    );
  }

  return <span className={viewingDetailCss}>{viewingSlug}</span>;
}

export default function MostWatchedPersonsTable({
  heading,
  people,
  slugPath,
}: {
  heading: string;
  people: PersonWithViewings[];
  slugPath: string;
}): JSX.Element {
  return DetailsTable<PersonWithViewings>({
    heading,
    collection: people,
    leftHeaderText: "Name",
    rightHeaderText: "Viewings",
    renderKey: (person) => person.fullName,
    renderLeft: (person) => buildPersonName(person, slugPath),
    renderRight: (person) => person.viewingCount,
    renderDetails: (item: PersonWithViewings) => {
      return item.viewings.map((viewing) => {
        return (
          <li key={viewing.sequence}>
            <>
              {viewing.title}{" "}
              <span className={titleYearCss}>{viewing.year}</span>{" "}
              <ViewingDetail viewing={viewing} />
            </>
          </li>
        );
      });
    },
  });
}
