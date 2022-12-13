import {
  applyFilters,
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils";
import type { IPosterListWithFiltersLayoutItem } from "./PosterListWithFilters";

export type Sort =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title"
  | "grade-asc"
  | "grade-desc";

function sortItems(items: IPosterListWithFiltersLayoutItem[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (
      a: IPosterListWithFiltersLayoutItem,
      b: IPosterListWithFiltersLayoutItem
    ) => number
  > = {
    "viewing-date-desc": (a, b) =>
      sortNumberDesc(a.sequence ?? 0, b.sequence ?? 0),
    "viewing-date-asc": (a, b) =>
      sortNumberAsc(a.sequence ?? 0, b.sequence ?? 0),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "grade-asc": (a, b) =>
      sortNumberAsc(a.gradeValue ?? 50, b.gradeValue ?? 50),
    "grade-desc": (a, b) =>
      sortNumberDesc(a.gradeValue ?? -1, b.gradeValue ?? -1),
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

/** The page state. */
interface State {
  /** All possible viewings. */
  allItems: IPosterListWithFiltersLayoutItem[];
  /** Viewings matching the current filters. */
  filteredItems: IPosterListWithFiltersLayoutItem[];
  /** The active filters. */
  filters: Record<string, (item: IPosterListWithFiltersLayoutItem) => boolean>;
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
  items: IPosterListWithFiltersLayoutItem[];
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
  value: Sort;
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
  let filteredItems;

  switch (action.type) {
    case ActionTypes.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (item: IPosterListWithFiltersLayoutItem) => {
          return regex.test(item.title);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.FILTER_VENUE: {
      filters = {
        ...state.filters,
        venue: (item: IPosterListWithFiltersLayoutItem) => {
          if (action.value === "All") {
            return true;
          }

          return item.venue === action.value;
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.FILTER_RELEASE_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (item: IPosterListWithFiltersLayoutItem) => {
          const releaseYear = item.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.FILTER_GENRES: {
      filters = {
        ...state.filters,
        genres: (item: IPosterListWithFiltersLayoutItem) => {
          return action.values.every((genre) => item.genres.includes(genre));
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.FILTER_VIEWING_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (item: IPosterListWithFiltersLayoutItem) => {
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
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.FILTER_GRADE: {
      filters = {
        ...state.filters,
        grade: (item: IPosterListWithFiltersLayoutItem) => {
          const gradeValue = item.gradeValue;
          if (!gradeValue) {
            return action.includeNonReviewed;
          }
          return (
            gradeValue >= action.values[0] && gradeValue <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersLayoutItem>({
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
    case ActionTypes.SORT: {
      filteredItems = sortItems(state.filteredItems, action.value);
      return {
        ...state,
        sortValue: action.value,
        filteredItems,
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
