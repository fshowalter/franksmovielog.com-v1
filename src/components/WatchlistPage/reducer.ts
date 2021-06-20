import applyFilters from "../../utils/apply-filters";
import slicePage from "../../utils/slice-page";
import {
  collator,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_DIRECTOR = "FILTER_DIRECTOR",
  FILTER_PERFORMER = "FILTER_PERFORMER",
  FILTER_WRITER = "FILTER_WRITER",
  FILTER_COLLECTION = "FILTER_COLLECTION",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  CHANGE_PAGE = "CHANGE_PAGE",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
}

interface WatchlistMovie {
  collectionNames: string[];
  directorNames: string[];
  imdbId: string;
  performerNames: string[];
  title: string;
  writerNames: string[];
  year: number;
  releaseDate: string;
  sortTitle: string;
  reviewsSlug: string | null;
}

/**
 * Sorts a given collection of watchlist movies using the given sort function key.
 * @param titles The collection to sort.
 * @param sortOrder The sort function key.
 */
function sortMovies(titles: WatchlistMovie[], sortOrder: string) {
  const sortMap: Record<
    string,
    (a: WatchlistMovie, b: WatchlistMovie) => number
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
function minMaxReleaseYearsForMovies(movies: WatchlistMovie[]) {
  const releaseYears = movies
    .map((movie) => {
      return movie.year;
    })
    .sort();

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

type State = {
  /** All possible watchlist movies. */
  allMovies: WatchlistMovie[];
  /** Watchlist movies matching the current filters. */
  filteredMovies: WatchlistMovie[];
  /** Watchlist movies matching the current filters for the current page. */
  moviesForPage: WatchlistMovie[];
  /** The active filters. */
  filters: Record<string, (movie: WatchlistMovie) => boolean>;
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
  /** True if reviewed items are currently hidden. */
  hideReviewed: boolean;
};

/**
 * Initializes the page state.
 */
export function initState({ movies }: { movies: WatchlistMovie[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForMovies(movies);
  const currentPage = 1;
  const perPage = 50;

  return {
    allMovies: movies,
    filteredMovies: movies,
    moviesForPage: slicePage<WatchlistMovie>({
      collection: movies,
      pageToSlice: currentPage,
      perPage,
    }),
    filters: {},
    sortValue: "release-date-asc",
    hideReviewed: false,
    currentPage,
    perPage,
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
  value: string;
}

/** Action to change page. */
interface ChangePageAction {
  type: ActionType.CHANGE_PAGE;
  /** The page to change to. */
  value: number;
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
  | ChangePageAction;

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
        title: (movie: WatchlistMovie) => {
          return regex.test(movie.title);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.FILTER_DIRECTOR: {
      filters = {
        ...state.filters,
        director: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          return movie.directorNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.FILTER_PERFORMER: {
      filters = {
        ...state.filters,
        performer: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          return movie.performerNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.FILTER_WRITER: {
      filters = {
        ...state.filters,
        writer: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          return movie.writerNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.FILTER_COLLECTION: {
      filters = {
        ...state.filters,
        collection: (movie: WatchlistMovie) => {
          if (action.value === "All") {
            return true;
          }

          return movie.collectionNames.includes(action.value);
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (movie: WatchlistMovie) => {
          const releaseYear = movie.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.SORT: {
      filteredMovies = sortMovies(state.filteredMovies, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredMovies,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: state.currentPage,
          perPage: state.perPage,
        }),
      };
    }
    case ActionType.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.value,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: state.filteredMovies,
          pageToSlice: action.value,
          perPage: state.perPage,
        }),
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
          reviewed: (movie: WatchlistMovie) => {
            return movie.reviewsSlug === null;
          },
        };
      }
      filteredMovies = sortMovies(
        applyFilters<WatchlistMovie>({ collection: state.allMovies, filters }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredMovies,
        hideReviewed: !state.hideReviewed,
        currentPage: 1,
        moviesForPage: slicePage<WatchlistMovie>({
          collection: filteredMovies,
          pageToSlice: 1,
          perPage: state.perPage,
        }),
      };
    }
    // no default
  }
}
