import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import DateIcon from "../components/DateIcon";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import WatchlistLinks from "../components/WatchlistLinks";
import JsonReview from "../types/JsonReview";
import MarkdownReview from "../types/MarkdownReview";
import WatchlistMovie from "../types/WatchlistMovie";
import toSentenceArray from "../utils/to-sentence-array";
import * as styles from "./review.module.scss";

/**
 * Renders a review page.
 */
export default function Review({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const { movieInfo } = data;
  const { watchlistMovie } = data;
  const reviews = data.review.nodes;

  return (
    <Layout>
      <article className={styles.container}>
        <Img
          className={styles.image}
          fluid={reviews[0].backdrop.childImageSharp.fluid}
          alt={`A still from ${movieInfo.title} (${movieInfo.year})`}
        />
        <h1 className={styles.title}>
          {movieInfo.title}{" "}
          <span className={styles.title_year}>{movieInfo.year}</span>
        </h1>
        <aside className={styles.cast_and_crew}>
          <Img
            className={styles.poster}
            fluid={reviews[0].poster.childImageSharp.fluid}
            alt={`A poster from ${movieInfo.title} (${movieInfo.year})`}
          />
          <div className={styles.directors}>
            <span className={styles.cast_label}>Directed by</span>
            {toSentenceArray(
              movieInfo.directors.map((director) => director.name)
            )}
          </div>
          <div className={styles.cast}>
            <span className={styles.cast_label}>Starring</span>
            {toSentenceArray(
              movieInfo.principalCast.map((person) => person.name)
            )}
          </div>
          {watchlistMovie && (
            <div className={styles.watchlist}>
              <WatchlistLinks watchlistMovie={watchlistMovie} />
            </div>
          )}
        </aside>
        <ul className={styles.reviews}>
          {reviews.map((review) => {
            return (
              <li className={styles.review}>
                <div className={styles.slug}>
                  <DateIcon className={styles.date_icon} />{" "}
                  <span className={styles.date}>{review.frontmatter.date}</span>{" "}
                  via {review.frontmatter.venue} (
                  {review.frontmatter.venueNotes})
                </div>
                <div className={styles.content}>
                  <Grade
                    grade={review.frontmatter.grade}
                    className={styles.grade}
                  />
                  <div
                    className={styles.body}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: review.linkedHtml,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </article>
    </Layout>
  );
}

interface PageQueryResult {
  review: {
    nodes: MarkdownReview[];
  };
  movieInfo: JsonReview;
  watchlistMovie?: WatchlistMovie;
}

export const pageQuery = graphql`
  query($imdbId: String) {
    review: allMarkdownRemark(
      sort: { fields: [frontmatter___sequence], order: ASC }
      filter: { frontmatter: { imdb_id: { eq: $imdbId } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "dddd MMM D, YYYY")
          grade
          sequence
          imdbId: imdb_id
          venue
          venueNotes: venue_notes
        }
        backdrop {
          childImageSharp {
            fluid(maxWidth: 934, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        poster {
          childImageSharp {
            fluid(maxWidth: 238, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        linkedHtml
      }
    }

    movieInfo: reviewsJson(imdb_id: { eq: $imdbId }) {
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

    watchlistMovie: watchlistTitlesJson(imdb_id: { eq: $imdbId }) {
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
        imdb_id
        name
        slug
      }
      collections {
        name
        slug
      }
    }
  }
`;
