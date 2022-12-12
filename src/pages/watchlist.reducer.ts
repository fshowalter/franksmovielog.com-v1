import {
  applyFilters,
  collator,
  sortStringAsc,
  sortStringDesc,
} from "../utils";

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_DIRECTOR = "FILTER_DIRECTOR",
  FILTER_PERFORMER = "FILTER_PERFORMER",
  FILTER_WRITER = "FILTER_WRITER",
  FILTER_COLLECTION = "FILTER_COLLECTION",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
}

export type SortType = "release-date-asc" | "release-date-desc" | "title";

/**
 * Sorts a given collection of watchlist movies using the given sort function key.
 * @param titles The collection to sort.
 * @param sortOrder The sort function key.
 */
function sortMovies(
  titles: Queries.WatchlistMovieFragment[],
  sortOrder: SortType
) {
  const sortMap: Record<
    SortType,
    (
      a: Queries.WatchlistMovieFragment,
      b: Queries.WatchlistMovieFragment
    ) => number
  > = {
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortOrder];
  return titles.sort(comparer);
}

/**
 * Parses the given watchlist movies and returns the [min, max] release years.
 * @param titles The watchlist movies to parse.
 */
function minMaxReleaseYearsForMovies(movies: Queries.WatchlistMovieFragment[]) {
  const releaseYears = movies
    .map((movie) => {
      return movie.year;
    })
    .sort();

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

interface State {
  /** All possible watchlist movies. */
  allMovies: Queries.WatchlistMovieFragment[];
  /** Watchlist movies matching the current filters. */
  filteredMovies: Queries.WatchlistMovieFragment[];
  /** Number of movies to show on the page. */
  showCount: number;
  /** The active filters. */
  filters: Record<string, (movie: Queries.WatchlistMovieFragment) => boolean>;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The active sort value. */
  sortValue: SortType;
  /** True if reviewed items are currently hidden. */
  hideReviewed: boolean;
}

const SHOW_COUNT_DEFAULT = 24;

/**
 * Initializes the page state.
 */
export function initState({
  movies,
}: {
  movies: Queries.WatchlistMovieFragment[];
}): State {
  const [minYear, maxYear] = minMaxReleaseYearsForMovies(movies);

  return {
    allMovies: movies,
    filteredMovies: movies,
    showCount: SHOW_COUNT_DEFAULT,
    filters: {},
    sortValue: "release-date-asc",
    hideReviewed: false,
    minYear,
    maxYear,
  };
}

/** Action to filter by title. */
interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by collection. */
interface FilterCollectionAction {
  type: ActionType.FILTER_COLLECTION;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by director. */
interface FilterDirectorAction {
  type: ActionType.FILTER_DIRECTOR;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by performer. */
interface FilterPerformerAction {
  type: ActionType.FILTER_PERFORMER;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by writer. */
interface FilterWriterAction {
  type: ActionType.FILTER_WRITER;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by release year. */
interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to sort. */
interface SortAction {
  type: ActionType.SORT;
  /** The sorter to apply. */
  value: SortType;
}

/** Action to change page. */
interface ShowMoreAction {
  type: ActionType.SHOW_MORE;
}

/** Action to toggle reviewed. */
interface ToggleReviewedAction {
  type: ActionType.TOGGLE_REVIEWED;
}

type Action =
  | FilterTitleAction
  | FilterCollectionAction
  | FilterReleaseYearAction
  | FilterDirectorAction
  | FilterPerformerAction
  | FilterWriterAction
  | SortAction
  | ToggleReviewedAction
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
        title: (movie: Queries.WatchlistMovieFragment) => {
          return regex.test(movie.title);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_DIRECTOR: {
      filters = {
        ...state.filters,
        director: (movie: Queries.WatchlistMovieFragment) => {
          if (action.value === "All") {
            return true;
          }

          return movie.directorNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_PERFORMER: {
      filters = {
        ...state.filters,
        performer: (movie: Queries.WatchlistMovieFragment) => {
          if (action.value === "All") {
            return true;
          }

          return movie.performerNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_WRITER: {
      filters = {
        ...state.filters,
        writer: (movie: Queries.WatchlistMovieFragment) => {
          if (action.value === "All") {
            return true;
          }

          return movie.writerNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_COLLECTION: {
      filters = {
        ...state.filters,
        collection: (movie: Queries.WatchlistMovieFragment) => {
          if (action.value === "All") {
            return true;
          }

          return movie.collectionNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (movie: Queries.WatchlistMovieFragment) => {
          const releaseYear = movie.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredMovies,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.SHOW_MORE: {
      return {
        ...state,
        showCount: state.showCount + SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (movie: Queries.WatchlistMovieFragment) => {
            return !movie.reviewedMovie?.slug;
          },
        };
      }
      filteredMovies = sortMovies(
        applyFilters<Queries.WatchlistMovieFragment>({
          collection: state.allMovies,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        hideReviewed: !state.hideReviewed,
      };
    }
    // no default
  }
}
