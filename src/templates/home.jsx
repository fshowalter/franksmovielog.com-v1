import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import PropTypes from "prop-types";

import Grade from "../components/Grade";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import ReviewLink from "../components/ReviewLink";
import styles from "./home.module.scss";
import toSentenceArray from "../utils/to-sentence-array";
import WatchlistTitle from "../types/watchlistTitle";
import WatchlistLinks from "../components/WatchlistLinks";
import DateIcon from "../components/DateIcon";

function stripFootnotes(html) {
  return html.replace(/\[\^.*\]/, "");
}

function CastList({ principalCastIds, allCast }) {
  const castIds = new Set(principalCastIds.split(","));

  const cast = allCast.filter(
    (person) => person.person_imdb_id && castIds.has(person.person_imdb_id)
  );

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

const Movie = PropTypes.shape({
  imdb_id: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
});

function PostListItem({ post, index, value }) {
  return (
    <li
      className={`${styles.list_item} ${
        index === 0 ? styles.list_item_first : ""
      }`}
      value={value}
    >
      <div className={styles.list_item_date}>
        <DateIcon />
        {post.frontmatter.date}
      </div>
      <Link
        className={styles.list_item_continue_reading}
        to={post.frontmatter.slug}
      >
        <Img fluid={post.backdrop.childImageSharp.fluid} alt="" />
      </Link>
      <div className={styles.list_item_content}>
        <h2 className={styles.list_item_heading}>
          <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
        </h2>

        <div
          className={styles.list_item_excerpt}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              post.frontmatter.excerpt || stripFootnotes(post.firstParagraph),
          }}
        />
        {(post.frontmatter.excerpt || post.numberOfParagraphs > 1) && (
          <Link
            className={styles.list_item_continue_reading}
            to={post.frontmatter.slug}
          >
            Continue Reading
          </Link>
        )}
      </div>
    </li>
  );
}

PostListItem.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      sequence: PropTypes.number.isRequired,
    }).isRequired,
    backdrop: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          src: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
    firstParagraph: PropTypes.string.isRequired,
    numberOfParagraphs: PropTypes.number.isRequired,
  }).isRequired,
};

function ReviewListItem({
  isLast,
  review,
  movies,
  index,
  value,
  allCast,
  watchlistTitles,
  directors,
}) {
  const movie = movies.find(
    (item) => item.imdb_id === review.frontmatter.imdb_id
  );

  const watchlistTitle = watchlistTitles.find(
    (title) => title.imdb_id === review.frontmatter.imdb_id
  );

  return (
    <li
      className={`${styles.list_item} ${
        index === 0 ? styles.list_item_first : ""
      }  ${isLast ? styles.list_item_last : ""}`}
      value={value}
    >
      <Link
        className={styles.list_item_image_link}
        to={`/reviews/${review.frontmatter.slug}/`}
      >
        <Img
          className={styles.list_item_image}
          fluid={{
            ...review.backdrop.childImageSharp.fluid,
            sizes:
              "(min-width: 1000px) 456px, (min-width: 660px) 580px, calc(95vw - 28px)",
          }}
          alt={`A still from ${movie.title} (${movie.year})`}
        />
      </Link>
      <h2 className={styles.list_item_heading}>
        <ReviewLink imdbId={review.frontmatter.imdb_id}>
          {movie.title}{" "}
          <span className={styles.list_item_heading_review_year}>
            {movie.year}
          </span>
        </ReviewLink>
      </h2>
      <Grade
        grade={review.frontmatter.grade}
        className={styles.list_item_grade}
      />
      <p className={styles.list_item_review_meta}>
        Directed by {toSentenceArray(directors)}. Starring{" "}
        <CastList
          principalCastIds={movie.principal_cast_ids}
          allCast={allCast}
        />
        .
      </p>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: stripFootnotes(review.firstParagraph),
        }}
        className={styles.list_item_excerpt}
      />
      {review.numberOfParagraphs > 1 && (
        <Link
          className={styles.list_item_continue_reading}
          to={`/reviews/${review.frontmatter.slug}/`}
        >
          Continue Reading
        </Link>
      )}
      <div className={styles.list_item_footer}>
        <div className={styles.list_item_date}>
          <DateIcon />
          {review.frontmatter.date}
        </div>
        <WatchlistLinks watchlistTitle={watchlistTitle} />
      </div>
    </li>
  );
}

ReviewListItem.propTypes = {
  isLast: PropTypes.bool,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(Movie).isRequired,
  watchlistTitles: PropTypes.arrayOf(WatchlistTitle).isRequired,
  allCast: PropTypes.arrayOf(
    PropTypes.shape({
      person_imdb_id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  review: PropTypes.shape({
    frontmatter: PropTypes.shape({
      imdb_id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      grade: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      sequence: PropTypes.number.isRequired,
    }).isRequired,
    backdrop: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          src: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
    firstParagraph: PropTypes.string.isRequired,
    numberOfParagraphs: PropTypes.number.isRequired,
  }).isRequired,
};

ReviewListItem.defaultProps = {
  isLast: false,
};

export default function HomeTemplate({ pageContext, data }) {
  return (
    <Layout>
      <main className={styles.container}>
        <ol className={styles.list}>
          {data.updates.nodes.map((update, index) => {
            const listItemValue =
              data.updates.nodes.length - pageContext.skip - index;

            let isLast;

            if (Math.abs(data.updates.nodes.length % 2) === 1) {
              isLast = false;
            } else {
              isLast = index + 1 === data.updates.nodes.length;
            }

            if (update.postType === "review") {
              const directors = data.director.nodes
                .filter((director) => {
                  return director.movie_imdb_id === update.frontmatter.imdb_id;
                })
                .map((director) => director.name);

              return (
                <ReviewListItem
                  isLast={isLast}
                  index={index}
                  review={update}
                  directors={directors}
                  movies={data.movie.nodes}
                  value={listItemValue}
                  allCast={data.cast.nodes}
                  watchlistTitles={data.watchlistTitle.nodes}
                />
              );
            }
            if (update.postType === "post") {
              return (
                <PostListItem
                  index={index}
                  post={update}
                  value={listItemValue}
                />
              );
            }
            return null;
          })}
        </ol>
        <Pagination
          currentPage={pageContext.currentPage}
          urlRoot="/"
          limit={pageContext.limit}
          numberOfItems={pageContext.numberOfItems}
        />
      </main>
    </Layout>
  );
}

HomeTemplate.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    numberOfItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    updates: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          postType: PropTypes.oneOf(["review", "post"]),
        })
      ),
    }),
    watchlistTitle: PropTypes.shape({
      nodes: PropTypes.arrayOf(WatchlistTitle),
    }),
    movie: PropTypes.shape({
      nodes: PropTypes.arrayOf(Movie),
    }),
    director: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          movie_imdb_id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          sequence: PropTypes.number.isRequired,
          person_imdb_id: PropTypes.string.isRequired,
        })
      ),
    }),
    cast: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          movie_imdb_id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          sequence: PropTypes.number.isRequired,
          person_imdb_id: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
};

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
          date(formatString: "DD MMM YYYY")
          grade
          slug
          title
          sequence
          imdb_id
          excerpt
        }
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, jpegQuality: 75 ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        firstParagraph
        numberOfParagraphs
      }
    }

    movie: allMoviesJson(filter: { imdb_id: { in: $imdbIds } }) {
      nodes {
        imdb_id
        title
        year
        principal_cast_ids
      }
    }

    director: allDirectingCreditsJson(
      sort: { fields: [sequence], order: ASC }
      filter: { movie_imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        movie_imdb_id
        name
        sequence
        person_imdb_id
      }
    }

    cast: allPerformingCreditsJson(
      sort: { fields: [sequence], order: ASC }
      filter: { movie_imdb_id: { in: $imdbIds } }
    ) {
      nodes {
        movie_imdb_id
        name
        sequence
        person_imdb_id
      }
    }

    watchlistTitle: allWatchlistTitlesJson(
      filter: { imdb_id: { in: $imdbIds } }
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
