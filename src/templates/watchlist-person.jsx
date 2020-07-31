import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import React, { useReducer, useRef } from "react";
import PropTypes from "prop-types";

import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import toSentenceArray from "../utils/to-sentence-array";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Layout from "../components/Layout";
import Pagination, { PaginationHeader } from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import ReviewLink from "../components/ReviewLink";
import styles from "./watchlist-person.module.scss";
import Grade from "../components/Grade";

function WatchlistOptions({ titles, keyName }) {
  const names = [
    ...new Set(
      titles.flatMap((title) => {
        return title[keyName].map((keyValue) => keyValue.name);
      })
    ),
  ].sort((a, b) => collator.compare(a, b));

  return (
    <>
      <option key="all" value="All">
        All
      </option>
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </>
  );
}

WatchlistOptions.propTypes = {
  keyName: PropTypes.oneOf([
    "directors",
    "performers",
    "writers",
    "collections",
  ]).isRequired,
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      directors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      performers: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      writers: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      collections: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

function WatchlistTitle({ title }) {
  return (
    <div className={styles.list_item_title}>
      <ReviewLink
        imdbId={title.imdb_id}
        className={styles.list_item_title_link}
      >
        <>
          {title.title}{" "}
          <span className={styles.list_item_title_year}>{title.year}</span>
        </>
      </ReviewLink>
    </div>
  );
}

WatchlistTitle.propTypes = {
  title: PropTypes.shape({
    imdb_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

function formatPeople(people, suffix) {
  if (people.length === 0) {
    return "";
  }

  const names = people.map((person) => person.name);

  return [`${toSentenceArray(names).join("")} ${suffix}`];
}

function formatCollections(collections) {
  if (collections.length === 0) {
    return "";
  }
  const names = collections.map((collection) => collection.name);

  const suffix = names.length > 1 ? "collections" : "collection";

  return [`it's in the ${toSentenceArray(names)} ${suffix}`];
}

function WatchlistSlug({ title }) {
  const credits = [
    ...formatPeople(title.directors, "directed"),
    ...formatPeople(title.performers, "performed"),
    ...formatPeople(title.writers, "has a writing credit"),
    ...formatCollections(title.collections),
  ];

  return (
    <div className={styles.list_item_slug}>
      Because {toSentenceArray(credits)}.
    </div>
  );
}

WatchlistSlug.propTypes = {
  title: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    performers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    writers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

function sortReleaseDateAsc(a, b) {
  return sortStringAsc(a.year, b.year);
}

function sortReleaseDateDesc(a, b) {
  return sortStringDesc(a.year, b.year);
}

function sortTitleAsc(a, b) {
  return collator.compare(a.title, b.title);
}

function escapeRegExp(str = "") {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}

function slicePage(viewings, currentPage, perPage) {
  const skip = perPage * (currentPage - 1);
  return viewings.slice(skip, currentPage * perPage);
}

function sortTitles(titles, sortOrder) {
  const sortMap = {
    "release-date-asc": sortReleaseDateAsc,
    "release-date-desc": sortReleaseDateDesc,
    title: sortTitleAsc,
  };

  const comparer = sortMap[sortOrder];
  return titles.sort(comparer);
}

function filterTitles(titles, filters) {
  return titles.filter((title) => {
    return Object.values(filters).every((filter) => {
      return filter(title);
    });
  });
}

function minMaxReleaseYearsForTitles(titles) {
  const releaseYears = titles
    .map((title) => {
      return title.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

function initState({ titles, reviews }) {
  const [minYear, maxYear] = minMaxReleaseYearsForTitles(titles);
  const currentPage = 1;
  const perPage = 50;

  return {
    allReviews: reviews,
    allTitles: titles,
    filteredTitles: titles,
    titlesForPage: slicePage(titles, currentPage, perPage),
    filters: {},
    sortValue: "release-date-asc",
    hideReviewed: false,
    currentPage,
    perPage,
    minYear,
    maxYear,
  };
}

const actions = {
  FILTER_TITLE: "FILTER_TITLE",
  FILTER_DIRECTOR: "FILTER_DIRECTOR",
  FILTER_PERFORMER: "FILTER_PERFORMER",
  FILTER_WRITER: "FILTER_WRITER",
  FILTER_COLLECTION: "FILTER_COLLECTION",
  FILTER_RELEASE_YEAR: "FILTER_RELEASE_YEAR",
  SORT: "SORT",
  CHANGE_PAGE: "CHANGE_PAGE",
  TOGGLE_REVIEWED: "TOGGLE_REVIEWED",
};

function reducer(state, action) {
  let filters;
  let filteredTitles;

  switch (action.type) {
    case actions.FILTER_TITLE: {
      const regex = new RegExp(escapeRegExp(action.value), "i");
      filters = {
        ...state.filters,
        title: (viewing) => {
          return regex.test(viewing.title);
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.FILTER_DIRECTOR: {
      filters = {
        ...state.filters,
        director: (title) => {
          if (action.value === "All") {
            return true;
          }

          if (title.directors.length === 0) {
            return false;
          }

          return title.directors.some(
            (director) => director.name === action.value
          );
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.FILTER_PERFORMER: {
      filters = {
        ...state.filters,
        performer: (title) => {
          if (action.value === "All") {
            return true;
          }

          if (title.performers.length === 0) {
            return false;
          }

          return title.performers.some(
            (performer) => performer.name === action.value
          );
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.FILTER_WRITER: {
      filters = {
        ...state.filters,
        writer: (title) => {
          if (action.value === "All") {
            return true;
          }

          if (title.writers.length === 0) {
            return false;
          }

          return title.writers.some((writer) => writer.name === action.value);
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.FILTER_COLLECTION: {
      filters = {
        ...state.filters,
        collection: (title) => {
          if (action.value === "All") {
            return true;
          }

          if (title.collections.length === 0) {
            return false;
          }

          return title.collections.some(
            (collection) => collection.name === action.value
          );
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForTitles(state.allTitles);
      filters = {
        ...state.filters,
        releaseYear: (viewing) => {
          const releaseYear = parseInt(viewing.year, 10);
          if (action.values === [minYear, maxYear]) {
            return true;
          }
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    case actions.SORT: {
      filteredTitles = sortTitles(state.filteredTitles);
      return {
        ...state,
        sortValue: action.value,
        filteredTitles,
        titlesForPage: slicePage(
          filteredTitles,
          state.currentPage,
          state.perPage
        ),
      };
    }
    case actions.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        titlesForPage: slicePage(
          state.filteredTitles,
          action.value,
          state.perPage
        ),
      };
    }
    case actions.TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (title) => {
            return !state.allReviews.some(
              (review) => review.frontmatter.imdb_id === title.imdb_id
            );
          },
        };
      }
      filteredTitles = sortTitles(
        filterTitles(state.allTitles, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredTitles,
        hideReviewed: !state.hideReviewed,
        currentPage: 1,
        titlesForPage: slicePage(filteredTitles, 1, state.perPage),
      };
    }
    default:
      throw new Error();
  }
}

function ReviewArticle({ className, review, movies }) {
  const movie = movies.find(
    (item) => item.imdb_id === review.frontmatter.imdb_id
  );

  // const watchlistTitle = watchlistTitles.find(
  //   (title) => title.imdb_id === review.frontmatter.imdb_id
  // );

  return (
    <article className={className}>
      <div className={styles.list_item_date}>
        <span className={styles.review_sequence}>
          #{review.frontmatter.sequence}
        </span>
        {" on "}
        {review.frontmatter.date}
      </div>
      <div className={styles.list_item_content}>
        <Link
          className={styles.list_item_image_link}
          to={`/reviews/${review.frontmatter.slug}/`}
        >
          <Img
            className={styles.list_item_poster}
            fixed={review.poster.childImageSharp.fixed}
            width="70"
            alt={`A poster from ${movie.title} (${movie.year})`}
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
          className={styles.review_grade}
        />{" "}
        <span className={styles.post_date} />
        <main
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: review.html,
          }}
          className={styles.list_item_excerpt}
        />
      </div>
    </article>
  );
}

const Movie = PropTypes.shape({
  imdb_id: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
});

ReviewArticle.propTypes = {
  className: PropTypes.string.isRequired,
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

function ReviewListItem({ className, review, movies }) {
  return (
    <li className={`${styles.list_item} ${className}`}>
      <ReviewArticle
        className={`${styles.review}`}
        review={review}
        movies={movies}
      />
    </li>
  );
}

export default function WatchlistPersonPage({ pageContext, data }) {
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <h2 className={styles.page_heading}>{pageContext.name}</h2>
            <p className={styles.page_tagline}>
              Director of {pageContext.imdbIds.length} titles. I&apos;ve
              reviewed {data.review.nodes.length}.
            </p>
          </header>
        </div>
        <div className={styles.right}>
          <ul className={styles.list}>
            {data.review.nodes.map((review) => {
              return (
                <ReviewListItem review={review} movies={data.movie.nodes} />
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

WatchlistPersonPage.propTypes = {
  data: PropTypes.shape({
    review: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            imdb_id: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ),
    }).isRequired,
    watchlist: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          imdb_id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          year: PropTypes.number.isRequired,
          directors: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            })
          ),
          performers: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            })
          ),
          writers: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            })
          ),
          collections: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            })
          ),
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query($imdbIds: [String]) {
    review: allMarkdownRemark(
      sort: { fields: [frontmatter___sequence], order: DESC }
      filter: {
        postType: { eq: "REVIEW" }
        frontmatter: { imdb_id: { in: $imdbIds } }
      }
    ) {
      nodes {
        postType
        frontmatter {
          date(formatString: "DD MMM, YYYY")
          grade
          slug
          title
          sequence
          imdb_id
          excerpt
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
            fixed(jpegQuality: 75, width: 100, height: 150) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        html
      }
    }

    movie: allMoviesJson(filter: { imdb_id: { in: $imdbIds } }) {
      nodes {
        imdb_id
        title
        year
      }
    }
  }
`;
