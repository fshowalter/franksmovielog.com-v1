import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React, { useRef } from "react";
import DateIcon from "../components/DateIcon";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import { PaginationWithLinks } from "../components/Pagination";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import WatchlistLinks from "../components/WatchlistLinks";
import { MarkdownReview } from "../types";
import toSentenceArray from "../utils/to-sentence-array";
import styles from "./home.module.scss";

/**
 * Renders the home (index) page.
 */
export default function HomeTemplate({
  pageContext,
  data,
}: {
  pageContext: PageContext;
  data: PageQueryResult;
}): JSX.Element {
  const listHeader = useRef<HTMLDivElement>(null);
  const {
    update: { nodes: updates },
  } = data;

  return (
    <Layout>
      <Seo
        pageTitle={
          pageContext.currentPage === 1
            ? "Frank's Movie Log: My Life at the Movies"
            : `Page ${pageContext.currentPage}`
        }
        description="Reviews of current, cult, classic, and forgotten films."
        article={false}
        image={null}
      />
      <main className={styles.container} ref={listHeader}>
        <ol className={styles.list}>
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
                value={listItemValue}
                className={`${styles.list_item} ${isWide ? styles.wide : ""}`}
              >
                <article
                  className={`${styles.review} ${isWide ? styles.wide : ""}`}
                >
                  <Link
                    rel="canonical"
                    className={styles.image_link}
                    to={`/reviews/${review.frontmatter.slug}/`}
                  >
                    {movie.backdrop && (
                      <Img
                        fluid={movie.backdrop.childImageSharp.fluid}
                        alt={`A still from ${movie.title} (${movie.year})`}
                        loading={index === 0 ? "eager" : "lazy"}
                        fadeIn={false}
                      />
                    )}
                  </Link>
                  <header className={styles.review_header}>
                    <h2 className={styles.article_heading}>
                      <Link
                        to={`/reviews/${review.frontmatter.slug}/`}
                        rel="canonical"
                      >
                        {movie.title}{" "}
                        <span className={styles.review_year}>{movie.year}</span>
                      </Link>
                    </h2>
                    <Grade
                      grade={review.frontmatter.grade}
                      className={styles.review_grade}
                    />
                    <p className={styles.review_credits}>
                      Directed by{" "}
                      {toSentenceArray(
                        movie.directors.map((person) => person.name)
                      )}
                      . Starring{" "}
                      {toSentenceArray(
                        movie.principalCast.map((person) => person.name)
                      )}
                      .
                    </p>
                  </header>
                  <RenderedMarkdown
                    className={styles.article_body}
                    text={review.linkedExcerpt}
                    tag="main"
                  />
                  <footer className={styles.article_footer}>
                    <div className={styles.date}>
                      <DateIcon /> {review.frontmatter.date}
                    </div>
                    <WatchlistLinks
                      movie={movie}
                      className={styles.watchlist_links}
                    />
                  </footer>
                </article>
              </li>
            );
          })}
        </ol>
        <PaginationWithLinks
          className={styles.pagination}
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

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export interface PageQueryResult {
  update: {
    nodes: MarkdownReview[];
  };
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    update: allMarkdownRemark(
      sort: { fields: [frontmatter___sequence], order: DESC }
      limit: $limit
      skip: $skip
      filter: { postType: { eq: "REVIEW" } }
    ) {
      nodes {
        postType
        frontmatter {
          date(formatString: "DD MMM, YYYY")
          grade
          slug
          title
          sequence
          imdbId: imdb_id
        }
        reviewedMovie {
          title
          year
          principalCast: principal_cast {
            name: full_name
          }
          directors {
            name: full_name
          }
          backdrop {
            childImageSharp {
              fluid(
                toFormat: JPG
                quality: 80
                srcSetBreakpoints: [355, 410, 459, 710, 810, 918, 1184]
                maxWidth: 592
                sizes: "(max-width: 414px) 355px, (max-width: 768px) 592px, (max-width: 1024px) 459px, (max-width: 1280px) 410px, 592px"
              ) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          watchlist {
            directors {
              name
              slug
              avatar {
                childImageSharp {
                  fixed(toFormat: JPG, width: 40, height: 40, quality: 80) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
            writers {
              name
              slug
              avatar {
                childImageSharp {
                  fixed(toFormat: JPG, width: 40, height: 40, quality: 80) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
            performers {
              name
              slug
              avatar {
                childImageSharp {
                  fixed(toFormat: JPG, width: 40, height: 40, quality: 80) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
            collections {
              name
              slug
              avatar {
                childImageSharp {
                  fixed(toFormat: JPG, width: 40, height: 40, quality: 80) {
                    ...GatsbyImageSharpFixed_tracedSVG
                  }
                }
              }
            }
          }
        }
        linkedExcerpt
      }
    }
  }
`;
