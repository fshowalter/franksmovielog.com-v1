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

export function Poster({
  slug,
  image,
  title,
  year,
  grade,
  date,
  venue,
  details,
  showTitle = true,
}: {
  slug: string | null;
  image: Image;
  title: string;
  year: number;
  grade?: string | null;
  date?: string;
  venue?: string;
  showTitle?: boolean;
  details?: React.ReactNode;
}): JSX.Element {
  console.log(!details);
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
              {venue && <div>{venue}</div>}
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
            {venue && <div>{venue}</div>}
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
