import {
  FilterableState,
  buildGroupItems,
  collator,
  filterTools,
  sortNumber,
  sortString,
} from "../../utils";

const SHOW_COUNT_DEFAULT = 100;

export type Sort =
  | "release-date-desc"
  | "release-date-asc"
  | "review-date-desc"
  | "review-date-asc"
  | "title-asc"
  | "title-desc"
  | "grade-asc"
  | "grade-desc";

const groupItems = buildGroupItems(groupForItem);
const { updateFilter } = filterTools(sortItems, groupItems);

function sortItems(items: Queries.ReviewsItemFragment[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (a: Queries.ReviewsItemFragment, b: Queries.ReviewsItemFragment) => number
  > = {
    "release-date-desc": (a, b) =>
      sortString(a.releaseSequence, b.releaseSequence) * -1,
    "release-date-asc": (a, b) =>
      sortString(a.releaseSequence, b.releaseSequence),
    "review-date-desc": (a, b) => sortString(a.reviewDate, b.reviewDate) * -1,
    "review-date-asc": (a, b) => sortString(a.reviewDate, b.reviewDate),
    "title-asc": (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "title-desc": (a, b) => collator.compare(a.sortTitle, b.sortTitle) * -1,
    "grade-asc": (a, b) => sortNumber(a.gradeValue, b.gradeValue),
    "grade-desc": (a, b) => sortNumber(a.gradeValue, b.gradeValue) * -1,
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

function groupForItem(
  item: Queries.ReviewsItemFragment,
  sortValue: Sort,
): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return item.year.toString();
    }
    case "review-date-asc":
    case "review-date-desc": {
      return `${item.reviewMonth} ${item.reviewYear}`;
    }
    case "grade-asc":
    case "grade-desc": {
      return item.grade;
    }
    case "title-asc":
    case "title-desc": {
      const letter = item.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return item.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

export type State = FilterableState<
  Queries.ReviewsItemFragment,
  Sort,
  Map<string, Queries.ReviewsItemFragment[]>
>;

export function initState({
  items,
  sort,
}: {
  items: Queries.ReviewsItemFragment[];
  sort: Sort;
}): State {
  return {
    allItems: items,
    filteredItems: items,
    groupedItems: groupItems(items.slice(0, SHOW_COUNT_DEFAULT), sort),
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

interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  value: string;
}

interface FilterGenresAction {
  type: ActionType.FILTER_GENRES;
  values: string[];
}

interface FilterGradeAction {
  type: ActionType.FILTER_GRADE;
  values: [number, number];
}

interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  values: [string, string];
}

interface FilterReviewYearAction {
  type: ActionType.FILTER_REVIEW_YEAR;
  values: [string, string];
}

interface SortAction {
  type: ActionType.SORT;
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
  let filteredItems;
  let groupedItems;

  switch (action.type) {
    case ActionType.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "title", (item) => {
        return regex.test(item.title);
      });
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      return updateFilter(state, "releaseYear", (item) => {
        const releaseYear = item.year;
        return (
          releaseYear >= action.values[0] && releaseYear <= action.values[1]
        );
      });
    }
    case ActionType.FILTER_GENRES: {
      return updateFilter(state, "genres", (item) => {
        return action.values.every((genre) => item.genres.includes(genre));
      });
    }
    case ActionType.FILTER_REVIEW_YEAR: {
      return updateFilter(state, "reviewYear", (item) => {
        const reviewYear = item.reviewYear;
        return reviewYear >= action.values[0] && reviewYear <= action.values[1];
      });
    }
    case ActionType.FILTER_GRADE: {
      return updateFilter(state, "grade", (item) => {
        const gradeValue = item.gradeValue;
        return gradeValue >= action.values[0] && gradeValue <= action.values[1];
      });
    }
    case ActionType.SORT: {
      filteredItems = sortItems(state.filteredItems, action.value);
      groupedItems = groupItems(
        filteredItems.slice(0, state.showCount),
        action.value,
      );
      return {
        ...state,
        sortValue: action.value,
        filteredItems,
        groupedItems,
      };
    }
    case ActionType.SHOW_MORE: {
      const showCount = state.showCount + SHOW_COUNT_DEFAULT;

      groupedItems = groupItems(
        state.filteredItems.slice(0, showCount),
        state.sortValue,
      );

      return {
        ...state,
        groupedItems,
        showCount,
      };
    }
    // no default
  }
}
