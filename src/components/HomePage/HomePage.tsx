import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useRef } from "react";
import toSentenceArray from "../../utils/to-sentence-array";
import DateIcon from "../DateIcon";
import Grade from "../Grade";
import Layout from "../Layout";
import { PaginationWithLinks } from "../Pagination";
import RenderedMarkdown from "../RenderedMarkdown";
import WatchlistLinks from "../WatchlistLinks";
import {
  articleBodyCss,
  articleFooterCss,
  articleHeadingCss,
  containerCss,
  dateCss,
  imageLinkCss,
  listCss,
  listItemCss,
  paginationCss,
  reviewCreditsCss,
  reviewCss,
  reviewGradeCss,
  reviewHeaderCss,
  reviewYearCss,
  watchlistLinksCss,
  wideCss,
} from "./HomePage.module.scss";

interface WatchlistEntity {
  name: string;
  slug: string;
  avatar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface PageData {
  update: {
    nodes: {
      frontmatter: {
        imdbId: string;
        slug: string;
        grade: string;
        date: string;
        sequence: number;
      };
      linkedExcerpt: string;
      reviewedMovie: {
        title: string;
        year: number;
        principalCastNames: string[];
        directorNames: string[];
        backdrop: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        watchlist: {
          performers: WatchlistEntity[];
          directors: WatchlistEntity[];
          writers: WatchlistEntity[];
          collections: WatchlistEntity[];
        };
      };
    }[];
  };
}

/**
 * Renders the home (index) page.
 */
export default function HomePage({
  pageContext,
  data,
}: {
  pageContext: {
    limit: number;
    skip: number;
    numberOfItems: number;
    currentPage: number;
  };
  data: PageData;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const {
    update: { nodes: updates },
  } = data;

  return (
    <Layout>
      <main className={containerCss} ref={listHeader}>
        <ol className={listCss}>
          {updates.map((update, index) => {
            const review = update;
            const isWide =
              index === 0 ||
              (index === updates.length - 1 && updates.length % 2 === 0);
            const listItemValue =
              pageContext.numberOfItems - pageContext.skip - index;
            const movie = update.reviewedMovie;

            return (
              <li
                key={review.frontmatter.sequence}
                value={listItemValue}
                className={`${listItemCss} ${isWide ? wideCss : ""}`}
              >
                <article className={`${reviewCss} ${isWide ? wideCss : ""}`}>
                  <Link
                    rel="canonical"
                    className={imageLinkCss}
                    to={`/reviews/${review.frontmatter.slug}/`}
                  >
                    {movie.backdrop && (
                      <GatsbyImage
                        image={movie.backdrop.childImageSharp.gatsbyImageData}
                        alt={`A still from ${movie.title} (${movie.year})`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </Link>
                  <header className={reviewHeaderCss}>
                    <h2 className={articleHeadingCss}>
                      <Link
                        to={`/reviews/${review.frontmatter.slug}/`}
                        rel="canonical"
                      >
                        {movie.title}{" "}
                        <span className={reviewYearCss}>{movie.year}</span>
                      </Link>
                    </h2>
                    <Grade
                      grade={review.frontmatter.grade}
                      className={reviewGradeCss}
                    />
                    <p className={reviewCreditsCss}>
                      Directed by {toSentenceArray(movie.directorNames)}.
                      Starring {toSentenceArray(movie.principalCastNames)}.
                    </p>
                  </header>
                  <RenderedMarkdown
                    className={articleBodyCss}
                    text={review.linkedExcerpt}
                    tag="main"
                  />
                  <footer className={articleFooterCss}>
                    <div className={dateCss}>
                      <DateIcon /> {review.frontmatter.date}
                    </div>
                    <WatchlistLinks
                      movie={movie}
                      className={watchlistLinksCss}
                    />
                  </footer>
                </article>
              </li>
            );
          })}
        </ol>
        <PaginationWithLinks
          className={paginationCss}
          currentPage={pageContext.currentPage}
          urlRoot="/"
          perPage={pageContext.limit}
          numberOfItems={pageContext.numberOfItems}
          prevText="Newer"
          nextText="Older"
        />
      </main>
    </Layout>
  );
}
