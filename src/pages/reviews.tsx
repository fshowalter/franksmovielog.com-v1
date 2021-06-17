import { graphql, Link } from "gatsby";
import React, { useReducer } from "react";
import DebouncedInput from "../components/DebouncedInput/DebouncedInput";
import Fieldset from "../components/Fieldset";
import FilterPageHeader from "../components/FilterPageHeader";
import Grade from "../components/Grade";
import Label from "../components/Label";
import Layout from "../components/Layout";
import RangeInput from "../components/RangeInput";
import SelectInput from "../components/SelectInput";
import Seo from "../components/Seo";
import StatsLink from "../components/StatsLink";
import ToggleButton from "../components/ToggleButton";
import applyFilters from "../utils/apply-filters";
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
  rightCss,
  toggleGradesButtonCss,
} from "./reviews.module.scss";

function sortReviews(
  reviews: ReviewedMovie[],
  sortOrder:
    | "title"
    | "release-date-desc"
    | "release-date-asc"
    | "grade-asc"
    | "grade-desc"
) {
  const sortMap: Record<
    string,
    (a: ReviewedMovie, b: ReviewedMovie) => number
  > = {
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "grade-asc": (a, b) =>
      sortNumberAsc(a.lastReviewGradeValue, b.lastReviewGradeValue),
    "grade-desc": (a, b) =>
      sortNumberDesc(a.lastReviewGradeValue, b.lastReviewGradeValue),
  };

  const comparer = sortMap[sortOrder];

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

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

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
  filters: Record<string, (review: ReviewedMovie) => boolean>;
  /** The current page. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue:
    | "title"
    | "release-date-desc"
    | "release-date-asc"
    | "grade-asc"
    | "grade-desc";
  /** True to show grades vs. stars. */
  showGrades: boolean;
};

function initState({ reviews }: { reviews: ReviewedMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    filters: {},
    minYear,
    maxYear,
    sortValue: "title",
    showGrades: false,
  };
}

const FILTER_TITLE = "FILTER_TITLE";
const FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR";
const SORT = "SORT";
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
  value:
    | "title"
    | "release-date-desc"
    | "release-date-asc"
    | "grade-asc"
    | "grade-desc";
}

/** Action to toggle grades. */
interface ToggleGradesAction {
  type: typeof TOGGLE_GRADES;
}

type ActionTypes =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ToggleGradesAction;

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
      };
    }
    case FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (review: ReviewedMovie) => {
          const releaseYear = review.year;

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
      };
    }
    case SORT: {
      filteredReviews = sortReviews(state.filteredReviews, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredReviews,
      };
    }
    case TOGGLE_GRADES: {
      return {
        ...state,
        showGrades: !state.showGrades,
      };
    }
    // no default
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
                <br />
                <StatsLink to="/reviews/stats/" />
              </>
            }
          />
          <Fieldset className={filtersCss}>
            <legend>Filter &amp; Sort</legend>
            <Label htmlFor="reviews-title-input">
              Title
              <DebouncedInput
                id="reviews-title-input"
                placeholder="Enter all or part of a title"
                onChange={(value) => dispatch({ type: FILTER_TITLE, value })}
              />
            </Label>
            <RangeInput
              label="Release Year"
              id="reviews-release-year-input"
              min={state.minYear}
              max={state.maxYear}
              onChange={(values) =>
                dispatch({ type: FILTER_RELEASE_YEAR, values })
              }
            />
            <Label htmlFor="reviews-sort-input">
              Order By
              <SelectInput
                value={state.sortValue}
                id="reviews-sort-input"
                onChange={(e) =>
                  dispatch({
                    type: SORT,
                    value: e.target.value as
                      | "title"
                      | "release-date-desc"
                      | "release-date-asc"
                      | "grade-asc"
                      | "grade-desc",
                  })
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
          <ol data-testid="reviews-list" className={listCss}>
            {state.filteredReviews.map((review) => {
              return (
                <li className={listItemCss} key={review.imdbId}>
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

type ReviewedMovie = {
  releaseDate: string;
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  slug: string;
  imdbId: string;
  title: string;
  year: number;
  sortTitle: string;
};

export const query = graphql`
  query {
    reviews: allReviewedMoviesJson(sort: { fields: [sort_title], order: ASC }) {
      nodes {
        releaseDate: release_date
        imdbId: imdb_id
        title
        year
        lastReviewGrade: last_review_grade
        lastReviewGradeValue: last_review_grade_value
        sortTitle: sort_title
        slug
      }
    }
  }
`;
