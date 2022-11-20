import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Grade from "../Grade";
import {
  listCss,
  listItemCss,
  listItemGradeCss,
  listItemImageWrapCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
} from "./PosterList.module.scss";

function MediumAndVenue({
  medium,
  venue,
}: {
  medium?: string | null;
  venue?: string | null;
}): JSX.Element | null {
  if (medium && venue) {
    return (
      <>
        <div>
          {medium} at {venue}
        </div>
      </>
    );
  }

  if (medium) {
    return (
      <>
        <div>{medium}</div>
      </>
    );
  }

  if (venue) {
    return (
      <>
        <div>{venue}</div>
      </>
    );
  }

  return null;
}

export function Poster({
  slug,
  image,
  title,
  year,
  grade,
  date,
  venue,
  medium,
  details,
  showTitle = true,
}: {
  slug?: string | null;
  image: Image;
  title: string;
  year: number;
  grade?: string | null;
  date?: string;
  venue?: string | null;
  medium?: string | null;
  showTitle?: boolean;
  details?: React.ReactNode;
}): JSX.Element {
  if (slug) {
    return (
      <li className={listItemCss}>
        <Link className={listItemImageWrapCss} to={`/reviews/${slug}/`}>
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={`A poster from ${title} (${year})`}
          />
        </Link>
        {details && details}
        {typeof details === "undefined" && (
          <>
            {showTitle && (
              <div className={listItemTitleCss}>
                <Link to={`/reviews/${slug}/`}>
                  {title} <span className={listItemTitleYearCss}>{year}</span>
                </Link>
              </div>
            )}
            <div className={listItemSlugCss}>
              {grade && <Grade grade={grade} className={listItemGradeCss} />}
              {date && <div>{date}</div>}
              <MediumAndVenue medium={medium} venue={venue} />
            </div>
          </>
        )}
      </li>
    );
  }

  return (
    <li className={listItemCss}>
      <div className={listItemImageWrapCss}>
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt="An unreviewed title."
        />
      </div>
      {details && details}
      {typeof details === "undefined" && (
        <>
          <div className={listItemTitleCss}>
            {title} <span className={listItemTitleYearCss}>{year}</span>
          </div>
          <div className={listItemSlugCss}>
            {date && <div>{date}</div>}
            <MediumAndVenue medium={medium} venue={venue} />
          </div>
        </>
      )}
    </li>
  );
}

export function PosterList({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ol className={listCss}>{children}</ol>;
}

interface Image {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}
