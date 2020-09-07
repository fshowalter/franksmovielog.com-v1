import { graphql, Link } from "gatsby";
import React, { useReducer } from "react";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Grade from "../components/Grade";
import Label from "../components/Label";
import Layout from "../components/Layout";
import {
  PaginationInfo,
  PaginationWithButtons,
} from "../components/Pagination";
import RangeInput from "../components/RangeInput";
import SelectInput from "../components/SelectInput";
import JsonReview from "../types/JsonReview";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import { collator, sortStringAsc, sortStringDesc } from "../utils/sort-utils";
import styles from "./reviews.module.scss";

function sortReviews(reviews: JsonReview[], sortOrder: string) {
  const sortMap: Record<string, (a: JsonReview, b: JsonReview) => number> = {
    title: (a, b) => collator.compare(a.title, b.title),
    "release-date-desc": (a, b) => sortStringDesc(a.year, b.year),
    "release-date-asc": (a, b) => sortStringAsc(a.year, b.year),
    "grade-asc": (a, b) =>
      sortStringAsc(a.gradeValue.toString(), b.gradeValue.toString()),
    "grade-desc": (a, b) =>
      sortStringDesc(a.gradeValue.toString(), b.gradeValue.toString()),
  };

  const comparer = sortMap[sortOrder];

  if (!comparer) {
    return reviews;
  }

  return reviews.sort(comparer);
}

/**
 * Returns the min and max release years for a given collection of reviews.
 * @param reviews The reviews collection.
 */
function minMaxReleaseYearsForReviews(reviews: JsonReview[]) {
  const releaseYears = reviews
    .map((review) => {
      return review.year;
    })
    .sort();

  const minYear = parseInt(releaseYears[0], 10);
  const maxYear = parseInt(releaseYears[releaseYears.length - 1], 10);

  return [minYear, maxYear];
}

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allReviews: JsonReview[];
  /** Reviews matching the current filters. */
  filteredReviews: JsonReview[];
  /** Reviews matching the current filters for the current page. */
  reviewsForPage: JsonReview[];
  /** The active filters. */
  filters: Record<string, (review: JsonReview) => boolean>;
  /** The current page. */
  currentPage: number;
  /** The number of reviews per page. */
  perPage: number;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: string;
};

function initState({ reviews }: { reviews: JsonReview[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);
  const currentPage = 1;
  const perPage = 100;

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    reviewsForPage: slicePage<JsonReview>({
      collection: reviews,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    currentPage,
    perPage,
    minYear,
    maxYear,
    sortValue: "title",
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";
const CHANGE_PAGE = "CHANGE_PAGE";

/** Action to filter by title. */
interface FilterTitleAction {
  type: typeof FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by title. */
interface FilterReleaseYearAction {
  type: typeof FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

interface SortAction {
  type: typeof SORT;
  /** The sorter to apply. */
  value: string;
}

interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  /** The page to change to. */
  value: number;
}

type ActionTypes =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ChangePageAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
function reducer(state: State, action: ActionTypes): State {
  let filters;
  let filteredReviews;

  switch (action.type) {
    case FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (review: JsonReview) => {
          return regex.test(review.title);
        },
      };
      filteredReviews = sortReviews(
        applyFilters<JsonReview>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case FILTER_RELEASE_YEAR: {
      const [minYear, maxYear] = minMaxReleaseYearsForReviews(state.allReviews);
      filters = {
        ...state.filters,
        releaseYear: (review: JsonReview) => {
          const releaseYear = parseInt(review.year, 10);
          if (action.values === [minYear, maxYear]) {
            return true;
          }
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredReviews = sortReviews(
        applyFilters<JsonReview>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case SORT: {
      filteredReviews = sortReviews(state.filteredReviews, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredReviews,
        reviewsForPage: slicePage<JsonReview>({
          collection: filteredReviews,
          pageToSlice: state.currentPage,
          perPage: state.perPage,
        }),
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        reviewsForPage: slicePage<JsonReview>({
          collection: state.filteredReviews,
          pageToSlice: action.value,
          perPage: state.perPage,
        }),
      };
    }
    default:
      throw new Error();
  }
}

/**
 * Renders the reviews page.
 */
export default function ReviewsPage({
  data,
}: {
  data: PageQueryResult;
}): JSX.Element {
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
          <FilterPageHeader
            className={styles.page_header}
            heading="Reviews"
            tagline={
              <>
                I&apos;ve published {state.allReviews.length} reviews since
                2020.
              </>
            }
          />
          <Fieldset className={styles.filters}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="viewings-title-input">
              Title
              <DebouncedInput
                id="viewings-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <Label htmlFor="viewings-release-year-input">
              Release Year
              <RangeInput
                id="viewings-release-year-input"
                min={state.minYear}
                max={state.maxYear}
                onChange={(values) =>
                  dispatch({ type: FILTER_RELEASE_YEAR, values })
                }
              />
            </Label>
            <Label htmlFor="viewings-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="viewings-sort-input"
                onChange={(e) =>
                  dispatch({ type: SORT, value: e.target.value })
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
              </SelectInput>
            </Label>
          </Fieldset>
          <PaginationInfo
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredReviews.length}
            className={styles.pagination_info}
          />
        </div>
        <div className={styles.right}>
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
                      gradeValue={review.gradeValue}
                      className={styles.list_item_grade}
                    />
                    {review.date}
                  </div>
                </li>
              );
            })}
          </ol>
          <PaginationWithButtons
            currentPage={state.currentPage}
            perPage={state.perPage}
            numberOfItems={state.filteredReviews.length}
            onClick={(newPage) =>
              dispatch({ type: CHANGE_PAGE, value: newPage })
            }
            className={styles.pagination}
          />
        </div>
      </main>
    </Layout>
  );
}

interface PageQueryResult {
  reviews: {
    nodes: JsonReview[];
  };
}

export const query = graphql`
  query {
    reviews: allReviewsJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        sequence
        date(formatString: "YYYY-MM-DD")
        imdbId: imdb_id
        title
        year
        gradeValue: grade_value
        sort_title
        slug
      }
    }
  }
`;
