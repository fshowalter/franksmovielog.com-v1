import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  TOGGLE_GRADES = "TOGGLE_GRADES",
}

interface ReviewedMovie {
  releaseDate: string;
  lastReviewGrade: string;
  lastReviewGradeValue: number;
  slug: string;
  imdbId: string;
  title: string;
  year: number;
  sortTitle: string;
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

function sortReviews(
  reviews: ReviewedMovie[],
  sortOrder:
    | "title"
    | "release-date-desc"
    | "release-date-asc"
    | "grade-asc"
    | "grade-desc"
): ReviewedMovie[] {
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

export function initState({ reviews }: { reviews: ReviewedMovie[] }): State {
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

/** Action to filter by title. */
interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by title. */
interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

interface SortAction {
  type: ActionType.SORT;
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
  type: ActionType.TOGGLE_GRADES;
}

export type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ToggleGradesAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export default function reducer(state: State, action: Action): State {
  let filters;
  let filteredReviews;

  switch (action.type) {
    case ActionType.FILTER_TITLE: {
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
    case ActionType.FILTER_RELEASE_YEAR: {
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
    case ActionType.SORT: {
      filteredReviews = sortReviews(state.filteredReviews, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredReviews,
      };
    }
    case ActionType.TOGGLE_GRADES: {
      return {
        ...state,
        showGrades: !state.showGrades,
      };
    }
    // no default
  }
}
