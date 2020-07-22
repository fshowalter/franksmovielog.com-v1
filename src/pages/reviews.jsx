import { Link, graphql } from "gatsby";
import React, { useReducer } from "react";
import PropTypes from "prop-types";

import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Layout from "../components/Layout";
import RangeInput from "../components/RangeInput";
import Pagination, { PaginationHeader } from "../components/Pagination";
import Grade from "../components/Grade";
import styles from "./reviews.module.scss";

function sortReleaseDateAsc(a, b) {
  return sortStringAsc(a.year, b.year);
}

function sortReleaseDateDesc(a, b) {
  return sortStringDesc(a.year, b.year);
}

function sortGradeAsc(a, b) {
  return sortStringAsc(a.grade_value, b.grade_value);
}

function sortGradeDesc(a, b) {
  return sortStringDesc(a.grade_value, b.grade_value);
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

function filterReviews(viewings, filters) {
  return viewings.filter((viewing) => {
    return Object.values(filters).every((filter) => {
      return filter(viewing);
    });
  });
}

function sortReviews(viewings, sortOrder) {
  const sortMap = {
    title: sortTitleAsc,
    "release-date-desc": sortReleaseDateDesc,
    "release-date-asc": sortReleaseDateAsc,
    "grade-asc": sortGradeAsc,
    "grade-desc": sortGradeDesc,
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

function minMaxReleaseYearsForReviews(viewings) {
  const releaseYears = viewings
    .map((viewing) => {
      return viewing.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

function initState({ reviews }) {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);
  const currentPage = 1;
  const perPage = 100;

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    reviewsForPage: slicePage(reviews, currentPage, perPage),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
  };
}

const actions = {
  FILTER_TITLE: "FILTER_TITLE",
  FILTER_GRADE: "FILTER_GRADE",
  FILTER_RELEASE_YEAR: "FILTER_RELEASE_YEAR",
  SORT: "SORT",
  CHANGE_PAGE: "CHANGE_PAGE",
};

function reducer(state, action) {
  let filters;
  let filteredReviews;

  switch (action.type) {
    case actions.FILTER_TITLE: {
      const regex = new RegExp(escapeRegExp(action.value), "i");
      filters = {
        ...state.filters,
        title: (review) => {
          return regex.test(review.title);
        },
      };
      filteredReviews = sortReviews(
        filterReviews(state.allReviews, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage(filteredReviews, 1, state.perPage),
      };
    }
    case actions.FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForReviews(state.allReviews);
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
      filteredReviews = sortReviews(
        filterReviews(state.allReviews, filters),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage(filteredReviews, 1, state.perPage),
      };
    }
    case actions.SORT: {
      filteredReviews = sortReviews(state.filteredReviews, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredReviews,
        reviewsForPage: slicePage(
          filteredReviews,
          state.currentPage,
          state.perPage
        ),
      };
    }
    case actions.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        reviewsForPage: slicePage(
          state.filteredReviews,
          action.value,
          state.perPage
        ),
      };
    }
    default:
      throw new Error();
  }
}

export default function ReviewsPage({ data }) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      reviews: [...data.reviews.nodes],
    },
    initState
  );

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.left}>
          <header className={styles.page_header}>
            <h2 className={styles.page_heading}>Reviews</h2>
            <p className={styles.page_tagline}>
              I&apos;ve published {state.allReviews.length} reviews since 2020.
            </p>
          </header>

          <div className={styles.filters}>
            <fieldset className={styles.filters_fieldset}>
              <legend>Filter &amp; Sort</legend>
              <label className={styles.label} htmlFor="viewings-title-input">
                Title
                <DebouncedInput
                  id={styles.filter_text_input}
                  placeholder="Enter all or part of a title"
                  className={styles.filter_text_input}
                  onChange={(value) =>
                    dispatch({ type: actions.FILTER_TITLE, value })
                  }
                />
              </label>
              <label
                className={styles.label}
                htmlFor="viewings-release-year-input"
              >
                Release Year
                <RangeInput
                  id="viewings-release-year-input"
                  min={state.minYear}
                  max={state.maxYear}
                  onChange={(values) =>
                    dispatch({ type: actions.FILTER_RELEASE_YEAR, values })
                  }
                />
              </label>
              <label className={styles.label} htmlFor="viewings-sort-input">
                Order By
                <select
                  value={state.sortValue}
                  id="viewings-sort-input"
                  className={styles.filter_select_input}
                  onChange={(e) =>
                    dispatch({ type: actions.SORT, value: e.target.value })
                  }
                >
                  <option value="title">Title</option>
                  <option value="grade-desc">Grade (Best First)</option>
                  <option value="grade-asc">Grade (Worst First)</option>
                  <option value="release-date-desc">
                    Release Date (Newest First)
                  </option>
                  <option value="release-date-asc">
                    Release Date (Oldest First)
                  </option>
                </select>
              </label>
            </fieldset>
          </div>
        </div>
        <div className={styles.right}>
          <PaginationHeader
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredReviews.length}
          />
          <ol className={styles.list}>
            {state.reviewsForPage.map((review, index) => {
              return (
                <li
                  className={`${styles.list_item} ${
                    index === 0 ? styles.list_item_first : ""
                  }`}
                >
                  <Link
                    to={`/reviews/${review.slug}/`}
                    className={styles.list_item_title}
                  >
                    {review.title}{" "}
                    <span className={styles.list_item_title_year}>
                      {review.year}
                    </span>
                  </Link>
                  <div className={styles.list_item_slug}>
                    <Grade
                      gradeValue={review.grade_value}
                      className={styles.list_item_grade}
                    />
                    {review.date}
                  </div>
                </li>
              );
            })}
          </ol>
          <Pagination
            currentPage={state.currentPage}
            limit={state.perPage}
            numberOfItems={state.filteredReviews.length}
            onClick={(newPage) =>
              dispatch({ type: actions.CHANGE_PAGE, value: newPage })
            }
          />
        </div>
      </main>
    </Layout>
  );
}

ReviewsPage.propTypes = {
  data: PropTypes.shape({
    reviews: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query {
    reviews: allReviewsJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        sequence
        date(formatString: "YYYY-MM-DD")
        imdb_id
        title
        year
        grade_value
        sort_title
        slug
      }
    }
  }
`;
