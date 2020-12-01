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
            const isFirst = index === 0;
            const isLast = index === updates.length - 1;
            const listItemValue =
              pageContext.numberOfItems - pageContext.skip - index;
            const movie = update.reviewedMovie;

            return (
              <li value={listItemValue} className={styles.list_item}>
                <article
                  className={`${styles.review} ${isFirst ? styles.first : ""} ${
                    isLast ? styles.last : ""
                  }`}
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
              fluid(toFormat: WEBP, maxWidth: 592, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          watchlist {
            directors {
              name
              slug
            }
            writers {
              name
              slug
            }
            performers {
              name
              slug
            }
            collections {
              name
              slug
            }
          }
        }
        linkedExcerpt
      }
    }
  }
`;
