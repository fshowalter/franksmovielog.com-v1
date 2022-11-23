import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";

export type SortType =
  | "release-date-desc"
  | "release-date-asc"
  | "title"
  | "grade-asc"
  | "grade-desc";

function sortMovies(
  viewings: Queries.OverratedDisappointmentsPageNodeFragment[],
  sortOrder: SortType
) {
  const sortMap: Record<
    SortType,
    (
      a: Queries.OverratedDisappointmentsPageNodeFragment,
      b: Queries.OverratedDisappointmentsPageNodeFragment
    ) => number
  > = {
    "release-date-desc": (a, b) =>
      sortStringDesc(a.reviewedMovie.releaseDate, b.reviewedMovie.releaseDate),
    "release-date-asc": (a, b) =>
      sortStringAsc(a.reviewedMovie.releaseDate, b.reviewedMovie.releaseDate),
    title: (a, b) =>
      collator.compare(a.reviewedMovie.sortTitle, b.reviewedMovie.sortTitle),
    "grade-asc": (a, b) =>
      sortNumberAsc(
        a.reviewedMovie.gradeValue || 50,
        b.reviewedMovie.gradeValue || 50
      ),
    "grade-desc": (a, b) =>
      sortNumberDesc(
        a.reviewedMovie.gradeValue || -1,
        b.reviewedMovie.gradeValue || -1
      ),
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

/** The page state. */
type State = {
  /** All possible movies. */
  allMovies: Queries.OverratedDisappointmentsPageNodeFragment[];
  /** Movies matching the current filters. */
  filteredMovies: Queries.OverratedDisappointmentsPageNodeFragment[];
  /** The active filters. */
  filters: Record<
    string,
    (movie: Queries.OverratedDisappointmentsPageNodeFragment) => boolean
  >;
  /** The number of movies to show. */
  showCount: number;
  /** The active sort value. */
  sortValue: SortType;
};

const SHOW_COUNT_DEFAULT = 24;

/**
 * Initializes the page state.
 */
export function initState({
  movies,
}: {
  movies: Queries.OverratedDisappointmentsPageNodeFragment[];
}): State {
  return {
    allMovies: movies,
    filteredMovies: movies,
    filters: {},
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: "release-date-desc",
  };
}

export enum ActionTypes {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_GRADE = "FILTER_GRADE",
  FILTER_GENRES = "FILTER_GENRES",
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
interface FilterGenresAction {
  type: ActionTypes.FILTER_GENRES;
  /** The value to filter on. */
  values: string[];
}

/** Action to filter by release year. */
interface FilterReleaseYearAction {
  type: ActionTypes.FILTER_RELEASE_YEAR;
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

type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | FilterGenresAction
  | SortAction
  | ShowMoreAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export default function reducer(state: State, action: Action): State {
  // eslint-disable-line consistent-return
  let filters;
  let filteredMovies;

  switch (action.type) {
    case ActionTypes.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (movie: Queries.OverratedDisappointmentsPageNodeFragment) => {
          return regex.test(movie.reviewedMovie.title);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.OverratedDisappointmentsPageNodeFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
      };
    }
    case ActionTypes.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (
          movie: Queries.OverratedDisappointmentsPageNodeFragment
        ) => {
          const releaseYear = movie.reviewedMovie.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.OverratedDisappointmentsPageNodeFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
      };
    }
    case ActionTypes.FILTER_GENRES: {
      filters = {
        ...state.filters,
        genres: (movie: Queries.OverratedDisappointmentsPageNodeFragment) => {
          return action.values.every((genre) => movie.genres.includes(genre));
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.OverratedDisappointmentsPageNodeFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
      };
    }
    case ActionTypes.SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredMovies,
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
