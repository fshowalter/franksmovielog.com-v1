import {
  FilterableState,
  buildGroupItems,
  collator,
  filterTools,
  sortNumber,
  sortString,
} from "../../utils";

export type Sort =
  | "release-date-desc"
  | "release-date-asc"
  | "title"
  | "grade-asc"
  | "grade-desc";

const SHOW_COUNT_DEFAULT = 100;

const groupItems = buildGroupItems(groupForItem);
const { updateFilter, applyFilters } = filterTools(sortItems, groupItems);

function sortItems(items: Queries.WatchlistTitleFragment[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (
      a: Queries.WatchlistTitleFragment,
      b: Queries.WatchlistTitleFragment,
    ) => number
  > = {
    "release-date-desc": (a, b) =>
      sortString(a.yearAndImdbId, b.yearAndImdbId) * -1,
    "release-date-asc": (a, b) => sortString(a.yearAndImdbId, b.yearAndImdbId),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "grade-asc": (a, b) => sortNumber(a.gradeValue ?? 50, b.gradeValue ?? 50),
    "grade-desc": (a, b) =>
      sortNumber(a.gradeValue ?? -1, b.gradeValue ?? -1) * -1,
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

function groupForItem(
  item: Queries.WatchlistTitleFragment,
  sortValue: Sort,
): string {
  switch (sortValue) {
    case "release-date-asc":
    case "release-date-desc": {
      return item.year.toString();
    }
    case "grade-asc":
    case "grade-desc": {
      return item.grade ?? "Unrated";
    }
    case "title": {
      const letter = item.sortTitle.substring(0, 1);

      if (letter.toLowerCase() == letter.toUpperCase()) {
        return "#";
      }

      return item.sortTitle.substring(0, 1).toLocaleUpperCase();
    }
    // no default
  }
}

export interface State
  extends FilterableState<
    Queries.WatchlistTitleFragment,
    Sort,
    Map<string, Queries.WatchlistTitleFragment[]>
  > {
  hideReviewed: boolean;
}

export function initState({
  items,
  sort,
}: {
  items: Queries.WatchlistTitleFragment[];
  sort: Sort;
}): State {
  return {
    allItems: items,
    filteredItems: items,
    filters: {},
    groupedItems: groupItems(items.slice(0, SHOW_COUNT_DEFAULT), sort),
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: sort,
    hideReviewed: false,
  };
}

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  FILTER_DIRECTOR = "FILTER_DIRECTOR",
  FILTER_PERFORMER = "FILTER_PERFORMER",
  FILTER_WRITER = "FILTER_WRITER",
  FILTER_COLLECTION = "FILTER_COLLECTION",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
}

interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  value: string;
}

interface FilterCollectionAction {
  type: ActionType.FILTER_COLLECTION;
  value: string;
}

interface FilterDirectorAction {
  type: ActionType.FILTER_DIRECTOR;
  value: string;
}

interface FilterPerformerAction {
  type: ActionType.FILTER_PERFORMER;
  value: string;
}

interface FilterWriterAction {
  type: ActionType.FILTER_WRITER;
  value: string;
}

interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  values: [string, string];
}

interface SortAction {
  type: ActionType.SORT;
  value: Sort;
}

interface ShowMoreAction {
  type: ActionType.SHOW_MORE;
}

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
  | SortAction
  | ShowMoreAction
  | ToggleReviewedAction;

function clearFilter(
  value: string,
  currentState: State,
  key: string,
): State | null {
  if (value != "All") {
    return null;
  }

  const filters = {
    ...currentState.filters,
  };

  delete filters[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete

  return applyFilters(filters, currentState);
}

/**
 * Applies the given action to the given state, returning a new State object.
 * @param state The current state.
 * @param action The action to apply.
 */
export function reducer(state: State, action: Action): State {
  let filteredItems;
  let groupedItems;
  let filters;

  switch (action.type) {
    case ActionType.FILTER_TITLE: {
      const regex = new RegExp(action.value, "i");
      return updateFilter(state, "title", (item) => {
        return regex.test(item.title);
      });
    }
    case ActionType.FILTER_DIRECTOR: {
      return (
        clearFilter(action.value, state, "director") ??
        updateFilter(state, "director", (item) => {
          return item.directorNames.includes(action.value);
        })
      );
    }
    case ActionType.FILTER_PERFORMER: {
      return (
        clearFilter(action.value, state, "performer") ??
        updateFilter(state, "performer", (item) => {
          return item.performerNames.includes(action.value);
        })
      );
    }
    case ActionType.FILTER_WRITER: {
      return (
        clearFilter(action.value, state, "writer") ??
        updateFilter(state, "writer", (item) => {
          return item.writerNames.includes(action.value);
        })
      );
    }
    case ActionType.FILTER_COLLECTION: {
      return (
        clearFilter(action.value, state, "collection") ??
        updateFilter(state, "collection", (item) => {
          return item.collectionNames.includes(action.value);
        })
      );
    }
    case ActionType.FILTER_RELEASE_YEAR: {
      return updateFilter(state, "releaseYear", (item) => {
        const releaseYear = item.year;
        return (
          releaseYear >= action.values[0] && releaseYear <= action.values[1]
        );
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
    case ActionType.TOGGLE_REVIEWED: {
      if (state.hideReviewed) {
        filters = {
          ...state.filters,
        };
        delete filters.reviewed;
      } else {
        filters = {
          ...state.filters,
          reviewed: (item: Queries.WatchlistTitleFragment) => {
            return item.slug === null;
          },
        };
      }
      return {
        ...applyFilters(filters, state),
        hideReviewed: !state.hideReviewed,
      };
    }
    // no default
  }
}
