import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import DateIcon from "../components/DateIcon";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import { PaginationWithLinks } from "../components/Pagination";
import ReviewLink from "../components/ReviewLink";
import Seo from "../components/Seo";
import WatchlistLinks from "../components/WatchlistLinks";
import JsonReview from "../types/JsonReview";
import MarkdownReview from "../types/MarkdownReview";
import WatchlistMovie from "../types/WatchlistMovie";
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
  return (
    <Layout>
      <Seo
        title={
          pageContext.currentPage === 1
            ? "Home"
            : `Page ${pageContext.currentPage}`
        }
      />
      <main className={styles.container}>
        <ol className={styles.list}>
          {data.updates.nodes.map((update, index) => {
            const review = update;
            const listItemValue =
              data.updates.nodes.length - pageContext.skip - index;

            if (update.postType === "REVIEW") {
              const movieInfo = data.movieInfo.nodes.find(
                (item) => item.imdbId === review.frontmatter.imdbId
              );

              if (!movieInfo) {
                throw new Error(
                  `No review data found for ${review.frontmatter.title} (IMDb ID: ${review.frontmatter.imdbId})`
                );
              }

              const watchlistMovie = data.watchlistMovie.nodes.find(
                (movie) => movie.imdbId === review.frontmatter.imdbId
              );

              return (
                <li className={styles.list_item} value={listItemValue}>
                  <Link
                    rel="canonical"
                    className={styles.list_item_image_link}
                    to={`/reviews/${review.frontmatter.slug}/`}
                  >
                    <Img
                      fluid={review.backdrop.childImageSharp.fluid}
                      alt={`A still from ${movieInfo.title} (${movieInfo.year})`}
                    />
                  </Link>
                  <h2 className={styles.list_item_heading}>
                    <ReviewLink imdbId={review.frontmatter.imdbId}>
                      {movieInfo.title}{" "}
                      <span className={styles.list_item_heading_review_year}>
                        {movieInfo.year}
                      </span>
                    </ReviewLink>
                  </h2>
                  <Grade
                    grade={review.frontmatter.grade}
                    className={styles.review_grade}
                  />
                  <p className={styles.list_item_review_meta}>
                    Directed by{" "}
                    {toSentenceArray(
                      movieInfo.directors.map((person) => person.name)
                    )}
                    . Starring{" "}
                    {toSentenceArray(
                      movieInfo.principalCast.map((person) => person.name)
                    )}
                    .
                  </p>
                  <main
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: review.linkedExcerpt,
                    }}
                    className={styles.list_item_excerpt}
                  />
                  <footer className={styles.list_item_footer}>
                    <div className={styles.list_item_date}>
                      <DateIcon /> {review.frontmatter.date}
                    </div>
                    <WatchlistLinks
                      watchlistMovie={watchlistMovie}
                      className={styles.list_item_watchlist_links}
                    />
                  </footer>
                </li>
              );
            }
            return null;
          })}
        </ol>
        <PaginationWithLinks
          className={styles.pagination}
          currentPage={pageContext.currentPage}
          urlRoot="/"
          perPage={pageContext.limit}
          numberOfItems={pageContext.numberOfItems}
        />
      </main>
    </Layout>
  );
}

interface ReviewUpdate extends MarkdownReview {
  postType: "REVIEW";
}

export interface PageContext {
  limit: number;
  skip: number;
  numberOfItems: number;
  currentPage: number;
}

export interface PageQueryResult {
  updates: {
    nodes: ReviewUpdate[];
  };
  watchlistMovie: {
    nodes: WatchlistMovie[];
  };
  movieInfo: {
    nodes: JsonReview[];
  };
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $imdbIds: [String]) {
    updates: allMarkdownRemark(
      sort: { fields: [frontmatter___sequence], order: DESC }
      limit: $limit
      skip: $skip
      filter: {fileAbsolutePath: {regex: "content/(reviews)|(posts)/.*\\.md$/"}}
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
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, maxWidth: 518, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        linkedExcerpt
      }
    }

    movieInfo: allReviewsJson(filter: { imdb_id: { in: $imdbIds } }) {
      nodes {
        imdbId: imdb_id
        title
        year
        principalCast: principal_cast {
          name: full_name
        }
        directors {
          name: full_name
        }
      }
    }

    watchlistMovie: allWatchlistTitlesJson(
      filter: { imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        imdbId: imdb_id
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
  }
`;
