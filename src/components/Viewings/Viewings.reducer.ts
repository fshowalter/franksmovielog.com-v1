import {
  collator,
  filterCollection,
  sortNumberAsc,
  sortNumberDesc,
  sortStringAsc,
  sortStringDesc,
} from "../../utils";

const SHOW_COUNT_DEFAULT = 100;

export type Sort =
  | "viewing-date-desc"
  | "viewing-date-asc"
  | "release-date-desc"
  | "release-date-asc"
  | "title";

function sortItems(items: Queries.ViewingsItemFragment[], sortOrder: Sort) {
  const sortMap: Record<
    Sort,
    (a: Queries.ViewingsItemFragment, b: Queries.ViewingsItemFragment) => number
  > = {
    "viewing-date-desc": (a, b) => sortNumberDesc(a.sequence, b.sequence),
    "viewing-date-asc": (a, b) => sortNumberAsc(a.sequence, b.sequence),
    "release-date-desc": (a, b) => sortStringDesc(a.releaseDate, b.releaseDate),
    "release-date-asc": (a, b) => sortStringAsc(a.releaseDate, b.releaseDate),
    title: (a, b) => collator.compare(a.sortTitle, b.sortTitle),
  };

  const comparer = sortMap[sortOrder];
  return items.sort(comparer);
}

function groupItems(
  items: Queries.ViewingsItemFragment[]
): Map<string, Map<string, Queries.ViewingsItemFragment[]>> {
  const shortMonthToLong: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  const groupedItems = new Map<
    string,
    Map<string, Queries.ViewingsItemFragment[]>
  >();

  items.map((item) => {
    const monthYearGroup = `${shortMonthToLong[item.viewingMonth]} ${
      item.viewingYear
    }`;

    let groupValue = groupedItems.get(monthYearGroup);

    if (!groupValue) {
      groupValue = new Map<string, Queries.ViewingsItemFragment[]>();
      groupedItems.set(monthYearGroup, groupValue);
    }

    const dayGroup = `${item.viewingDay}-${item.viewingDate}`;

    let dayGroupValue = groupValue.get(dayGroup);

    if (!dayGroupValue) {
      dayGroupValue = [];
      groupValue.set(dayGroup, dayGroupValue);
    }

    dayGroupValue.push(item);
  });

  return groupedItems;
}

function updateFilter(
  currentState: State,
  key: string,
  handler: (item: Queries.ViewingsItemFragment) => boolean
): State {
  const filters = {
    ...currentState.filters,
    [key]: handler,
  };

  const filteredItems = sortItems(
    filterCollection({
      collection: currentState.allItems,
      filters,
    }),
    currentState.sortValue
  );

  const groupedItems = groupItems(
    filteredItems.slice(0, currentState.showCount)
  );

  return {
    ...currentState,
    filters,
    filteredItems,
    groupedItems,
  };
}

export interface State {
  allItems: Queries.ViewingsItemFragment[];
  filteredItems: Queries.ViewingsItemFragment[];
  filters: Record<string, (item: Queries.ViewingsItemFragment) => boolean>;
  groupedItems: Map<string, Map<string, Queries.ViewingsItemFragment[]>>;
  showCount: number;
  sortValue: Sort;
}

/**
 * Initializes the page state.
 */
export function initState({
  items,
  sort,
}: {
  items: Queries.ViewingsItemFragment[];
  sort: Sort;
}): State {
  return {
    allItems: items,
    filteredItems: items,
    filters: {},
    groupedItems: groupItems(items.slice(0, SHOW_COUNT_DEFAULT)),
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

interface FilterTitleAction {
  type: ActionType.FILTER_TITLE;
  value: string;
}

interface FilterMediumAction {
  type: ActionType.FILTER_MEDIUM;
  value: string;
}

interface FilterVenueAction {
  type: ActionType.FILTER_VENUE;
  value: string;
}

interface FilterGenresAction {
  type: ActionType.FILTER_GENRES;
  values: string[];
}

interface FilterReleaseYearAction {
  type: ActionType.FILTER_RELEASE_YEAR;
  values: [number, number];
}

interface FilterViewingYearAction {
  type: ActionType.FILTER_VIEWING_YEAR;
  values: [number, number];
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
  let groupedItems;
  let filteredItems;

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
    case ActionType.FILTER_MEDIUM: {
      return updateFilter(state, "medium", (item) => {
        if (action.value === "All") {
          return true;
        }

        return item.medium === action.value;
      });
    }
    case ActionType.FILTER_VENUE: {
      return updateFilter(state, "venue", (item) => {
        if (action.value === "All") {
          return true;
        }

        return item.venue === action.value;
      });
    }
    case ActionType.FILTER_GENRES: {
      return updateFilter(state, "genres", (item) => {
        return action.values.every((genre) => item.genres.includes(genre));
      });
    }
    case ActionType.FILTER_VIEWING_YEAR: {
      return updateFilter(state, "viewingYear", (item) => {
        const viewingYear = item.viewingYear;
        if (!viewingYear) {
          return true;
        }
        return (
          viewingYear >= action.values[0] && viewingYear <= action.values[1]
        );
      });
    }
    case ActionType.SORT: {
      filteredItems = sortItems(state.filteredItems, action.value);
      groupedItems = groupItems(filteredItems.slice(0, state.showCount));
      return {
        ...state,
        sortValue: action.value,
        filteredItems,
        groupedItems,
      };
    }
    case ActionType.SHOW_MORE: {
      const showCount = state.showCount + SHOW_COUNT_DEFAULT;

      groupedItems = groupItems(state.filteredItems.slice(0, showCount));

      return {
        ...state,
        groupedItems,
        showCount,
      };
    }
    // no default
  }
}
