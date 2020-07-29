import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import PropTypes from "prop-types";

import Grade from "../components/Grade";
import Layout from "../components/Layout";
import toSentenceArray from "../utils/to-sentence-array";
import styles from "./review.module.scss";
import WatchlistLinks from "../components/WatchlistLinks";

function CastList({ principalCastIds, allCast }) {
  const castIds = new Set(principalCastIds.split(","));

  const cast = allCast.filter((person) => castIds.has(person.person_imdb_id));

  return toSentenceArray(cast.map((person) => person.name));
}

CastList.propTypes = {
  principalCastIds: PropTypes.string.isRequired,
  allCast: PropTypes.arrayOf(
    PropTypes.shape({
      person_imdb_id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

function ReviewDate({ review }) {
  return (
    <div className={styles.date}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.review_meta_icon}
      >
        <path
          fillRule="evenodd"
          d="M14 2H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
        />
        <path
          fillRule="evenodd"
          d="M14 2H2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2H2z"
        />
        <path
          fillRule="evenodd"
          d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
        />
      </svg>
      {review.frontmatter.date} via {review.frontmatter.venue} (
      {review.frontmatter.venue_notes})
    </div>
  );
}

ReviewDate.propTypes = {
  review: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
      venue_notes: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function Review({ data }) {
  const movie = data.movie.nodes[0];
  const review = data.review.nodes[0];
  const watchlistTitle = data.watchlistTitle.nodes[0];

  return (
    <Layout>
      <article className={styles.container}>
        <Img
          className={styles.image}
          fluid={review.poster.childImageSharp.fluid}
          alt={`A still from ${movie.title} (${movie.year})`}
        />
        <div className={styles.movie_meta}>
          <h1 className={styles.title}>
            {movie.title}{" "}
            <span className={styles.title_year}>{movie.year}</span>
          </h1>
          <aside className={styles.cast_and_crew}>
            <span className={styles.cast_label}>Directed by</span>
            {toSentenceArray(
              data.director.nodes.map((director) => director.name)
            )}
            <span className={styles.cast_label}>Starring</span>
            <CastList
              principalCastIds={movie.principal_cast_ids}
              allCast={data.cast.nodes}
            />
            {watchlistTitle && (
              <div className={styles.watchlist}>
                <WatchlistLinks watchlistTitle={watchlistTitle} />
              </div>
            )}
          </aside>
        </div>
        <div className={styles.review}>
          <div className={styles.slug}>
            <Grade grade={review.frontmatter.grade} className={styles.grade} />
            on {review.frontmatter.date} via {review.frontmatter.venue} (
            {review.frontmatter.venue_notes}) (#{review.frontmatter.sequence})
          </div>
          <div
            className={styles.body}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: review.html,
            }}
          />
        </div>
      </article>
    </Layout>
  );
}

Review.propTypes = {
  pageContext: PropTypes.shape({
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    director: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          full_name: PropTypes.string,
        })
      ),
    }),
    cast: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          full_name: PropTypes.string,
        })
      ),
    }),
    review: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            imdb_id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            grade: PropTypes.string.isRequired,
            sequence: PropTypes.number.isRequired,
          }).isRequired,
          backdrop: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.shape({
                src: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired,
          html: PropTypes.string.isRequired,
        })
      ),
    }),
    movie: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          imdb_id: PropTypes.string,
          title: PropTypes.string,
          year: PropTypes.number,
          runtime_minutes: PropTypes.number,
          principal_cast_ids: PropTypes.string,
        })
      ),
    }),
    watchlistTitle: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          performers: PropTypes.arrayOf(
            PropTypes.shape({
              imdb_id: PropTypes.string,
              name: PropTypes.string,
              slug: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }).isRequired,
};

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
          imdb_id
          venue
          venue_notes
        }
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, jpegQuality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        poster {
          childImageSharp {
            fluid(jpegQuality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        html
      }
    }

    movie: allMoviesJson(filter: { imdb_id: { eq: $imdbId } }) {
      nodes {
        imdb_id
        title
        year
        runtime_minutes
        principal_cast_ids
      }
    }

    director: allDirectingCreditsJson(
      sort: { fields: [sequence], order: ASC }
      filter: { movie_imdb_id: { eq: $imdbId } }
    ) {
      nodes {
        name
        sequence
        person_imdb_id
      }
    }

    cast: allPerformingCreditsJson(
      sort: { fields: [sequence], order: ASC }
      filter: { movie_imdb_id: { eq: $imdbId } }
    ) {
      nodes {
        name
        sequence
        person_imdb_id
      }
    }

    watchlistTitle: allWatchlistTitlesJson(
      filter: { imdb_id: { eq: $imdbId } }
    ) {
      nodes {
        imdb_id
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
  }
`;
