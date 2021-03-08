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
import Seo from "../components/Seo";
import ToggleButton from "../components/ToggleButton";
import { ReviewedMovie } from "../types";
import applyFilters from "../utils/apply-filters";
import slicePage from "../utils/slice-page";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../utils/sort-utils";
import {
  containerCss,
  filtersCss,
  leftCss,
  listCss,
  listItemCss,
  listItemGradeCss,
  listItemLetterGradeCss,
  listItemSlugCss,
  listItemTitleCss,
  listItemTitleYearCss,
  pageHeaderCss,
  paginationCss,
  paginationInfoCss,
  rightCss,
  toggleGradesButtonCss,
} from "./reviews.module.scss";

function sortReviews(reviews: ReviewedMovie[], sortOrder: string) {
  const sortMap: Record<
    string,
    (a: ReviewedMovie, b: ReviewedMovie) => number
  > = {
    title: (a, b) => collator.compare(a.title, b.title),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "grade-asc": (a, b) =>
      sortNumberAsc(a.lastReviewGradeValue, b.lastReviewGradeValue),
    "grade-desc": (a, b) =>
      sortNumberDesc(a.lastReviewGradeValue, b.lastReviewGradeValue),
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
function minMaxReleaseYearsForReviews(reviews: ReviewedMovie[]) {
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
  allReviews: ReviewedMovie[];
  /** Reviews matching the current filters. */
  filteredReviews: ReviewedMovie[];
  /** Reviews matching the current filters for the current page. */
  reviewsForPage: ReviewedMovie[];
  /** The active filters. */
  filters: Record<string, (review: ReviewedMovie) => boolean>;
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
  /** True to show grades vs. stars. */
  showGrades: boolean;
};

function initState({ reviews }: { reviews: ReviewedMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);
  const currentPage = 1;
  const perPage = 200;

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    reviewsForPage: slicePage<ReviewedMovie>({
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
    showGrades: false,
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";
const CHANGE_PAGE = "CHANGE_PAGE";
const TOGGLE_GRADES = "TOGGLE_GRADES";

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

/** Action to toggle grades. */
interface ToggleGradesAction {
  type: typeof TOGGLE_GRADES;
}

type ActionTypes =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ToggleGradesAction
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
        title: (review: ReviewedMovie) => {
          return regex.test(review.title);
        },
      };
      filteredReviews = sortReviews(
        applyFilters<ReviewedMovie>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<ReviewedMovie>({
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
        releaseYear: (review: ReviewedMovie) => {
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
        applyFilters<ReviewedMovie>({ collection: state.allReviews, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredReviews,
        currentPage: 1,
        reviewsForPage: slicePage<ReviewedMovie>({
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
        reviewsForPage: slicePage<ReviewedMovie>({
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
        reviewsForPage: slicePage<ReviewedMovie>({
          collection: state.filteredReviews,
          pageToSlice: action.value,
          perPage: state.perPage,
        }),
      };
    }
    case TOGGLE_GRADES: {
      return {
        ...state,
        showGrades: !state.showGrades,
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
      <Seo
        pageTitle="All Reviews"
        description="A sortable and filterable list of all movie reviews on this site."
        image={null}
        article={false}
      />
      <main className={containerCss}>
        <div className={leftCss}>
          <FilterPageHeader
            className={pageHeaderCss}
            heading="Reviews"
            tagline={
              <>
                I&apos;ve reviewed {state.allReviews.length} movies since 2020.
              </>
            }
          />
          <Fieldset className={filtersCss}>
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
            className={paginationInfoCss}
          />
          <div className={toggleGradesButtonCss}>
            <ToggleButton
              id="show_grade-toggle"
              onClick={() => dispatch({ type: TOGGLE_GRADES })}
            >
              {state.showGrades ? "Show Stars" : "Show Grades"}
            </ToggleButton>
          </div>
        </div>
        <div className={rightCss}>
          <ol className={listCss}>
            {state.reviewsForPage.map((review) => {
              return (
                <li className={listItemCss}>
                  <Link
                    to={`/reviews/${review.slug}/`}
                    className={listItemTitleCss}
                  >
                    {review.title}{" "}
                    <span className={listItemTitleYearCss}>{review.year}</span>
                  </Link>
                  <div className={listItemSlugCss}>
                    {}
                    {state.showGrades ? (
                      <div className={listItemLetterGradeCss}>
                        {review.lastReviewGrade}
                      </div>
                    ) : (
                      <Grade
                        grade={review.lastReviewGrade}
                        className={listItemGradeCss}
                      />
                    )}
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
            className={paginationCss}
          />
        </div>
      </main>
    </Layout>
  );
}

interface PageQueryResult {
  reviews: {
    nodes: ReviewedMovie[];
  };
}

export const query = graphql`
  query {
    reviews: allReviewedMoviesJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        sequence
        date(formatString: "YYYY-MM-DD")
        releaseDate: release_date
        imdbId: imdb_id
        title
        year
        lastReviewGrade: last_review_grade
        lastReviewGradeValue: last_review_grade_value
        sort_title
        slug
      }
    }
  }
`;
