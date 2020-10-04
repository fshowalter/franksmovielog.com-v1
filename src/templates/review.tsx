import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import DateIcon from "../components/DateIcon";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import WatchlistLinks from "../components/WatchlistLinks";
import JsonReview from "../types/JsonReview";
import MarkdownReview from "../types/MarkdownReview";
import WatchlistMovie from "../types/WatchlistMovie";
import toSentenceArray from "../utils/to-sentence-array";
import styles from "./review.module.scss";

function buildStructuredData(
  allReviews: MarkdownReview[],
  movieInfo: JsonReview
) {
  const reviews = allReviews.slice().reverse();

  return {
    "@context": "http://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Frank Showalter",
      sameAs: "https://www.frankshowalter.com",
    },
    datePublished: reviews[0].frontmatter.date,
    inLanguage: "en",
    itemReviewed: {
      "@type": "Movie",
      name: movieInfo.title,
      sameAs: `http://www.imdb.com/title/${movieInfo.imdbId}/`,
      image: reviews[0].seoImage.childImageSharp.resize.src,
      dateCreated: movieInfo.year,
      director: {
        "@type": "Person",
        name: movieInfo.directors[0].name,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Frank's Movie Log",
      sameAs: "https://www.franksmovielog.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: movieInfo.gradeValue,
    },
  };
}

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
  const structuredData = buildStructuredData(reviews, movieInfo);

  return (
    <Layout>
      <Seo
        pageTitle={`${movieInfo.title} (${movieInfo.year})`}
        description={`A review of the ${movieInfo.year} film ${movieInfo.title}.`}
        image={reviews[0].seoImage.childImageSharp.resize.src}
        article
      />
      <main className={styles.container}>
        {reviews[0].backdrop && (
          <Img
            className={styles.image}
            fluid={reviews[0].backdrop.childImageSharp.fluid}
            alt={`A still from ${movieInfo.title} (${movieInfo.year})`}
          />
        )}
        <header>
          <h1 className={styles.title}>
            {movieInfo.title}{" "}
            <span className={styles.title_year}>{movieInfo.year}</span>
          </h1>
          {movieInfo.akaTitles.length > 0 && (
            <div className={styles.aka_container}>
              aka:
              <ul className={styles.aka_list}>
                {movieInfo.akaTitles.map((akaTitle) => {
                  return <li className={styles.aka_list_item}>{akaTitle}</li>;
                })}
              </ul>
            </div>
          )}
        </header>
        <aside className={styles.credits}>
          {reviews[0].poster && (
            <Img
              className={styles.poster}
              fluid={reviews[0].poster.childImageSharp.fluid}
              alt={`A poster from ${movieInfo.title} (${movieInfo.year})`}
            />
          )}
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
              <li>
                <article className={styles.review}>
                  <header className={styles.slug}>
                    <DateIcon className={styles.date_icon} />{" "}
                    <span className={styles.date}>
                      {review.frontmatter.date}
                    </span>{" "}
                    via {review.frontmatter.venue} (
                    {review.frontmatter.venueNotes})
                  </header>
                  <div className={styles.content}>
                    <Grade
                      grade={review.frontmatter.grade}
                      className={styles.grade}
                    />
                    <RenderedMarkdown
                      className={styles.body}
                      // eslint-disable-next-line react/no-danger
                      text={review.linkedHtml}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
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
            fluid(toFormat: JPG, maxWidth: 934, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        seoImage: backdrop {
          childImageSharp {
            resize(toFormat: JPG, width: 1200, quality: 80) {
              src
            }
          }
        }
        poster {
          childImageSharp {
            fluid(toFormat: JPG, maxWidth: 238, quality: 80) {
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
      gradeValue: grade_value
      akaTitles: aka_titles
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
