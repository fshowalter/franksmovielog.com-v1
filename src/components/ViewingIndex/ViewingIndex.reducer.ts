import {
  applyFilters,
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils";
import type { IViewing } from "./ViewingIndex";

export type Sort =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title";

function sortItems(items: IViewing[], sortOrder: Sort) {
  const sortMap: Record<Sort, (a: IViewing, b: IViewing) => number> = {
    "viewing-date-desc": (a, b) => sortNumberDesc(a.sequence, b.sequence),
    "viewing-date-asc": (a, b) => sortNumberAsc(a.sequence, b.sequence),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

/** The page state. */
interface State {
  /** All possible viewings. */
  allItems: IViewing[];
  /** Viewings matching the current filters. */
  filteredItems: IViewing[];
  /** The active filters. */
  filters: Record<string, (item: IViewing) => boolean>;
  /** The number of viewings to show. */
  showCount: number;
  /** The active sort value. */
  sortValue: Sort;
}

const SHOW_COUNT_DEFAULT = 24;

/**
 * Initializes the page state.
 */
export function initState({
  items,
  sort,
}: {
  items: IViewing[];
  sort: Sort;
}): State {
  return {
    allItems: items,
    filteredItems: items,
    filters: {},
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: sort,
  };
}

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_MEDIUM = "FILTER_MEDIUM",
  FILTER_GENRES = "FILTER_GENRES",
  FILTER_VIEWING_YEAR = "FILTER_VIEWING_YEAR",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  FILTER_VENUE = "FILTER_VENUE",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
}

/** Action to filter by title. */
interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by medium. */
interface FilterMediumAction {
  type: ActionType.FILTER_MEDIUM;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by venue. */
interface FilterVenueAction {
  type: ActionType.FILTER_VENUE;
  /** The value to filter on. */
  value: string;
}

/** Action to filter by venue. */
interface FilterGenresAction {
  type: ActionType.FILTER_GENRES;
  /** The value to filter on. */
  values: string[];
}

/** Action to filter by release year. */
interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to filter by viewing year. */
interface FilterViewingYearAction {
  type: ActionType.FILTER_VIEWING_YEAR;
  /** The minimum and maximum years to bound the filter window. */
  values: [number, number];
}

/** Action to sort. */
interface SortAction {
  type: ActionType.SORT;
  /** The sorter to apply. */
  value: Sort;
}

interface ShowMoreAction {
  type: ActionType.SHOW_MORE;
}

export type Action =
  | FilterTitleAction
  | FilterReleaseYearAction
  | FilterViewingYearAction
  | FilterMediumAction
  | FilterVenueAction
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
  let filteredItems;

  switch (action.type) {
    case ActionType.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (item: IViewing) => {
          return regex.test(item.title);
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.FILTER_MEDIUM: {
      filters = {
        ...state.filters,
        venue: (item: IViewing) => {
          if (action.value === "All") {
            return true;
          }

          return item.medium === action.value;
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.FILTER_VENUE: {
      filters = {
        ...state.filters,
        venue: (item: IViewing) => {
          if (action.value === "All") {
            return true;
          }

          return item.venue === action.value;
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (item: IViewing) => {
          const releaseYear = item.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.FILTER_GENRES: {
      filters = {
        ...state.filters,
        genres: (item: IViewing) => {
          return action.values.every((genre) => item.genres.includes(genre));
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.FILTER_VIEWING_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (item: IViewing) => {
          const viewingYear = item.viewingYear;
          if (!viewingYear) {
            return true;
          }
          return (
            viewingYear >= action.values[0] && viewingYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IViewing>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
      };
    }
    case ActionType.SORT: {
      filteredItems = sortItems(state.filteredItems, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredItems,
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
