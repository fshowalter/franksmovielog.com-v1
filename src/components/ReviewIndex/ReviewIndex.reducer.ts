import {
  applyFilters,
  collator,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils";

export type Sort =
  | "release-date-desc"
  | "release-date-asc"
  | "review-date-desc"
  | "review-date-asc"
  | "title-asc"
  | "title-desc"
  | "grade-asc"
  | "grade-desc";

function sortItems(items: Queries.ReviewIndexItemFragment[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (
      a: Queries.ReviewIndexItemFragment,
      b: Queries.ReviewIndexItemFragment
    ) => number
  > = {
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    "review-date-desc": (a, b) => sortStringDesc(a.reviewDate, b.reviewDate),
    "review-date-asc": (a, b) => sortStringAsc(a.reviewDate, b.reviewDate),
    "title-asc": (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "title-desc": (a, b) => collator.compare(a.sortTitle, b.sortTitle) * -1,
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
  allItems: Queries.ReviewIndexItemFragment[];
  /** Viewings matching the current filters. */
  filteredItems: Queries.ReviewIndexItemFragment[];
  /** The active filters. */
  filters: Record<string, (item: Queries.ReviewIndexItemFragment) => boolean>;
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
  items: Queries.ReviewIndexItemFragment[];
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
  FILTER_GRADE = "FILTER_GRADE",
  FILTER_GENRES = "FILTER_GENRES",
  FILTER_REVIEW_YEAR = "FILTER_REVIEW_YEAR",
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

/** Action to filter by review year. */
interface FilterReviewYearAction {
  type: ActionType.FILTER_REVIEW_YEAR;
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
  | FilterReviewYearAction
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
    case ActionType.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      filters = {
        ...state.filters,
        title: (item: Queries.ReviewIndexItemFragment) => {
          return regex.test(item.title);
        },
      };
      filteredItems = sortItems(
        applyFilters<Queries.ReviewIndexItemFragment>({
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
        releaseYear: (item: Queries.ReviewIndexItemFragment) => {
          const releaseYear = item.year;
          return (
            releaseYear >= action.values[0] && releaseYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<Queries.ReviewIndexItemFragment>({
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
    case ActionType.FILTER_REVIEW_YEAR: {
      filters = {
        ...state.filters,
        releaseYear: (item: Queries.ReviewIndexItemFragment) => {
          const reviewYear = item.reviewYear;
          if (!reviewYear) {
            return true;
          }
          return (
            reviewYear >= action.values[0] && reviewYear <= action.values[1]
          );
        },
      };
      filteredItems = sortItems(
        applyFilters<Queries.ReviewIndexItemFragment>({
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
        grade: (item: Queries.ReviewIndexItemFragment) => {
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
        applyFilters<Queries.ReviewIndexItemFragment>({
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
