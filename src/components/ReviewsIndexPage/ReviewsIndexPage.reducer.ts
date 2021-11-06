import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";
import type { Review } from "./ReviewsIndexPage";

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  TOGGLE_GRADES = "TOGGLE_GRADES",
  SHOW_MORE = "SHOW_MORE",
}

export type SortType =
  | "title"
  | "release-date-desc"
  | "release-date-asc"
  | "grade-asc"
  | "grade-desc"
  | "review-date-asc"
  | "review-date-desc";

const SHOW_COUNT_DEFAULT = 24;

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allReviews: Review[];
  /** Reviews matching the current filters. */
  filteredReviews: Review[];
  /** Reviews matching the current filters for the current page. */
  filters: Record<string, (review: Review) => boolean>;
  /** The current page. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: SortType;
  /** The number of viewings to show. */
  showCount: number;
  /** True to show grades vs. stars. */
  showGrades: boolean;
};

function sortReviews(reviews: Review[], sortOrder: SortType): Review[] {
  const sortMap: Record<SortType, (a: Review, b: Review) => number> = {
    title: (a, b) =>
      collator.compare(a.reviewedMovie.sortTitle, b.reviewedMovie.sortTitle),
    "release-date-desc": (a, b) =>
      sortStringDesc(a.reviewedMovie.releaseDate, b.reviewedMovie.releaseDate),
    "release-date-asc": (a, b) =>
      sortStringAsc(a.reviewedMovie.releaseDate, b.reviewedMovie.releaseDate),
    "grade-asc": (a, b) => sortNumberAsc(a.gradeValue, b.gradeValue),
    "grade-desc": (a, b) => sortNumberDesc(a.gradeValue, b.gradeValue),
    "review-date-desc": (a, b) =>
      sortNumberDesc(a.frontmatter.sequence, b.frontmatter.sequence),
    "review-date-asc": (a, b) =>
      sortNumberAsc(a.frontmatter.sequence, b.frontmatter.sequence),
  };

  const comparer = sortMap[sortOrder];

  return reviews.sort(comparer);
}

/**
 * Returns the min and max release years for a given collection of reviews.
 * @param reviews The reviews collection.
 */
function minMaxReleaseYearsForReviews(reviews: Review[]) {
  const releaseYears = reviews
    .map((review) => {
      return review.reviewedMovie.year;
    })
    .sort();

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

export function initState({ reviews }: { reviews: Review[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForReviews(reviews);

  return {
    allReviews: reviews,
    filteredReviews: reviews,
    filters: {},
    minYear,
    maxYear,
    sortValue: "title",
    showGrades: false,
    showCount: SHOW_COUNT_DEFAULT,
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
  value: SortType;
}

/** Action to toggle grades. */
interface ToggleGradesAction {
  type: ActionType.TOGGLE_GRADES;
}

interface ShowMoreAction {
  type: ActionType.SHOW_MORE;
}

export type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ToggleGradesAction
  | ShowMoreAction;

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
        title: (review: Review) => {
          return regex.test(review.reviewedMovie.title);
        },
      };
      filteredReviews = sortReviews(
        applyFilters<Review>({ collection: state.allReviews, filters }),
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
        releaseYear: (review: Review) => {
          const releaseYear = review.reviewedMovie.year;

          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredReviews = sortReviews(
        applyFilters<Review>({ collection: state.allReviews, filters }),
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
    case ActionType.SHOW_MORE: {
      return {
        ...state,
        showCount: state.showCount + SHOW_COUNT_DEFAULT,
      };
    }
    // no default
  }
}
