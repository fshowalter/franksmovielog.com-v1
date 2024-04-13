import {
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

function sortItems(
  items: Queries.CastAndCrewMemberTitleFragment[],
  sortOrder: Sort,
) {
  const sortMap: Record<
    Sort,
    (
      a: Queries.CastAndCrewMemberTitleFragment,
      b: Queries.CastAndCrewMemberTitleFragment,
    ) => number
  > = {
    "release-date-desc": (a, b) =>
      sortString(a.releaseSequence, b.releaseSequence) * -1,
    "release-date-asc": (a, b) =>
      sortString(a.releaseSequence, b.releaseSequence),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
    "grade-asc": (a, b) => sortNumber(a.gradeValue ?? 50, b.gradeValue ?? 50),
    "grade-desc": (a, b) =>
      sortNumber(a.gradeValue ?? -1, b.gradeValue ?? -1) * -1,
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

function groupForItem(
  item: Queries.CastAndCrewMemberTitleFragment,
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

export interface State {
  filters: Record<
    string,
    (title: Queries.CastAndCrewMemberTitleFragment) => boolean
  >;
  filteredDirectorTitles: Queries.CastAndCrewMemberTitleFragment[];
  filteredPerformerTitles: Queries.CastAndCrewMemberTitleFragment[];
  filteredWriterTitles: Queries.CastAndCrewMemberTitleFragment[];
  allDirectorTitles: Queries.CastAndCrewMemberTitleFragment[];
  allPerformerTitles: Queries.CastAndCrewMemberTitleFragment[];
  allWriterTitles: Queries.CastAndCrewMemberTitleFragment[];
  sortValue: Sort;
  showCount: number;
  groupedDirectorTitles: Map<string, Queries.CastAndCrewMemberTitleFragment[]>;
  groupedPerformerTitles: Map<string, Queries.CastAndCrewMemberTitleFragment[]>;
  groupedWriterTitles: Map<string, Queries.CastAndCrewMemberTitleFragment[]>;
  hideReviewed: boolean;
}

export function initState({
  directorTitles,
  performerTitles,
  writerTitles,
  sort,
}: {
  directorTitles: Queries.CastAndCrewMemberTitleFragment[];
  performerTitles: Queries.CastAndCrewMemberTitleFragment[];
  writerTitles: Queries.CastAndCrewMemberTitleFragment[];
  sort: Sort;
}): State {
  return {
    allDirectorTitles: directorTitles,
    allPerformerTitles: performerTitles,
    allWriterTitles: writerTitles,
    filteredDirectorTitles: directorTitles,
    filteredPerformerTitles: performerTitles,
    filteredWriterTitles: writerTitles,
    filters: {},
    groupedDirectorTitles: groupItems(
      directorTitles.slice(0, SHOW_COUNT_DEFAULT),
      sort,
    ),
    groupedPerformerTitles: groupItems(
      performerTitles.slice(0, SHOW_COUNT_DEFAULT),
      sort,
    ),
    groupedWriterTitles: groupItems(
      writerTitles.slice(0, SHOW_COUNT_DEFAULT),
      sort,
    ),
    showCount: SHOW_COUNT_DEFAULT,
    sortValue: sort,
    hideReviewed: false,
  };
}

export enum ActionType {
  FILTER_TITLE = "FILTER_TITLE",
  FILTER_RELEASE_YEAR = "FILTER_RELEASE_YEAR",
  SORT = "SORT",
  SHOW_MORE = "SHOW_MORE",
  TOGGLE_REVIEWED = "TOGGLE_REVIEWED",
}

interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
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
  | FilterReleaseYearAction
  | SortAction
  | ShowMoreAction
  | ToggleReviewedAction;

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
          reviewed: (item: Queries.CastAndCrewMemberTitleFragment) => {
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
