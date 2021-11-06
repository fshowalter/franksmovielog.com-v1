import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";
import type { WatchlistMovie } from "./WatchlistEntityPage";

export type SortType =
  | "release-date-asc"
  | "release-date-desc"
  | "title"
  | "grade-asc"
  | "grade-desc";

function sortMovies(titles: WatchlistMovie[], sortType: SortType) {
  const sortMap: Record<
    SortType,
    (a: WatchlistMovie, b: WatchlistMovie) => number
  > = {
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "grade-asc": (a, b) =>
      sortNumberAsc(a.lastReviewGradeValue || 50, b.lastReviewGradeValue || 50),
    "grade-desc": (a, b) =>
      sortNumberDesc(
        a.lastReviewGradeValue || -1,
        b.lastReviewGradeValue || -1
      ),
  };

  const comparer = sortMap[sortType];

  return titles.sort(comparer);
}

/**
 * Returns the min and max release years for a given collection of movies.
 * @param movies The movies collection.
 */
function minMaxReleaseYears(movies: WatchlistMovie[]) {
  const releaseYears = movies
    .map((title) => {
      return title.year;
    })
    .sort();

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

function reviewedMovieCount(movies: WatchlistMovie[]): number {
  return movies.filter((movie) => movie.reviewedMovieSlug).length;
}

/**
 * The page state.
 */
type State = {
  /** All possible reviews. */
  allMovies: WatchlistMovie[];
  /** Reviews matching the current filters. */
  filteredMovies: WatchlistMovie[];
  /** Number of movies to show on the page. */
  showCount: number;
  /** The active filters. */
  filters: Record<string, (title: WatchlistMovie) => boolean>;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The reviewed movie count */
  reviewedMovieCount: number;
  /** The active sort type. */
  sortType: SortType;
};

const SHOW_COUNT_DEFAULT = 24;

export function initState({ movies }: { movies: WatchlistMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYears(movies);

  return {
    allMovies: movies,
    filteredMovies: movies,
    showCount: SHOW_COUNT_DEFAULT,
    filters: {},
    minYear,
    maxYear,
    reviewedMovieCount: reviewedMovieCount(movies),
    sortType: "release-date-asc",
  };
}

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
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

/** Action to change page. */
interface ShowMoreAction {
  type: ActionType.SHOW_MORE;
}

type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | SortAction
  | ShowMoreAction;

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export default function reducer(state: State, action: Action): State {
  let filters;
  let filteredMovies;

  switch (action.type) {
    case ActionType.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (review: WatchlistMovie) => {
          return regex.test(review.title);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortType
      );
      return {
        ...state,
        filters,
        filteredMovies,
        reviewedMovieCount: reviewedMovieCount(filteredMovies),
      };
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (review: WatchlistMovie) => {
          const releaseYear = review.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortType
      );
      return {
        ...state,
        filters,
        filteredMovies,
        reviewedMovieCount: reviewedMovieCount(filteredMovies),
      };
    }
    case ActionType.SHOW_MORE: {
      return {
        ...state,
        showCount: state.showCount + SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortType: action.value,
        filteredMovies,
      };
    }
    // no default
  }
}
