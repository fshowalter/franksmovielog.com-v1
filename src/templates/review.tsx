import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import DateIcon from "../components/DateIcon";
import Grade from "../components/Grade";
import Layout from "../components/Layout";
import RelatedMovies from "../components/RelatedMovies";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import WatchlistLinks from "../components/WatchlistLinks";
import { ReviewedMovie } from "../types";
import toSentenceArray from "../utils/to-sentence-array";
import styles from "./review.module.scss";

function buildStructuredData(movie: ReviewedMovie) {
  const gradeMap: { [index: string]: number } = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    F: 1,
  };

  return {
    "@context": "http://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Frank Showalter",
      sameAs: "https://www.frankshowalter.com",
    },
    datePublished: movie.lastReviewDate,
    inLanguage: "en",
    itemReviewed: {
      "@type": "Movie",
      name: movie.title,
      sameAs: `http://www.imdb.com/title/${movie.imdbId}/`,
      image: movie.seoImage.childImageSharp.resize.src,
      dateCreated: movie.year,
      director: {
        "@type": "Person",
        name: movie.directors[0].name,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Frank's Movie Log",
      sameAs: "https://www.franksmovielog.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[movie.lastReviewGrade[0]],
    },
  };
}

function Related({ movie }: { movie: ReviewedMovie }): JSX.Element | null {
  return (
    <div className={styles.related}>
      {movie.watchlist.collections.map((collection) => {
        return (
          <RelatedMovies movies={collection.reviewedMovies}>
            <header className={styles.related_header}>
              <h3 className={styles.related_heading}>
                More{" "}
                <span className={styles.related_name}>{collection.name}</span>
              </h3>
              <Link
                to={`/watchlist/collections/${collection.slug}/`}
                className={styles.related_more}
              >
                View All &raquo;
              </Link>
            </header>
          </RelatedMovies>
        );
      })}
      {movie.watchlist.performers.map((performer) => {
        return (
          <RelatedMovies movies={performer.reviewedMovies}>
            <header className={styles.related_header}>
              <h3 className={styles.related_heading}>
                More with{" "}
                <span className={styles.related_name}>{performer.name}</span>
              </h3>
              <Link
                to={`/watchlist/cast/${performer.slug}/`}
                className={styles.related_more}
              >
                View All &raquo;
              </Link>
            </header>
          </RelatedMovies>
        );
      })}
      {movie.watchlist.directors.map((director) => {
        return (
          <RelatedMovies movies={director.reviewedMovies}>
            <header className={styles.related_header}>
              <h3 className={styles.related_heading}>
                More directed by{" "}
                <span className={styles.related_name}>{director.name}</span>
              </h3>
              <Link
                to={`/watchlist/directors/${director.slug}/`}
                className={styles.related_more}
              >
                View All &raquo;
              </Link>
            </header>
          </RelatedMovies>
        );
      })}
      {movie.watchlist.writers.map((writer) => {
        return (
          <RelatedMovies movies={writer.reviewedMovies}>
            <header className={styles.related_header}>
              <h3 className={styles.related_heading}>
                More written by{" "}
                <span className={styles.related_name}>{writer.name}</span>
              </h3>
              <Link
                to={`/watchlist/writers/${writer.slug}/`}
                className={styles.related_more}
              >
                View All &raquo;
              </Link>
            </header>
          </RelatedMovies>
        );
      })}
      <RelatedMovies movies={movie.browseMore}>
        <header className={styles.related_header}>
          <h3 className={styles.related_heading}>
            More <span className={styles.related_name}>Reviews</span>
          </h3>
          <Link to="/reviews/" className={styles.related_more}>
            View All &raquo;
          </Link>
        </header>
      </RelatedMovies>
    </div>
  );
}

/**
 * Renders a review page.
 */
export default function Review({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
  const { movie } = data;
  const structuredData = buildStructuredData(movie);

  return (
    <Layout>
      <Seo
        pageTitle={`${movie.title} (${movie.year})`}
        description={`A review of the ${movie.year} film ${movie.title}.`}
        image={movie.seoImage.childImageSharp.resize.src}
        article
      />
      <main className={styles.container}>
        {movie.backdrop && (
          <Img
            className={styles.image}
            fluid={movie.backdrop.childImageSharp.fluid}
            alt={`A still from ${movie.title} (${movie.year})`}
          />
        )}
        <header className={styles.header}>
          <h1 className={styles.title}>
            {movie.title}{" "}
            <span className={styles.title_year}>{movie.year}</span>
          </h1>
          {movie.akaTitles.length > 0 && (
            <div className={styles.aka_container}>
              aka:
              <ul className={styles.aka_list}>
                {movie.akaTitles.map((akaTitle) => {
                  return <li className={styles.aka_list_item}>{akaTitle}</li>;
                })}
              </ul>
            </div>
          )}
        </header>
        <aside className={styles.credits}>
          {movie.poster && (
            <Img
              className={styles.poster}
              fluid={movie.poster.childImageSharp.fluid}
              alt={`A poster from ${movie.title} (${movie.year})`}
            />
          )}
          <div className={styles.directors}>
            <span className={styles.cast_label}>Directed by</span>
            {toSentenceArray(movie.directors.map((director) => director.name))}
          </div>
          <div className={styles.cast}>
            <span className={styles.cast_label}>Starring</span>
            {toSentenceArray(movie.principalCast.map((person) => person.name))}
          </div>
          <div className={styles.watchlist}>
            <WatchlistLinks movie={movie} />
          </div>
        </aside>
        <ul className={styles.reviews_list}>
          {movie.reviews.map((review) => {
            return (
              <li>
                <article className={styles.review}>
                  <header className={styles.slug}>
                    <DateIcon className={styles.date_icon} />{" "}
                    <span className={styles.date}>
                      {review.frontmatter.date}
                    </span>{" "}
                    via {review.frontmatter.venue}
                    {review.frontmatter.venueNotes && (
                      <> ({review.frontmatter.venueNotes})</>
                    )}
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
        {movie.olderViewings.length > 0 && (
          <div className={styles.older_viewings}>
            <h3 className={styles.older_viewings_heading}>Older Viewings</h3>
            <ul className={styles.older_viewings_list}>
              {movie.olderViewings.map((viewing) => {
                return (
                  <li>
                    <div className={styles.slug}>
                      <DateIcon className={styles.viewing_date_icon} />{" "}
                      <span className={styles.date}>{viewing.viewingDate}</span>{" "}
                      via {viewing.venue}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <Related movie={movie} />
      </main>
      {structuredData && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Layout>
  );
}

interface PageQueryResult {
  movie: ReviewedMovie;
}

export const pageQuery = graphql`
  query($imdbId: String) {
    movie: reviewedMoviesJson(imdb_id: { eq: $imdbId }) {
      imdbId: imdb_id
      title
      year
      lastReviewGrade: last_review_grade
      lastReviewGradeValue: last_review_grade_value
      akaTitles: aka_titles
      principalCast: principal_cast {
        name: full_name
      }
      directors {
        name: full_name
      }
      reviews {
        frontmatter {
          date(formatString: "dddd MMM D, YYYY")
          dateIso: date(formatString: "Y-MM-DD")
          grade
          sequence
          imdbId: imdb_id
          venue
          venueNotes: venue_notes
        }
        linkedHtml
      }
      olderViewings {
        viewingDate: viewing_date(formatString: "dddd MMM D, YYYY")
        venue
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
      browseMore {
        title
        lastReviewGrade: last_review_grade
        slug
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, maxWidth: 308, jpegQuality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      watchlist {
        performers {
          name
          slug
          reviewedMovies {
            title
            lastReviewGrade: last_review_grade
            slug
            backdrop {
              childImageSharp {
                fluid(toFormat: JPG, maxWidth: 308, jpegQuality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        directors {
          name
          slug
          reviewedMovies {
            title
            lastReviewGrade: last_review_grade
            slug
            backdrop {
              childImageSharp {
                fluid(toFormat: JPG, maxWidth: 308, jpegQuality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        writers {
          name
          slug
          reviewedMovies {
            title
            lastReviewGrade: last_review_grade
            slug
            backdrop {
              childImageSharp {
                fluid(toFormat: JPG, maxWidth: 308, jpegQuality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        collections {
          name
          slug
          reviewedMovies {
            title
            lastReviewGrade: last_review_grade
            slug
            backdrop {
              childImageSharp {
                fluid(toFormat: JPG, maxWidth: 308, jpegQuality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
