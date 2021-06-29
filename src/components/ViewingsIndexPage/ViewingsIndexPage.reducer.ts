import applyFilters from "../../utils/apply-filters";
import {
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils/sort-utils";
import type { Viewing } from "./ViewingsIndexPage";

export type SortType =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title";

function sortViewings(viewings: Viewing[], sortOrder: SortType) {
  const sortMap: Record<SortType, (a: Viewing, b: Viewing) => number> = {
    "viewing-date-desc": (a, b) => sortNumberDesc(a.sequence, b.sequence),
    "viewing-date-asc": (a, b) => sortNumberAsc(a.sequence, b.sequence),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortOrder];
  return viewings.sort(comparer);
}

/**
 * Parses the given viewings and returns the [min, max] release years.
 * @param viewings The viewings to parse.
 */
function minMaxReleaseYearsForViewings(viewings: Viewing[]) {
  const releaseYears = viewings
    .map((viewing) => {
      return viewing.year;
    })
    .sort();

  const minYear = releaseYears[0];
  const maxYear = releaseYears[releaseYears.length - 1];

  return [minYear, maxYear];
}

/** The page state. */
type State = {
  /** All possible viewings. */
  allViewings: Viewing[];
  /** Viewings matching the current filters. */
  filteredViewings: Viewing[];
  /** The active filters. */
  filters: Record<string, (viewing: Viewing) => boolean>;
  /** The minimum year for the release date filter. */
  minYear: number;
  /** The maximum year for the release date filter. */
  maxYear: number;
  /** The number of viewings to show. */
  showCount: number;
  /** The active sort value. */
  sortValue: SortType;
};

const SHOW_COUNT_DEFAULT = 50;

/**
 * Initializes the page state.
 */
export function initState({ viewings }: { viewings: Viewing[] }): State {
  const [minYear, maxYear] = minMaxReleaseYearsForViewings(viewings);

  return {
    allViewings: viewings,
    filteredViewings: viewings,
    filters: {},
    minYear,
    maxYear,
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: "viewing-date-desc",
  };
}

export enum ActionTypes {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_VENUE = "FILTER_VENUE",
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

/** Action to filter by title. */
interface FilterVenueAction {
  type: ActionTypes.FILTER_VENUE;
  /** The value to filter on. */
  value: string;
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
  | FilterVenueAction
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
  let filteredViewings;

  switch (action.type) {
    case ActionTypes.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (viewing: Viewing) => {
          return regex.test(viewing.title);
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
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
        venue: (viewing: Viewing) => {
          if (action.value === "All") {
            return true;
          }

          return viewing.venue === action.value;
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
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
        releaseYear: (viewing: Viewing) => {
          const releaseYear = viewing.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredViewings = sortViewings(
        applyFilters<Viewing>({ collection: state.allViewings, filters }),
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
