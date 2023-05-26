import {
  applyFilters,
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils";
import type { IPosterListWithFiltersItem } from "./PosterListWithFilters";

export type Sort =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title"
  | "grade-asc"
  | "grade-desc";

function sortItems(items: IPosterListWithFiltersItem[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (a: IPosterListWithFiltersItem, b: IPosterListWithFiltersItem) => number
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
  allItems: IPosterListWithFiltersItem[];
  /** Viewings matching the current filters. */
  filteredItems: IPosterListWithFiltersItem[];
  /** The active filters. */
  filters: Record<string, (item: IPosterListWithFiltersItem) => boolean>;
  /** The number of viewings to show. */
  showCount: number;
  /** The active sort value. */
  sortValue: Sort;
  hideReviewed: boolean;
}

const SHOW_COUNT_DEFAULT = 24;

/**
 * Initializes the page state.
 */
export function initState({
  items,
  sort,
}: {
  items: IPosterListWithFiltersItem[];
  sort: Sort;
}): State {
  return {
    allItems: items,
    filteredItems: items,
    filters: {},
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: sort,
    hideReviewed: false,
  };
}

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_MEDIUM = "FILTER_MEDIUM",
  FILTER_GRADE = "FILTER_GRADE",
  FILTER_GENRES = "FILTER_GENRES",
  FILTER_VIEWING_YEAR = "FILTER_VIEWING_YEAR",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  FILTER_DIRECTOR = "FILTER_DIRECTOR",
  FILTER_PERFORMER = "FILTER_PERFORMER",
  FILTER_WRITER = "FILTER_WRITER",
  FILTER_COLLECTION = "FILTER_COLLECTION",
  FILTER_VENUE = "FILTER_VENUE",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
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

/** Action to filter by grade. */
interface FilterGradeAction {
  type: ActionType.FILTER_GRADE;
  /** The values to filter on. */
  values: [number, number];
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

/** Action to toggle reviewed. */
interface ToggleReviewedAction {
  type: ActionType.TOGGLE_REVIEWED;
}

export type Action =
  | FilterTitleAction
  | FilterDirectorAction
  | FilterPerformerAction
  | FilterWriterAction
  | FilterCollectionAction
  | FilterReleaseYearAction
  | FilterViewingYearAction
  | FilterMediumAction
  | FilterVenueAction
  | FilterGradeAction
  | FilterGenresAction
  | SortAction
  | ShowMoreAction
  | ToggleReviewedAction;

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
        title: (item: IPosterListWithFiltersItem) => {
          return regex.test(item.title);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
    case ActionType.FILTER_DIRECTOR: {
      filters = {
        ...state.filters,
        director: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All" || !item.directorNames) {
            return true;
          }

          return item.directorNames.includes(action.value);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_PERFORMER: {
      filters = {
        ...state.filters,
        performer: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All" || !item.performerNames) {
            return true;
          }

          return item.performerNames.includes(action.value);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_WRITER: {
      filters = {
        ...state.filters,
        writer: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All" || !item.writerNames) {
            return true;
          }

          return item.writerNames.includes(action.value);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_COLLECTION: {
      filters = {
        ...state.filters,
        collection: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All" || !item.collectionNames) {
            return true;
          }

          return item.collectionNames.includes(action.value);
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
        showCount: SHOW_COUNT_DEFAULT,
      };
    }
    case ActionType.FILTER_MEDIUM: {
      filters = {
        ...state.filters,
        venue: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All") {
            return true;
          }

          return item.medium === action.value;
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
        venue: (item: IPosterListWithFiltersItem) => {
          if (action.value === "All") {
            return true;
          }

          return item.venue === action.value;
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
        releaseYear: (item: IPosterListWithFiltersItem) => {
          const releaseYear = item.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
        genres: (item: IPosterListWithFiltersItem) => {
          return action.values.every((genre) => item.genres?.includes(genre));
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
        releaseYear: (item: IPosterListWithFiltersItem) => {
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
        applyFilters<IPosterListWithFiltersItem>({
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
    case ActionType.FILTER_GRADE: {
      filters = {
        ...state.filters,
        grade: (item: IPosterListWithFiltersItem) => {
          const gradeValue = item.gradeValue;
          if (!gradeValue) {
            return false;
          }
          return (
            gradeValue >= action.values[0] && gradeValue <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
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
    case ActionType.TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (item: IPosterListWithFiltersItem) => {
            return item.slug === null;
          },
        };
      }
      filteredItems = sortItems(
        applyFilters<IPosterListWithFiltersItem>({
          collection: state.allItems,
          filters,
        }),
        state.sortValue
      );
      return {
        ...state,
        filters,
        filteredItems,
        hideReviewed: !state.hideReviewed,
      };
    }
    // no default
  }
}
