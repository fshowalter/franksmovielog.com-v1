import {
  applyFilters,
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../utils/";

export type SortType =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title"
  | "grade-asc"
  | "grade-desc";

function sortViewings(
  viewings: Queries.ReviewsIndexViewingFragment[],
  sortOrder: SortType
) {
  const sortMap: Record<
    SortType,
    (
      a: Queries.ReviewsIndexViewingFragment,
      b: Queries.ReviewsIndexViewingFragment
    ) => number
  > = {
    "viewing-date-desc": (a, b) => sortNumberDesc(a.sequence, b.sequence),
    "viewing-date-asc": (a, b) => sortNumberAsc(a.sequence, b.sequence),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "grade-asc": (a, b) =>
      sortNumberAsc(
        a.reviewedMovie?.gradeValue ?? 50,
        b.reviewedMovie?.gradeValue ?? 50
      ),
    "grade-desc": (a, b) =>
      sortNumberDesc(
        a.reviewedMovie?.gradeValue ?? -1,
        b.reviewedMovie?.gradeValue ?? -1
      ),
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

/** The page state. */
interface State {
  /** All possible viewings. */
  allViewings: Queries.ReviewsIndexViewingFragment[];
  /** Viewings matching the current filters. */
  filteredViewings: Queries.ReviewsIndexViewingFragment[];
  /** The active filters. */
  filters: Record<
    string,
    (viewing: Queries.ReviewsIndexViewingFragment) => boolean
  >;
  /** The number of viewings to show. */
  showCount: number;
  /** The active sort value. */
  sortValue: SortType;
}

const SHOW_COUNT_DEFAULT = 24;

/**
 * Initializes the page state.
 */
export function initState({
  viewings,
}: {
  viewings: Queries.ReviewsIndexViewingFragment[];
}): State {
  return {
    allViewings: viewings,
    filteredViewings: viewings,
    filters: {},
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: "viewing-date-desc",
  };
}

export enum ActionTypes {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_VENUE = "FILTER_VENUE",
  FILTER_GRADE = "FILTER_GRADE",
  FILTER_GENRES = "FILTER_GENRES",
  FILTER_VIEWING_YEAR = "FILTER_VIEWING_YEAR",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
}

/** Action to filter by title. */
interface FilterTitleAction {
  type: ActionTypes.FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by venue. */
interface FilterVenueAction {
  type: ActionTypes.FILTER_VENUE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by venue. */
interface FilterGenresAction {
  type: ActionTypes.FILTER_GENRES;
  /** The value to filter on. */
  values: string[];
}

/** Action to filter by grade. */
interface FilterGradeAction {
  type: ActionTypes.FILTER_GRADE;
  /** The values to filter on. */
  values: [number, number];
  includeNonReviewed: boolean;
}

/** Action to filter by release year. */
interface FilterReleaseYearAction {
  type: ActionTypes.FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to filter by viewing year. */
interface FilterViewingYearAction {
  type: ActionTypes.FILTER_VIEWING_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to sort. */
interface SortAction {
  type: ActionTypes.SORT;
  /** The sorter to apply. */
  value: SortType;
}

interface ShowMoreAction {
  type: ActionTypes.SHOW_MORE;
}

export type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | FilterViewingYearAction
  | FilterVenueAction
  | FilterGradeAction
  | FilterGenresAction
  | SortAction
  | ShowMoreAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export function reducer(state: State, action: Action): State {
  // eslint-disable-line consistent-return
  let filters;
  let filteredViewings;

  switch (action.type) {
    case ActionTypes.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (viewing: Queries.ReviewsIndexViewingFragment) => {
          return regex.test(viewing.title);
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.FILTER_VENUE: {
      filters = {
        ...state.filters,
        venue: (viewing: Queries.ReviewsIndexViewingFragment) => {
          if (action.value === "All") {
            return true;
          }

          return viewing.venue === action.value;
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (viewing: Queries.ReviewsIndexViewingFragment) => {
          const releaseYear = viewing.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.FILTER_GENRES: {
      filters = {
        ...state.filters,
        genres: (movie: Queries.ReviewsIndexViewingFragment) => {
          return action.values.every((genre) => movie.genres.includes(genre));
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.FILTER_VIEWING_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (viewing: Queries.ReviewsIndexViewingFragment) => {
          const viewingYear = viewing.viewingYear;
          return (
            viewingYear >= action.values[0] && viewingYear <= action.values[1]
          );
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.FILTER_GRADE: {
      filters = {
        ...state.filters,
        grade: (movie: Queries.ReviewsIndexViewingFragment) => {
          const gradeValue = movie.reviewedMovie?.gradeValue;
          if (!gradeValue) {
            return action.includeNonReviewed;
          }
          return (
            gradeValue >= action.values[0] && gradeValue <= action.values[1]
          );
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Queries.ReviewsIndexViewingFragment>({
          collection: state.allViewings,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredViewings,
      };
    }
    case ActionTypes.SORT: {
      filteredViewings = sortViewings(state.filteredViewings, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredViewings,
      };
    }
    case ActionTypes.SHOW_MORE: {
      return {
        ...state,
        showCount: state.showCount + SHOW_COUNT_DEFAULT,
      };
    }
    // no default
  }
}
